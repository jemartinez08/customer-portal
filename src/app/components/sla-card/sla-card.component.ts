import {
  Component,
  Input,
  OnChanges,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import crossfilter from 'crossfilter2';
import * as dc from 'dc';
import * as d3 from 'd3';

@Component({
  selector: 'app-sla-card',
  imports: [CommonModule],
  templateUrl: './sla-card.component.html',
  styleUrl: './sla-card.component.css',
})
export class SlaCardComponent implements OnChanges {
  @Input() KpiValue: number = 0;
  @Input() KpiTitle: string = 'KPI';
  @Input() KpiSubtitle: string = 'KPI subtitle';
  @Input() dimension!: crossfilter.Dimension<any, any>;
  @Input() group!: crossfilter.GroupAll<unknown, unknown>;

  @ViewChild('kpiContainer', { static: true }) kpiContainer!: ElementRef;

  ngOnChanges() {
    if (this.group) {
      this.renderChart();
      //dc.renderAll(); // forzar renderizado inicial de todos los charts/numberDisplays
    }
  }

  private renderChart() {
    const kpiNumber = dc.numberDisplay(this.kpiContainer.nativeElement);

    kpiNumber
      .formatNumber(d3.format('d'))
      .valueAccessor((d: any) => d) // el groupAll devuelve el total de registros
      .group(this.group);

    kpiNumber.render();
  }
}
