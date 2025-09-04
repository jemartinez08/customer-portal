import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { BarchartComponent } from '../../components/custom/barchart/barchart.component';
import { PiechartComponent } from '../../components/custom/piechart/piechart.component';
import { LinechartComponent } from '../../components/custom/linechart/linechart.component';
import { StackedbarsComponent } from '../../components/custom/stackedbars/stackedbars.component';

import { ChartDataService } from '../../services/chart-data.service';

@Component({
  selector: 'app-mainportal',
  imports: [
    BarchartComponent,
    HeaderComponent,
    PiechartComponent,
    LinechartComponent,
    StackedbarsComponent,
  ],
  templateUrl: './mainportal.component.html',
  styleUrl: './mainportal.component.css',
})
export class MainportalComponent implements OnInit {
  constructor(public chartService: ChartDataService) {}

  ngOnInit() {
    this.chartService.loadData();
  }
}
