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
  selector: 'app-sla-single-card',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './sla-single-card.component.html',
  styleUrls: ['./sla-single-card.component.css'],
})
export class SlaSingleCardComponent implements OnChanges {
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

  ngOnChanges() {
    if (this.groupOne) {
      this.renderChart();
    }
  }

  private renderChart() {
    const kpiNumberOne = dc.numberDisplay(this.kpiContainerOne.nativeElement);

    kpiNumberOne
      .formatNumber(d3.format('d'))
      .valueAccessor((d: any) => d)
      .group(this.groupOne);

    kpiNumberOne.render();
  }
}
