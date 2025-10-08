import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AiSummaryModalService } from '../../services/ai-summary-modal.service';

@Component({
  selector: 'app-ai-summary-modal',
  imports: [],
  templateUrl: './ai-summary-modal.component.html',
  styleUrl: './ai-summary-modal.component.css',
})
export class AiSummaryModalComponent {
  constructor(public aiSummaryModal: AiSummaryModalService) {}

  // close modal function
  closeModal() {
    this.aiSummaryModal.closeModal();
  }
}
