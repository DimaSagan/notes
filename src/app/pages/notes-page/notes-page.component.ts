import { Component } from '@angular/core';
import { NotesListComponent } from "../../components/notes-list/notes-list.component";
import { RedactorComponent } from "../../components/redactor/redactor.component";
import { FirebaseService } from '../../services/firebase.service';
import { Store } from '@ngrx/store';
import { RedactorService } from '../../services/state/redactor.service';

@Component({
  selector: 'app-notes-page',
  standalone: true,
  imports: [NotesListComponent, RedactorComponent],
  templateUrl: './notes-page.component.html',
  styleUrl: './notes-page.component.scss'
})
export class NotesPageComponent {

  constructor(
    private firebase: FirebaseService,
    private store: Store,
    public redactorState: RedactorService
  ) { }
  

}
