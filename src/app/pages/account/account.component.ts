import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { AppComponent } from '../../app.component';

import { SessionModalService } from '../../services/session-modal.service';
import { Subscription } from 'rxjs';
import { SessionModalComponent } from '../../components/session-modal/session-modal.component';

@Component({
  selector: 'app-account',
  imports: [CommonModule, HeaderComponent, SessionModalComponent],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css',
})
export class AccountComponent implements OnDestroy {
  modalState: Boolean | undefined;
  private sub!: Subscription;

  constructor(
    private session: AppComponent,
    private modal: SessionModalService
  ) {
    this.sub = this.modal.publicModalState$.subscribe((valor) => {
      this.modalState = valor;
    });
    console.log(this.modalState);
  }

  openModal() {
    this.modal.openModal();
    console.log(this.modalState);
  }

  logout() {
    this.session.logout();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
