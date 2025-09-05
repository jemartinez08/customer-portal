import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { HeaderCardComponent } from '../../components/header-card/header-card.component';
import { BarchartComponent } from '../../components/custom/barchart/barchart.component';
import { PiechartComponent } from '../../components/custom/piechart/piechart.component';
import { LinechartComponent } from '../../components/custom/linechart/linechart.component';

import crossfilter from 'crossfilter2';
import * as dc from 'dc';
import * as d3 from 'd3';

@Component({
  selector: 'app-home-page',
  imports: [
    HeaderComponent,
    HeaderCardComponent,
    BarchartComponent,
    PiechartComponent,
    LinechartComponent,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {
  isMainKPI: boolean = true;
  notMainKpi: boolean = false;
  mttValue: number = 0;
  numberOfOpenedTickets: number = 0;

  home_data = {
    events: [
      {
        id: 'evt-001',
        timestamp: '2025-09-01T13:45:00Z',
        threat_type: 'Phishing',
        severity: 'High',
        affected_host: 'HR-PC-23',
        source: 'EDR',
        status: 'Uncontained',
        ioc_type: 'URL',
        ioc_value: 'http://malicious-site.com',
        threat_family: 'GenericPhish',
      },
      {
        id: 'evt-002',
        timestamp: '2025-09-02T08:10:00Z',
        threat_type: 'Ransomware',
        severity: 'Critical',
        affected_host: 'Finance-Server-01',
        source: 'SIEM',
        status: 'Contained',
        ioc_type: 'Hash',
        ioc_value: 'a94a8fe5ccb19ba61c4c0873d391e987982fbbd3',
        threat_family: 'LockBit',
      },
      {
        id: 'evt-003',
        timestamp: '2025-09-02T11:30:00Z',
        threat_type: 'Malware',
        severity: 'Medium',
        affected_host: 'Dev-PC-12',
        source: 'IDS/IPS',
        status: 'Open',
        ioc_type: 'IP',
        ioc_value: '185.203.116.9',
        threat_family: 'Emotet',
      },
      {
        id: 'evt-004',
        timestamp: '2025-09-03T11:30:00Z',
        threat_type: 'Phishing',
        severity: 'Critical',
        affected_host: 'Dev-PC-12',
        source: 'IDS/IPS',
        status: 'Open',
        ioc_type: 'IP',
        ioc_value: '185.203.116.10',
        threat_family: 'Emotet',
      },
      {
        id: 'evt-005',
        timestamp: '2025-09-08T11:30:00Z',
        threat_type: 'Malware',
        severity: 'Medium',
        affected_host: 'Dev-PC-12',
        source: 'IDS/IPS',
        status: 'Open',
        ioc_type: 'IP',
        ioc_value: '185.203.116.11',
        threat_family: 'Emotet',
      },
    ],
    filters: {
      severity: ['Critical', 'High', 'Medium', 'Low'],
      sources: ['SIEM', 'EDR', 'IDS/IPS', 'ThreatIntel'],
      status: ['Open', 'Contained', 'Uncontained', 'Closed'],
    },
  };

  // define dimentions
  // Cargar datos en crossfilter
  cf = crossfilter(this.home_data.events);

  // Dimentions for KPIs
  // 1. Total de incidentes
  all = this.cf.groupAll().reduceCount();

  // 2. Total de amenazas criticas
  criticalTotal = this.cf
    .groupAll()
    .reduceSum((d) => (d.severity === 'Critical' ? 1 : 0));

  // 3. Crear GroupAll para incidentes abiertos
  openIncidentsGroup = this.cf
    .groupAll()
    .reduceSum((d: any) => (d.status === 'Open' ? 1 : 0));

  // 1. Dimension por tipo de amenaza
  typeDim = this.cf.dimension((d: any) => d.threat_type);
  typeGroup = this.typeDim.group();
  // → { Malware: 1, Phishing: 1, Ransomware: 1 }

  // 2. Dimension por severidad
  sevDim = this.cf.dimension((d) => d.severity);
  sevGroup = this.sevDim.group();
  // → { Critical: 1, High: 1, Medium: 1 }

  // 3. Dimension temporal (día)
  dateDim = this.cf.dimension(
    (d) => new Date(d.timestamp).toISOString().split('T')[0]
  );
  dailyGroup = this.dateDim.group();
  // → { "2025-09-01": 1, "2025-09-02": 2 }

  // 3. Group → contar solo amenazas críticas
  criticalGroup = this.dateDim
    .group()
    .reduceSum((d) => (d.severity === 'Critical' ? 1 : 0));

  // 4. Dimension por fuente
  srcDim = this.cf.dimension((d) => d.source);
  srcGroup = this.srcDim.group();
  // → { EDR: 1, SIEM: 1, IDS/IPS: 1 }
}
