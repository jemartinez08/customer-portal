import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AiSummaryModalService {
  private modalState = new BehaviorSubject<boolean>(false);
  publicModalStateSummary$ = this.modalState.asObservable(); // Observable público

  constructor() {}

  openModal() {
    this.modalState.next(true);
  }

  closeModal() {
    this.modalState.next(false);
  }
}
