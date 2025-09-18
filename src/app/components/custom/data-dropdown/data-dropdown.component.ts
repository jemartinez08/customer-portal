import {
  Component,
  Input,
  OnChanges,
  AfterViewInit,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItsmServicenowComponent } from '../../../pages/itsm-servicenow/itsm-servicenow.component';

import crossfilter from 'crossfilter2';
import * as dc from 'dc';

@Component({
  selector: 'app-data-dropdown',
  imports: [CommonModule],
  templateUrl: './data-dropdown.component.html',
  styleUrl: './data-dropdown.component.css',
})
export class DataDropdownComponent
  implements OnChanges, AfterViewInit, OnDestroy
{
  @Input() title: string = '';
  @Input() data: any[] = [];

  private ndx: any;
  private dimension: any;
  filteredData: any[] = [];

  expandedIndex: number | null = null; // para saber qué fila está expandida

  constructor(
    private service: ItsmServicenowComponent,
    private cdr: ChangeDetectorRef
  ) {}

  ngAfterViewInit() {
    if (this.data && this.data.length) {
      this.buildDropdown();
    }
  }

  ngOnChanges() {
    if (this.data && this.data.length) {
      this.buildDropdown();

      setTimeout(() => {
        // En lugar de fakeChart, suscríbete a los eventos globales de DC
        dc.chartRegistry.list().forEach((chart: any) => {
          chart.on('filtered', () => {
            this.buildDropdown();
          });
        });
      }, 500);
    }
  }

  private buildDropdown() {
    this.ndx = this.service.getCf();
    this.dimension = this.ndx.dimension((d: any) => d.number);

    const updateData = () => {
      // Obtén los datos filtrados de la dimensión
      this.filteredData = this.dimension.top(Infinity);
      this.cdr.detectChanges();
    };

    // Ejecuta al inicio para tener el estado inicial
    updateData();
  }

  toggleExpand(index: number) {
    this.expandedIndex = this.expandedIndex === index ? null : index;
    this.cdr.detectChanges();
    console.log('Expanded: ', this.expandedIndex);
  }

  ngOnDestroy() {
    if (this.dimension) {
      this.dimension.dispose();
    }
  }
}
