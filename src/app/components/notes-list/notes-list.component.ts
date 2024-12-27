import { Component, OnInit } from '@angular/core';
import { NoteCardComponent } from "../note-card/note-card.component";
import { GetTasks } from '../../models/checkList.model';
import { Store } from '@ngrx/store';
import { selectTasks } from '../../store/selectors';
import { map, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RedactorService } from '../../services/state/redactor.service';
import { ClearObservableDirective } from '../../shared/clear-observable.directive';

@Component({
  selector: 'app-notes-list',
  standalone: true,
  imports: [
    NoteCardComponent,
    CommonModule
  ],
  templateUrl: './notes-list.component.html',
  styleUrl: './notes-list.component.scss'
})
export class NotesListComponent extends ClearObservableDirective implements OnInit{
  noteCards$!: Observable<GetTasks[]|null>
  constructor(
    private store: Store,
    private redactorState: RedactorService
  ){super()}
  ngOnInit(): void {
    // setTimeout(() => {
      this.noteCards$ = this.store.select(selectTasks).pipe(
        map(tasks => tasks ? [...tasks].sort((a, b) => b.date.getTime() - a.date.getTime()) : []))
    // },300)
    
  }

  openRedactor() {
    this.redactorState.open()
  }
}
