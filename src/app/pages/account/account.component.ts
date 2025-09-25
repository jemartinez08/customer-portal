import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

import { HeaderComponent } from '../../components/header/header.component';
import { AppComponent } from '../../app.component';
import { SessionModalService } from '../../services/session-modal.service';
import { SessionService } from '../../services/session.service';
import { GraphMsalService } from '../../services/graph-msal.service';

@Component({
  selector: 'app-account',
  imports: [CommonModule, HeaderComponent],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css',
})
export class AccountComponent implements OnInit, OnDestroy {
  modalState: Boolean | undefined;
  private sub!: Subscription;

  // user data from graphMsal API
  user: any;
  photoUrl: any;
  isLoading = true;

  constructor(
    private session: SessionService,
    private modal: SessionModalService,
    private graphMsal: GraphMsalService
  ) {
    this.sub = this.modal.publicModalState$.subscribe((valor) => {
      this.modalState = valor;
    });
  }

  async ngOnInit() {
    this.user = await this.graphMsal.getUserProfile();
    this.photoUrl = await this.graphMsal.getUserPhoto();
    console.log(this.user);
    try {
      console.log();
    } catch (error) {
      console.error('Error al obtener datos del usuario:', error);
    } finally {
      this.isLoading = false;
    }
  }

  logout() {
    this.session.logout();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
