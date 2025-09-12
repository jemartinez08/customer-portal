import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SessionModalService } from '../../services/session-modal.service';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-session-modal',
  imports: [],
  templateUrl: './session-modal.component.html',
  styleUrl: './session-modal.component.css',
})
export class SessionModalComponent implements OnInit, OnDestroy {
  timeLeft: number = 0;
  private sub!: Subscription;

  constructor(
    private modal: SessionModalService,
    private session: SessionService
  ) {}

  ngOnInit() {
    this.sub = this.session.countdown$.subscribe((value: number) => {
      this.timeLeft = value;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  start() {
    this.session.startCountdown(30); // iniciar desde 10 segundos
  }

  // close de modal
  closeModal() {
    this.modal.closeModal();
  }
}
