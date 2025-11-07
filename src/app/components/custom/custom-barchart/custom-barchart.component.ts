import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';

import crossfilter from 'crossfilter2';
import * as d3 from 'd3';
import * as dc from 'dc';

@Component({
  selector: 'app-custom-barchart',
  imports: [],
  templateUrl: './custom-barchart.component.html',
  styleUrl: './custom-barchart.component.css',
})
export class CustomBarchartComponent
  implements OnChanges, AfterViewInit, OnDestroy
{
  @Input() dimension!: crossfilter.Dimension<any, any>;
  @Input() group!: crossfilter.Group<any, any, any>;
  @Input() xAxisLabel: string = '';
  @Input() yAxisLabel: string = '';
  @Input() title: string = '';

  private chart: any;
  private resizeObserver!: ResizeObserver;

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.initChart();
    }, 50);
    this.observeResize();
  }

  ngOnChanges() {
    if (this.chart && this.dimension && this.group) {
      this.updateChart();

      setTimeout(() => {
        dc.chartRegistry.list().forEach((chart: any) => {
          chart.on('filtered.barchart', () => {
            this.updateChart();
          });
        });

        console.log(this.group.all());
      }, 500);
    }
  }

  ngOnDestroy() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
    if (this.chart) {
      this.chart.on('filtered', null);
    }
  }

  private initChart() {
    const container = this.el.nativeElement.querySelector('.chart-container');
    const { width, height } = container.getBoundingClientRect();

    console.log('Hola', d3.max(this.group.all(), (d) => d.value) || 0);

    const maxValue = d3.max(this.group.all(), (d) => d.value) || 0;

    this.chart = dc.barChart(container);

    this.chart
      .width(width)
      .height(height)
      .dimension(this.dimension)
      .margins({ top: 10, right: 40, bottom: 20, left: 20 }) // más espacio para ejes
      .group(this.group)
      .x(d3.scaleBand().domain(this.group.all().map((d) => d.key)))
      .xUnits(dc.units.ordinal)
      .elasticY(false) // 👈 usamos dominio manual, no elastic
      .y(d3.scaleLinear().domain([0, maxValue * 1.12])) // 👈 +10% margen arriba
      .xAxisLabel(this.xAxisLabel)
      .yAxisLabel(this.yAxisLabel)
      .brushOn(true)
      .renderLabel(true)
      .ordinalColors(['#8f53f0']);

    // Animación en transición
    this.chart.transitionDuration(800);

    // Escuchar cambios de filtros
    this.chart.on('filtered', () => {
      dc.redrawAll();
    });

    this.chart.render();
  }

  private updateChart() {
    if (!this.chart) return;

    const container = this.el.nativeElement.querySelector('.chart-container');
    const { width, height } = container.getBoundingClientRect();

    this.chart
      .width(width)
      .height(height)
      .dimension(this.dimension)
      .group(this.group)
      .x(d3.scaleBand().domain(this.group.all().map((d) => d.key)))
      .xUnits(dc.units.ordinal);

    this.chart.redraw();
  }

  private observeResize() {
    const container = this.el.nativeElement.querySelector('.chart-container');
    this.resizeObserver = new ResizeObserver(() => {
      this.updateChart();
    });
    this.resizeObserver.observe(container);
  }
}
