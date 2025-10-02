import {
  Component,
  Input,
  ElementRef,
  OnChanges,
  OnInit,
  OnDestroy,
} from '@angular/core';
import crossfilter from 'crossfilter2';
import * as dc from 'dc';
import * as d3 from 'd3';

@Component({
  selector: 'app-linechart',
  imports: [],
  templateUrl: './linechart.component.html',
  styleUrl: './linechart.component.css',
})
export class LinechartComponent implements OnChanges, OnInit, OnDestroy {
  @Input() dimension!: crossfilter.Dimension<any, any>;
  @Input() group!: crossfilter.Group<any, any, any>;
  @Input() title: string = '';
  @Input() xAxis: string = '';
  @Input() yAxis: string = '';

  private chart: any;
  private resizeObserver!: ResizeObserver;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    const container = this.el.nativeElement.querySelector(
      '.linechart-container'
    ) as HTMLElement;

    this.resizeObserver = new ResizeObserver(() => {
      this.renderChart();
    });

    this.resizeObserver.observe(container); // observa el contenedor flexible
  }

  ngOnChanges() {
    if (this.dimension && this.group) {
      this.renderChart();
    }
  }

  ngOnDestroy() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
    if (this.chart) {
      this.chart.filterAll();
      this.chart.dispose();
    }
  }

  private renderChart() {
    const container = this.el.nativeElement.querySelector(
      '#line-chart'
    ) as HTMLElement;
    if (!container) {
      return;
    }
    const width = container.clientWidth;
    const height = container.clientHeight;

    console.log(width, height);

    // Limpiar el SVG previo
    d3.select(container).select('svg').remove();

    // Crear chart DC con nuevo ancho/alto
    const chart = dc
      .lineChart(container)
      .width(width)
      .height(height)
      .dimension(this.dimension)
      .group(this.group)
      .ordinalColors(['#8f53f0'])
      .elasticY(true)
      .x(d3.scaleBand().domain(this.group.all().map((d) => d.key)))
      .xAxisLabel(this.xAxis)
      .yAxisLabel(this.yAxis)
      .transitionDuration(500);

    chart.render();
    this.chart = chart;
  }
}
