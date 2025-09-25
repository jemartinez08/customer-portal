import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatbotModalService {
  private modalState = new BehaviorSubject<boolean>(false);
  publicModalStateChat$ = this.modalState.asObservable(); // Observable público

  constructor() {}

  openModal() {
    console.log('abriendo modal');
    this.modalState.next(true);
  }

  closeModal() {
    console.log('Cerrando');
    this.modalState.next(false);
  }
}
