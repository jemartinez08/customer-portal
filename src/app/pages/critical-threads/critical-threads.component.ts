import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { HeaderCardComponent } from '../../components/header-card/header-card.component';
import { HeatmapComponent } from '../../components/custom/heatmap/heatmap.component';
import { CustomBarchartComponent } from '../../components/custom/custom-barchart/custom-barchart.component';
import { CustomLinechartComponent } from '../../components/custom/custom-linechart/custom-linechart.component';
import { RadarChartComponent } from '../../components/custom/radar-chart/radar-chart.component';
import { PiechartComponent } from '../../components/custom/piechart/piechart.component';

import crossfilter from 'crossfilter2';

@Component({
  selector: 'app-critical-threads',
  imports: [
    HeaderComponent,
    HeaderCardComponent,
    HeatmapComponent,
    CustomBarchartComponent,
    CustomLinechartComponent,
    RadarChartComponent,
    PiechartComponent,
  ],
  templateUrl: './critical-threads.component.html',
  styleUrl: './critical-threads.component.css',
})
export class CriticalThreadsComponent {
  isMainKPI: boolean = true;
  notMainKpi: boolean = false;
  mttValue: number = 0;
  numberOfOpenedTickets: number = 0;
  // Datos de ejemplo
  home_data = {
    events: [
      {
        id: 1,
        timestamp: '2025-09-01',
        threat_type: 'Malware',
        severity: 'Critical',
        status: 'Open',
        source: 'EDR',
        attack_vector: 'Email',
        impact: 9,
      },
      {
        id: 2,
        timestamp: '2025-09-02',
        threat_type: 'Phishing',
        severity: 'High',
        status: 'Closed',
        source: 'SIEM',
        attack_vector: 'Web',
        impact: 6,
      },
      {
        id: 3,
        timestamp: '2025-09-03',
        threat_type: 'Ransomware',
        severity: 'Critical',
        status: 'In Progress',
        source: 'EDR',
        attack_vector: 'Endpoint',
        impact: 10,
      },
      {
        id: 4,
        timestamp: '2025-09-04',
        threat_type: 'Insider Threat',
        severity: 'Medium',
        status: 'Open',
        source: 'IDS/IPS',
        attack_vector: 'Internal',
        impact: 5,
      },
      {
        id: 5,
        timestamp: '2025-09-05',
        threat_type: 'Malware',
        severity: 'High',
        status: 'Open',
        source: 'EDR',
        attack_vector: 'Email',
        impact: 7,
      },
      // ... puedes agregar más registros de ejemplo
    ],
  };

  // Inicializar Crossfilter
  cf = crossfilter(this.home_data.events);

  // =====================
  // KPIs
  // =====================
  all = this.cf.groupAll().reduceCount(); // Total Incidents
  criticalTotal = this.cf
    .groupAll()
    .reduceSum((d: any) => (d.severity === 'Critical' ? 1 : 0));
  openIncidentsGroup = this.cf
    .groupAll()
    .reduceSum((d: any) => (d.status === 'Open' ? 1 : 0));

  // =====================
  // Dimensiones y grupos
  // =====================

  // 1. Dimension por tipo de amenaza
  typeDim = this.cf.dimension((d: any) => d.threat_type);
  typeGroup = this.typeDim.group();

  // 2. Dimension por severidad
  sevDim = this.cf.dimension((d: any) => d.severity);
  sevGroup = this.sevDim.group();

  // 3. Dimension temporal por día
  dateDim = this.cf.dimension(
    (d: any) => new Date(d.timestamp).toISOString().split('T')[0]
  );
  dailyGroup = this.dateDim.group();

  // Group solo para amenazas críticas
  criticalGroup = this.dateDim
    .group()
    .reduceSum((d: any) => (d.severity === 'Critical' ? 1 : 0));

  // 4. Dimension por fuente
  srcDim = this.cf.dimension((d: any) => d.source);
  srcGroup = this.srcDim.group();

  // 5. Dimension por vector de ataque
  vectorDim = this.cf.dimension((d: any) => d.attack_vector);
  vectorGroup = this.vectorDim.group().reduceCount();
}
