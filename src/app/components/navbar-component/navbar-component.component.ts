import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-navbar-component',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule],
  templateUrl: './navbar-component.component.html',
  styleUrls: ['./navbar-component.component.css'],
})
export class NavbarComponentComponent {
  isVisible = true;
  lastScrollTop = 0;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const currentScroll =
      window.pageYOffset || document.documentElement.scrollTop;

    if (currentScroll > this.lastScrollTop && currentScroll > 100) {
      this.isVisible = false; // Scroll hacia abajo
    } else {
      this.isVisible = true; // Scroll hacia arriba o al inicio
    }

    this.lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
  }
}
