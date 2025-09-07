import { Component, ElementRef, Input, OnChanges } from '@angular/core';

import crossfilter from 'crossfilter2';
import * as dc from 'dc';
import * as d3 from 'd3';

@Component({
  selector: 'app-radar-chart',
  imports: [],
  templateUrl: './radar-chart.component.html',
  styleUrl: './radar-chart.component.css',
})
export class RadarChartComponent implements OnChanges {
  @Input() dimension!: crossfilter.Dimension<any, any>;
  @Input() group!: crossfilter.Group<any, any, any>;
  @Input() title: string = '';

  private svg: any;
  private radarPath: any;

  constructor(private el: ElementRef) {}

  ngOnChanges() {
    console.log('Hola.....');
    if (this.dimension && this.group) {
      this.renderChart(); // dibuja inicialmente

      setTimeout(() => {
        // Suscribirse a cambios de filtros en todos los charts DC
        dc.chartRegistry.list().forEach((chart: any) => {
          chart.on('filtered.radarchart', () => {
            console.log('Grupo actualizado:', this.group.all()); // log para debug
            this.renderChart(); // redibujar D3
          });
        });
      }, 1000);
    }
  }

  private renderChart() {
    // Limpiar gráfico previo
    // d3.select(this.el.nativeElement).select('svg').remove();

    const data = this.group.all().map((d) => ({
      axis: d.key,
      value: d.value,
    }));

    if (!this.radarPath) {
      const width = 400;
      const height = 400;
      const margin = 50;
      const radius = Math.min(width, height) / 2 - margin;

      const svg = d3
        .select(this.el.nativeElement)
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', `translate(${width / 2}, ${height / 2})`);

      const allAxis = data.map((d) => d.axis);
      const total = allAxis.length;
      const angleSlice = (Math.PI * 2) / total;

      const maxValue = d3.max(data, (d) => d.value) || 1;
      const rScale = d3.scaleLinear().range([0, radius]).domain([0, maxValue]);
      // Área del radar
      const radarLine = d3
        .lineRadial<any>()
        .radius((d) => rScale(d.value))
        .angle((d, i) => i * angleSlice)
        .curve(d3.curveLinearClosed);
      // Círculos concéntricos
      const levels = 5;
      for (let i = 1; i <= levels; i++) {
        svg
          .append('circle')
          .attr('r', (radius / levels) * i)
          .attr('fill', 'none')
          .attr('stroke', '#ccc')
          .attr('stroke-dasharray', '2,2');
      }
      // Ejes
      allAxis.forEach((axis, i) => {
        const x = rScale(maxValue) * Math.sin(i * angleSlice);
        const y = -rScale(maxValue) * Math.cos(i * angleSlice);

        svg
          .append('line')
          .attr('x1', 0)
          .attr('y1', 0)
          .attr('x2', x)
          .attr('y2', y)
          .attr('stroke', '#ccc');

        svg
          .append('text')
          .attr('x', x * 1.1)
          .attr('y', y * 1.1)
          .attr('text-anchor', 'middle')
          .text(axis);
      });
      // Primera vez: crear path
      this.radarPath = svg
        .append('path')
        .datum(data)
        .attr('d', radarLine)
        .attr('fill', 'rgba(143,83,240,0.3)')
        .attr('stroke', 'rgb(143,83,240)')
        .attr('stroke-width', 2);
    } else {
      const width = 400;
      const height = 400;
      const margin = 50;
      const radius = Math.min(width, height) / 2 - margin;

      const allAxis = data.map((d) => d.axis);
      const total = allAxis.length;
      const angleSlice = (Math.PI * 2) / total;

      const maxValue = d3.max(data, (d) => d.value) || 1;
      const rScale = d3.scaleLinear().range([0, radius]).domain([0, maxValue]);

      // Área del radar
      const radarLine = d3
        .lineRadial<any>()
        .radius((d) => rScale(d.value))
        .angle((d, i) => i * angleSlice)
        .curve(d3.curveLinearClosed);
      // Actualización animada
      this.radarPath
        .datum(data)
        .transition()
        .duration(800)
        .attr('d', radarLine);
    }
  }
}
