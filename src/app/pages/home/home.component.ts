import { Component, HostListener, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { login } from '../../store/actions';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  public mobile: boolean = false
 
  constructor(
    private store : Store
  ) {}

  @HostListener('window:resize', ['$event'])
  heandleInnerWidth(event: Event) {
    const width = (event.target as Window).innerWidth
    this.mobile = width <= 767.98
  }

  ngOnInit() {
    this.mobile = window.innerWidth <= 767.98
  }

  login() {
    this.store.dispatch(login())
  }
}
