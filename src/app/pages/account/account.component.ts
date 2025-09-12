import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

import { HeaderComponent } from '../../components/header/header.component';
import { AppComponent } from '../../app.component';
import { SessionModalService } from '../../services/session-modal.service';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-account',
  imports: [CommonModule, HeaderComponent],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css',
})
export class AccountComponent implements OnDestroy {
  modalState: Boolean | undefined;
  private sub!: Subscription;

  constructor(
    private session: SessionService,
    private modal: SessionModalService
  ) {
    this.sub = this.modal.publicModalState$.subscribe((valor) => {
      this.modalState = valor;
    });
  }

  logout() {
    this.session.logout();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
