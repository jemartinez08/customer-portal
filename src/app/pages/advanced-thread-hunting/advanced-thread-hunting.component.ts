import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { HeaderCardComponent } from '../../components/header-card/header-card.component';

@Component({
  selector: 'app-advanced-thread-hunting',
  imports: [HeaderComponent, HeaderCardComponent],
  templateUrl: './advanced-thread-hunting.component.html',
  styleUrl: './advanced-thread-hunting.component.css',
})
export class AdvancedThreadHuntingComponent {
  isMainKPI: boolean = true;
  notMainKpi: boolean = false;
  mttValue: number = 0;
  numberOfOpenedTickets: number = 0;
}
