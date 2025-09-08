import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { HeaderCardComponent } from '../../components/header-card/header-card.component';

@Component({
  selector: 'app-epp-proofpoint',
  imports: [HeaderComponent, HeaderCardComponent],
  templateUrl: './epp-proofpoint.component.html',
  styleUrl: './epp-proofpoint.component.css',
})
export class EppProofpointComponent {
  isMainKPI: boolean = true;
  notMainKpi: boolean = false;
  mttValue: number = 0;
  numberOfOpenedTickets: number = 0;
}
