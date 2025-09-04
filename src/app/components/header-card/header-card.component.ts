import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header-card',
  imports: [CommonModule],
  templateUrl: './header-card.component.html',
  styleUrl: './header-card.component.css',
})
export class HeaderCardComponent {
  @Input() KPICard: boolean = false;
  @Input() KpiValue: number = 0;
  @Input() KpiTitle: string = 'KPI';
}
