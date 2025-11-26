import {
  Component,
  Input,
  OnChanges,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

import crossfilter from 'crossfilter2';
import * as dc from 'dc';
import * as d3 from 'd3';

@Component({
  selector: 'app-sla-card',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './sla-card.component.html',
  styleUrls: ['./sla-card.component.css'],
})
export class SlaCardComponent implements OnChanges {
  @Input() KpiValue: number = 0;
  @Input() KpiTitle: string = 'KPI';
  @Input() KpiSubtitle: string = 'KPI subtitle';
  @Input() dimensionOne!: crossfilter.Dimension<any, any>;
  @Input() dimensionTwo!: crossfilter.Dimension<any, any>;
  @Input() dimensionThree!: crossfilter.Dimension<any, any>;
  @Input() groupOne!: crossfilter.GroupAll<unknown, unknown>;
  @Input() groupTwo!: crossfilter.GroupAll<unknown, unknown>;
  @Input() groupThree!: crossfilter.GroupAll<unknown, unknown>;

  @ViewChild('kpiContainerOne', { static: true }) kpiContainerOne!: ElementRef;
  @ViewChild('kpiContainerTwo', { static: true }) kpiContainerTwo!: ElementRef;
  @ViewChild('kpiContainerThree', { static: true })
  kpiContainerThree!: ElementRef;

  ngOnChanges() {
    if (this.groupOne) {
      this.renderChart();
      //dc.renderAll(); // forzar renderizado inicial de todos los charts/numberDisplays
    }
  }

  private renderChart() {
    const kpiNumberOne = dc.numberDisplay(this.kpiContainerOne.nativeElement);
    const kpiNumberTwo = dc.numberDisplay(this.kpiContainerTwo.nativeElement);
    const kpiNumberThree = dc.numberDisplay(
      this.kpiContainerThree.nativeElement
    );

    kpiNumberOne
      .formatNumber(d3.format('d'))
      .valueAccessor((d: any) => d) // el groupAll devuelve el total de registros
      .group(this.groupOne);

    kpiNumberTwo
      .formatNumber(d3.format('d'))
      .valueAccessor((d: any) => d) // el groupAll devuelve el total de registros
      .group(this.groupTwo);

    kpiNumberThree
      .formatNumber(d3.format('d'))
      .valueAccessor((d: any) => d) // el groupAll devuelve el total de registros
      .group(this.groupThree);

    kpiNumberOne.render();
    kpiNumberTwo.render();
    kpiNumberThree.render();
  }
}
