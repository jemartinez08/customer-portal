import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Subject } from 'rxjs';
import { MatIcon } from '@angular/material/icon';

import * as dc from 'dc';
import * as d3 from 'd3';
import { FormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-date-filter',
  imports: [
    FormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIcon
  ],
  templateUrl: './date-filter.component.html',
  styleUrl: './date-filter.component.css',
})
export class DateFilterComponent implements OnInit {
  @Input() dateDim: any;
  @Input() refresh$?: Subject<void>;

  selectedStart?: string;
  selectedEnd?: string;

  ngOnInit(): void {
    if (this.refresh$) {
      this.refresh$.subscribe(() => this.resetDates());
    }
  }

  onDateChange() {
    if (!this.dateDim) return;

    if (this.selectedStart && this.selectedEnd) {
      const start = new Date(this.selectedStart);
      const end = new Date(this.selectedEnd);

      // Aplicar filtro por rango en la dimensión
      this.dateDim.filterRange([start, end]);
    } else if (this.selectedStart) {
      const start = new Date(this.selectedStart);
      this.dateDim.filterExact(start.toISOString().split('T')[0]);
    } else {
      this.dateDim.filterAll();
    }

    dc.redrawAll();
  }

  resetDates() {
    this.selectedStart = '';
    this.selectedEnd = '';
  }

  selectedDate: string | null = null;

  @ViewChild('nativeDate') nativeDate!: ElementRef<HTMLInputElement>;

  openNativePicker() {
    this.nativeDate.nativeElement.showPicker?.();
    // showPicker() funciona en Chrome moderno
  }
}
