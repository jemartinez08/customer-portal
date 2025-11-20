import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterOutlet } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { Subscription } from 'rxjs';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';

import { NavbarComponentComponent } from './components/navbar-component/navbar-component.component';
import { AuthService } from './services/auth.service';
import { SessionModalComponent } from './components/session-modal/session-modal.component';
import { SessionService } from './services/session.service';
import { SessionModalService } from './services/session-modal.service';
import { ChatbotModalService } from './services/chatbot-modal.service';
import { ChatbotModalComponent } from './components/chatbot-modal/chatbot-modal.component';
import { AiSummaryModalService } from './services/ai-summary-modal.service';
import { AiSummaryModalComponent } from './components/ai-summary-modal/ai-summary-modal.component';
import { MobileNavbarComponent } from './components/ui/mobile-navbar/mobile-navbar.component';

interface HeaderInfo {
  pageName: string;
  icon: string;
  info: string;
}

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    RouterOutlet,
    NavbarComponentComponent,
    SessionModalComponent,
    ChatbotModalComponent,
    AiSummaryModalComponent,
    MatIcon,
    MobileNavbarComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'chats-test';
  isSidebarClosed = false;
  isMobileMenuClosed = true;

  headerInfo: HeaderInfo = { pageName: '', icon: '', info: '' };

  // variables to communicate different modals
  modalState: Boolean | undefined;
  chatbotModalState: Boolean | undefined;
  aiSummaryModalState: Boolean | undefined;
  private sub!: Subscription;

  // msal config login comprobation
  isLoading = true;

  constructor(
    private msalService: MsalService,
    private authService: AuthService,
    private session: SessionService,
    private modal: SessionModalService,
    private chatbotModal: ChatbotModalService,
    private AISummaryModal: AiSummaryModalService,
    private router: Router
  ) {
    // substribe to session modal component
    this.sub = this.modal.publicModalState$.subscribe((valor) => {
      this.modalState = valor;
    });

    // susbcribe to chatbot modal component
    this.sub = this.chatbotModal.publicModalStateChat$.subscribe((valor) => {
      this.chatbotModalState = valor;
    });

    // susbcribe to ai summary modal component
    this.sub = this.AISummaryModal.publicModalStateSummary$.subscribe(
      (valor) => {
        this.aiSummaryModalState = valor;
      }
    );
  }

  // Manage navbar
  toggleSidebar() {
    this.isSidebarClosed = !this.isSidebarClosed;
  }

  toggleMobileMenu() {
    this.isMobileMenuClosed = !this.isMobileMenuClosed;
  }

  closeMobileMenu = () => {
    this.isMobileMenuClosed = true;
    // detect activated route
    // this.activatedUrl = this.router.url;
    this.getHeaderInfo();
  };

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

      // detect activated route
      // this.activatedUrl = this.router.url;
      this.getHeaderInfo();
    }, 2000);
  }

  private getHeaderInfo() {
    const activatedUrl = this.router.url;

    switch (activatedUrl) {
      case '/home-page':
        this.headerInfo = {
          pageName: 'Home Page',
          icon: 'home',
          info: 'Overview of key security metrics and system performance.',
        };
        return 'Home Page';
      case '/critical-threads':
        this.headerInfo = {
          pageName: 'Critical Threads',
          icon: 'warning',
          info: 'Critical security threads timeline and details.',
        };
        return 'Critical Threads';
      case '/itsm-servicenow':
        this.headerInfo = {
          pageName: 'ITSM (ServiceNow)',
          icon: 'build',
          info: 'ITSM tickets and SLA metrics from ServiceNow.',
        };
        return 'ITSM ServiceNow';
      case '/soc-splunk':
        this.headerInfo = {
          pageName: 'SOC (Splunk)',
          icon: 'security',
          info: 'Security operations center dashboards and alerts.',
        };
        return 'SOC (Splunk)';
      case '/edr-crowdstrike-sentinelone':
        this.headerInfo = {
          pageName: 'EDR (CrowdStrike & SentinelOne)',
          icon: 'memory',
          info: 'Endpoint detection and response insights.',
        };
        return 'EDR';
      case '/epp-proofpoint':
        this.headerInfo = {
          pageName: 'EPP (Proofpoint)',
          icon: 'shield',
          info: 'Email protection and endpoint prevention overview.',
        };
        return 'EPP (Proofpoint)';
      case '/advanced-thread-hunting':
        this.headerInfo = {
          pageName: 'Advanced Thread Hunting',
          icon: 'search',
          info: 'Investigations and hunt queries for advanced threats.',
        };
        return 'Advanced Thread Hunting';
      case '/incident-response':
        this.headerInfo = {
          pageName: 'Incident Response',
          icon: 'report_problem',
          info: 'Playbooks and active incident workflows.',
        };
        return 'Incident Response';
      case '/ticket-analysis':
        this.headerInfo = {
          pageName: 'Ticket Analysis',
          icon: 'analytics',
          info: 'Analyze tickets and trends across sources.',
        };
        return 'Ticket Analysis';
      case '/project-sla-compliance':
        this.headerInfo = {
          pageName: 'Project SLA Compliance',
          icon: 'timer',
          info: 'Monitor SLA compliance and project KPIs.',
        };
        return 'Project SLA Compliance';
      default:
        this.headerInfo = {
          pageName: 'Dashboard',
          icon: 'dashboard',
          info: 'Overview',
        };
        return 'Dashboard';
    }
  }

  login() {
    this.msalService.loginRedirect();
  }
}
