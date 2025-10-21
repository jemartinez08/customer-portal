import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { HeaderCardComponent } from '../../components/header-card/header-card.component';
import { PiechartComponent } from '../../components/custom/piechart/piechart.component';
import { CustomLinechartComponent } from '../../components/custom/custom-linechart/custom-linechart.component';
import { CustomBarchartComponent } from '../../components/custom/custom-barchart/custom-barchart.component';
import { AiSummaryAdvertisementComponent } from '../../components/ui/ai-summary-advertisement/ai-summary-advertisement.component';

import { ChartDataService } from '../../services/chart-data.service';

import crossfilter from 'crossfilter2';
import * as dc from 'dc';
import * as d3 from 'd3';
import { DataDropdownComponent } from "../../components/custom/data-dropdown/data-dropdown.component";

@Component({
  selector: 'app-itsm-servicenow',
  imports: [
    CustomBarchartComponent,
    HeaderCardComponent,
    HeaderComponent,
    PiechartComponent,
    CustomLinechartComponent,
    DataDropdownComponent,
    AiSummaryAdvertisementComponent
],
  templateUrl: './itsm-servicenow.component.html',
  styleUrl: './itsm-servicenow.component.css',
})
export class ItsmServicenowComponent implements OnInit {
  isMainKPI: boolean = true;
  notMainKpi: boolean = false;
  mttValue: number = 0;
  numberOfOpenedTickets: number = 0;
  filteredData: any;

  constructor(public chartService: ChartDataService) {}

  tickets = [
    {
      number: 'INC0000039',
      opened_at: '2025-03-28 00:41:01',
      month: '2025-03',
      priority: '5',
      state: '1',
      severity: '3',
      urgency: '3',
      category: 'network',
      assignment_group: '287ebd7da9fe198100f92cc8d1d2154e',
    },
    {
      number: 'INC0008001',
      opened_at: '2021-01-15 21:04:14',
      month: '2021-01',
      priority: '5',
      state: '1',
      severity: '3',
      urgency: '3',
      category: 'inquiry',
      assignment_group: null,
    },
    {
      number: 'INC0008112',
      opened_at: '2019-07-29 18:48:43',
      month: '2019-07',
      priority: '5',
      state: '1',
      severity: '3',
      urgency: '3',
      category: 'inquiry',
      assignment_group: null,
    },
    {
      number: 'INC0009009',
      opened_at: '2018-08-30 08:06:16',
      month: '2018-08',
      priority: '4',
      state: '1',
      severity: '3',
      urgency: '2',
      category: 'inquiry',
      assignment_group: null,
    },
    {
      number: 'INC0000057',
      opened_at: '2016-08-10 16:14:59',
      month: '2016-08',
      priority: '5',
      state: '1',
      severity: '3',
      urgency: '3',
      category: 'inquiry',
      assignment_group: null,
    },
    {
      number: 'INC0000059',
      opened_at: '2016-08-10 16:14:29',
      month: '2016-08',
      priority: '3',
      state: '1',
      severity: '3',
      urgency: '2',
      category: 'inquiry',
      assignment_group: null,
    },
    {
      number: 'INC0000058',
      opened_at: '2016-08-10 16:37:45',
      month: '2016-08',
      priority: '5',
      state: '1',
      severity: '3',
      urgency: '3',
      category: 'inquiry',
      assignment_group: null,
    },
    {
      number: 'INC0009001',
      opened_at: '2018-09-12 03:56:26',
      month: '2018-09',
      priority: '3',
      state: '1',
      severity: '3',
      urgency: '2',
      category: 'inquiry',
      assignment_group: null,
    },
    {
      number: 'INC0008111',
      opened_at: '2019-07-22 21:04:57',
      month: '2019-07',
      priority: '5',
      state: '1',
      severity: '3',
      urgency: '3',
      category: 'inquiry',
      assignment_group: null,
    },
    {
      number: 'INC0009005',
      opened_at: '2018-09-01 04:35:21',
      month: '2018-09',
      priority: '1',
      state: '1',
      severity: '1',
      urgency: '1',
      category: 'software',
      assignment_group: null,
    },
    {
      number: 'INC0007001',
      opened_at: '2018-10-17 05:47:10',
      month: '2018-10',
      priority: '1',
      state: '1',
      severity: '3',
      urgency: '1',
      category: 'hardware',
      assignment_group: '36c741fa731313005754660c4cf6a70d',
    },
    {
      number: 'INC0007002',
      opened_at: '2018-10-17 05:47:51',
      month: '2018-10',
      priority: '4',
      state: '1',
      severity: '3',
      urgency: '2',
      category: 'inquiry',
      assignment_group: null,
    },
    {
      number: 'INC0000025',
      opened_at: '2025-03-04 23:53:46',
      month: '2025-03',
      priority: '1',
      state: '2',
      severity: '3',
      urgency: '1',
      category: 'hardware',
      assignment_group: null,
    },
    {
      number: 'INC0000029',
      opened_at: '2025-03-26 00:00:44',
      month: '2025-03',
      priority: '5',
      state: '2',
      severity: '3',
      urgency: '3',
      category: 'inquiry',
      assignment_group: 'd625dccec0a8016700a222a0f7900d06',
    },
    {
      number: 'INC0000037',
      opened_at: '2025-03-28 00:34:56',
      month: '2025-03',
      priority: '2',
      state: '2',
      severity: '3',
      urgency: '3',
      category: 'inquiry',
      assignment_group: 'd625dccec0a8016700a222a0f7900d06',
    },
    {
      number: 'INC0000016',
      opened_at: '2025-03-06 23:40:23',
      month: '2025-03',
      priority: '1',
      state: '2',
      severity: '3',
      urgency: '1',
      category: 'hardware',
      assignment_group: '8a5055c9c61122780043563ef53438e3',
    },
    {
      number: 'INC0000018',
      opened_at: '2025-03-12 23:42:46',
      month: '2025-03',
      priority: '1',
      state: '2',
      severity: '3',
      urgency: '1',
      category: '',
      assignment_group: null,
    },
    {
      number: 'INC0000015',
      opened_at: '2025-03-11 23:38:46',
      month: '2025-03',
      priority: '1',
      state: '2',
      severity: '3',
      urgency: '1',
      category: 'software',
      assignment_group: '8a4dde73c6112278017a6a4baf547aa7',
    },
    {
      number: 'INC0000003',
      opened_at: '2025-03-26 23:07:30',
      month: '2025-03',
      priority: '1',
      state: '2',
      severity: '2',
      urgency: '1',
      category: 'network',
      assignment_group: '287ebd7da9fe198100f92cc8d1d2154e',
    },
    {
      number: 'INC0000044',
      opened_at: '2025-03-28 00:47:08',
      month: '2025-03',
      priority: '2',
      state: '2',
      severity: '3',
      urgency: '2',
      category: '',
      assignment_group: null,
    },
    {
      number: 'INC0000047',
      opened_at: '2025-06-04 20:53:18',
      month: '2025-06',
      priority: '3',
      state: '2',
      severity: '3',
      urgency: '2',
      category: 'inquiry',
      assignment_group: '8a4dde73c6112278017a6a4baf547aa7',
    },
    {
      number: 'INC0000031',
      opened_at: '2025-02-28 00:18:03',
      month: '2025-02',
      priority: '1',
      state: '2',
      severity: '3',
      urgency: '1',
      category: 'inquiry',
      assignment_group: null,
    },
    {
      number: 'INC0000041',
      opened_at: '2025-03-28 00:44:53',
      month: '2025-03',
      priority: '3',
      state: '2',
      severity: '2',
      urgency: '3',
      category: 'hardware',
      assignment_group: null,
    },
    {
      number: 'INC0000049',
      opened_at: '2025-06-04 21:56:37',
      month: '2025-06',
      priority: '2',
      state: '2',
      severity: '2',
      urgency: '1',
      category: 'network',
      assignment_group: '8a5055c9c61122780043563ef53438e3',
    },
    {
      number: 'INC0000050',
      opened_at: '2025-06-04 21:58:24',
      month: '2025-06',
      priority: '1',
      state: '2',
      severity: '3',
      urgency: '1',
      category: 'hardware',
      assignment_group: '8a5055c9c61122780043563ef53438e3',
    },
    {
      number: 'INC0000040',
      opened_at: '2025-03-28 00:42:45',
      month: '2025-03',
      priority: '3',
      state: '3',
      severity: '3',
      urgency: '2',
      category: 'inquiry',
      assignment_group: null,
    },
    {
      number: 'INC0000007',
      opened_at: '2015-08-12 23:08:24',
      month: '2015-08',
      priority: '1',
      state: '3',
      severity: '2',
      urgency: '1',
      category: 'database',
      assignment_group: null,
    },
    {
      number: 'INC0000017',
      opened_at: '2015-08-12 23:41:00',
      month: '2015-08',
      priority: '1',
      state: '3',
      severity: '3',
      urgency: '1',
      category: 'inquiry',
      assignment_group: 'd625dccec0a8016700a222a0f7900d06',
    },
    {
      number: 'INC0000019',
      opened_at: '2025-03-14 23:44:39',
      month: '2025-03',
      priority: '2',
      state: '2',
      severity: '3',
      urgency: '1',
      category: 'software',
      assignment_group: null,
    },
    {
      number: 'INC0000020',
      opened_at: '2025-03-24 23:51:35',
      month: '2025-03',
      priority: '5',
      state: '2',
      severity: '3',
      urgency: '3',
      category: 'inquiry',
      assignment_group: null,
    },
    {
      number: 'INC0000027',
      opened_at: '2025-03-23 23:55:55',
      month: '2025-03',
      priority: '2',
      state: '2',
      severity: '2',
      urgency: '2',
      category: 'software',
      assignment_group: null,
    },
    {
      number: 'INC0000002',
      opened_at: '2025-03-19 23:07:12',
      month: '2025-03',
      priority: '1',
      state: '3',
      severity: '1',
      urgency: '1',
      category: 'network',
      assignment_group: '287ebd7da9fe198100f92cc8d1d2154e',
    },
    {
      number: 'INC0001990',
      opened_at: '2020-06-07 16:02:25',
      month: '2020-06',
      priority: '5',
      state: '3',
      severity: '3',
      urgency: '3',
      category: 'inquiry',
      assignment_group: null,
    },
    {
      number: 'INC0000046',
      opened_at: '2025-06-04 22:04:15',
      month: '2025-06',
      priority: '3',
      state: '1',
      severity: '2',
      urgency: '3',
      category: 'software',
      assignment_group: '8a4dde73c6112278017a6a4baf547aa7',
    },
    {
      number: 'INC0000048',
      opened_at: '2015-11-02 22:05:36',
      month: '2015-11',
      priority: '4',
      state: '3',
      severity: '3',
      urgency: '3',
      category: '',
      assignment_group: null,
    },
    {
      number: 'INC0000051',
      opened_at: '2025-06-04 20:48:32',
      month: '2025-06',
      priority: '1',
      state: '2',
      severity: '1',
      urgency: '1',
      category: 'software',
      assignment_group: '8a4dde73c6112278017a6a4baf547aa7',
    },
    {
      number: 'INC0000052',
      opened_at: '2025-06-04 20:48:40',
      month: '2025-06',
      priority: '1',
      state: '2',
      severity: '3',
      urgency: '1',
      category: 'software',
      assignment_group: '8a4dde73c6112278017a6a4baf547aa7',
    },
    {
      number: 'INC0000053',
      opened_at: '2025-06-04 20:48:46',
      month: '2025-06',
      priority: '1',
      state: '2',
      severity: '1',
      urgency: '1',
      category: 'inquiry',
      assignment_group: '8a4dde73c6112278017a6a4baf547aa7',
    },
    {
      number: 'INC0000055',
      opened_at: '2025-06-05 04:47:23',
      month: '2025-06',
      priority: '1',
      state: '2',
      severity: '1',
      urgency: '1',
      category: '',
      assignment_group: 'd625dccec0a8016700a222a0f7900d06',
    },
    {
      number: 'INC0000054',
      opened_at: '2015-11-02 20:49:08',
      month: '2015-11',
      priority: '1',
      state: '3',
      severity: '3',
      urgency: '1',
      category: 'software',
      assignment_group: 'd625dccec0a8016700a222a0f7900d06',
    },
  ];

  ngOnInit() {
    /* const data = this.chartService.loadData();
    // Cargar datos para
    setTimeout(() => {
      this.filteredData = this.chartService.getKpiData();
      this.mttValue = this.filteredData.data.MTTR;
      this.numberOfOpenedTickets = this.filteredData.data.openedTickets.length;
    }, 1000); */
  }

  // Cargar datos en crossfilter
  cf = crossfilter(this.tickets);

  // Groups for KPIs
  // 1. KPI: Total de incidentes
  totalIncidents = this.cf.groupAll().reduceCount();

  // 2. KPI: Total de incidentes críticos (severity = 1, 2, 3 según tu definición)
  criticalIncidents = this.cf
    .groupAll()
    .reduceSum((d) => (d.severity === '1' ? 1 : 0));

  // 3. KPI: Total de incidentes abiertos (state = 1)
  openIncidents = this.cf
    .groupAll()
    .reduceSum((d) => (d.state === '1' ? 1 : 0));

  // 4. KPI: Total de incidentes por prioridad alta (priority = 1 o 2)
  highPriorityIncidents = this.cf
    .groupAll()
    .reduceSum((d) => (d.priority === '1' || d.priority === '2' ? 1 : 0));

  // 5. KPI: Total por categoría “network”
  networkIncidents = this.cf
    .groupAll()
    .reduceSum((d) => (d.category === 'network' ? 1 : 0));

  // Dimentions and groups ------------------------------
  // Dimensión por prioridad
  priorityDimension = this.cf.dimension((d) => d.priority);
  // Gráfico de barras: Incidentes por prioridad
  incidentsByPriority = this.priorityDimension.group();

  // Dimensión por estado
  stateDimension = this.cf.dimension((d) => d.state);
  // Gráfico de barras: Incidentes por estado
  incidentsByState = this.stateDimension.group();

  // Dimensión por severidad
  severityDimension = this.cf.dimension((d) => d.severity);
  // Gráfico de pastel: Incidentes por severidad
  incidentsBySeverity = this.severityDimension.group();

  // Dimensión por urgencia
  urgencyDimension = this.cf.dimension((d) => d.urgency);
  // Gráfico de barras: Incidentes por urgencia
  incidentsByUrgency = this.urgencyDimension.group();

  // Dimensión por categoría
  categoryDimension = this.cf.dimension((d) => d.category);
  // Gráfico de barras: Incidentes por categoría
  incidentsByCategory = this.categoryDimension.group();

  // Dimensión por grupo de asignación
  assignmentGroupDimension = this.cf.dimension((d: any) => d.assignment_group);
  // Gráfico de barras: Incidentes por grupo de asignación
  incidentsByAssignmentGroup = this.assignmentGroupDimension.group();

  // Dimensión por mes de apertura (para series temporales)
  monthDimension = this.cf.dimension((d) => d.month);
  // Gráfico de línea o serie temporal: Incidentes por mes
  incidentsByMonth = this.monthDimension.group().reduceCount();

  getCf() {
    return this.cf;
  }
}
