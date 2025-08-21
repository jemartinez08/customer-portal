import { AfterViewInit, Component, OnInit } from '@angular/core';
// Charts and graphics libraries
// Importamos las librerías
import crossfilter from 'crossfilter2';
import * as dc from 'dc';
import * as d3 from 'd3';

// Local Imports
import { ServicenowService } from '../../services/servicenow.service';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-servicenow-test',
  imports: [],
  templateUrl: './servicenow-test.component.html',
  styleUrl: './servicenow-test.component.css',
})
export class ServicenowTestComponent implements OnInit {
  data: any;

  constructor(private servicenowService: ServicenowService) {}

  ngOnInit(): void {
    this.loadData();
  }

  // All chart definition of ServiceNow dashboard part
  initCharts() {
    // api data from servicenow
    const apiData = this.data.result;
    console.log('Datos de la api: ', apiData);

    // 1. Initialize crossfilter
    const ndx = crossfilter(apiData);

    // 2. Create dimentions
    const numberDim = ndx.dimension((d: any) => d.priority);
    const priorityDim = ndx.dimension((d: any) => d.priority);
    const openedDim = ndx.dimension((d: any) => d.opened_at);
    const closedDim = ndx.dimension((d: any) => d.closed_at);
    const stateDim = ndx.dimension((d: any) => d.state);
    const subcategoryDim = ndx.dimension((d: any) => d.subcategory);
    const severityDim = ndx.dimension((d: any) => d.severity);
    const closeCodeDim = ndx.dimension((d: any) => d.close_code);

    // 3. Create groups
    const priorityGroup = priorityDim.group();
    const stateGroup = stateDim.group();
    const subcategoryGroup = subcategoryDim.group();
    const severityGroup = severityDim.group();
    const closeCodeGroup = closeCodeDim.group();

    // Pie chart by priotiry
    const priorityChart = dc.pieChart('#priority-chart');
    priorityChart
      .dimension(priorityDim)
      .group(priorityGroup)
      .innerRadius(30)
      .legend(dc.legend());

    // Table of incidents
    const incidentTable = dc.dataTable('#incident-table');
    incidentTable
      .dimension(numberDim)
      .columns([
        'number',
        'priority',
        'opened_at',
        'state',
        'severity',
        'subcategory',
      ])
      .sortBy((d: any) => d.number)
      .order(d3.ascending)
      .size(Infinity);

    // Render all the graphic items
    dc.renderAll();
  }

  loadData() {
    const payload = {
      instanceUrl: environment.servicenow.instanceUrl,
      username: environment.servicenow.username,
      password: environment.servicenow.password,
      table: 'incident',
      queryParams: {
        sysparm_limit: 50,
      },
    };

    this.servicenowService.queryServiceNow(payload).subscribe({
      next: (res) => {
        this.data = res;
        this.initCharts();
      },
      error: (err) => {
        console.error('Error al consultar ServiceNow:', err);
      },
    });
  }
}
