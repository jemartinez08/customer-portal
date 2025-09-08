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
  imports: [],
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
  private linePath: any;
  private points: any;
  private resizeObserver!: ResizeObserver;

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    // Observar tamaño del contenedor
    this.resizeObserver = new ResizeObserver(() => this.renderChart());
    this.resizeObserver.observe(this.el.nativeElement);
  }

  ngOnDestroy() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }

  ngOnChanges() {
    if (this.dimention && this.group) {
      this.renderChart(); // dibuja inicialmente

      setTimeout(() => {
        // Suscribirse a cambios de filtros en todos los charts DC
        dc.chartRegistry.list().forEach((chart: any) => {
          chart.on('filtered.linechart', () => {
            this.renderChart(); // redibujar D3
          });
        });
      }, 1000);
    }
  }

  private renderChart() {
    const data = this.group.all().map((d) => ({ x: d.key, y: d.value }));
    if (!data.length) return;

    const container = this.el.nativeElement as HTMLElement;
    const width = container.clientWidth || 500;
    const height = container.clientHeight || 200;
    const margin = { top: 20, right: 20, bottom: 40, left: 50 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Crear SVG si no existe
    if (!this.svg) {
      this.svg = d3
        .select(this.el.nativeElement)
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);
    }

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

    // Generador de línea suavizada
    const line = d3
      .line<{ x: string; y: number }>()
      .x((d) => x(d.x)! + x.bandwidth() / 2)
      .y((d) => y(d.y))
      .curve(d3.curveMonotoneX);

    // --- Línea ---
    const linePath = this.svg.selectAll('.line-path').data([data]);

    linePath
      .enter()
      .append('path')
      .attr('class', 'line-path')
      .attr('fill', 'none')
      .attr('stroke', '#8f53f0')
      .attr('stroke-width', 2)
      .merge(linePath)
      .transition()
      .duration(600)
      .attr('d', line);

    linePath.exit().remove();

    // --- Puntos ---
    const circles = this.svg
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
      .duration(600)
      .attr('cx', (d: { x: string }) => x(d.x)! + x.bandwidth() / 2)
      .attr('cy', (d: { y: d3.NumberValue }) => y(d.y));

    circles.exit().remove();

    // --- Ejes ---
    // --- Ejes ---
    const xAxis = this.svg.selectAll('.x-axis');
    const yAxis = this.svg.selectAll('.y-axis');

    if (xAxis.empty()) {
      // Crear ejes
      this.svg
        .append('g')
        .attr('class', 'x-axis')
        .attr('transform', `translate(0,${innerHeight})`)
        .call(d3.axisBottom(x));

      this.svg.append('g').attr('class', 'y-axis').call(d3.axisLeft(y));
    }

    // Aplicar estilo delgado y gris oscuro a líneas del eje y ticks
    ['.x-axis', '.y-axis'].forEach((cls) => {
      const axis = this.svg.select(cls);
      axis
        .selectAll('path')
        .attr('stroke', '#000000ff')
        .attr('stroke-width', 1); // línea principal del eje
      axis
        .selectAll('line')
        .attr('stroke', '#000000ff')
        .attr('stroke-width', 1); // ticks
      // labels se mantienen con fill
      axis.selectAll('text').attr('fill', '#000000ff');
    });
  }
}
