import {
  Component,
  Input,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ElementRef,
  ViewChild,
} from '@angular/core';

import crossfilter from 'crossfilter2';
import * as dc from 'dc';
import * as d3 from 'd3';

@Component({
  selector: 'app-heatmap',
  imports: [],
  templateUrl: './heatmap.component.html',
  styleUrl: './heatmap.component.css',
})
export class HeatmapComponent implements AfterViewInit, OnDestroy {
  // title
  @Input() title: string = '';
  @ViewChild('chartContainer', { static: true }) chartContainer!: ElementRef;

  @Input() data: any[] = [];
  @Input() xAccessor!: (d: any) => any;
  @Input() yAccessor!: (d: any) => any;

  private chart: any;
  private dimension: any;
  private group: any;
  private ndx: any;
  private resizeObserver: ResizeObserver | undefined;

  ngAfterViewInit() {
    if (!this.data.length) return;

    // crossfilter
    this.ndx = crossfilter(this.data);
    this.dimension = this.ndx.dimension((d: any) => [
      this.xAccessor(d),
      this.yAccessor(d),
    ]);
    this.group = this.dimension.group().reduceCount();

    // crear heatmap
    this.chart = (dc as any).heatMap(this.chartContainer.nativeElement);
    this.renderChart();

    // observar cambios de tamaño del contenedor
    this.resizeObserver = new ResizeObserver(() => {
      this.renderChart(); // recalcula width/height
    });
    this.resizeObserver.observe(this.chartContainer.nativeElement);
  }

  private renderChart() {
    const container = this.chartContainer.nativeElement;
    const parent = container.parentElement;

    const width = parent.clientWidth;
    const height = parent.clientHeight || 300; // fallback si no hay alto definido

    (this.chart as any)
      .width(width)
      .height(height)
      .dimension(this.dimension)
      .group(this.group)
      .keyAccessor((d: any) => (d.key as any)[0])
      .valueAccessor((d: any) => (d.key as any)[1])
      .colorAccessor((d: any) => d.value)
      .colors(
        d3
          .scaleLinear<string, string>()
          .domain([0, 1])
          .range(['#b3b3b3ff', '#6a0dad'])
          .interpolate(d3.interpolateRgb)
      )
      .calculateColorDomain()
      .render();

    // dentro de tu componente Angular
    const tooltip = d3
      .select(this.chartContainer.nativeElement)
      .append('div')
      .style('position', 'absolute')
      .style('background', '#000000ff')
      .style('padding', '5px 8px')
      .style('border', '1px solid #000000ff')
      .style('border-radius', '4px')
      .style('pointer-events', 'none')
      .style('opacity', 0);

    d3.select(this.chartContainer.nativeElement)
      .selectAll('rect')
      .on('mouseover', (event: any, d: any) => {
        const x = (d.key as any)[0]; // mes
        const y = (d.key as any)[1]; // prioridad u otra dimensión
        const count = d.value; // cantidad de items

        tooltip
          .html(`${x} / ${y}: ${count}`)
          .style('left', event.pageX + 10 + 'px')
          .style('top', event.pageY + 10 + 'px')
          .transition()
          .duration(200)
          .style('opacity', 0.9);
      })
      .on('mouseout', () => {
        tooltip.transition().duration(200).style('opacity', 0);
      });
  }

  ngOnDestroy() {
    if (this.resizeObserver) this.resizeObserver.disconnect();
    if (this.chart) (this.chart as any).resetSvg();
  }
}
