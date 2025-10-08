import { Component } from '@angular/core';
import { AiSummaryModalService } from '../../services/ai-summary-modal.service';

@Component({
  selector: 'app-ai-summary-modal',
  imports: [],
  templateUrl: './ai-summary-modal.component.html',
  styleUrl: './ai-summary-modal.component.css',
})
export class AiSummaryModalComponent {
  summaryHtml: string = '';

  constructor(public aiSummaryModal: AiSummaryModalService) {
    this.aiSummaryModal.publicSummaryContent$.subscribe((html) => {
      this.summaryHtml = html;
    });
  }

  // close modal function
  closeModal() {
    this.aiSummaryModal.closeModal();
  }
}
