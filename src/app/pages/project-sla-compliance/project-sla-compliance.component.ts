import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { SlaCardComponent } from '../../components/sla-card/sla-card.component';
import crossfilter from 'crossfilter2';
import { SlaSingleCardComponent } from "../../components/sla-single-card/sla-single-card.component";

@Component({
  selector: 'app-project-sla-compliance',
  imports: [HeaderComponent, SlaCardComponent, SlaSingleCardComponent],
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
  // KPI Groups por criticality
  // MTTD
  mttdGroupLow = this.cf.groupAll().reduceSum((d) => d.criticality === 'Low' ? d.detection_time : 0);
  mttdGroupMedium = this.cf.groupAll().reduceSum((d) => d.criticality === 'Medium' ? d.detection_time : 0);
  mttdGroupHigh = this.cf.groupAll().reduceSum((d) => d.criticality === 'High' ? d.detection_time : 0);
  mttdGroupCritical = this.cf.groupAll().reduceSum((d) => d.criticality === 'Critical' ? d.detection_time : 0);

  // MTTR
  mttrGroupLow = this.cf.groupAll().reduceSum((d) => d.criticality === 'Low' ? d.response_time : 0);
  mttrGroupMedium = this.cf.groupAll().reduceSum((d) => d.criticality === 'Medium' ? d.response_time : 0);
  mttrGroupHigh = this.cf.groupAll().reduceSum((d) => d.criticality === 'High' ? d.response_time : 0);
  mttrGroupCritical = this.cf.groupAll().reduceSum((d) => d.criticality === 'Critical' ? d.response_time : 0);

  // MTTRs
  mttrsGroupLow = this.cf.groupAll().reduceSum((d) => d.criticality === 'Low' ? d.resolve_time : 0);
  mttrsGroupMedium = this.cf.groupAll().reduceSum((d) => d.criticality === 'Medium' ? d.resolve_time : 0);
  mttrsGroupHigh = this.cf.groupAll().reduceSum((d) => d.criticality === 'High' ? d.resolve_time : 0);
  mttrsGroupCritical = this.cf.groupAll().reduceSum((d) => d.criticality === 'Critical' ? d.resolve_time : 0);

  // False Positive Rate
  falsePositiveRateGroupLow = this.cf.groupAll().reduceSum((d) => d.criticality === 'Low' && d.false_positive ? 1 : 0);
  falsePositiveRateGroupMedium = this.cf.groupAll().reduceSum((d) => d.criticality === 'Medium' && d.false_positive ? 1 : 0);
  falsePositiveRateGroupHigh = this.cf.groupAll().reduceSum((d) => d.criticality === 'High' && d.false_positive ? 1 : 0);
  falsePositiveRateGroupCritical = this.cf.groupAll().reduceSum((d) => d.criticality === 'Critical' && d.false_positive ? 1 : 0);

  // Breached SLA Tickets
  breachedTicketsGroupLow = this.cf.groupAll().reduceSum((d) => d.criticality === 'Low' && d.breached ? 1 : 0);
  breachedTicketsGroupMedium = this.cf.groupAll().reduceSum((d) => d.criticality === 'Medium' && d.breached ? 1 : 0);
  breachedTicketsGroupHigh = this.cf.groupAll().reduceSum((d) => d.criticality === 'High' && d.breached ? 1 : 0);
  breachedTicketsGroupCritical = this.cf.groupAll().reduceSum((d) => d.criticality === 'Critical' && d.breached ? 1 : 0);

  // Covered Endpoints
  coveredEndpointsGroupLow = this.cf.groupAll().reduceSum((d) => d.criticality === 'Low' && d.endpoint_covered ? 1 : 0);
  coveredEndpointsGroupMedium = this.cf.groupAll().reduceSum((d) => d.criticality === 'Medium' && d.endpoint_covered ? 1 : 0);
  coveredEndpointsGroupHigh = this.cf.groupAll().reduceSum((d) => d.criticality === 'High' && d.endpoint_covered ? 1 : 0);
  coveredEndpointsGroupCritical = this.cf.groupAll().reduceSum((d) => d.criticality === 'Critical' && d.endpoint_covered ? 1 : 0);
}
