import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { BarchartComponent } from '../../components/custom/barchart/barchart.component';
import { PiechartComponent } from '../../components/custom/piechart/piechart.component';
import { LinechartComponent } from '../../components/custom/linechart/linechart.component';
import { StackedbarsComponent } from '../../components/custom/stackedbars/stackedbars.component';

import { ChartDataService } from '../../services/chart-data.service';

@Component({
  selector: 'app-itsm-servicenow',
  imports: [
    BarchartComponent,
    HeaderComponent,
    PiechartComponent,
    LinechartComponent,
    StackedbarsComponent,
  ],
  templateUrl: './itsm-servicenow.component.html',
  styleUrl: './itsm-servicenow.component.css',
})
export class ItsmServicenowComponent implements OnInit {
  constructor(public chartService: ChartDataService) {}

  ngOnInit() {
    this.chartService.loadData();
  }
}
