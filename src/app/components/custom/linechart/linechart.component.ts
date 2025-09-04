import { Component, Input, ElementRef } from '@angular/core';
import crossfilter from 'crossfilter2';
import * as dc from 'dc';
import * as d3 from 'd3';

@Component({
  selector: 'app-linechart',
  imports: [],
  templateUrl: './linechart.component.html',
  styleUrl: './linechart.component.css',
})
export class LinechartComponent {
  @Input() dimension!: crossfilter.Dimension<any, any>;
  @Input() group!: crossfilter.Group<any, any, any>;
  @Input() title: string = '';

  constructor(private el: ElementRef) {}

  ngOnChanges() {
    if (this.dimension && this.group) {
      this.renderChart();
    }
  }

  private renderChart() {
    const chart = dc.lineChart('#line-chart');

    chart
      .width(400)
      .height(180)
      .dimension(this.dimension)
      .ordinalColors(['#8f53f0'])
      .group(this.group)
      .x(d3.scaleBand().domain(this.group.all().map((d) => d.key)))
      //.renderArea(true) // relleno debajo de la línea (opcional)
      .elasticY(true)
      .xAxisLabel('Fecha')
      .yAxisLabel('Cantidad');

    chart.render();
  }
}
