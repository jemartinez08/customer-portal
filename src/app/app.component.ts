import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponentComponent } from "./components/navbar-component/navbar-component.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'chats-test';
}
