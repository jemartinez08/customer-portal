import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { HeaderCardComponent } from '../../components/header-card/header-card.component';
import { PiechartComponent } from '../../components/custom/piechart/piechart.component';
import { RadarChartComponent } from '../../components/custom/radar-chart/radar-chart.component';

import crossfilter from 'crossfilter2';
import * as dc from 'dc';
import * as d3 from 'd3';
import { CustomBarchartComponent } from '../../components/custom/custom-barchart/custom-barchart.component';
import { CustomLinechartComponent } from '../../components/custom/custom-linechart/custom-linechart.component';
import { AiSummaryAdvertisementComponent } from '../../components/ui/ai-summary-advertisement/ai-summary-advertisement.component';

import { ApiService } from '../../api/api.service';

// Interfaces de tipos para datos desde la API
export interface HomeData {
  events: EventItem[];
}

export interface EventItem {
  id: string;
  timestamp: string; // o Date si luego lo parseas
  threat_type: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical'; // niveles posibles
  affected_host: string;
  source: string;
  status: 'Contained' | 'Uncontained' | string; // puedes ampliar si hay más estados
  ioc_type: 'URL' | 'Hash' | 'IP' | string; // indicadores de compromiso
  ioc_value: string;
  threat_family: string;
  attack_vector: string;
}

@Component({
  selector: 'app-home-page',
  imports: [
    HeaderComponent,
    HeaderCardComponent,
    PiechartComponent,
    RadarChartComponent,
    CustomBarchartComponent,
    CustomLinechartComponent,
    AiSummaryAdvertisementComponent,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent implements OnInit {
  isMainKPI: boolean = true;
  notMainKpi: boolean = false;
  mttValue: number = 0;
  numberOfOpenedTickets: number = 0;

  constructor(private apiService: ApiService) {}

  home_data: HomeData = { events: [] };

  ngOnInit(): void {
    this.apiService.get('/home-page').subscribe({
      next: (response: any) => {
        if (response && response.events) {
          this.home_data = response;
          // Inicializar crossfilter solo cuando tengamos datos válidos
          this.initializeCrossfilter(this.home_data.events);
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

  private initializeCrossfilter(events: EventItem[]) {
    if (!events || events.length === 0) {
      console.warn('No events data available for crossfilter initialization');
      return;
    }

    // Inicializar crossfilter con los datos
    this.cf = crossfilter(events);

    try {
      // Dimentions for KPIs
      // 1. Total de incidentes
      this.all = this.cf.groupAll().reduceCount();

      // 2. Total de amenazas criticas
      this.criticalTotal = this.cf
        .groupAll()
        .reduceSum((d: EventItem) => (d.severity === 'Critical' ? 1 : 0));

      // 3. Crear GroupAll para incidentes abiertos
      this.openIncidentsGroup = this.cf
        .groupAll()
        .reduceSum((d: EventItem) => (d.status === 'Open' ? 1 : 0));

      // Graficos
      // 1. Dimension por tipo de amenaza
      this.typeDim = this.cf.dimension(
        (d: EventItem) => d.threat_type || 'Unknown'
      );
      this.typeGroup = this.typeDim.group();

      // 2. Dimension por severidad
      this.sevDim = this.cf.dimension(
        (d: EventItem) => d.severity || 'Unknown'
      );
      this.sevGroup = this.sevDim.group();

      // 3. Dimension temporal (día)
      this.dateDim = this.cf.dimension((d: EventItem) => {
        try {
          return new Date(d.timestamp).toISOString().split('T')[0];
        } catch (e) {
          return 'Invalid Date';
        }
      });
      this.dailyGroup = this.dateDim.group();

      // 4. Group → contar solo amenazas críticas
      this.criticalGroup = this.dateDim
        .group()
        .reduceSum((d: EventItem) => (d.severity === 'Critical' ? 1 : 0));

      // 5. Dimension por fuente
      this.srcDim = this.cf.dimension((d: EventItem) => d.source || 'Unknown');
      this.srcGroup = this.srcDim.group();

      // 6. Incidentes por vector dimension y grupo
      this.vectorDim = this.cf.dimension(
        (d: EventItem) => d.attack_vector || 'Unknown'
      );
      this.vectorGroup = this.vectorDim.group();

      // Forzar actualización de los gráficos
      dc.redrawAll();

      console.log('Crossfilter initialized successfully');
    } catch (error) {
      console.error('Error initializing crossfilter:', error);
    }
  }

  // Ejemplo en ticket-analysis.component.ts
  clearAllFilters() {
    console.log('Clearing all filters');
    this.typeDim.filterAll();
    this.sevDim.filterAll();
    this.dateDim.filterAll();
    this.srcDim.filterAll();
    this.vectorDim.filterAll();
    // Si agregas más dimensiones, inclúyelas aquí

    dc.redrawAll(); // Redibuja todos los gráficos si es necesario
  }
}
