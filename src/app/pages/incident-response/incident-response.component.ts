import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { HeaderCardComponent } from '../../components/header-card/header-card.component';
import { PiechartComponent } from '../../components/custom/piechart/piechart.component';
import { CustomLinechartComponent } from '../../components/custom/custom-linechart/custom-linechart.component';
import { CustomBarchartComponent } from '../../components/custom/custom-barchart/custom-barchart.component';

import crossfilter from 'crossfilter2';

@Component({
  selector: 'app-incident-response',
  imports: [
    HeaderComponent,
    HeaderCardComponent,
    PiechartComponent,
    CustomLinechartComponent,
    CustomBarchartComponent,
  ],
  templateUrl: './incident-response.component.html',
  styleUrl: './incident-response.component.css',
})
export class IncidentResponseComponent implements OnInit {
  isMainKPI: boolean = true;
  notMainKpi: boolean = false;
  mttValue: number = 0;
  numberOfOpenedTickets: number = 0;

  // Mock array of incident response events
  incidentEvents = [
    {
      _time: '2025-09-10T10:15:00.000Z',
      month: '2025-09',
      incident_id: 'IR-001',
      analyst: 'alice.soc',
      type: 'Malware',
      severity: 'critical',
      status: 'contained',
      detection_source: 'EDR',
      response_time_hours: 4,
      asset: 'Server-AD-01',
      asset_type: 'Windows Server',
      department: 'IT',
      method: 'Automated',
      risk_score: 92,
      action_taken: 'isolated',
      root_cause: 'Phishing',
    },
    {
      _time: '2025-09-09T08:00:00.000Z',
      month: '2025-09',
      incident_id: 'IR-002',
      analyst: 'bob.soc',
      type: 'Ransomware',
      severity: 'high',
      status: 'investigating',
      detection_source: 'SIEM',
      response_time_hours: 12,
      asset: 'Laptop-CEO',
      asset_type: 'Laptop',
      department: 'Executive',
      method: 'Manual',
      risk_score: 88,
      action_taken: 'quarantined',
      root_cause: 'Remote Desktop',
    },
    {
      _time: '2025-08-25T14:30:00.000Z',
      month: '2025-08',
      incident_id: 'IR-003',
      analyst: 'carol.soc',
      type: 'Data Breach',
      severity: 'medium',
      status: 'resolved',
      detection_source: 'User Report',
      response_time_hours: 24,
      asset: 'Firewall-01',
      asset_type: 'Firewall',
      department: 'Network',
      method: 'Manual',
      risk_score: 60,
      action_taken: 'notified',
      root_cause: 'Misconfiguration',
    },
    {
      _time: '2025-08-20T09:45:00.000Z',
      month: '2025-08',
      incident_id: 'IR-004',
      analyst: 'dave.soc',
      type: 'Phishing',
      severity: 'critical',
      status: 'active',
      detection_source: 'Email Gateway',
      response_time_hours: 8,
      asset: 'Workstation-23',
      asset_type: 'Workstation',
      department: 'Finance',
      method: 'Automated',
      risk_score: 95,
      action_taken: 'blocked',
      root_cause: 'User Click',
    },
    {
      _time: '2025-07-30T16:00:00.000Z',
      month: '2025-07',
      incident_id: 'IR-005',
      analyst: 'eve.soc',
      type: 'Insider Threat',
      severity: 'low',
      status: 'resolved',
      detection_source: 'SIEM',
      response_time_hours: 36,
      asset: 'Server-DB-02',
      asset_type: 'Database Server',
      department: 'IT',
      method: 'Manual',
      risk_score: 35,
      action_taken: 'notified',
      root_cause: 'Privilege Abuse',
    },
    {
      _time: '2025-07-15T11:20:00.000Z',
      month: '2025-07',
      incident_id: 'IR-006',
      analyst: 'frank.soc',
      type: 'DDoS',
      severity: 'critical',
      status: 'active',
      detection_source: 'Firewall',
      response_time_hours: 2,
      asset: 'Workstation-45',
      asset_type: 'Workstation',
      department: 'Legal',
      method: 'Automated',
      risk_score: 99,
      action_taken: 'blocked',
      root_cause: 'External',
    },
    {
      _time: '2025-06-10T13:00:00.000Z',
      month: '2025-06',
      incident_id: 'IR-007',
      analyst: 'alice.soc',
      type: 'Malware',
      severity: 'high',
      status: 'resolved',
      detection_source: 'EDR',
      response_time_hours: 6,
      asset: 'Server-AD-02',
      asset_type: 'Windows Server',
      department: 'IT',
      method: 'Automated',
      risk_score: 80,
      action_taken: 'quarantined',
      root_cause: 'USB',
    },
    {
      _time: '2025-05-22T17:30:00.000Z',
      month: '2025-05',
      incident_id: 'IR-008',
      analyst: 'bob.soc',
      type: 'Phishing',
      severity: 'medium',
      status: 'contained',
      detection_source: 'Email Gateway',
      response_time_hours: 10,
      asset: 'Laptop-HR-01',
      asset_type: 'Laptop',
      department: 'HR',
      method: 'Automated',
      risk_score: 55,
      action_taken: 'removed',
      root_cause: 'User Click',
    },
    {
      _time: '2025-05-10T09:00:00.000Z',
      month: '2025-05',
      incident_id: 'IR-009',
      analyst: 'carol.soc',
      type: 'Malware',
      severity: 'high',
      status: 'investigating',
      detection_source: 'EDR',
      response_time_hours: 18,
      asset: 'Server-AD-03',
      asset_type: 'Windows Server',
      department: 'IT',
      method: 'Manual',
      risk_score: 85,
      action_taken: 'monitored',
      root_cause: 'Phishing',
    },
    {
      _time: '2025-04-18T15:45:00.000Z',
      month: '2025-04',
      incident_id: 'IR-010',
      analyst: 'dave.soc',
      type: 'Data Breach',
      severity: 'medium',
      status: 'resolved',
      detection_source: 'User Report',
      response_time_hours: 6,
      asset: 'Workstation-12',
      asset_type: 'Workstation',
      department: 'Finance',
      method: 'Manual',
      risk_score: 65,
      action_taken: 'removed',
      root_cause: 'Misconfiguration',
    },
  ];

  constructor() {}

  // Load data into crossfilter
  cf = crossfilter(this.incidentEvents);

  // ===============================
  // KPIs (GroupAll) for the header cards
  // ===============================

  // 1. KPI: Total number of critical incidents (severity = 'critical')
  criticalIncidents = this.cf
    .groupAll()
    .reduceSum((d) => (d.severity === 'critical' ? 1 : 0));

  // 2. KPI: Total number of open investigations (status = 'active' or 'investigating')
  openInvestigations = this.cf
    .groupAll()
    .reduceSum((d) =>
      d.status === 'active' || d.status === 'investigating' ? 1 : 0
    );

  // 3. KPI: Total number of contained/isolated incidents
  containedIncidents = this.cf
    .groupAll()
    .reduceSum((d) =>
      d.action_taken === 'isolated' || d.action_taken === 'contained' ? 1 : 0
    );

  // 4. KPI: High-risk incidents (risk_score >= 80)
  highRiskIncidents = this.cf
    .groupAll()
    .reduceSum((d) => (d.risk_score >= 80 ? 1 : 0));

  // ===============================
  // Dimensions and Groups for charts
  // ===============================

  // Dimension by incident type
  typeDimension = this.cf.dimension((d) => d.type);
  // Bar chart: Distribution of incidents by type
  incidentsByType = this.typeDimension.group();

  // Dimension by severity
  severityDimension = this.cf.dimension((d) => d.severity);
  // Pie chart: Distribution of incidents by severity
  incidentsBySeverity = this.severityDimension.group();

  // Dimension by detection source
  detectionSourceDimension = this.cf.dimension((d) => d.detection_source);
  // Bar chart: Incidents by detection source
  incidentsByDetectionSource = this.detectionSourceDimension.group();

  // Dimension by status
  statusDimension = this.cf.dimension((d) => d.status);
  // Bar chart: Incident status distribution
  incidentsByStatus = this.statusDimension.group();

  // Dimension by department
  departmentDimension = this.cf.dimension((d) => d.department);
  // Bar chart: Most affected departments
  incidentsByDepartment = this.departmentDimension.group();

  // Dimension by asset type
  assetTypeDimension = this.cf.dimension((d) => d.asset_type);
  // Bar chart: Incidents by asset type
  incidentsByAssetType = this.assetTypeDimension.group();

  // Dimension by month (for time series)
  monthDimension = this.cf.dimension((d) => d.month);
  // Line chart: Temporal evolution of incidents
  incidentsByMonth = this.monthDimension.group().reduceCount();

  // Dimension by risk range (for analysis)
  riskRangeDimension = this.cf.dimension((d) => {
    if (d.risk_score >= 90) return 'Critical Risk (90+)';
    if (d.risk_score >= 70) return 'High Risk (70-89)';
    if (d.risk_score >= 50) return 'Medium Risk (50-69)';
    return 'Low Risk (<50)';
  });
  // Bar chart: Distribution by risk range
  incidentsByRiskRange = this.riskRangeDimension.group();

  getCf() {
    return this.cf;
  }

  // Helper methods for KPI calculations
  private calculateMeanTimeToResolution(): number {
    // Calculate mean response time for resolved/contained incidents
    const closed = this.incidentEvents.filter(
      (event) => event.status === 'resolved' || event.status === 'contained'
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
      (event) => event.status === 'active' || event.status === 'investigating'
    ).length;
  }

  ngOnInit() {
    setTimeout(() => {
      this.mttValue = this.calculateMeanTimeToResolution();
      this.numberOfOpenedTickets = this.getOpenInvestigations();
    }, 100);
  }
}
