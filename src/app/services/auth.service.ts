import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  private userData: any;

  setUser(data: any) {
    this.userData = data;
  }

  gettUser(data: any) {
    return this.userData;
  }

  clearUser(data: any) {
    this.userData = null;
  }
}
