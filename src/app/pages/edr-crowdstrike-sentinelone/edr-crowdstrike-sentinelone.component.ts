import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { HeaderCardComponent } from '../../components/header-card/header-card.component';

@Component({
  selector: 'app-edr-crowdstrike-sentinelone',
  imports: [HeaderComponent, HeaderCardComponent],
  templateUrl: './edr-crowdstrike-sentinelone.component.html',
  styleUrl: './edr-crowdstrike-sentinelone.component.css',
})
export class EdrCrowdstrikeSentineloneComponent {
  isMainKPI: boolean = true;
  notMainKpi: boolean = false;
  mttValue: number = 0;
  numberOfOpenedTickets: number = 0;
}
