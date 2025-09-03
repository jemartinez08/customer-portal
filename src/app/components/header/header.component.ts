import { Component, Input } from '@angular/core';
import { HeaderCardComponent } from "../header-card/header-card.component";

@Component({
  selector: 'app-header',
  imports: [HeaderCardComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  @Input() title: string = '';
}
