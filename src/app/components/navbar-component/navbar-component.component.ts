import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar-component',
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar-component.component.html',
  styleUrl: './navbar-component.component.css',
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
