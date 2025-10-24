import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { HeaderCardComponent } from '../../components/header-card/header-card.component';
import { PiechartComponent } from '../../components/custom/piechart/piechart.component';
import { CustomLinechartComponent } from '../../components/custom/custom-linechart/custom-linechart.component';
import { CustomBarchartComponent } from '../../components/custom/custom-barchart/custom-barchart.component';
import { AiSummaryAdvertisementComponent } from '../../components/ui/ai-summary-advertisement/ai-summary-advertisement.component';
import { DataDropdownComponent } from '../../components/custom/data-dropdown/data-dropdown.component';
import { ChartDataService } from '../../services/chart-data.service';
import { ApiService } from '../../api/api.service';

import crossfilter from 'crossfilter2';
import * as dc from 'dc';
import * as d3 from 'd3';

export interface Ticket {
  number: string;
  opened_at: string; // formato "YYYY-MM-DD HH:mm:ss"
  month: string; // formato "YYYY-MM"
  priority: string;
  state: string;
  severity: string;
  urgency: string;
  category: string;
  assignment_group: string | null;
}

@Component({
  selector: 'app-itsm-servicenow',
  imports: [
    CustomBarchartComponent,
    HeaderCardComponent,
    HeaderComponent,
    PiechartComponent,
    CustomLinechartComponent,
    DataDropdownComponent,
    AiSummaryAdvertisementComponent,
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

  constructor(
    public chartService: ChartDataService,
    private apiService: ApiService
  ) {}

  tickets: Ticket[] = [];

  ngOnInit() {
    this.apiService.get('/itsm-servicenow').subscribe({
      next: (response: any) => {
        if (response) {
          this.tickets = response.tickets;
          // Inicializar crossfilter solo cuando tengamos datos válidos
          this.initializeCrossfilter(this.tickets);
        } else {
          console.error('Invalid response format:', response);
        }
      },
      error: (err) => console.error('Error fetching data:', err),
    });
  }

  // Declaración de variables para crossfilter
  cf: any;
  totalIncidents: any;
  criticalIncidents: any;
  openIncidents: any;
  highPriorityIncidents: any;
  networkIncidents: any;
  priorityDimension: any;
  incidentsByPriority: any;
  stateDimension: any;
  incidentsByState: any;
  severityDimension: any;
  incidentsBySeverity: any;
  urgencyDimension: any;
  incidentsByUrgency: any;
  categoryDimension: any;
  incidentsByCategory: any;
  assignmentGroupDimension: any;
  monthDimension: any;
  incidentsByAssignmentGroup: any;
  incidentsByMonth: any;

  private initializeCrossfilter(events: Ticket[]) {
    // Cargar datos en crossfilter
    this.cf = crossfilter(this.tickets);

    // Groups for KPIs
    // 1. KPI: Total de incidentes
    this.totalIncidents = this.cf.groupAll().reduceCount();

    // 2. KPI: Total de incidentes críticos (severity = 1, 2, 3 según tu definición)
    this.criticalIncidents = this.cf
      .groupAll()
      .reduceSum((d: any) => (d.severity === '1' ? 1 : 0));

    // 3. KPI: Total de incidentes abiertos (state = 1)
    this.openIncidents = this.cf
      .groupAll()
      .reduceSum((d: any) => (d.state === '1' ? 1 : 0));

    // 4. KPI: Total de incidentes por prioridad alta (priority = 1 o 2)
    this.highPriorityIncidents = this.cf
      .groupAll()
      .reduceSum((d: any) =>
        d.priority === '1' || d.priority === '2' ? 1 : 0
      );

    // 5. KPI: Total por categoría “network”
    this.networkIncidents = this.cf
      .groupAll()
      .reduceSum((d: any) => (d.category === 'network' ? 1 : 0));

    // Dimentions and groups ------------------------------
    // Dimensión por prioridad
    this.priorityDimension = this.cf.dimension((d: any) => d.priority);
    // Gráfico de barras: Incidentes por prioridad
    this.incidentsByPriority = this.priorityDimension.group();

    // Dimensión por estado
    this.stateDimension = this.cf.dimension((d: any) => d.state);
    // Gráfico de barras: Incidentes por estado
    this.incidentsByState = this.stateDimension.group();

    // Dimensión por severidad
    this.severityDimension = this.cf.dimension((d: any) => d.severity);
    // Gráfico de pastel: Incidentes por severidad
    this.incidentsBySeverity = this.severityDimension.group();

    // Dimensión por urgencia
    this.urgencyDimension = this.cf.dimension((d: any) => d.urgency);
    // Gráfico de barras: Incidentes por urgencia
    this.incidentsByUrgency = this.urgencyDimension.group();

    // Dimensión por categoría
    this.categoryDimension = this.cf.dimension((d: any) => d.category);
    // Gráfico de barras: Incidentes por categoría
    this.incidentsByCategory = this.categoryDimension.group();

    // Dimensión por grupo de asignación
    this.assignmentGroupDimension = this.cf.dimension(
      (d: any) => d.assignment_group
    );
    // Gráfico de barras: Incidentes por grupo de asignación
    this.incidentsByAssignmentGroup = this.assignmentGroupDimension.group();

    // Dimensión por mes de apertura (para series temporales)
    this.monthDimension = this.cf.dimension((d: any) => d.month);
    // Gráfico de línea o serie temporal: Incidentes por mes
    this.incidentsByMonth = this.monthDimension.group().reduceCount();
  }

  getCf() {
    return this.cf;
  }
}
