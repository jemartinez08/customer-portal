import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { HeaderCardComponent } from '../../components/header-card/header-card.component';
import { CustomBarchartComponent } from '../../components/custom/custom-barchart/custom-barchart.component';
import { PiechartComponent } from '../../components/custom/piechart/piechart.component';
import { CustomLinechartComponent } from '../../components/custom/custom-linechart/custom-linechart.component';

import crossfilter from 'crossfilter2';

@Component({
  selector: 'app-ticket-analysis',
  imports: [
    HeaderComponent,
    HeaderCardComponent,
    CustomBarchartComponent,
    PiechartComponent,
    CustomLinechartComponent,
  ],
  templateUrl: './ticket-analysis.component.html',
  styleUrl: './ticket-analysis.component.css',
})
export class TicketAnalysisComponent implements OnInit {
  isMainKPI: boolean = true;
  notMainKpi: boolean = false;
  mttValue: number = 0;
  numberOfOpenedTickets: number = 0;

  // Mock ticket data
  ticketData = [
    {
      ticket_id: 'TCK-001',
      created: '2025-09-01',
      resolved: '2025-09-02',
      status: 'resolved',
      priority: 'High',
      category: 'Malware',
      assigned_group: 'SOC',
      response_time: 2,
      resolution_time: 8,
      critical: true,
    },
    {
      ticket_id: 'TCK-002',
      created: '2025-09-03',
      resolved: '2025-09-04',
      status: 'resolved',
      priority: 'Medium',
      category: 'Phishing',
      assigned_group: 'IT',
      response_time: 4,
      resolution_time: 12,
      critical: false,
    },
    {
      ticket_id: 'TCK-003',
      created: '2025-09-05',
      resolved: '',
      status: 'open',
      priority: 'Critical',
      category: 'Ransomware',
      assigned_group: 'SOC',
      response_time: 1,
      resolution_time: 0,
      critical: true,
    },
    {
      ticket_id: 'TCK-004',
      created: '2025-09-06',
      resolved: '2025-09-07',
      status: 'resolved',
      priority: 'Low',
      category: 'Access',
      assigned_group: 'Support',
      response_time: 8,
      resolution_time: 24,
      critical: false,
    },
    {
      ticket_id: 'TCK-005',
      created: '2025-09-08',
      resolved: '2025-09-09',
      status: 'resolved',
      priority: 'High',
      category: 'Malware',
      assigned_group: 'SOC',
      response_time: 3,
      resolution_time: 10,
      critical: false,
    },
    {
      ticket_id: 'TCK-006',
      created: '2025-09-10',
      resolved: '',
      status: 'open',
      priority: 'Medium',
      category: 'Phishing',
      assigned_group: 'IT',
      response_time: 5,
      resolution_time: 0,
      critical: false,
    },
    {
      ticket_id: 'TCK-007',
      created: '2025-09-11',
      resolved: '2025-09-12',
      status: 'resolved',
      priority: 'Critical',
      category: 'Ransomware',
      assigned_group: 'SOC',
      response_time: 2,
      resolution_time: 7,
      critical: true,
    },
    {
      ticket_id: 'TCK-008',
      created: '2025-09-13',
      resolved: '2025-09-14',
      status: 'resolved',
      priority: 'Low',
      category: 'Access',
      assigned_group: 'Support',
      response_time: 7,
      resolution_time: 20,
      critical: false,
    },
    {
      ticket_id: 'TCK-009',
      created: '2025-09-15',
      resolved: '',
      status: 'open',
      priority: 'High',
      category: 'Malware',
      assigned_group: 'SOC',
      response_time: 2,
      resolution_time: 0,
      critical: false,
    },
    {
      ticket_id: 'TCK-010',
      created: '2025-09-16',
      resolved: '2025-09-17',
      status: 'resolved',
      priority: 'Medium',
      category: 'Phishing',
      assigned_group: 'IT',
      response_time: 4,
      resolution_time: 11,
      critical: false,
    },
  ];

  cf = crossfilter(this.ticketData);

  // KPI Groups
  meanResolutionTimeGroup = this.cf
    .groupAll()
    .reduceSum((d) => d.resolution_time);
  openTicketsGroup = this.cf
    .groupAll()
    .reduceSum((d) => (d.status === 'open' ? 1 : 0));
  criticalTicketsGroup = this.cf
    .groupAll()
    .reduceSum((d) => (d.critical ? 1 : 0));

  // Dimensions and groups for charts
  priorityDimension = this.cf.dimension((d) => d.priority);
  ticketsByPriority = this.priorityDimension.group();

  categoryDimension = this.cf.dimension((d) => d.category);
  ticketsByCategory = this.categoryDimension.group();

  assignedGroupDimension = this.cf.dimension((d) => d.assigned_group);
  ticketsByAssignedGroup = this.assignedGroupDimension.group();

  statusDimension = this.cf.dimension((d) => d.status);
  ticketsByStatus = this.statusDimension.group();

  // For time series: by created date (simulate by month for simplicity)
  monthDimension = this.cf.dimension((d) => d.created.substring(0, 7));
  ticketsByMonth = this.monthDimension.group().reduceCount();

  ngOnInit() {
    setTimeout(() => {
      // Calculate mean time to resolution for resolved tickets
      const resolved = this.ticketData.filter((t) => t.status === 'resolved');
      this.mttValue =
        resolved.length > 0
          ? Math.round(
              (resolved.reduce((sum, t) => sum + t.resolution_time, 0) /
                resolved.length) *
                10
            ) / 10
          : 0;
      this.numberOfOpenedTickets = this.ticketData.filter(
        (t) => t.status === 'open'
      ).length;
    }, 100);
  }
}
