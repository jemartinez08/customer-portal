import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { HeaderCardComponent } from '../../components/header-card/header-card.component';

@Component({
  selector: 'app-incident-response',
  imports: [HeaderComponent, HeaderCardComponent],
  templateUrl: './incident-response.component.html',
  styleUrl: './incident-response.component.css',
})
export class IncidentResponseComponent {
  isMainKPI: boolean = true;
  notMainKpi: boolean = false;
  mttValue: number = 0;
  numberOfOpenedTickets: number = 0;
}
