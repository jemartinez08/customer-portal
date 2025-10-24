import { Injectable, signal } from '@angular/core';
import crossfilter from 'crossfilter2';
import * as dc from 'dc';
import * as d3 from 'd3';
import { HttpClient } from '@angular/common/http';

import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ChartDataService {
  private ndx: crossfilter.Crossfilter<any> | null = null;
  dataReady = signal(false);
  fullData: any = [];

  // Exponemos las dimensions y groups
  dimensions: { [key: string]: crossfilter.Dimension<any, any> } = {};
  groups: { [key: string]: crossfilter.Group<any, any, any> } = {};

  constructor(private http: HttpClient) {}

  loadData() {
    this.http
      .get<any>('http://localhost:3000/api/servicenow/servicenow-dashboard')
      .subscribe((data) => {
        this.fullData = data;

        this.ndx = crossfilter(data.data.openedTicketsPerMonth);
        // suponiendo que viene un array en data.items

        // ejemplo: dimension por categoría
        this.dimensions['priority'] = this.ndx.dimension((d) => d.priority);
        this.groups['priority'] = this.dimensions['priority'].group();

        // dimension por fecha de registro
        this.dimensions['opened_at'] = this.ndx.dimension((d) => d.opened_at);
        this.groups['opened_at'] = this.dimensions['opened_at'].group();

        // dimension por mes
        this.dimensions['month'] = this.ndx.dimension((d) => d.month);
        this.groups['month'] = this.dimensions['month'].group();

        this.dataReady.set(true);
      });
  }

  redrawAll() {
    dc.redrawAll();
  }

  renderAll() {
    dc.renderAll();
  }

  getKpiData() {
    return this.fullData;
  }
}
