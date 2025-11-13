import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import * as dc from 'dc';
import * as crossfilter from 'crossfilter2';

@Component({
  selector: 'app-crossfilter-dropdown',
  standalone: true,
  imports: [CommonModule, MatSelectModule, MatButtonModule],
  template: `
    <div class="dropdown-container">
      <mat-form-field appearance="fill">
        <mat-label>{{ label }}</mat-label>
        <mat-select [(value)]="selectedValue" (selectionChange)="applyFilter()">
          <mat-option *ngFor="let option of options" [value]="option">
            {{ option }}
          </mat-option>
        </mat-select>
      </mat-form-field>

      <button mat-stroked-button color="warn" (click)="clearFilter()">
        Limpiar
      </button>
    </div>
  `,
  styles: [
    `
      .dropdown-container {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 12px;
        margin-left: 8px;
        margin-right: 8px;
      }
      mat-form-field {
        flex: 1;
        margin: 0px;
        padding: 0px;
      }
    `,
  ],
})
export class CrossfilterDropdownComponent implements OnInit {
  @Input() dimension!: crossfilter.Dimension<any, any>; // recibe la dimensión
  @Input() label: string = 'Filtrar';

  options: any[] = [];
  selectedValue: any = null;

  ngOnInit() {
    if (this.dimension) {
      // extrae valores únicos de la dimensión
      const allValues = this.dimension
        .group()
        .all()
        .map((d) => d.key);
      this.options = Array.from(new Set(allValues));
    }
  }

  applyFilter() {
    if (this.selectedValue !== null && this.selectedValue !== undefined) {
      this.dimension.filterExact(this.selectedValue);
      dc.redrawAll(); // redibuja todos los gráficos dependientes
    }
  }

  clearFilter() {
    this.selectedValue = null;
    this.dimension.filterAll();
    dc.redrawAll();
  }
}
