import { Component } from '@angular/core';
import { HeaderCardComponent } from '../../components/header-card/header-card.component';
import { HeaderComponent } from '../../components/header/header.component';
import { SlaCardComponent } from '../../components/sla-card/sla-card.component';
import crossfilter from 'crossfilter2';

@Component({
  selector: 'app-project-sla-compliance',
  imports: [HeaderComponent, HeaderCardComponent, SlaCardComponent],
  templateUrl: './project-sla-compliance.component.html',
  styleUrl: './project-sla-compliance.component.css',
})
export class ProjectSlaComplianceComponent {
  isMainKPI: boolean = true;
  notMainKpi: boolean = false;
  mttValue: number = 0;
  numberOfOpenedTickets: number = 0;

  // Mock SLA compliance data
  slaData = [
    {
      ticket_id: 'SLA-001',
      criticality: 'Critical',
      detection_time: 2,
      response_time: 4,
      resolve_time: 8,
      false_positive: false,
      breached: false,
      endpoint_covered: true,
    },
    {
      ticket_id: 'SLA-002',
      criticality: 'High',
      detection_time: 3,
      response_time: 6,
      resolve_time: 12,
      false_positive: false,
      breached: true,
      endpoint_covered: true,
    },
    {
      ticket_id: 'SLA-003',
      criticality: 'Medium',
      detection_time: 5,
      response_time: 10,
      resolve_time: 20,
      false_positive: true,
      breached: false,
      endpoint_covered: false,
    },
    {
      ticket_id: 'SLA-004',
      criticality: 'Critical',
      detection_time: 1,
      response_time: 2,
      resolve_time: 5,
      false_positive: false,
      breached: false,
      endpoint_covered: true,
    },
    {
      ticket_id: 'SLA-005',
      criticality: 'Low',
      detection_time: 8,
      response_time: 16,
      resolve_time: 30,
      false_positive: true,
      breached: true,
      endpoint_covered: false,
    },
    {
      ticket_id: 'SLA-006',
      criticality: 'High',
      detection_time: 4,
      response_time: 7,
      resolve_time: 15,
      false_positive: false,
      breached: false,
      endpoint_covered: true,
    },
    {
      ticket_id: 'SLA-007',
      criticality: 'Critical',
      detection_time: 2,
      response_time: 3,
      resolve_time: 7,
      false_positive: false,
      breached: false,
      endpoint_covered: true,
    },
    {
      ticket_id: 'SLA-008',
      criticality: 'Medium',
      detection_time: 6,
      response_time: 12,
      resolve_time: 25,
      false_positive: true,
      breached: false,
      endpoint_covered: false,
    },
    {
      ticket_id: 'SLA-009',
      criticality: 'Low',
      detection_time: 9,
      response_time: 18,
      resolve_time: 35,
      false_positive: false,
      breached: true,
      endpoint_covered: false,
    },
    {
      ticket_id: 'SLA-010',
      criticality: 'High',
      detection_time: 3,
      response_time: 5,
      resolve_time: 10,
      false_positive: false,
      breached: false,
      endpoint_covered: true,
    },
  ];

  cf = crossfilter(this.slaData);

  // KPI Groups
  // KPI Groups (reduceSum/reduceCount style)
  // 1. MTTD: Mean Time to Detect
  mttdGroup = this.cf.groupAll().reduceSum((d) => d.detection_time);

  // 2. MTTR: Mean Time to Respond
  mttrGroup = this.cf.groupAll().reduceSum((d) => d.response_time);

  // 3. MTTRs: Mean Time to Resolve
  mttrsGroup = this.cf.groupAll().reduceSum((d) => d.resolve_time);

  // 4. False Positive Rate (count of false positives)
  falsePositiveRateGroup = this.cf.groupAll().reduceSum((d) => d.false_positive ? 1 : 0);

  // 5. Breached SLA Tickets (count of breached)
  breachedTicketsGroup = this.cf.groupAll().reduceSum((d) => d.breached ? 1 : 0);

  // 6. Covered Endpoints (count of covered)
  coveredEndpointsGroup = this.cf.groupAll().reduceSum((d) => d.endpoint_covered ? 1 : 0);
}
