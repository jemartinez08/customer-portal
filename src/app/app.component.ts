import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponentComponent } from './components/navbar-component/navbar-component.component';
import { MsalService } from '@azure/msal-angular';

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

  constructor(private msalService: MsalService) {}

  toggleSidebar() {
    this.isSidebarClosed = !this.isSidebarClosed;
  }

  // MSLA
  ngOnInit(): void {
    console.log('Iniciando sesión...');

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
            console.log('Sesión activa detectada:', account);
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
    this.msalService.logoutRedirect();
  }
}
