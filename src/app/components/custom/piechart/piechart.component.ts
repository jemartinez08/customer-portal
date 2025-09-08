import { Component, Input, ElementRef, OnChanges } from '@angular/core';
import crossfilter from 'crossfilter2';
import * as dc from 'dc';
import * as d3 from 'd3';

@Component({
  selector: 'app-piechart',
  imports: [],
  templateUrl: './piechart.component.html',
  styleUrl: './piechart.component.css',
})
export class PiechartComponent {
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
    const chart = dc.pieChart('#priority-piechart');

    chart
      .ordinalColors(["#8f53f0"])
      .dimension(this.dimension)
      .group(this.group)
      .innerRadius(30)

    chart.render();
  }
}
