import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { HeaderCardComponent } from '../../components/header-card/header-card.component';

@Component({
  selector: 'app-critical-threads',
  imports: [HeaderComponent, HeaderCardComponent],
  templateUrl: './critical-threads.component.html',
  styleUrl: './critical-threads.component.css',
})
export class CriticalThreadsComponent {
  isMainKPI: boolean = true;
  notMainKpi: boolean = false;
  mttValue: number = 0;
  numberOfOpenedTickets: number = 0;
}
