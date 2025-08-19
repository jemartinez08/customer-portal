import { Component } from '@angular/core';
import { DashboardTestComponent } from "../../components/dashboard-test/dashboard-test.component";
import { ServicenowTestComponent } from "../../components/servicenow-test/servicenow-test.component";

@Component({
  selector: 'app-home-page',
  imports: [DashboardTestComponent, ServicenowTestComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

}
