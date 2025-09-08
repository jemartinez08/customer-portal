import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { ItsmServicenowComponent } from '../../../pages/itsm-servicenow/itsm-servicenow.component';

import crossfilter from 'crossfilter2';
import * as dc from 'dc';
import * as d3 from 'd3';

@Component({
  selector: 'app-data-table',
  imports: [],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.css',
})
export class DataTableComponent implements OnChanges, AfterViewInit, OnDestroy {
  @Input() title: string = '';

  @Input() data: any[] = [];

  private ndx: any;
  private table: any;
  private dimension: any;

  constructor(
    private el: ElementRef,
    private service: ItsmServicenowComponent
  ) {}

  ngAfterViewInit() {
    if (this.data && this.data.length) {
      this.buildTable();
    }
  }

  ngOnChanges() {
    if (this.data && this.data.length) {
      this.buildTable();
    }
  }

  private buildTable() {
    // Reutiliza el mismo crossfilter
    this.ndx = this.service.getCf();

    this.dimension = this.ndx.dimension((d: any) => d.number);

    this.table = dc.dataTable('#datatable');

    this.table
      .dimension(this.dimension)
      .columns([
        { label: 'Number', format: (d: any) => d.number },
        { label: 'Opened at', format: (d: any) => d.opened_at },
        { label: 'Month', format: (d: any) => d.month },
        { label: 'Priority', format: (d: any) => d.priority },
        { label: 'State', format: (d: any) => d.state },
        { label: 'Severity', format: (d: any) => d.severity },
        { label: 'Urgency', format: (d: any) => d.urgency },
        { label: 'Category', format: (d: any) => d.category },
        { label: 'Assignation Group', format: (d: any) => d.assignment_group },
      ])
      .sortBy((d: { opened_at: any }) => d.opened_at)
      .order(d3.ascending)
      .render(Infinity);

    dc.renderAll();
  }

  ngOnDestroy() {
    if (this.table) {
      dc.deregisterChart(this.table);
    }
  }
}
