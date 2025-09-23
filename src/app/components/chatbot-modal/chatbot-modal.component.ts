import { Component } from '@angular/core';
import { SessionModalService } from '../../services/session-modal.service';

@Component({
  selector: 'app-chatbot-modal',
  imports: [],
  templateUrl: './chatbot-modal.component.html',
  styleUrl: './chatbot-modal.component.css',
})
export class ChatbotModalComponent {
  constructor(private chatbotModal: SessionModalService) {}

  closeModal() {
    this.chatbotModal.closeModal();
  }
}
