import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { AiSummaryModalService } from '../../services/ai-summary-modal.service';

@Component({
  selector: 'app-ai-summary-modal',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './ai-summary-modal.component.html',
  styleUrls: ['./ai-summary-modal.component.css'],
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
