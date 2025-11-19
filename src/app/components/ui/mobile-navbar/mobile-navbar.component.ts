import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-mobile-navbar',
  imports: [CommonModule, RouterModule],
  templateUrl: './mobile-navbar.component.html',
  styleUrl: './mobile-navbar.component.css',
})
export class MobileNavbarComponent {
  @Input() closeMenu!: () => void;

  changePage() {
    this.closeMenu();
  }
}
