import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { HeaderCardComponent } from '../../components/header-card/header-card.component';

@Component({
  selector: 'app-soc-splunk',
  imports: [HeaderComponent, HeaderCardComponent],
  templateUrl: './soc-splunk.component.html',
  styleUrl: './soc-splunk.component.css',
})
export class SocSplunkComponent {
  isMainKPI: boolean = true;
  notMainKpi: boolean = false;
  mttValue: number = 0;
  numberOfOpenedTickets: number = 0;
}
