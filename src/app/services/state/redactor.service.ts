import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RedactorService {

  private isOpenSignal = signal(false)

  get isOpen() {
    return this.isOpenSignal
  }

  open() {
    this.isOpenSignal.set(true)
  }

  close() {
    this.isOpen.set(false)
  }
}
