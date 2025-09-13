import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { BehaviorSubject, interval, Subscription } from 'rxjs';

import { SessionModalService } from './session-modal.service';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private timeoutId: any;
  private warningId: any;
  private sessionDuration = 30 * 60 * 1000; // 30 minutos
  //private sessionDuration = 10 * 1000; // 60 segundos
  private warningDuration = 30 * 1000; // 10 segundos
  //private warningDuration = 5000; // 30 segundos

  constructor(
    private msalService: MsalService,
    private modal: SessionModalService
  ) {}

  startSessionTimer() {
    this.clearTimers();
    console.log('Timer iniciado');

    this.timeoutId = setTimeout(() => {
      this.showWarningModal();
    }, this.sessionDuration);
  }

  private showWarningModal() {
    console.log('Modal Abierto');
    this.modal.openModal();
    console.log('Cuenta iniciada');
    this.startCountdown(30);

    this.warningId = setTimeout(() => {
      this.modal.closeModal();
      console.log('Modal cerrado');
      this.logout();
    }, this.warningDuration);

    /*dialogRef.afterClosed().subscribe((result: string) => {
      if (result === 'extend') {
        this.startSessionTimer();
      } else {
        this.logout();
      }
    });*/
  }

  logout() {
    this.msalService.logoutRedirect();
  }

  private clearTimers() {
    clearTimeout(this.timeoutId);
    clearTimeout(this.warningId);
  }

  // Countdown to session modal ----
  private countdownSource = new BehaviorSubject<number>(0);
  countdown$ = this.countdownSource.asObservable();

  private subscription?: Subscription;

  startCountdown(seconds: number) {
    // cancelar cualquier countdown anterior
    this.subscription?.unsubscribe();

    this.countdownSource.next(seconds);

    this.subscription = interval(1000).subscribe(() => {
      const current = this.countdownSource.value;
      if (current > 0) {
        this.countdownSource.next(current - 1);
      } else {
        this.subscription?.unsubscribe();
        // opcional: emitir algo o disparar evento al terminar
        console.log('¡Cuenta atrás terminada!');
      }
    });
  }

  stopCountdown() {
    this.subscription?.unsubscribe();
    this.countdownSource.next(0);
  }
}
