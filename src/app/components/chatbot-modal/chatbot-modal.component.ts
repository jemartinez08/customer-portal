import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatbotModalService } from '../../services/chatbot-modal.service';

interface ChatMessage {
  sender: 'user' | 'bot';
  message: string;
  timestamp: Date;
}

@Component({
  selector: 'app-chatbot-modal',
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot-modal.component.html',
  styleUrl: './chatbot-modal.component.css',
})
export class ChatbotModalComponent {
  messages: ChatMessage[] = [];
  userInput: string = '';

  constructor(private chatbotModal: ChatbotModalService) {}

  @ViewChild('messageContainer') messageContainer!: ElementRef;

  sendMessage() {
    if (!this.userInput.trim()) return;

    const userMessage: ChatMessage = {
      sender: 'user',
      message: this.userInput,
      timestamp: new Date(),
    };

    this.messages.push(userMessage);
    this.scrollToBottom();

    setTimeout(() => {
      const botMessage: ChatMessage = {
        sender: 'bot',
        message: `Respuesta simulada a: "${this.userInput}"`,
        timestamp: new Date(),
      };
      this.messages.push(botMessage);
      this.scrollToBottom();
    }, 1000);

    this.userInput = '';
  }

  scrollToBottom() {
    setTimeout(() => {
      if (this.messageContainer) {
        this.messageContainer.nativeElement.scrollTop =
          this.messageContainer.nativeElement.scrollHeight;
      }
    }, 100); // pequeño delay para asegurar que el DOM se haya actualizado
  }

  // ajustar el textarea con los saltos de linea
  adjustTextareaHeight(textarea: HTMLTextAreaElement) {
    textarea.style.height = 'auto';
    let newHeight = Math.min(textarea.scrollHeight, 96); // máx 4 líneas = 96px
    textarea.style.height = newHeight + 'px';

    // 💡 Desplaza hacia arriba en lugar de hacia abajo
    textarea.style.marginTop = -(newHeight - 40) + 'px'; // 40px = min-height
  }

  sendOnEnter(event: Event) {
    const keyboardEvent = event as KeyboardEvent;
    keyboardEvent.preventDefault();
    this.sendMessage();
  }

  // close modal function
  closeModal() {
    this.chatbotModal.closeModal();
  }
}
