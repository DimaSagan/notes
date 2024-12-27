import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, signal} from '@angular/core';
import { AnimationTextDirective } from '../../shared/animation-text.directive';
import { RouterLink } from '@angular/router';
import { LoginPopupService } from '../../services/state/login-popup.service';
import { Store } from '@ngrx/store';
import { selectUserName } from '../../store/selectors';
import { Observable, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ClearObservableDirective } from '../../shared/clear-observable.directive';
import { logOut } from '../../store/actions';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    AnimationTextDirective,
    CommonModule
    // RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent extends ClearObservableDirective  implements OnInit{

  login = signal(false)
  load = signal(false)
  opacity = signal(false)
  constructor(
    private loginService: LoginPopupService,
    private store: Store,
  ) { super()}
  
  ngOnInit(): void {
    this.store.select(selectUserName).pipe(takeUntil(this.destroy$)).subscribe(data => {
      if (data !=null) {
        this.login.set(true)
        this.load.set(true)
        setTimeout(() => {
          this.opacity.set(true)
        },100)
      } else {
        this.load.set(true)
        setTimeout(() => {
          this.opacity.set(true)
        },100)
      }
     })
     
  }
  openLogin() {
    this.loginService.openPopup()
  }

  logOut() {
    this.store.dispatch(logOut())
    this.login.set(false)
  }

}
