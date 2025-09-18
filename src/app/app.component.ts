import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { Subscription } from 'rxjs';

import { NavbarComponentComponent } from './components/navbar-component/navbar-component.component';
import { AuthService } from './services/auth.service';
import { SessionModalComponent } from './components/session-modal/session-modal.component';
import { SessionService } from './services/session.service';
import { SessionModalService } from './services/session-modal.service';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    RouterOutlet,
    NavbarComponentComponent,
    SessionModalComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'chats-test';
  isSidebarClosed = false;

  // Datos para comunicar el modal
  modalState: Boolean | undefined;
  private sub!: Subscription;

  // msal config login comprobation
  isLoading = true;

  constructor(
    private msalService: MsalService,
    private authService: AuthService,
    private session: SessionService,
    private modal: SessionModalService
  ) {
    this.sub = this.modal.publicModalState$.subscribe((valor) => {
      this.modalState = valor;
    });
    console.log(this.modalState);
  }

  toggleSidebar() {
    this.isSidebarClosed = !this.isSidebarClosed;
  }

  // MSLA
  ngOnInit(): void {
    setTimeout(() => {
      this.msalService.handleRedirectObservable().subscribe({
        next: (result) => {
          if (result) {
            this.msalService.instance.setActiveAccount(result.account); // ✅ Establece la sesión activa
          }
        },
        error: (error) => {
          console.error('Error en el manejo del redirect:', error);
        },
        complete: () => {
          const account = this.msalService.instance.getActiveAccount();
          const idTokenClaims = account?.idTokenClaims;

          const roles = idTokenClaims?.roles;
          console.log('Rol del usuario', roles);

          if (!account) {
            this.login();
          } else {
            // save the user in authService
            this.authService.setUser(account);

            // Start session timer
            this.session.startSessionTimer();
          }

          this.isLoading = false;
        },
      });
    }, 2000);
  }

  login() {
    this.msalService.loginRedirect();
  }
}
