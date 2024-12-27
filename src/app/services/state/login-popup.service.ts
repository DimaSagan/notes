import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginPopupService {

  private isOpenSignal = signal(false)

  get isOpen() {
    return this.isOpenSignal
  }

  openPopup() {
    this.isOpenSignal.set(true)
  }

  closePopup() {
    this.isOpenSignal.set(false)
  }
}
