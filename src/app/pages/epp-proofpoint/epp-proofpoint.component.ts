import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { HeaderCardComponent } from '../../components/header-card/header-card.component';
import { BarchartComponent } from '../../components/custom/barchart/barchart.component';
import { PiechartComponent } from '../../components/custom/piechart/piechart.component';
import { LinechartComponent } from '../../components/custom/linechart/linechart.component';
import { CustomLinechartComponent } from '../../components/custom/custom-linechart/custom-linechart.component';
import { CustomBarchartComponent } from '../../components/custom/custom-barchart/custom-barchart.component';

import crossfilter from 'crossfilter2';

@Component({
  selector: 'app-epp-proofpoint',
  imports: [
    HeaderComponent,
    HeaderCardComponent,
    BarchartComponent,
    CustomBarchartComponent,
    PiechartComponent,
    LinechartComponent,
    CustomLinechartComponent,
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
  
  constructor() {}

  // Mock array of Proofpoint EPP security events with diversified dates
  proofpointEvents = [
    {
      _time: '2025-09-09T14:30:22.000Z',
      month: '2025-09',
      event_id: 'PP-001',
      endpoint_name: 'DESKTOP-001',
      endpoint_ip: '192.168.1.100',
      user: 'john.doe',
      threat_type: 'malware',
      severity: 'critical',
      threat_name: 'Trojan.Win32.Generic',
      file_path: 'C:\\Users\\john\\Downloads\\malicious.exe',
      action_taken: 'quarantined',
      detection_method: 'behavioral_analysis',
      status: 'resolved',
      risk_score: 95,
      department: 'Finance',
      os_type: 'Windows'
    },
    {
      _time: '2025-09-08T14:25:15.000Z',
      month: '2025-09',
      event_id: 'PP-002',
      endpoint_name: 'LAPTOP-HR-05',
      endpoint_ip: '192.168.1.105',
      user: 'mary.smith',
      threat_type: 'ransomware',
      severity: 'critical',
      threat_name: 'Locky.Ransomware',
      file_path: 'C:\\Temp\\encrypted_files.zip',
      action_taken: 'blocked',
      detection_method: 'signature',
      status: 'active',
      risk_score: 98,
      department: 'HR',
      os_type: 'Windows'
    },
    {
      _time: '2025-08-15T14:20:08.000Z',
      month: '2025-08',
      event_id: 'PP-003',
      endpoint_name: 'MAC-DEV-12',
      endpoint_ip: '192.168.1.112',
      user: 'alex.developer',
      threat_type: 'adware',
      severity: 'medium',
      threat_name: 'Adware.OSX.Genieo',
      file_path: '/Users/alex/Downloads/freeware.dmg',
      action_taken: 'removed',
      detection_method: 'heuristic',
      status: 'resolved',
      risk_score: 45,
      department: 'Development',
      os_type: 'macOS'
    },
    {
      _time: '2025-08-12T14:15:33.000Z',
      month: '2025-08',
      event_id: 'PP-004',
      endpoint_name: 'DESKTOP-SALES-08',
      endpoint_ip: '192.168.1.108',
      user: 'robert.sales',
      threat_type: 'spyware',
      severity: 'high',
      threat_name: 'Spyware.Win32.KeyLogger',
      file_path: 'C:\\Program Files\\Unknown\\keylogger.dll',
      action_taken: 'quarantined',
      detection_method: 'behavioral_analysis',
      status: 'investigating',
      risk_score: 85,
      department: 'Sales',
      os_type: 'Windows'
    },
    {
      _time: '2025-07-20T14:10:44.000Z',
      month: '2025-07',
      event_id: 'PP-005',
      endpoint_name: 'LINUX-SERVER-02',
      endpoint_ip: '192.168.1.202',
      user: 'root',
      threat_type: 'rootkit',
      severity: 'critical',
      threat_name: 'Linux.Rootkit.Diamorphine',
      file_path: '/tmp/.hidden/rootkit.ko',
      action_taken: 'isolated',
      detection_method: 'signature',
      status: 'active',
      risk_score: 92,
      department: 'IT',
      os_type: 'Linux'
    },
    {
      _time: '2025-07-18T14:05:12.000Z',
      month: '2025-07',
      event_id: 'PP-006',
      endpoint_name: 'DESKTOP-MARKETING-03',
      endpoint_ip: '192.168.1.103',
      user: 'lisa.marketing',
      threat_type: 'pua',
      severity: 'low',
      threat_name: 'PUA.Win32.InstallCore',
      file_path: 'C:\\Users\\lisa\\AppData\\Local\\Temp\\installer.exe',
      action_taken: 'removed',
      detection_method: 'reputation',
      status: 'resolved',
      risk_score: 25,
      department: 'Marketing',
      os_type: 'Windows'
    },
    {
      _time: '2025-06-25T13:58:27.000Z',
      month: '2025-06',
      event_id: 'PP-007',
      endpoint_name: 'LAPTOP-EXEC-01',
      endpoint_ip: '192.168.1.201',
      user: 'ceo.admin',
      threat_type: 'exploit',
      severity: 'critical',
      threat_name: 'Exploit.CVE-2024-1234',
      file_path: 'C:\\Windows\\System32\\vulnerable.dll',
      action_taken: 'blocked',
      detection_method: 'behavioral_analysis',
      status: 'active',
      risk_score: 96,
      department: 'Executive',
      os_type: 'Windows'
    },
    {
      _time: '2025-06-22T13:55:18.000Z',
      month: '2025-06',
      event_id: 'PP-008',
      endpoint_name: 'DESKTOP-FINANCE-07',
      endpoint_ip: '192.168.1.107',
      user: 'accounts.payable',
      threat_type: 'phishing',
      severity: 'high',
      threat_name: 'Phishing.Email.BankingTrojan',
      file_path: 'C:\\Users\\accounts\\Downloads\\invoice.pdf.exe',
      action_taken: 'quarantined',
      detection_method: 'machine_learning',
      status: 'resolved',
      risk_score: 88,
      department: 'Finance',
      os_type: 'Windows'
    },
    {
      _time: '2025-05-15T16:30:15.000Z',
      month: '2025-05',
      event_id: 'PP-009',
      endpoint_name: 'TABLET-FIELD-04',
      endpoint_ip: '192.168.1.104',
      user: 'field.worker',
      threat_type: 'malware',
      severity: 'medium',
      threat_name: 'Android.Malware.FakeApp',
      file_path: '/sdcard/Download/game.apk',
      action_taken: 'removed',
      detection_method: 'signature',
      status: 'resolved',
      risk_score: 55,
      department: 'Operations',
      os_type: 'Android'
    },
    {
      _time: '2025-05-10T15:45:33.000Z',
      month: '2025-05',
      event_id: 'PP-010',
      endpoint_name: 'DESKTOP-SUPPORT-09',
      endpoint_ip: '192.168.1.109',
      user: 'it.support',
      threat_type: 'virus',
      severity: 'high',
      threat_name: 'Virus.Win32.Sality',
      file_path: 'C:\\Tools\\infected_tool.exe',
      action_taken: 'cleaned',
      detection_method: 'signature',
      status: 'resolved',
      risk_score: 75,
      department: 'IT',
      os_type: 'Windows'
    },
    {
      _time: '2025-04-18T14:22:08.000Z',
      month: '2025-04',
      event_id: 'PP-011',
      endpoint_name: 'MAC-DESIGN-15',
      endpoint_ip: '192.168.1.115',
      user: 'creative.designer',
      threat_type: 'adware',
      severity: 'low',
      threat_name: 'Adware.OSX.SearchBaron',
      file_path: '/Applications/FreeDesignTool.app',
      action_taken: 'removed',
      detection_method: 'heuristic',
      status: 'resolved',
      risk_score: 30,
      department: 'Design',
      os_type: 'macOS'
    },
    {
      _time: '2025-04-12T18:45:22.000Z',
      month: '2025-04',
      event_id: 'PP-012',
      endpoint_name: 'DESKTOP-LEGAL-06',
      endpoint_ip: '192.168.1.106',
      user: 'legal.counsel',
      threat_type: 'trojan',
      severity: 'critical',
      threat_name: 'Trojan.Banker.Zeus',
      file_path: 'C:\\Users\\legal\\Documents\\contract.doc.exe',
      action_taken: 'quarantined',
      detection_method: 'behavioral_analysis',
      status: 'investigating',
      risk_score: 94,
      department: 'Legal',
      os_type: 'Windows'
    },
    {
      _time: '2025-03-25T17:30:55.000Z',
      month: '2025-03',
      event_id: 'PP-013',
      endpoint_name: 'LAPTOP-REMOTE-10',
      endpoint_ip: '10.0.0.110',
      user: 'remote.worker',
      threat_type: 'worm',
      severity: 'high',
      threat_name: 'Worm.Win32.Conficker',
      file_path: 'C:\\Windows\\Temp\\autorun.inf',
      action_taken: 'blocked',
      detection_method: 'signature',
      status: 'resolved',
      risk_score: 82,
      department: 'Remote',
      os_type: 'Windows'
    },
    {
      _time: '2025-03-20T16:22:11.000Z',
      month: '2025-03',
      event_id: 'PP-014',
      endpoint_name: 'DESKTOP-QA-11',
      endpoint_ip: '192.168.1.111',
      user: 'qa.tester',
      threat_type: 'pua',
      severity: 'medium',
      threat_name: 'PUA.Win32.Toolbar',
      file_path: 'C:\\Program Files\\BrowserHelper\\toolbar.dll',
      action_taken: 'removed',
      detection_method: 'reputation',
      status: 'resolved',
      risk_score: 40,
      department: 'QA',
      os_type: 'Windows'
    },
    {
      _time: '2025-02-15T15:18:44.000Z',
      month: '2025-02',
      event_id: 'PP-015',
      endpoint_name: 'SERVER-BACKUP-03',
      endpoint_ip: '192.168.1.203',
      user: 'backup.service',
      threat_type: 'malware',
      severity: 'critical',
      threat_name: 'Malware.Linux.Mirai',
      file_path: '/usr/bin/suspicious_process',
      action_taken: 'isolated',
      detection_method: 'machine_learning',
      status: 'active',
      risk_score: 91,
      department: 'IT',
      os_type: 'Linux'
    }
  ];

  ngOnInit() {
    // Calculate KPI values from data
    setTimeout(() => {
      this.mttValue = this.calculateMeanTimeToResolution();
      this.numberOfOpenedTickets = this.getActiveThreats();
    }, 100);
  }

  // Load data into crossfilter
  cf = crossfilter(this.proofpointEvents);

  // ===============================
  // KPIs (GroupAll) for the header cards
  // ===============================

  // 1. KPI: Total number of critical threats (severity = 'critical')
  criticalThreats = this.cf
    .groupAll()
    .reduceSum((d) => (d.severity === 'critical' ? 1 : 0));

  // 2. KPI: Total number of active threats (status = 'active' or 'investigating')
  activeThreats = this.cf
    .groupAll()
    .reduceSum((d) => (d.status === 'active' || d.status === 'investigating' ? 1 : 0));

  // 3. KPI: Total number of quarantined/isolated threats
  containedThreats = this.cf
    .groupAll()
    .reduceSum((d) => (d.action_taken === 'quarantined' || d.action_taken === 'isolated' ? 1 : 0));

  // 4. KPI: High-risk threats (risk_score >= 80)
  highRiskThreats = this.cf
    .groupAll()
    .reduceSum((d) => (d.risk_score >= 80 ? 1 : 0));

  // ===============================
  // Dimensions and Groups for charts
  // ===============================

  // Dimension by threat type
  threatTypeDimension = this.cf.dimension((d) => d.threat_type);
  // Bar chart: Distribution of threats by type
  threatsByType = this.threatTypeDimension.group();

  // Dimension by severity
  severityDimension = this.cf.dimension((d) => d.severity);
  // Pie chart: Distribution of threats by severity
  threatsBySeverity = this.severityDimension.group();

  // Dimension by action taken
  actionDimension = this.cf.dimension((d) => d.action_taken);
  // Bar chart: Actions taken on threats
  threatsByAction = this.actionDimension.group();

  // Dimension by detection method
  detectionMethodDimension = this.cf.dimension((d) => d.detection_method);
  // Bar chart: Threats by detection method
  threatsByDetectionMethod = this.detectionMethodDimension.group();

  // Dimension by department
  departmentDimension = this.cf.dimension((d) => d.department);
  // Bar chart: Most affected departments
  threatsByDepartment = this.departmentDimension.group();

  // Dimension by OS type
  osTypeDimension = this.cf.dimension((d) => d.os_type);
  // Bar chart: Threats by operating system
  threatsByOsType = this.osTypeDimension.group();

  // Dimension by status
  statusDimension = this.cf.dimension((d) => d.status);
  // Bar chart: Threat status distribution
  threatsByStatus = this.statusDimension.group();

  // Dimension by month (for time series)
  monthDimension = this.cf.dimension((d) => d.month);
  // Line chart: Temporal evolution of threats
  threatsByMonth = this.monthDimension.group().reduceCount();

  // Dimension by risk range (for analysis)
  riskRangeDimension = this.cf.dimension((d) => {
    if (d.risk_score >= 90) return 'Critical Risk (90+)';
    if (d.risk_score >= 70) return 'High Risk (70-89)';
    if (d.risk_score >= 50) return 'Medium Risk (50-69)';
    return 'Low Risk (<50)';
  });
  // Bar chart: Distribution by risk range
  threatsByRiskRange = this.riskRangeDimension.group();

  getCf() {
    return this.cf;
  }

  // Helper methods for KPI calculations
  private calculateMeanTimeToResolution(): number {
    // Mock calculation - in real scenario, you'd calculate based on resolution time
    const resolvedThreats = this.proofpointEvents.filter(event => event.status === 'resolved');
    return resolvedThreats.length > 0 ? Math.round(24 / resolvedThreats.length * 10) / 10 : 0;
  }

  private getActiveThreats(): number {
    return this.proofpointEvents.filter(event => 
      event.status === 'active' || event.status === 'investigating'
    ).length;
  }
}