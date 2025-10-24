import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { HeaderCardComponent } from '../../components/header-card/header-card.component';
import { PiechartComponent } from '../../components/custom/piechart/piechart.component';
import { CustomLinechartComponent } from '../../components/custom/custom-linechart/custom-linechart.component';
import { CustomBarchartComponent } from '../../components/custom/custom-barchart/custom-barchart.component';
import { ApiService } from '../../api/api.service';

import crossfilter from 'crossfilter2';

export interface SecurityEvent {
  _time: string; // formato ISO (e.g. '2025-09-09T14:30:22.000Z')
  month: string; // formato 'YYYY-MM'
  event_id: string;
  source_ip: string;
  dest_ip: string;
  user: string;
  action: string;
  severity: string;
  threat_category: string;
  source_type: string;
  host: string;
  status: string;
  risk_score: number;
  country: string;
}

@Component({
  selector: 'app-soc-splunk',
  imports: [
    HeaderComponent,
    HeaderCardComponent,
    CustomBarchartComponent,
    PiechartComponent,
    CustomLinechartComponent,
  ],
  templateUrl: './soc-splunk.component.html',
  styleUrl: './soc-splunk.component.css',
})
export class SocSplunkComponent implements OnInit {
  isMainKPI: boolean = true;
  notMainKpi: boolean = false;

  // Properties required by the header component
  mttValue: number = 0;
  numberOfOpenedTickets: number = 0;

  constructor(private apiService: ApiService) {}

  securityEvents: SecurityEvent[] = [];

  ngOnInit() {
    this.apiService.get('/soc-splunk').subscribe({
      next: (response: any) => {
        if (response) {
          this.securityEvents = response.events;
          // Inicializar crossfilter solo cuando tengamos datos válidos
          this.initializeCrossfilter(this.securityEvents);
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
  criticalEvents: any;
  blockedEvents: any;
  failedLogins: any;
  highRiskEvents: any;
  severityDimension: any;
  eventsBySeverity: any;
  threatCategoryDimension: any;
  eventsByThreatCategory: any;
  actionDimension: any;
  eventsByAction: any;
  statusDimension: any;
  eventsByStatus: any;
  sourceTypeDimension: any;
  eventsBySourceType: any;
  hostDimension: any;
  eventsByHost: any;
  countryDimension: any;
  eventsByCountry: any;
  monthDimension: any;
  eventsByMonth: any;
  riskRangeDimension: any;
  eventsByRiskRange: any;
  loginStatusDimension: any;
  loginsByStatus: any;


  private initializeCrossfilter(events: SecurityEvent[]) {
    // Load data into crossfilter
    console.log('Initializing crossfilter with events:', events);
    this.cf = crossfilter(this.securityEvents);

    // ===============================
    // KPIs (GroupAll) for the header cards
    // ===============================

    // 1. KPI: Total number of critical events (severity = 'critical')
    this.criticalEvents = this.cf
      .groupAll()
      .reduceSum((d: any) => (d.severity === 'critical' ? 1 : 0));

    // 2. KPI: Total number of blocked/mitigated events
    this.blockedEvents = this.cf
      .groupAll()
      .reduceSum((d: any) =>
        d.status === 'blocked' ||
        d.status === 'quarantined' ||
        d.status === 'mitigated'
          ? 1
          : 0
      );

    // 3. KPI: Total number of failed login attempts
    this.failedLogins = this.cf
      .groupAll()
      .reduceSum((d: any) =>
        d.action === 'login_failed' || d.action === 'brute_force' ? 1 : 0
      );

    // 4. KPI: High-risk events (risk_score >= 80)
    this.highRiskEvents = this.cf
      .groupAll()
      .reduceSum((d: any) => (d.risk_score >= 80 ? 1 : 0));

    // ===============================
    // Dimensions and Groups for charts
    // ===============================

    // Dimension by severity
    this.severityDimension = this.cf.dimension((d: any) => d.severity);
    // Pie chart: Distribution of events by severity
    this.eventsBySeverity = this.severityDimension.group();

    // Dimension by threat category
    this.threatCategoryDimension = this.cf.dimension(
      (d: any) => d.threat_category
    );
    // Bar chart: Events by threat category
    this.eventsByThreatCategory = this.threatCategoryDimension.group();

    // Dimension by action type
    this.actionDimension = this.cf.dimension((d: any) => d.action);
    // Bar chart: Most common action/event types
    this.eventsByAction = this.actionDimension.group();

    // Dimension by event status
    this.statusDimension = this.cf.dimension((d: any) => d.status);
    // Bar chart: Event statuses (blocked, allowed, etc.)
    this.eventsByStatus = this.statusDimension.group();

    // Dimension by source type
    this.sourceTypeDimension = this.cf.dimension((d: any) => d.source_type);
    // Bar chart: Events by source type
    this.eventsBySourceType = this.sourceTypeDimension.group();

    // Dimension by host/system affected
    this.hostDimension = this.cf.dimension((d: any) => d.host);
    // Bar chart: Most affected systems
    this.eventsByHost = this.hostDimension.group();

    // Dimension by country of origin
    this.countryDimension = this.cf.dimension((d: any) => d.country);
    // Bar chart: Events by country of origin
    this.eventsByCountry = this.countryDimension.group();

    // Dimension by month (for time series)
    this.monthDimension = this.cf.dimension((d: any) => d.month);
    // Line chart: Temporal evolution of events
    this.eventsByMonth = this.monthDimension.group().reduceCount();

    // Dimension by risk range (for analysis)
    this.riskRangeDimension = this.cf.dimension((d: any) => {
      if (d.risk_score >= 90) return 'Critical Risk';
      if (d.risk_score >= 70) return 'High Risk';
      if (d.risk_score >= 50) return 'Medium Risk';
      return 'Low Risk';
    });
    // Bar chart: Distribution by risk range
    this.eventsByRiskRange = this.riskRangeDimension.group();

    // Dimension by login success vs failed
    this.loginStatusDimension = this.cf.dimension((d: any) => {
      if (d.action === 'login_success') return 'Success';
      if (d.action === 'login_failed' || d.action === 'brute_force')
        return 'Failed';
      return 'Other';
    });
    // Bar chart: Login success vs failed
    this.loginsByStatus = this.loginStatusDimension.group();
  }

  getCf() {
    return this.cf;
  }
}
