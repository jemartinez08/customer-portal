import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { HeaderCardComponent } from '../../components/header-card/header-card.component';

@Component({
  selector: 'app-ticket-analysis',
  imports: [HeaderComponent, HeaderCardComponent],
  templateUrl: './ticket-analysis.component.html',
  styleUrl: './ticket-analysis.component.css',
})
export class TicketAnalysisComponent {
  isMainKPI: boolean = true;
  notMainKpi: boolean = false;
  mttValue: number = 0;
  numberOfOpenedTickets: number = 0;

  // En esta parte se tiene que poner la data en formato JSON, dentro de una variable\
  // para que la pueda utilizar ya en el HTML, igual si los graficos necesitan algo de codigo de logica
  // en esta parte es donde lo va a crear
}
