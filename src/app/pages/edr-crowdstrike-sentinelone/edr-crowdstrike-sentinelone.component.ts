import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { HeaderCardComponent } from '../../components/header-card/header-card.component';
import { CustomBarchartComponent } from '../../components/custom/custom-barchart/custom-barchart.component';
import { CustomLinechartComponent } from '../../components/custom/custom-linechart/custom-linechart.component';
import { PiechartComponent } from '../../components/custom/piechart/piechart.component';
import { RadarChartComponent } from '../../components/custom/radar-chart/radar-chart.component';

import crossfilter from 'crossfilter2';

@Component({
  selector: 'app-edr-crowdstrike-sentinelone',
  imports: [
    HeaderComponent,
    HeaderCardComponent,
    CustomBarchartComponent,
    CustomLinechartComponent,
    PiechartComponent,
    RadarChartComponent,
  ],
  templateUrl: './edr-crowdstrike-sentinelone.component.html',
  styleUrl: './edr-crowdstrike-sentinelone.component.css',
})
export class EdrCrowdstrikeSentineloneComponent {
  isMainKPI: boolean = true;
  notMainKpi: boolean = false;
  mttValue: number = 0;
  numberOfOpenedTickets: number = 0;

  // === Datos de ejemplo ===
  edr_data = {
    events: [
      {
        id: 1,
        timestamp: '2025-09-01T10:00:00Z',
        endpoint: 'Host-01',
        severity: 'Critical',
        threat_type: 'Ransomware',
        status: 'Compromised',
        source: 'Crowdstrike',
        attack_vector: 'Email',
      },
      {
        id: 2,
        timestamp: '2025-09-01T12:00:00Z',
        endpoint: 'Host-02',
        severity: 'High',
        threat_type: 'Malware',
        status: 'Isolated',
        source: 'SentinelOne',
        attack_vector: 'Web',
      },
      {
        id: 3,
        timestamp: '2025-09-02T09:00:00Z',
        endpoint: 'Host-03',
        severity: 'Medium',
        threat_type: 'Exploit',
        status: 'Clean',
        source: 'Crowdstrike',
        attack_vector: 'Network',
      },
      {
        id: 4,
        timestamp: '2025-09-02T11:30:00Z',
        endpoint: 'Host-04',
        severity: 'Critical',
        threat_type: 'Ransomware',
        status: 'Compromised',
        source: 'SentinelOne',
        attack_vector: 'Removable Media',
      },
      {
        id: 5,
        timestamp: '2025-09-03T14:00:00Z',
        endpoint: 'Host-05',
        severity: 'High',
        threat_type: 'Malware',
        status: 'Clean',
        source: 'Crowdstrike',
        attack_vector: 'Web',
      },
      {
        id: 6,
        timestamp: '2025-09-03T16:00:00Z',
        endpoint: 'Host-06',
        severity: 'Low',
        threat_type: 'PUA',
        status: 'Clean',
        source: 'SentinelOne',
        attack_vector: 'Download',
      },
      // ... puedes extender con más registros para pruebas
    ],
  };

  cf = crossfilter(this.edr_data.events);

  // KPIs
  totalDetections = this.cf.groupAll().reduceCount();
  compromisedHosts = this.cf
    .groupAll()
    .reduceSum((d: any) => (d.status === 'Compromised' ? 1 : 0));
  criticalDetections = this.cf
    .groupAll()
    .reduceSum((d: any) => (d.severity === 'Critical' ? 1 : 0));

  // === Dimensiones y grupos ===

  // 1. Severidad
  sevDim = this.cf.dimension((d: any) => d.severity);
  sevGroup = this.sevDim.group();

  // 2. Fuente (Crowdstrike / SentinelOne)
  srcDim = this.cf.dimension((d: any) => d.source);
  srcGroup = this.srcDim.group();

  // 3. Tipo de amenaza
  typeDim = this.cf.dimension((d: any) => d.threat_type);
  typeGroup = this.typeDim.group();

  // 4. Temporal (día)
  dateDim = this.cf.dimension(
    (d: any) => new Date(d.timestamp).toISOString().split('T')[0]
  );
  dailyGroup = this.dateDim.group();

  criticalGroup = this.dateDim
    .group()
    .reduceSum((d: any) => (d.severity === 'Critical' ? 1 : 0));

  // 5. Vectores de ataque
  vectorDim = this.cf.dimension((d: any) => d.attack_vector);
  vectorGroup = this.vectorDim.group();
}
