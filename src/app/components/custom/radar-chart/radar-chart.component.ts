import { Component, ElementRef, Input, OnChanges, AfterViewInit, OnDestroy } from '@angular/core';

import crossfilter from 'crossfilter2';
import * as dc from 'dc';
import * as d3 from 'd3';

@Component({
  selector: 'app-radar-chart',
  imports: [],
  templateUrl: './radar-chart.component.html',
  styleUrl: './radar-chart.component.css',
})
export class RadarChartComponent implements OnChanges, AfterViewInit, OnDestroy {
  @Input() dimension!: crossfilter.Dimension<any, any>;
  @Input() group!: crossfilter.Group<any, any, any>;
  @Input() title: string = '';
  private svg: any;
  private radarPath: any;
  private radarGroup: any;
  private resizeObserver!: ResizeObserver;
  private initialized: boolean = false;

  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    // Observe container size changes and re-render
    const container = this.el.nativeElement.querySelector('.barchart-container') || this.el.nativeElement;
    this.resizeObserver = new ResizeObserver(() => {
      // Re-render when container resizes
      if (this.dimension && this.group) {
        this.renderChart(true);
      }
    });
    this.resizeObserver.observe(container);
  }

  ngOnChanges() {
    if (this.dimension && this.group) {
      this.renderChart(); // dibuja inicialmente o actualiza

      // Suscribirse a cambios de filtros en todos los charts DC (una vez)
      if (!this.initialized) {
        setTimeout(() => {
          dc.chartRegistry.list().forEach((chart: any) => {
            chart.on('filtered.radarchart', () => {
              this.renderChart(); // redibujar D3
            });
          });
        }, 1000);
        this.initialized = true;
      }
    }
  }

  ngOnDestroy(): void {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }

  private renderChart(forceRecreate: boolean = false) {
    const container = this.el.nativeElement.querySelector('#radar-chart') || this.el.nativeElement;

    // Get container dimensions
    const rect = container.getBoundingClientRect();
    const width = Math.max(150, rect.width || 300);
    const height = Math.max(150, rect.height || 300);
    const margin = Math.min(50, Math.floor(Math.min(width, height) * 0.12));
    const radius = Math.min(width, height) / 2 - margin;

    const raw = (this.group && this.group.all && this.group.all()) || [];
    const data = raw.map((d: any) => ({ axis: d.key, value: d.value }));

    // Remove existing svg if forced recreate or container size changed and svg exists
    if (forceRecreate || !this.svg) {
      d3.select(container).select('svg').remove();
      this.svg = d3
        .select(container)
        .append('svg')
        .attr('width', width)
        .attr('height', height);

      this.radarGroup = this.svg
        .append('g')
        .attr('transform', `translate(${width / 2}, ${height / 2})`);
      this.radarPath = null;
    } else {
      // Update svg size and group transform
      this.svg.attr('width', width).attr('height', height);
      if (this.radarGroup) {
        this.radarGroup.attr('transform', `translate(${width / 2}, ${height / 2})`);
      }
    }

    if (!data || data.length === 0) {
      // nothing to render
      return;
    }

    const allAxis = data.map((d) => d.axis);
    const total = allAxis.length || 1;
    const angleSlice = (Math.PI * 2) / total;

    const maxValue = d3.max(data, (d) => d.value) || 1;
    const rScale = d3.scaleLinear().range([0, radius]).domain([0, maxValue]);

    // If group of concentric circles exists, remove to avoid duplicates
    this.radarGroup.selectAll('.radar-grid').remove();
    // Círculos concéntricos
    const levels = 5;
    for (let i = 1; i <= levels; i++) {
      this.radarGroup
        .append('circle')
        .attr('class', 'radar-grid')
        .attr('r', (radius / levels) * i)
        .attr('fill', 'none')
        .attr('stroke', '#ccc')
        .attr('stroke-dasharray', '2,2');
    }

    // Ejes: remove previous lines and texts
    this.radarGroup.selectAll('.radar-axis').remove();
    allAxis.forEach((axis, i) => {
      const x = rScale(maxValue) * Math.sin(i * angleSlice);
      const y = -rScale(maxValue) * Math.cos(i * angleSlice);

      this.radarGroup
        .append('line')
        .attr('class', 'radar-axis')
        .attr('x1', 0)
        .attr('y1', 0)
        .attr('x2', x)
        .attr('y2', y)
        .attr('stroke', '#ccc');

      this.radarGroup
        .append('text')
        .attr('class', 'radar-axis')
        .attr('x', x * 1.05)
        .attr('y', y * 1.05)
        .attr('text-anchor', 'middle')
        .text(axis);
    });

    // Área del radar
    const radarLine = d3
      .lineRadial<any>()
      .radius((d: any) => rScale(d.value))
      .angle((d: any, i: number) => i * angleSlice)
      .curve(d3.curveLinearClosed);

    if (!this.radarPath) {
      this.radarPath = this.radarGroup
        .append('path')
        .datum(data)
        .attr('d', radarLine)
        .attr('fill', 'rgba(143,83,240,0.3)')
        .attr('stroke', 'rgb(143,83,240)')
        .attr('stroke-width', 2);
    } else {
      this.radarPath
        .datum(data)
        .transition()
        .duration(500)
        .attr('d', radarLine);
    }
  }
}
