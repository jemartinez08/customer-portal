import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashboardTestComponent } from "./components/dashboard-test/dashboard-test.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DashboardTestComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'chats-test';
}
