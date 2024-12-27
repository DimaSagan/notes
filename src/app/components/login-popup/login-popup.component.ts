import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LoginPopupService } from '../../services/state/login-popup.service';
import { Store } from '@ngrx/store';
import { login } from '../../store/actions';

@Component({
  selector: 'app-login-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login-popup.component.html',
  styleUrl: './login-popup.component.scss'
})
export class LoginPopupComponent {

  constructor(
    public loginService: LoginPopupService,
    private store : Store
  ) { }
  
  close() {
    this.loginService.closePopup()
  }

  signIn() {
    this.store.dispatch(login())
  }
}
