import { AfterViewInit, Component, OnInit } from '@angular/core';

// Importamos las librerías
import crossfilter from 'crossfilter2';
import * as dc from 'dc';
import * as d3 from 'd3';

@Component({
  selector: 'app-dashboard-test',
  imports: [],
  templateUrl: './dashboard-test.component.html',
  styleUrl: './dashboard-test.component.css',
})
export class DashboardTestComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    // Dataset de ejemplo
    const data = [
      { region: 'Norte', producto: 'A', ventas: 120, idRegion: '8553SDF' },
      { region: 'Sur', producto: 'B', ventas: 80, idRegion: '8553LKH' },
      { region: 'Norte', producto: 'B', ventas: 200, idRegion: '8553IHG' },
      { region: 'Oeste', producto: 'A', ventas: 150, idRegion: '8553NCV' },
      { region: 'Sur', producto: 'A', ventas: 50, idRegion: '8553PQG' },
      { region: 'Oeste', producto: 'C', ventas: 90, idRegion: '8553LAE' },
    ];

    // 1. Inicializar crossfilter
    const ndx = crossfilter(data);

    // 2. Crear dimensiones
    const regionDim = ndx.dimension((d: any) => d.region);
    const productoDim = ndx.dimension((d: any) => d.producto);
    const ventasDim = ndx.dimension((d: any) => d.ventas);
    const idRegionDim = ndx.dimension((d: any) => d.idRegion);

    // 3. Crear grupos
    const regionGroup = regionDim.group().reduceSum((d: any) => d.ventas);
    const productoGroup = productoDim.group().reduceSum((d: any) => d.ventas);
    const idRegionGroup = idRegionDim.group().reduceSum((d: any) => d.ventas);

    // 4. Crear gráficos con DC.js

    // Pie chart por región
    const regionChart = dc.pieChart('#region-chart');
    regionChart
      .dimension(regionDim)
      .group(regionGroup)
      .innerRadius(30)
      .legend(dc.legend());

    // Bar chart por producto
    const productoChart = dc.barChart('#producto-chart');
    productoChart
      .dimension(productoDim)
      .group(productoGroup)
      .x(d3.scaleBand())
      .xUnits(dc.units.ordinal)
      .elasticY(true)
      .brushOn(true);

    const regionRowChart = dc.rowChart('#region-row-chart');
    regionRowChart
      .width(400)
      .height(300)
      .dimension(idRegionDim)
      .group(idRegionGroup)
      .x(
        d3
          .scaleLinear()
          .domain([0, d3.max(regionGroup.all(), (d) => Number(d.value)) ?? 0])
      )
      .elasticX(true)
      .ordering((d: any) => -d.value)
      .rowsCap(10)
      .label((d: any) => d.key)
      .title((d: any) => `${d.key}: ${d.value}`)
      .margins({ top: 20, right: 20, bottom: 20, left: 40 })
      .colors(d3.scaleOrdinal(d3.schemeCategory10));

    // Tabla de ventas
    const ventasTable = dc.dataTable('#ventas-table');
    ventasTable
      .dimension(ventasDim)
      .columns(['region', 'producto', 'ventas'])
      .sortBy((d: any) => d.ventas)
      .order(d3.ascending);

    // 5. Renderizar todo
    dc.renderAll();
  }
}
