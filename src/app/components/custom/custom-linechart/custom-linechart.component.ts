import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';

import crossfilter from 'crossfilter2';
import * as dc from 'dc';
import * as d3 from 'd3';

@Component({
  selector: 'app-custom-linechart',
  templateUrl: './custom-linechart.component.html',
  styleUrl: './custom-linechart.component.css',
})
export class CustomLinechartComponent
  implements OnChanges, AfterViewInit, OnDestroy
{
  @Input() dimention!: crossfilter.Dimension<any, any>;
  @Input() group!: crossfilter.Group<any, any, any>;
  @Input() title: string = '';

  private svg: any;
  private chartGroup: any;
  private resizeObserver!: ResizeObserver;

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    // Crear el SVG solo una vez
    const container = this.el.nativeElement.querySelector('#linechart');
    this.svg = d3.select(container).append('svg');

    // 👇 translate se aplica aquí una sola vez
    this.chartGroup = this.svg
      .append('g')
      .attr('transform', `translate(50,20)`); // usa los márgenes iniciales

    // Observar tamaño del contenedor
    this.resizeObserver = new ResizeObserver(() => this.renderChart());
    this.resizeObserver.observe(container);
  }

  ngOnDestroy() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }

  ngOnChanges() {
    if (this.dimention && this.group) {
      this.renderChart();

      setTimeout(() => {
        dc.chartRegistry.list().forEach((chart: any) => {
          chart.on('filtered.linechart', () => {
            this.renderChart();
          });
        });
      }, 500);
    }
  }

  private renderChart() {
    if (!this.group) return;

    const data = this.group.all().map((d) => ({ x: d.key, y: d.value }));
    if (!data.length) return;

    const container = this.el.nativeElement.querySelector('#linechart');
    const { width, height } = container.getBoundingClientRect();
    if (width === 0 || height === 0) return;
    console.log(width, height);

    const margin = { top: 20, right: 20, bottom: 40, left: 50 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // 👇 ahora solo se actualizan dimensiones del SVG
    this.svg.attr('width', width).attr('height', height);

    // Escalas
    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.x))
      .range([0, innerWidth])
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.y) || 0])
      .nice()
      .range([innerHeight, 0]);

    const line = d3
      .line<{ x: string; y: number }>()
      .x((d) => x(d.x)! + x.bandwidth() / 2)
      .y((d) => y(d.y))
      .curve(d3.curveMonotoneX);

    // Limpio ejes anteriores 👇
    this.chartGroup.selectAll('.x-axis').remove();
    this.chartGroup.selectAll('.y-axis').remove();
    // --- Línea ---
    const linePath = this.chartGroup.selectAll('.line-path').data([data]);

    linePath
      .enter()
      .append('path')
      .attr('class', 'line-path')
      .attr('fill', 'none')
      .attr('stroke', '#8f53f0')
      .attr('stroke-width', 2)
      .merge(linePath)
      .transition()
      .duration(400)
      .attr('d', line);

    linePath.exit().remove();

    // --- Puntos ---
    const circles = this.chartGroup
      .selectAll('.line-point')
      .data(data, (d: { x: any }) => d.x);

    circles
      .enter()
      .append('circle')
      .attr('class', 'line-point')
      .attr('r', 4)
      .attr('fill', '#8f53f0')
      .merge(circles)
      .transition()
      .duration(400)
      .attr('cx', (d: { x: string }) => x(d.x)! + x.bandwidth() / 2)
      .attr('cy', (d: { y: number }) => y(d.y));

    circles.exit().remove();

    // --- Ejes ---
    this.chartGroup.selectAll('.x-axis').remove();
    this.chartGroup.selectAll('.y-axis').remove();

    this.chartGroup
      .append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(d3.axisBottom(x));

    this.chartGroup.append('g').attr('class', 'y-axis').call(d3.axisLeft(y));

    // Estilos de ejes
    ['.x-axis', '.y-axis'].forEach((cls) => {
      const axis = this.chartGroup.select(cls);
      axis.selectAll('path').attr('stroke', '#000').attr('stroke-width', 1);
      axis.selectAll('line').attr('stroke', '#000').attr('stroke-width', 1);
      axis.selectAll('text').attr('fill', '#000');
    });
  }
}
