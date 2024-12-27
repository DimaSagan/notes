import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { LoginPopupComponent } from "./components/login-popup/login-popup.component";
import { Store } from '@ngrx/store';
import { checkLogin, getTasks } from './store/actions';
import { FirestoreService } from './services/firestore.service';
import { selectTasks } from './store/selectors';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, LoginPopupComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'notes';

  constructor(
    private store: Store,
    private firestore: FirestoreService
  ) {
  }

  ngOnInit(): void {
    this.store.dispatch(checkLogin())
    setTimeout(() => {
      this.store.dispatch(getTasks())
      // this.firestore.getTasks()
    //   try {
    //     this.store.dispatch(getTasks())
    //   } finally { 
    //     this.store.select(selectTasks).subscribe((val) => {
    //       console.log(val)
    //     }
    //     )
    //   }

    }, 1000)
  }
}
