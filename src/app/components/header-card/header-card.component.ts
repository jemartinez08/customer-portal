import {
  Component,
  Input,
  OnChanges,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';

interface Event {
  id: string;
  timestamp: string;
  threat_type: string;
  severity: string;
  affected_host: string; // mismo nombre que JSON
  source: string;
  status: string;
  ioc_type: string;
  ioc_value: string;
  threat_family: string;
  attack_vector: string;
}

import crossfilter from 'crossfilter2';
import * as dc from 'dc';
import * as d3 from 'd3';

@Component({
  selector: 'app-header-card',
  imports: [CommonModule],
  templateUrl: './header-card.component.html',
  styleUrl: './header-card.component.css',
})
export class HeaderCardComponent implements OnChanges {
  @Input() KPICard: boolean = false;
  @Input() KpiValue: number = 0;
  @Input() KpiTitle: string = 'KPI';
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
