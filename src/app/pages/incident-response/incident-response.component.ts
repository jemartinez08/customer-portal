import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { HeaderCardComponent } from '../../components/header-card/header-card.component';
import { PiechartComponent } from '../../components/custom/piechart/piechart.component';
import { CustomLinechartComponent } from '../../components/custom/custom-linechart/custom-linechart.component';
import { CustomBarchartComponent } from '../../components/custom/custom-barchart/custom-barchart.component';
import { ApiService } from '../../api/api.service';

import crossfilter from 'crossfilter2';
import { AiSummaryAdvertisementComponent } from "../../components/ui/ai-summary-advertisement/ai-summary-advertisement.component";

export type Severity = 'low' | 'medium' | 'high' | 'critical';
export type Status = 'contained' | 'open' | 'investigating' | 'closed';
export type ResponseMethod = 'Automated' | 'Manual' | 'Other';

export interface IncidentEvent {
  _time: string; // formato ISO, e.g., "2025-09-10T10:15:00.000Z"
  month: string; // formato "YYYY-MM"
  incident_id: string;
  analyst: string;
  type: string; // tipo de incidente, e.g., "Malware", "Phishing"
  severity: Severity;
  status: Status;
  detection_source: string;
  response_time_hours: number;
  asset: string;
  asset_type: string;
  department: string;
  method: ResponseMethod;
  risk_score: number;
  action_taken: string;
  root_cause: string;
}

@Component({
  selector: 'app-incident-response',
  imports: [
    HeaderComponent,
    HeaderCardComponent,
    PiechartComponent,
    CustomLinechartComponent,
    CustomBarchartComponent,
    AiSummaryAdvertisementComponent
],
  templateUrl: './incident-response.component.html',
  styleUrl: './incident-response.component.css',
})
export class IncidentResponseComponent implements OnInit {
  isMainKPI: boolean = true;
  notMainKpi: boolean = false;
  mttValue: number = 0;
  numberOfOpenedTickets: number = 0;

  constructor(private apiService: ApiService) {}

  incidentEvents: IncidentEvent[] = [];

  ngOnInit() {
    this.apiService.get('/advanced-thread-hunting').subscribe({
      next: (response: any) => {
        if (response) {
          this.incidentEvents = response;
          // Inicializar crossfilter solo cuando tengamos datos válidos
          this.initializeCrossfilter(this.incidentEvents);
        } else {
          console.error('Invalid response format:', response);
        }
      },
      error: (err) => console.error('Error fetching data:', err),
    });
  }

  cf: any;
  // KPI GroupAll variables
  criticalIncidents: any;
  openInvestigations: any;
  containedIncidents: any;
  highRiskIncidents: any;
  // Dimensions and Groups for charts
  typeDimension: any;
  incidentsByType: any;
  severityDimension: any;
  incidentsBySeverity: any;
  detectionSourceDimension: any;
  incidentsByDetectionSource: any;
  statusDimension: any;
  incidentsByStatus: any;
  departmentDimension: any;
  incidentsByDepartment: any;
  assetTypeDimension: any;
  incidentsByAssetType: any;
  monthDimension: any;
  incidentsByMonth: any;
  riskRangeDimension: any;
  incidentsByRiskRange: any;

  private initializeCrossfilter(events: IncidentEvent[]) {
    // Load data into crossfilter
    this.cf = crossfilter(this.incidentEvents);

    // ===============================
    // KPIs (GroupAll) for the header cards
    // ===============================

    // 1. KPI: Total number of critical incidents (severity = 'critical')
    this.criticalIncidents = this.cf
      .groupAll()
      .reduceSum((d: any) => (d.severity === 'critical' ? 1 : 0));

    // 2. KPI: Total number of open investigations (status = 'active' or 'investigating')
    this.openInvestigations = this.cf
      .groupAll()
      .reduceSum((d: any) =>
        d.status === 'active' || d.status === 'investigating' ? 1 : 0
      );

    // 3. KPI: Total number of contained/isolated incidents
    this.containedIncidents = this.cf
      .groupAll()
      .reduceSum((d: any) =>
        d.action_taken === 'isolated' || d.action_taken === 'contained' ? 1 : 0
      );

    // 4. KPI: High-risk incidents (risk_score >= 80)
    this.highRiskIncidents = this.cf
      .groupAll()
      .reduceSum((d: any) => (d.risk_score >= 80 ? 1 : 0));

    // ===============================
    // Dimensions and Groups for charts
    // ===============================

    // Dimension by incident type
    this.typeDimension = this.cf.dimension((d: any) => d.type);
    // Bar chart: Distribution of incidents by type
    this.incidentsByType = this.typeDimension.group();

    // Dimension by severity
    this.severityDimension = this.cf.dimension((d: any) => d.severity);
    // Pie chart: Distribution of incidents by severity
    this.incidentsBySeverity = this.severityDimension.group();

    // Dimension by detection source
    this.detectionSourceDimension = this.cf.dimension(
      (d: any) => d.detection_source
    );
    // Bar chart: Incidents by detection source
    this.incidentsByDetectionSource = this.detectionSourceDimension.group();

    // Dimension by status
    this.statusDimension = this.cf.dimension((d: any) => d.status);
    // Bar chart: Incident status distribution
    this.incidentsByStatus = this.statusDimension.group();

    // Dimension by department
    this.departmentDimension = this.cf.dimension((d: any) => d.department);
    // Bar chart: Most affected departments
    this.incidentsByDepartment = this.departmentDimension.group();

    // Dimension by asset type
    this.assetTypeDimension = this.cf.dimension((d: any) => d.asset_type);
    // Bar chart: Incidents by asset type
    this.incidentsByAssetType = this.assetTypeDimension.group();

    // Dimension by month (for time series)
    this.monthDimension = this.cf.dimension((d: any) => d.month);
    // Line chart: Temporal evolution of incidents
    this.incidentsByMonth = this.monthDimension.group().reduceCount();

    // Dimension by risk range (for analysis)
    this.riskRangeDimension = this.cf.dimension((d: any) => {
      if (d.risk_score >= 90) return 'Critical Risk (90+)';
      if (d.risk_score >= 70) return 'High Risk (70-89)';
      if (d.risk_score >= 50) return 'Medium Risk (50-69)';
      return 'Low Risk (<50)';
    });
    // Bar chart: Distribution by risk range
    this.incidentsByRiskRange = this.riskRangeDimension.group();
  }

  getCf() {
    return this.cf;
  }

  // Helper methods for KPI calculations
  private calculateMeanTimeToResolution(): number {
    // Calculate mean response time for resolved/contained incidents
    const closed = this.incidentEvents.filter(
      (event) => event.status === 'closed' || event.status === 'contained'
    );
    if (closed.length === 0) return 0;
    const total = closed.reduce(
      (sum, event) => sum + (event.response_time_hours || 0),
      0
    );
    return Math.round((total / closed.length) * 10) / 10;
  }

  private getOpenInvestigations(): number {
    return this.incidentEvents.filter(
      (event) => event.status === 'open' || event.status === 'investigating'
    ).length;
  }
}
