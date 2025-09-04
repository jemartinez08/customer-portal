import { Component, ElementRef, Input, OnChanges } from '@angular/core';

import crossfilter from 'crossfilter2';
import * as dc from 'dc';
import * as d3 from 'd3';

@Component({
  selector: 'app-barchart',
  imports: [],
  templateUrl: './barchart.component.html',
  styleUrl: './barchart.component.css',
})
export class BarchartComponent implements OnChanges {
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
    const chart = dc.barChart('#tickets-barchart');

    chart
      .width(680)
      .height(180)
      .ordinalColors(['#8f53f0'])
      .dimension(this.dimension)
      .group(this.group)
      .x(d3.scaleBand().domain(this.group.all().map((d) => d.key)))
      .xUnits(dc.units.ordinal)
      .elasticY(true)
      .xAxisLabel('Month')
      .yAxisLabel('Tickets')
      .brushOn(true);

    chart.yAxis().tickFormat(d3.format('d'));

    chart.render();
  }
}
