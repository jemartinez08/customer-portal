import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { SlaCardComponent } from '../../components/sla-card/sla-card.component';
import crossfilter from 'crossfilter2';
import { SlaSingleCardComponent } from '../../components/sla-single-card/sla-single-card.component';
import { ApiService } from '../../api/api.service';
import { AiSummaryAdvertisementComponent } from "../../components/ui/ai-summary-advertisement/ai-summary-advertisement.component";

export type Criticality = 'Low' | 'Medium' | 'High' | 'Critical';

export interface SlaData {
  ticket_id: string;
  criticality: Criticality;
  detection_time: number; // en horas
  response_time: number; // en horas
  resolve_time: number; // en horas
  false_positive: boolean;
  breached: boolean;
  endpoint_covered: boolean;
}

@Component({
  selector: 'app-project-sla-compliance',
  imports: [HeaderComponent, SlaCardComponent, SlaSingleCardComponent, AiSummaryAdvertisementComponent],
  templateUrl: './project-sla-compliance.component.html',
  styleUrl: './project-sla-compliance.component.css',
})
export class ProjectSlaComplianceComponent implements OnInit {
  isMainKPI: boolean = true;
  notMainKpi: boolean = false;
  mttValue: number = 0;
  numberOfOpenedTickets: number = 0;

  constructor(private apiService: ApiService) {}

  slaData: SlaData[] = [];

  ngOnInit(): void {
    this.apiService.get('/project-sla-compliance').subscribe({
      next: (response: any) => {
        if (response) {
          this.slaData = response;
          // Inicializar crossfilter solo cuando tengamos datos válidos
          this.initializeCrossfilter(this.slaData);
        } else {
          console.error('Invalid response format:', response);
        }
      },
      error: (err) => console.error('Error fetching data:', err),
    });
  }

  cf: any;
  // KPI Groups por criticality
  mttdGroupLow: any;
  mttdGroupMedium: any;
  mttdGroupHigh: any;
  mttdGroupCritical: any;
  mttrGroupLow: any;
  mttrGroupMedium: any;
  mttrGroupHigh: any;
  mttrGroupCritical: any;
  mttrsGroupLow: any;
  mttrsGroupMedium: any;
  mttrsGroupHigh: any;
  mttrsGroupCritical: any;
  falsePositiveRateGroupLow: any;
  falsePositiveRateGroupMedium: any;
  falsePositiveRateGroupHigh: any;
  falsePositiveRateGroupCritical: any;
  breachedTicketsGroupLow: any;
  breachedTicketsGroupMedium: any;
  breachedTicketsGroupHigh: any;
  breachedTicketsGroupCritical: any;
  coveredEndpointsGroupLow: any;
  coveredEndpointsGroupMedium: any;
  coveredEndpointsGroupHigh: any;
  coveredEndpointsGroupCritical: any;

  private initializeCrossfilter(events: SlaData[]) {
    this.cf = crossfilter(this.slaData);

    // KPI Groups
    // KPI Groups por criticality
    // MTTD
    this.mttdGroupLow = this.cf
      .groupAll()
      .reduceSum((d: any) => (d.criticality === 'Low' ? d.detection_time : 0));
    this.mttdGroupMedium = this.cf
      .groupAll()
      .reduceSum((d: any) =>
        d.criticality === 'Medium' ? d.detection_time : 0
      );
    this.mttdGroupHigh = this.cf
      .groupAll()
      .reduceSum((d: any) => (d.criticality === 'High' ? d.detection_time : 0));
    this.mttdGroupCritical = this.cf
      .groupAll()
      .reduceSum((d: any) =>
        d.criticality === 'Critical' ? d.detection_time : 0
      );

    // MTTR
    this.mttrGroupLow = this.cf
      .groupAll()
      .reduceSum((d: any) => (d.criticality === 'Low' ? d.response_time : 0));
    this.mttrGroupMedium = this.cf
      .groupAll()
      .reduceSum((d: any) =>
        d.criticality === 'Medium' ? d.response_time : 0
      );
    this.mttrGroupHigh = this.cf
      .groupAll()
      .reduceSum((d: any) => (d.criticality === 'High' ? d.response_time : 0));
    this.mttrGroupCritical = this.cf
      .groupAll()
      .reduceSum((d: any) =>
        d.criticality === 'Critical' ? d.response_time : 0
      );

    // MTTRs
    this.mttrsGroupLow = this.cf
      .groupAll()
      .reduceSum((d: any) => (d.criticality === 'Low' ? d.resolve_time : 0));
    this.mttrsGroupMedium = this.cf
      .groupAll()
      .reduceSum((d: any) => (d.criticality === 'Medium' ? d.resolve_time : 0));
    this.mttrsGroupHigh = this.cf
      .groupAll()
      .reduceSum((d: any) => (d.criticality === 'High' ? d.resolve_time : 0));
    this.mttrsGroupCritical = this.cf
      .groupAll()
      .reduceSum((d: any) =>
        d.criticality === 'Critical' ? d.resolve_time : 0
      );

    // False Positive Rate
    this.falsePositiveRateGroupLow = this.cf
      .groupAll()
      .reduceSum((d: any) =>
        d.criticality === 'Low' && d.false_positive ? 1 : 0
      );
    this.falsePositiveRateGroupMedium = this.cf
      .groupAll()
      .reduceSum((d: any) =>
        d.criticality === 'Medium' && d.false_positive ? 1 : 0
      );
    this.falsePositiveRateGroupHigh = this.cf
      .groupAll()
      .reduceSum((d: any) =>
        d.criticality === 'High' && d.false_positive ? 1 : 0
      );
    this.falsePositiveRateGroupCritical = this.cf
      .groupAll()
      .reduceSum((d: any) =>
        d.criticality === 'Critical' && d.false_positive ? 1 : 0
      );

    // Breached SLA Tickets
    this.breachedTicketsGroupLow = this.cf
      .groupAll()
      .reduceSum((d: any) => (d.criticality === 'Low' && d.breached ? 1 : 0));
    this.breachedTicketsGroupMedium = this.cf
      .groupAll()
      .reduceSum((d: any) =>
        d.criticality === 'Medium' && d.breached ? 1 : 0
      );
    this.breachedTicketsGroupHigh = this.cf
      .groupAll()
      .reduceSum((d: any) => (d.criticality === 'High' && d.breached ? 1 : 0));
    this.breachedTicketsGroupCritical = this.cf
      .groupAll()
      .reduceSum((d: any) =>
        d.criticality === 'Critical' && d.breached ? 1 : 0
      );

    // Covered Endpoints
    this.coveredEndpointsGroupLow = this.cf
      .groupAll()
      .reduceSum((d: any) =>
        d.criticality === 'Low' && d.endpoint_covered ? 1 : 0
      );
    this.coveredEndpointsGroupMedium = this.cf
      .groupAll()
      .reduceSum((d: any) =>
        d.criticality === 'Medium' && d.endpoint_covered ? 1 : 0
      );
    this.coveredEndpointsGroupHigh = this.cf
      .groupAll()
      .reduceSum((d: any) =>
        d.criticality === 'High' && d.endpoint_covered ? 1 : 0
      );
    this.coveredEndpointsGroupCritical = this.cf
      .groupAll()
      .reduceSum((d: any) =>
        d.criticality === 'Critical' && d.endpoint_covered ? 1 : 0
      );
  }
}
