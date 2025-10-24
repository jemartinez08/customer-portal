import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { HeaderCardComponent } from '../../components/header-card/header-card.component';
import { HeatmapComponent } from '../../components/custom/heatmap/heatmap.component';
import { CustomBarchartComponent } from '../../components/custom/custom-barchart/custom-barchart.component';
import { CustomLinechartComponent } from '../../components/custom/custom-linechart/custom-linechart.component';
import { RadarChartComponent } from '../../components/custom/radar-chart/radar-chart.component';
import { PiechartComponent } from '../../components/custom/piechart/piechart.component';
import { AiSummaryAdvertisementComponent } from '../../components/ui/ai-summary-advertisement/ai-summary-advertisement.component';
import { ApiService } from '../../api/api.service';

import crossfilter from 'crossfilter2';

export interface CriticalThreadsData {
  events: CriticalEvent[];
}

export interface CriticalEvent {
  id: number;
  timestamp: string; // formato ISO o YYYY-MM-DD
  threat_type: string;
  severity: string;
  status: string;
  source: string;
  attack_vector: string;
  impact: number;
}

@Component({
  selector: 'app-critical-threads',
  imports: [
    HeaderComponent,
    HeaderCardComponent,
    CustomBarchartComponent,
    CustomLinechartComponent,
    RadarChartComponent,
    PiechartComponent,
    AiSummaryAdvertisementComponent,
  ],
  templateUrl: './critical-threads.component.html',
  styleUrl: './critical-threads.component.css',
})
export class CriticalThreadsComponent implements OnInit {
  isMainKPI: boolean = true;
  notMainKpi: boolean = false;
  mttValue: number = 0;
  numberOfOpenedTickets: number = 0;

  constructor(private apiService: ApiService) {}

  critical_threads_data: CriticalThreadsData = { events: [] };

  ngOnInit(): void {
    this.apiService.get('/critical-threats').subscribe({
      next: (response: any) => {
        if (response) {
          this.critical_threads_data = response;
          // Inicializar crossfilter solo cuando tengamos datos válidos
          this.initializeCrossfilter(this.critical_threads_data.events);
        } else {
          console.error('Invalid response format:', response);
        }
      },
      error: (err) => console.error('Error fetching data:', err),
    });
  }

  // Declaración de variables para crossfilter
  cf: any;
  all: any;
  criticalTotal: any;
  openIncidentsGroup: any;
  typeDim: any;
  typeGroup: any;
  sevDim: any;
  sevGroup: any;
  dateDim: any;
  dailyGroup: any;
  criticalGroup: any;
  srcDim: any;
  srcGroup: any;
  vectorDim: any;
  vectorGroup: any;

  private initializeCrossfilter(events: CriticalEvent[]) {
    // Inicializar Crossfilter
    this.cf = crossfilter(this.critical_threads_data.events);

    // =====================
    // KPIs
    // =====================
    this.all = this.cf.groupAll().reduceCount(); // Total Incidents
    this.criticalTotal = this.cf
      .groupAll()
      .reduceSum((d: any) => (d.severity === 'Critical' ? 1 : 0));
    this.openIncidentsGroup = this.cf
      .groupAll()
      .reduceSum((d: any) => (d.status === 'Open' ? 1 : 0));

    // =====================
    // Dimensiones y grupos
    // =====================

    // 1. Dimension por tipo de amenaza
    this.typeDim = this.cf.dimension((d: any) => d.threat_type);
    this.typeGroup = this.typeDim.group();

    // 2. Dimension por severidad
    this.sevDim = this.cf.dimension((d: any) => d.severity);
    this.sevGroup = this.sevDim.group();

    // 3. Dimension temporal por día
    this.dateDim = this.cf.dimension(
      (d: any) => new Date(d.timestamp).toISOString().split('T')[0]
    );
    this.dailyGroup = this.dateDim.group();

    // Group solo para amenazas críticas
    this.criticalGroup = this.dateDim
      .group()
      .reduceSum((d: any) => (d.severity === 'Critical' ? 1 : 0));

    // 4. Dimension por fuente
    this.srcDim = this.cf.dimension((d: any) => d.source);
    this.srcGroup = this.srcDim.group();

    // 5. Dimension por vector de ataque
    this.vectorDim = this.cf.dimension((d: any) => d.attack_vector);
    this.vectorGroup = this.vectorDim.group().reduceCount();
  }
}
