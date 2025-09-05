import { Component, Input, OnInit } from '@angular/core';
import { ChartDataService } from '../../services/chart-data.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  @Input() title: string = 'Tickets per month';
  isMainKPI: boolean = true;
  notMainKpi: boolean = false;
  mttValue: number = 0;
  numberOfOpenedTickets: number = 0;
  filteredData: any;

  constructor(private dataService: ChartDataService) {}

  async ngOnInit() {
    setTimeout(() => {
      this.filteredData = this.dataService.getKpiData();
      this.mttValue = this.filteredData.data.MTTR;
      this.numberOfOpenedTickets = this.filteredData.data.openedTickets.length;
      console.log(this.filteredData.data.openedTickets.length);
    }, 1000);
  }
}
