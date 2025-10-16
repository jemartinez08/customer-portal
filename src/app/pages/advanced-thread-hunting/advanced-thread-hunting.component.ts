import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { HeaderCardComponent } from '../../components/header-card/header-card.component';
import { PiechartComponent } from '../../components/custom/piechart/piechart.component';
import { CustomLinechartComponent } from '../../components/custom/custom-linechart/custom-linechart.component';
import { CustomBarchartComponent } from '../../components/custom/custom-barchart/custom-barchart.component';

import crossfilter from 'crossfilter2';

@Component({
  selector: 'app-advanced-thread-hunting',
  imports: [
    HeaderComponent,
    HeaderCardComponent,
    PiechartComponent,
    CustomLinechartComponent,
    CustomBarchartComponent,
  ],
  templateUrl: './advanced-thread-hunting.component.html',
  styleUrl: './advanced-thread-hunting.component.css',
})
export class AdvancedThreadHuntingComponent implements OnInit {
  isMainKPI: boolean = true;
  notMainKpi: boolean = false;
  mttValue: number = 0;
  numberOfOpenedTickets: number = 0;

  // Mock array of advanced thread hunting events (SOC use case)
  threadHuntingEvents = [
    {
      _time: '2025-09-10T10:15:00.000Z',
      month: '2025-09',
      event_id: 'ATH-001',
      analyst: 'alice.soc',
      source: 'SIEM',
      technique: 'Process Injection',
      tactic: 'Defense Evasion',
      severity: 'critical',
      status: 'mitigated',
      detection_method: 'YARA Rule',
      dwell_time_hours: 12,
      asset: 'Server-AD-01',
      asset_type: 'Windows Server',
      department: 'IT',
      alert_type: 'Custom Hunt',
      risk_score: 93,
      action_taken: 'blocked',
    },
    {
      _time: '2025-09-09T08:00:00.000Z',
      month: '2025-09',
      event_id: 'ATH-002',
      analyst: 'bob.soc',
      source: 'EDR',
      technique: 'Credential Dumping',
      tactic: 'Credential Access',
      severity: 'high',
      status: 'investigating',
      detection_method: 'Sigma Rule',
      dwell_time_hours: 30,
      asset: 'Laptop-CEO',
      asset_type: 'Laptop',
      department: 'Executive',
      alert_type: 'Automated',
      risk_score: 88,
      action_taken: 'quarantined',
    },
    {
      _time: '2025-08-25T14:30:00.000Z',
      month: '2025-08',
      event_id: 'ATH-003',
      analyst: 'carol.soc',
      source: 'Network',
      technique: 'C2 Communication',
      tactic: 'Command and Control',
      severity: 'medium',
      status: 'resolved',
      detection_method: 'Manual Hunt',
      dwell_time_hours: 8,
      asset: 'Firewall-01',
      asset_type: 'Firewall',
      department: 'Network',
      alert_type: 'Manual',
      risk_score: 60,
      action_taken: 'monitored',
    },
    {
      _time: '2025-08-20T09:45:00.000Z',
      month: '2025-08',
      event_id: 'ATH-004',
      analyst: 'dave.soc',
      source: 'SIEM',
      technique: 'Lateral Movement',
      tactic: 'Lateral Movement',
      severity: 'critical',
      status: 'active',
      detection_method: 'Behavioral Analytics',
      dwell_time_hours: 48,
      asset: 'Workstation-23',
      asset_type: 'Workstation',
      department: 'Finance',
      alert_type: 'Custom Hunt',
      risk_score: 97,
      action_taken: 'blocked',
    },
    {
      _time: '2025-07-30T16:00:00.000Z',
      month: '2025-07',
      event_id: 'ATH-005',
      analyst: 'eve.soc',
      source: 'EDR',
      technique: 'Persistence',
      tactic: 'Persistence',
      severity: 'low',
      status: 'resolved',
      detection_method: 'Sigma Rule',
      dwell_time_hours: 5,
      asset: 'Server-DB-02',
      asset_type: 'Database Server',
      department: 'IT',
      alert_type: 'Automated',
      risk_score: 35,
      action_taken: 'removed',
    },
    {
      _time: '2025-07-15T11:20:00.000Z',
      month: '2025-07',
      event_id: 'ATH-006',
      analyst: 'frank.soc',
      source: 'SIEM',
      technique: 'Data Exfiltration',
      tactic: 'Exfiltration',
      severity: 'critical',
      status: 'active',
      detection_method: 'Manual Hunt',
      dwell_time_hours: 72,
      asset: 'Workstation-45',
      asset_type: 'Workstation',
      department: 'Legal',
      alert_type: 'Manual',
      risk_score: 99,
      action_taken: 'blocked',
    },
    {
      _time: '2025-06-10T13:00:00.000Z',
      month: '2025-06',
      event_id: 'ATH-007',
      analyst: 'alice.soc',
      source: 'EDR',
      technique: 'Privilege Escalation',
      tactic: 'Privilege Escalation',
      severity: 'high',
      status: 'resolved',
      detection_method: 'YARA Rule',
      dwell_time_hours: 20,
      asset: 'Server-AD-02',
      asset_type: 'Windows Server',
      department: 'IT',
      alert_type: 'Automated',
      risk_score: 80,
      action_taken: 'quarantined',
    },
    {
      _time: '2025-05-22T17:30:00.000Z',
      month: '2025-05',
      event_id: 'ATH-008',
      analyst: 'bob.soc',
      source: 'Network',
      technique: 'Spear Phishing',
      tactic: 'Initial Access',
      severity: 'medium',
      status: 'mitigated',
      detection_method: 'Behavioral Analytics',
      dwell_time_hours: 10,
      asset: 'Laptop-HR-01',
      asset_type: 'Laptop',
      department: 'HR',
      alert_type: 'Custom Hunt',
      risk_score: 55,
      action_taken: 'removed',
    },
    {
      _time: '2025-05-10T09:00:00.000Z',
      month: '2025-05',
      event_id: 'ATH-009',
      analyst: 'carol.soc',
      source: 'SIEM',
      technique: 'Malicious PowerShell',
      tactic: 'Execution',
      severity: 'high',
      status: 'investigating',
      detection_method: 'Sigma Rule',
      dwell_time_hours: 18,
      asset: 'Server-AD-03',
      asset_type: 'Windows Server',
      department: 'IT',
      alert_type: 'Automated',
      risk_score: 85,
      action_taken: 'monitored',
    },
    {
      _time: '2025-04-18T15:45:00.000Z',
      month: '2025-04',
      event_id: 'ATH-010',
      analyst: 'dave.soc',
      source: 'EDR',
      technique: 'Fileless Malware',
      tactic: 'Execution',
      severity: 'medium',
      status: 'resolved',
      detection_method: 'YARA Rule',
      dwell_time_hours: 6,
      asset: 'Workstation-12',
      asset_type: 'Workstation',
      department: 'Finance',
      alert_type: 'Automated',
      risk_score: 65,
      action_taken: 'removed',
    },
  ];

  constructor() {}

  // Load data into crossfilter
  cf = crossfilter(this.threadHuntingEvents);

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

  // 3. KPI: Total number of mitigated/blocked threats
  mitigatedThreats = this.cf
    .groupAll()
    .reduceSum((d) =>
      d.action_taken === 'blocked' || d.action_taken === 'mitigated' ? 1 : 0
    );

  // 4. KPI: High-risk incidents (risk_score >= 80)
  highRiskIncidents = this.cf
    .groupAll()
    .reduceSum((d) => (d.risk_score >= 80 ? 1 : 0));

  // ===============================
  // Dimensions and Groups for charts
  // ===============================

  // Dimension by MITRE ATT&CK tactic
  tacticDimension = this.cf.dimension((d) => d.tactic);
  // Bar chart: Distribution of incidents by tactic
  incidentsByTactic = this.tacticDimension.group();

  // Dimension by MITRE technique
  techniqueDimension = this.cf.dimension((d) => d.technique);
  // Bar chart: Distribution of incidents by technique
  incidentsByTechnique = this.techniqueDimension.group();

  // Dimension by detection method
  detectionMethodDimension = this.cf.dimension((d) => d.detection_method);
  // Bar chart: Incidents by detection method
  incidentsByDetectionMethod = this.detectionMethodDimension.group();

  // Dimension by severity
  severityDimension = this.cf.dimension((d) => d.severity);
  // Pie chart: Distribution of incidents by severity
  incidentsBySeverity = this.severityDimension.group();

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
    // Calculate mean dwell time for resolved/mitigated incidents
    const closed = this.threadHuntingEvents.filter(
      (event) => event.status === 'resolved' || event.status === 'mitigated'
    );
    if (closed.length === 0) return 0;
    const total = closed.reduce(
      (sum, event) => sum + (event.dwell_time_hours || 0),
      0
    );
    return Math.round((total / closed.length) * 10) / 10;
  }

  private getOpenInvestigations(): number {
    return this.threadHuntingEvents.filter(
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
