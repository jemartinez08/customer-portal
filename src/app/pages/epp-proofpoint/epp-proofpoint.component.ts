import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { HeaderCardComponent } from '../../components/header-card/header-card.component';
import { PiechartComponent } from '../../components/custom/piechart/piechart.component';
import { CustomLinechartComponent } from '../../components/custom/custom-linechart/custom-linechart.component';
import { CustomBarchartComponent } from '../../components/custom/custom-barchart/custom-barchart.component';
import { ApiService } from '../../api/api.service';

import crossfilter from 'crossfilter2';
import { AiSummaryAdvertisementComponent } from "../../components/ui/ai-summary-advertisement/ai-summary-advertisement.component";

export interface ProofpointEvent {
  _time: string; // formato ISO, e.g. "2025-09-09T14:30:22.000Z"
  month: string; // formato "YYYY-MM"
  event_id: string;
  endpoint_name: string;
  endpoint_ip: string;
  user: string;
  threat_type: string;
  severity: string;
  threat_name: string;
  file_path: string;
  action_taken: string;
  detection_method: string;
  status: string;
  risk_score: number;
  department: string;
  os_type: string;
}

@Component({
  selector: 'app-epp-proofpoint',
  imports: [
    HeaderComponent,
    HeaderCardComponent,
    CustomBarchartComponent,
    PiechartComponent,
    CustomLinechartComponent,
    AiSummaryAdvertisementComponent
],
  templateUrl: './epp-proofpoint.component.html',
  styleUrl: './epp-proofpoint.component.css',
})
export class EppProofpointComponent implements OnInit {
  isMainKPI: boolean = true;
  notMainKpi: boolean = false;

  // Properties required by the header component
  mttValue: number = 0;
  numberOfOpenedTickets: number = 0;

  constructor(private apiService: ApiService) {}

  proofpointEvents: ProofpointEvent[] = [];

  ngOnInit() {
    this.apiService.get('/epp-proofpoint').subscribe({
      next: (response: any) => {
        if (response) {
          this.proofpointEvents = response;
          // Inicializar crossfilter solo cuando tengamos datos válidos
          this.initializeCrossfilter(this.proofpointEvents);
        } else {
          console.error('Invalid response format:', response);
        }
      },
      error: (err) => console.error('Error fetching data:', err),
    });
  }

  cf: any;
  // KPIs
  criticalThreats: any;
  activeThreats: any;
  containedThreats: any;
  highRiskThreats: any;
  // Dimensions and Groups
  threatTypeDimension: any;
  threatsByType: any;
  severityDimension: any;
  threatsBySeverity: any;
  actionDimension: any;
  threatsByAction: any;
  detectionMethodDimension: any;
  threatsByDetectionMethod: any;
  departmentDimension: any;
  threatsByDepartment: any;
  osTypeDimension: any;
  threatsByOsType: any;
  statusDimension: any;
  threatsByStatus: any;
  monthDimension: any;
  threatsByMonth: any;
  riskRangeDimension: any;
  threatsByRiskRange: any;

  private initializeCrossfilter(events: ProofpointEvent[]) {
    // Load data into crossfilter
    this.cf = crossfilter(this.proofpointEvents);

    // ===============================
    // KPIs (GroupAll) for the header cards
    // ===============================

    // 1. KPI: Total number of critical threats (severity = 'critical')
    this.criticalThreats = this.cf
      .groupAll()
      .reduceSum((d: any) => (d.severity === 'critical' ? 1 : 0));

    // 2. KPI: Total number of active threats (status = 'active' or 'investigating')
    this.activeThreats = this.cf
      .groupAll()
      .reduceSum((d: any) =>
        d.status === 'active' || d.status === 'investigating' ? 1 : 0
      );

    // 3. KPI: Total number of quarantined/isolated threats
    this.containedThreats = this.cf
      .groupAll()
      .reduceSum((d: any) =>
        d.action_taken === 'quarantined' || d.action_taken === 'isolated'
          ? 1
          : 0
      );

    // 4. KPI: High-risk threats (risk_score >= 80)
    this.highRiskThreats = this.cf
      .groupAll()
      .reduceSum((d: any) => (d.risk_score >= 80 ? 1 : 0));

    // ===============================
    // Dimensions and Groups for charts
    // ===============================

    // Dimension by threat type
    this.threatTypeDimension = this.cf.dimension((d: any) => d.threat_type);
    // Bar chart: Distribution of threats by type
    this.threatsByType = this.threatTypeDimension.group();

    // Dimension by severity
    this.severityDimension = this.cf.dimension((d: any) => d.severity);
    // Pie chart: Distribution of threats by severity
    this.threatsBySeverity = this.severityDimension.group();

    // Dimension by action taken
    this.actionDimension = this.cf.dimension((d: any) => d.action_taken);
    // Bar chart: Actions taken on threats
    this.threatsByAction = this.actionDimension.group();

    // Dimension by detection method
    this.detectionMethodDimension = this.cf.dimension(
      (d: any) => d.detection_method
    );
    // Bar chart: Threats by detection method
    this.threatsByDetectionMethod = this.detectionMethodDimension.group();

    // Dimension by department
    this.departmentDimension = this.cf.dimension((d: any) => d.department);
    // Bar chart: Most affected departments
    this.threatsByDepartment = this.departmentDimension.group();

    // Dimension by OS type
    this.osTypeDimension = this.cf.dimension((d: any) => d.os_type);
    // Bar chart: Threats by operating system
    this.threatsByOsType = this.osTypeDimension.group();

    // Dimension by status
    this.statusDimension = this.cf.dimension((d: any) => d.status);
    // Bar chart: Threat status distribution
    this.threatsByStatus = this.statusDimension.group();

    // Dimension by month (for time series)
    this.monthDimension = this.cf.dimension((d: any) => d.month);
    // Line chart: Temporal evolution of threats
    this.threatsByMonth = this.monthDimension.group().reduceCount();

    // Dimension by risk range (for analysis)
    this.riskRangeDimension = this.cf.dimension((d: any) => {
      if (d.risk_score >= 90) return 'Critical Risk (90+)';
      if (d.risk_score >= 70) return 'High Risk (70-89)';
      if (d.risk_score >= 50) return 'Medium Risk (50-69)';
      return 'Low Risk (<50)';
    });
    // Bar chart: Distribution by risk range
    this.threatsByRiskRange = this.riskRangeDimension.group();
  }

  getCf() {
    return this.cf;
  }

  // Helper methods for KPI calculations
  private calculateMeanTimeToResolution(): number {
    // Mock calculation - in real scenario, you'd calculate based on resolution time
    const resolvedThreats = this.proofpointEvents.filter(
      (event) => event.status === 'resolved'
    );
    return resolvedThreats.length > 0
      ? Math.round((24 / resolvedThreats.length) * 10) / 10
      : 0;
  }

  private getActiveThreats(): number {
    return this.proofpointEvents.filter(
      (event) => event.status === 'active' || event.status === 'investigating'
    ).length;
  }
}
