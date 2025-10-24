import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { HeaderCardComponent } from '../../components/header-card/header-card.component';
import { CustomBarchartComponent } from '../../components/custom/custom-barchart/custom-barchart.component';
import { PiechartComponent } from '../../components/custom/piechart/piechart.component';
import { CustomLinechartComponent } from '../../components/custom/custom-linechart/custom-linechart.component';
import { ApiService } from '../../api/api.service';

import crossfilter from 'crossfilter2';

export type TicketStatus = 'open' | 'in_progress' | 'resolved' | 'closed';
export type TicketPriority = 'Low' | 'Medium' | 'High' | 'Critical';

export interface TicketData {
  ticket_id: string;
  created: string; // formato "YYYY-MM-DD"
  resolved: string | null; // puede ser null si aún no se resolvió
  status: TicketStatus;
  priority: TicketPriority;
  category: string;
  assigned_group: string;
  response_time: number; // en horas
  resolution_time: number; // en horas
  critical: boolean;
}

@Component({
  selector: 'app-ticket-analysis',
  imports: [
    HeaderComponent,
    HeaderCardComponent,
    CustomBarchartComponent,
    PiechartComponent,
    CustomLinechartComponent,
  ],
  templateUrl: './ticket-analysis.component.html',
  styleUrl: './ticket-analysis.component.css',
})
export class TicketAnalysisComponent implements OnInit {
  isMainKPI: boolean = true;
  notMainKpi: boolean = false;
  mttValue: number = 0;
  numberOfOpenedTickets: number = 0;

  ticketData: TicketData[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.get('/ticket-analysis').subscribe({
      next: (response: any) => {
        if (response) {
          this.ticketData = response;
          // Inicializar crossfilter solo cuando tengamos datos válidos
          this.initializeCrossfilter(this.ticketData);
        } else {
          console.error('Invalid response format:', response);
        }
      },
      error: (err) => console.error('Error fetching data:', err),
    });
  }

  cf: any;
  // KPI GroupAll variables
  meanResolutionTimeGroup: any;
  openTicketsGroup: any;
  criticalTicketsGroup: any;
  // Dimensions and Groups for charts
  priorityDimension: any;
  ticketsByPriority: any;
  categoryDimension: any;
  ticketsByCategory: any;
  assignedGroupDimension: any;
  ticketsByAssignedGroup: any;
  statusDimension: any;
  ticketsByStatus: any;
  monthDimension: any;
  ticketsByMonth: any;

  private initializeCrossfilter(events: TicketData[]) {
    this.cf = crossfilter(this.ticketData);

    // KPI Groups
    this.meanResolutionTimeGroup = this.cf
      .groupAll()
      .reduceSum((d: any) => d.resolution_time);
    this.openTicketsGroup = this.cf
      .groupAll()
      .reduceSum((d: any) => (d.status === 'open' ? 1 : 0));
    this.criticalTicketsGroup = this.cf
      .groupAll()
      .reduceSum((d: any) => (d.critical ? 1 : 0));

    // Dimensions and groups for charts
    this.priorityDimension = this.cf.dimension((d: any) => d.priority);
    this.ticketsByPriority = this.priorityDimension.group();

    this.categoryDimension = this.cf.dimension((d: any) => d.category);
    this.ticketsByCategory = this.categoryDimension.group();

    this.assignedGroupDimension = this.cf.dimension(
      (d: any) => d.assigned_group
    );
    this.ticketsByAssignedGroup = this.assignedGroupDimension.group();

    this.statusDimension = this.cf.dimension((d: any) => d.status);
    this.ticketsByStatus = this.statusDimension.group();

    // For time series: by created date (simulate by month for simplicity)
    this.monthDimension = this.cf.dimension((d: any) =>
      d.created.substring(0, 7)
    );
    this.ticketsByMonth = this.monthDimension.group().reduceCount();
  }
}
