import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { HeaderCardComponent } from '../../components/header-card/header-card.component';
import { PiechartComponent } from '../../components/custom/piechart/piechart.component';
import { CustomLinechartComponent } from '../../components/custom/custom-linechart/custom-linechart.component';
import { CustomBarchartComponent } from '../../components/custom/custom-barchart/custom-barchart.component';

import crossfilter from 'crossfilter2';
import * as d3 from 'd3';

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

  constructor() {}

  // Mock array of security events - mimicking a typical Splunk structure
  securityEvents = [
    {
      _time: '2025-09-09T14:30:22.000Z',
      month: '2025-09',
      event_id: 'SEC-001',
      source_ip: '192.168.1.100',
      dest_ip: '10.0.0.50',
      user: 'admin',
      action: 'login_failed',
      severity: 'high',
      threat_category: 'authentication',
      source_type: 'windows_security',
      host: 'DC-01',
      status: 'blocked',
      risk_score: 85,
      country: 'US',
    },
    {
      _time: '2025-09-09T14:25:15.000Z',
      month: '2025-09',
      event_id: 'SEC-002',
      source_ip: '203.0.113.45',
      dest_ip: '10.0.0.100',
      user: 'jsmith',
      action: 'login_success',
      severity: 'low',
      threat_category: 'authentication',
      source_type: 'linux_auth',
      host: 'WEB-01',
      status: 'allowed',
      risk_score: 20,
      country: 'US',
    },
    {
      _time: '2025-09-09T14:20:08.000Z',
      month: '2025-09',
      event_id: 'SEC-003',
      source_ip: '198.51.100.75',
      dest_ip: '10.0.0.25',
      user: 'system',
      action: 'malware_detected',
      severity: 'critical',
      threat_category: 'malware',
      source_type: 'antivirus',
      host: 'CLIENT-05',
      status: 'quarantined',
      risk_score: 95,
      country: 'CN',
    },
    {
      _time: '2025-09-09T14:15:33.000Z',
      month: '2025-09',
      event_id: 'SEC-004',
      source_ip: '172.16.1.200',
      dest_ip: '10.0.0.75',
      user: 'admin',
      action: 'login_success',
      severity: 'medium',
      threat_category: 'authentication',
      source_type: 'windows_security',
      host: 'DC-01',
      status: 'allowed',
      risk_score: 45,
      country: 'US',
    },
    {
      _time: '2025-09-09T14:10:44.000Z',
      month: '2025-09',
      event_id: 'SEC-005',
      source_ip: '203.0.113.88',
      dest_ip: '10.0.0.150',
      user: 'unknown',
      action: 'port_scan',
      severity: 'high',
      threat_category: 'network_attack',
      source_type: 'firewall',
      host: 'FW-01',
      status: 'blocked',
      risk_score: 80,
      country: 'RU',
    },
    {
      _time: '2025-09-09T14:05:12.000Z',
      month: '2025-09',
      event_id: 'SEC-006',
      source_ip: '10.0.0.25',
      dest_ip: '185.199.108.153',
      user: 'mkiller',
      action: 'data_exfiltration',
      severity: 'critical',
      threat_category: 'data_breach',
      source_type: 'dlp',
      host: 'CLIENT-03',
      status: 'blocked',
      risk_score: 98,
      country: 'US',
    },
    {
      _time: '2025-09-09T13:58:27.000Z',
      month: '2025-09',
      event_id: 'SEC-007',
      source_ip: '192.168.1.50',
      dest_ip: '10.0.0.10',
      user: 'jdoe',
      action: 'login_failed',
      severity: 'medium',
      threat_category: 'authentication',
      source_type: 'web_server',
      host: 'WEB-02',
      status: 'blocked',
      risk_score: 55,
      country: 'US',
    },
    {
      _time: '2025-09-09T13:55:18.000Z',
      month: '2025-09',
      event_id: 'SEC-008',
      source_ip: '198.51.100.33',
      dest_ip: '10.0.0.200',
      user: 'system',
      action: 'vulnerability_scan',
      severity: 'low',
      threat_category: 'reconnaissance',
      source_type: 'ids',
      host: 'IDS-01',
      status: 'monitored',
      risk_score: 30,
      country: 'DE',
    },
    {
      _time: '2025-09-09T13:50:41.000Z',
      month: '2025-09',
      event_id: 'SEC-009',
      source_ip: '172.16.2.100',
      dest_ip: '10.0.0.50',
      user: 'admin',
      action: 'privilege_escalation',
      severity: 'critical',
      threat_category: 'privilege_abuse',
      source_type: 'windows_security',
      host: 'SERVER-01',
      status: 'blocked',
      risk_score: 92,
      country: 'US',
    },
    {
      _time: '2025-09-09T13:45:29.000Z',
      month: '2025-09',
      event_id: 'SEC-010',
      source_ip: '203.0.113.99',
      dest_ip: '10.0.0.300',
      user: 'guest',
      action: 'brute_force',
      severity: 'high',
      threat_category: 'authentication',
      source_type: 'ssh_logs',
      host: 'SSH-01',
      status: 'blocked',
      risk_score: 88,
      country: 'BR',
    },
    {
      _time: '2025-09-08T16:30:15.000Z',
      month: '2025-09',
      event_id: 'SEC-011',
      source_ip: '192.168.1.75',
      dest_ip: '10.0.0.125',
      user: 'bsmith',
      action: 'login_success',
      severity: 'low',
      threat_category: 'authentication',
      source_type: 'web_server',
      host: 'WEB-01',
      status: 'allowed',
      risk_score: 15,
      country: 'US',
    },
    {
      _time: '2025-09-08T15:45:33.000Z',
      month: '2025-09',
      event_id: 'SEC-012',
      source_ip: '198.51.100.120',
      dest_ip: '10.0.0.175',
      user: 'unknown',
      action: 'sql_injection',
      severity: 'critical',
      threat_category: 'web_attack',
      source_type: 'waf',
      host: 'WAF-01',
      status: 'blocked',
      risk_score: 96,
      country: 'KP',
    },
    {
      _time: '2025-09-08T14:22:08.000Z',
      month: '2025-09',
      event_id: 'SEC-013',
      source_ip: '172.16.3.50',
      dest_ip: '10.0.0.250',
      user: 'service_account',
      action: 'file_integrity_violation',
      severity: 'medium',
      threat_category: 'file_system',
      source_type: 'fim',
      host: 'FILE-01',
      status: 'alert',
      risk_score: 60,
      country: 'US',
    },
    {
      _time: '2025-09-08T13:15:47.000Z',
      month: '2025-09',
      event_id: 'SEC-014',
      source_ip: '203.0.113.200',
      dest_ip: '10.0.0.400',
      user: 'admin',
      action: 'login_failed',
      severity: 'high',
      threat_category: 'authentication',
      source_type: 'vpn_logs',
      host: 'VPN-01',
      status: 'blocked',
      risk_score: 75,
      country: 'IR',
    },
    {
      _time: '2025-09-08T12:08:19.000Z',
      month: '2025-09',
      event_id: 'SEC-015',
      source_ip: '192.168.2.30',
      dest_ip: '10.0.0.80',
      user: 'mwilson',
      action: 'login_success',
      severity: 'low',
      threat_category: 'authentication',
      source_type: 'linux_auth',
      host: 'LINUX-02',
      status: 'allowed',
      risk_score: 25,
      country: 'US',
    },
    {
      _time: '2025-09-07T18:45:22.000Z',
      month: '2025-09',
      event_id: 'SEC-016',
      source_ip: '198.51.100.250',
      dest_ip: '10.0.0.500',
      user: 'unknown',
      action: 'ddos_attack',
      severity: 'critical',
      threat_category: 'network_attack',
      source_type: 'ddos_protection',
      host: 'EDGE-01',
      status: 'mitigated',
      risk_score: 99,
      country: 'CN',
    },
    {
      _time: '2025-09-07T17:30:55.000Z',
      month: '2025-09',
      event_id: 'SEC-017',
      source_ip: '172.16.4.75',
      dest_ip: '10.0.0.350',
      user: 'backup_user',
      action: 'unauthorized_access',
      severity: 'high',
      threat_category: 'access_control',
      source_type: 'access_logs',
      host: 'BACKUP-01',
      status: 'blocked',
      risk_score: 82,
      country: 'US',
    },
    {
      _time: '2025-09-07T16:22:11.000Z',
      month: '2025-09',
      event_id: 'SEC-018',
      source_ip: '203.0.113.150',
      dest_ip: '10.0.0.600',
      user: 'contractor',
      action: 'policy_violation',
      severity: 'medium',
      threat_category: 'policy',
      source_type: 'security_audit',
      host: 'AUDIT-01',
      status: 'flagged',
      risk_score: 50,
      country: 'IN',
    },
    {
      _time: '2025-09-07T15:18:44.000Z',
      month: '2025-09',
      event_id: 'SEC-019',
      source_ip: '192.168.3.100',
      dest_ip: '10.0.0.90',
      user: 'admin',
      action: 'login_success',
      severity: 'medium',
      threat_category: 'authentication',
      source_type: 'windows_security',
      host: 'DC-02',
      status: 'allowed',
      risk_score: 40,
      country: 'US',
    },
    {
      _time: '2025-09-07T14:12:33.000Z',
      month: '2025-09',
      event_id: 'SEC-020',
      source_ip: '198.51.100.300',
      dest_ip: '10.0.0.700',
      user: 'anonymous',
      action: 'phishing_attempt',
      severity: 'critical',
      threat_category: 'email_security',
      source_type: 'email_gateway',
      host: 'MAIL-01',
      status: 'quarantined',
      risk_score: 94,
      country: 'NG',
    },
  ];

  ngOnInit() {
    // Initialization if needed
  }

  // Load data into crossfilter
  cf = crossfilter(this.securityEvents);

  // ===============================
  // KPIs (GroupAll) for the header cards
  // ===============================

  // 1. KPI: Total number of critical events (severity = 'critical')
  criticalEvents = this.cf
    .groupAll()
    .reduceSum((d) => (d.severity === 'critical' ? 1 : 0));

  // 2. KPI: Total number of blocked/mitigated events
  blockedEvents = this.cf
    .groupAll()
    .reduceSum((d) =>
      d.status === 'blocked' ||
      d.status === 'quarantined' ||
      d.status === 'mitigated'
        ? 1
        : 0
    );

  // 3. KPI: Total number of failed login attempts
  failedLogins = this.cf
    .groupAll()
    .reduceSum((d) =>
      d.action === 'login_failed' || d.action === 'brute_force' ? 1 : 0
    );

  // 4. KPI: High-risk events (risk_score >= 80)
  highRiskEvents = this.cf
    .groupAll()
    .reduceSum((d) => (d.risk_score >= 80 ? 1 : 0));

  // ===============================
  // Dimensions and Groups for charts
  // ===============================

  // Dimension by severity
  severityDimension = this.cf.dimension((d) => d.severity);
  // Pie chart: Distribution of events by severity
  eventsBySeverity = this.severityDimension.group();

  // Dimension by threat category
  threatCategoryDimension = this.cf.dimension((d) => d.threat_category);
  // Bar chart: Events by threat category
  eventsByThreatCategory = this.threatCategoryDimension.group();

  // Dimension by action type
  actionDimension = this.cf.dimension((d) => d.action);
  // Bar chart: Most common action/event types
  eventsByAction = this.actionDimension.group();

  // Dimension by event status
  statusDimension = this.cf.dimension((d) => d.status);
  // Bar chart: Event statuses (blocked, allowed, etc.)
  eventsByStatus = this.statusDimension.group();

  // Dimension by source type
  sourceTypeDimension = this.cf.dimension((d) => d.source_type);
  // Bar chart: Events by source type
  eventsBySourceType = this.sourceTypeDimension.group();

  // Dimension by host/system affected
  hostDimension = this.cf.dimension((d) => d.host);
  // Bar chart: Most affected systems
  eventsByHost = this.hostDimension.group();

  // Dimension by country of origin
  countryDimension = this.cf.dimension((d) => d.country);
  // Bar chart: Events by country of origin
  eventsByCountry = this.countryDimension.group();

  // Dimension by month (for time series)
  monthDimension = this.cf.dimension((d) => d.month);
  // Line chart: Temporal evolution of events
  eventsByMonth = this.monthDimension.group().reduceCount();

  // Dimension by date (for more detailed time series)
  dateDimension = this.cf.dimension((d) => new Date(d._time));
  // Line chart: Temporal evolution of events by date
  eventsByDate = this.dateDimension.group(d3.timeDay).reduceCount();

  // Dimension by risk range (for analysis)
  riskRangeDimension = this.cf.dimension((d) => {
    if (d.risk_score >= 90) return 'Critical Risk';
    if (d.risk_score >= 70) return 'High Risk';
    if (d.risk_score >= 50) return 'Medium Risk';
    return 'Low Risk';
  });
  // Bar chart: Distribution by risk range
  eventsByRiskRange = this.riskRangeDimension.group();

  // Dimension by login success vs failed
  loginStatusDimension = this.cf.dimension((d) => {
    if (d.action === 'login_success') return 'Success';
    if (d.action === 'login_failed' || d.action === 'brute_force')
      return 'Failed';
    return 'Other';
  });
  // Bar chart: Login success vs failed
  loginsByStatus = this.loginStatusDimension.group();

  getCf() {
    return this.cf;
  }
}
