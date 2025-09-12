import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponentComponent } from './components/navbar-component/navbar-component.component';
import { MsalService } from '@azure/msal-angular';

import { AuthService } from './services/auth.service';
import { SessionService } from './services/session.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'chats-test';
  isSidebarClosed = false;

  // msal config login comprobation
  isLoading = true;

  constructor(
    private msalService: MsalService,
    private authService: AuthService,
    private session: SessionService
  ) {}

  toggleSidebar() {
    this.isSidebarClosed = !this.isSidebarClosed;
  }

  // MSLA
  ngOnInit(): void {
    setTimeout(() => {
      this.msalService.handleRedirectObservable().subscribe({
        next: (result) => {
          if (result) {
            console.log('Resultado del login:', result);
            this.msalService.instance.setActiveAccount(result.account); // ✅ Establece la sesión activa
          }
        },
        error: (error) => {
          console.error('Error en el manejo del redirect:', error);
        },
        complete: () => {
          const account = this.msalService.instance.getActiveAccount();

          if (!account) {
            console.log('No hay sesión activa, redirigiendo al login...');
            this.login();
          } else {
            this.authService.setUser(account);
            console.log('Sesión activa detectada:', account);

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

  logout() {
    console.log('Hola');
    this.msalService.logoutRedirect();
  }
}
