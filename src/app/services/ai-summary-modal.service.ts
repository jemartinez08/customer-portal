import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AiSummaryModalService {
  private modalState = new BehaviorSubject<boolean>(false);
  publicModalStateSummary$ = this.modalState.asObservable(); // Observable público

  private summaryContent = new BehaviorSubject<string>('');
  publicSummaryContent$ = this.summaryContent.asObservable();

  constructor() {}

  openModal(summaryHtml?: string) {
    if (summaryHtml !== undefined) {
      this.summaryContent.next(summaryHtml);
    }
    this.modalState.next(true);
  }

  closeModal() {
    this.modalState.next(false);
  }
}
