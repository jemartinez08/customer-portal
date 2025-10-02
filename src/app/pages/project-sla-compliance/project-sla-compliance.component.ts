import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { HeaderCardComponent } from '../../components/header-card/header-card.component';
import { SlaCardComponent } from "../../components/sla-card/sla-card.component";

@Component({
  selector: 'app-project-sla-compliance',
  imports: [HeaderComponent, HeaderCardComponent, SlaCardComponent],
  templateUrl: './project-sla-compliance.component.html',
  styleUrl: './project-sla-compliance.component.css',
})
export class ProjectSlaComplianceComponent {
  isMainKPI: boolean = true;
  notMainKpi: boolean = false;
  mttValue: number = 0;
  numberOfOpenedTickets: number = 0;
}
