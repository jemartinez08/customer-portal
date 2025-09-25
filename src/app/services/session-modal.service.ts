import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SessionModalService {
  private modalState = new BehaviorSubject<boolean>(false);
  publicModalState$ = this.modalState.asObservable(); // Observable público

  constructor() {}

  openModal() {
    this.modalState.next(true);
  }

  closeModal() {
    console.log('Cerrando');
    this.modalState.next(false);
  }
}
