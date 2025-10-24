import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { HeaderCardComponent } from '../../components/header-card/header-card.component';
import { CustomBarchartComponent } from '../../components/custom/custom-barchart/custom-barchart.component';
import { CustomLinechartComponent } from '../../components/custom/custom-linechart/custom-linechart.component';
import { PiechartComponent } from '../../components/custom/piechart/piechart.component';
import { RadarChartComponent } from '../../components/custom/radar-chart/radar-chart.component';
import { AiSummaryAdvertisementComponent } from '../../components/ui/ai-summary-advertisement/ai-summary-advertisement.component';
import { ApiService } from '../../api/api.service';

import crossfilter from 'crossfilter2';

export interface EdrData {
  events: EdrEvent[];
}

export interface EdrEvent {
  id: number;
  timestamp: string; // formato ISO (e.g. "2025-09-01T10:00:00Z")
  endpoint: string;
  severity: string;
  threat_type: string;
  status: string;
  source: string;
  attack_vector: string;
}

@Component({
  selector: 'app-edr-crowdstrike-sentinelone',
  imports: [
    HeaderComponent,
    HeaderCardComponent,
    CustomBarchartComponent,
    CustomLinechartComponent,
    PiechartComponent,
    RadarChartComponent,
    AiSummaryAdvertisementComponent,
  ],
  templateUrl: './edr-crowdstrike-sentinelone.component.html',
  styleUrl: './edr-crowdstrike-sentinelone.component.css',
})
export class EdrCrowdstrikeSentineloneComponent implements OnInit {
  isMainKPI: boolean = true;
  notMainKpi: boolean = false;
  mttValue: number = 0;
  numberOfOpenedTickets: number = 0;

  constructor(private apiService: ApiService) {}

  edr_data: EdrEvent[] = [];

  ngOnInit() {
    this.apiService.get('/edr-crowdstrike-sentinelone').subscribe({
      next: (response: any) => {
        if (response  && response.events) {
          this.edr_data = response.events;
          // Inicializar crossfilter solo cuando tengamos datos válidos
          this.initializeCrossfilter(this.edr_data);
        } else {
          console.error('Invalid response format:', response);
        }
      },
      error: (err) => console.error('Error fetching data:', err),
    });
  }

  cf: any;
  totalDetections: any;
  compromisedHosts: any;
  criticalDetections: any;
  sevDim: any;
  sevGroup: any;
  srcDim: any;
  srcGroup: any;
  typeDim: any;
  typeGroup: any;
  dateDim: any;
  dailyGroup: any;
  criticalGroup: any;
  vectorDim: any;
  vectorGroup: any;

  private initializeCrossfilter(events: EdrEvent[]) {
    this.cf = crossfilter(this.edr_data);

    // KPIs
    this.totalDetections = this.cf.groupAll().reduceCount();
    this.compromisedHosts = this.cf
      .groupAll()
      .reduceSum((d: any) => (d.status === 'Compromised' ? 1 : 0));
    this.criticalDetections = this.cf
      .groupAll()
      .reduceSum((d: any) => (d.severity === 'Critical' ? 1 : 0));

    // === Dimensiones y grupos ===

    // 1. Severidad
    this.sevDim = this.cf.dimension((d: any) => d.severity);
    this.sevGroup = this.sevDim.group();

    // 2. Fuente (Crowdstrike / SentinelOne)
    this.srcDim = this.cf.dimension((d: any) => d.source);
    this.srcGroup = this.srcDim.group();

    // 3. Tipo de amenaza
    this.typeDim = this.cf.dimension((d: any) => d.threat_type);
    this.typeGroup = this.typeDim.group();

    // 4. Temporal (día)
    this.dateDim = this.cf.dimension(
      (d: any) => new Date(d.timestamp).toISOString().split('T')[0]
    );
    this.dailyGroup = this.dateDim.group();

    this.criticalGroup = this.dateDim
      .group()
      .reduceSum((d: any) => (d.severity === 'Critical' ? 1 : 0));

    // 5. Vectores de ataque
    this.vectorDim = this.cf.dimension((d: any) => d.attack_vector);
    this.vectorGroup = this.vectorDim.group();
  }
}
