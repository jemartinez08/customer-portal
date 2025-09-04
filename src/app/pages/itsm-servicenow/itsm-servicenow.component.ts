import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { HeaderCardComponent } from '../../components/header-card/header-card.component';
import { BarchartComponent } from '../../components/custom/barchart/barchart.component';
import { PiechartComponent } from '../../components/custom/piechart/piechart.component';
import { LinechartComponent } from '../../components/custom/linechart/linechart.component';
import { StackedbarsComponent } from '../../components/custom/stackedbars/stackedbars.component';

import { ChartDataService } from '../../services/chart-data.service';

@Component({
  selector: 'app-itsm-servicenow',
  imports: [
    BarchartComponent,
    HeaderCardComponent,
    HeaderComponent,
    PiechartComponent,
    LinechartComponent,
    StackedbarsComponent,
  ],
  templateUrl: './itsm-servicenow.component.html',
  styleUrl: './itsm-servicenow.component.css',
})
export class ItsmServicenowComponent implements OnInit {
  isMainKPI: boolean = true;
  notMainKpi: boolean = false;
  mttValue: number = 0;
  numberOfOpenedTickets: number = 0;
  filteredData: any;

  constructor(public chartService: ChartDataService) {}

  ngOnInit() {
    const data = this.chartService.loadData();
    // Cargar datos para 
    setTimeout(() => {
      this.filteredData = this.chartService.getKpiData();
      this.mttValue = this.filteredData.data.MTTR;
      this.numberOfOpenedTickets = this.filteredData.data.openedTickets.length;
    }, 1000);
  }
}
