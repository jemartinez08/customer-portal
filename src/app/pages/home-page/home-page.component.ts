import { Component } from '@angular/core';
import { DashboardTestComponent } from "../../components/dashboard-test/dashboard-test.component";
import { ServicenowTestComponent } from "../../components/servicenow-test/servicenow-test.component";
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-home-page',
  imports: [DashboardTestComponent, ServicenowTestComponent, HeaderComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

}
