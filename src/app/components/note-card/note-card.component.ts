import { Component, Input } from '@angular/core';
import { GetTasks } from '../../models/checkList.model';
import { Store } from '@ngrx/store';
import { deleteTask, getCurentTask } from '../../store/actions';
import { RedactorService } from '../../services/state/redactor.service';
import { CommonModule } from '@angular/common';
import { FirebaseService } from '../../services/firebase.service';
import { FirestoreService } from '../../services/firestore.service';

@Component({
  selector: 'app-note-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './note-card.component.html',
  styleUrl: './note-card.component.scss'
})
export class NoteCardComponent {
  @Input() task!: GetTasks
  
  constructor(
    private store: Store,
    private redactorState: RedactorService,
    private firestore : FirestoreService
  ) { }
  
  getQurentTask() {
    console.log(this.task)
    this.store.dispatch(getCurentTask({ task: this.task }))
    this.redactorState.open()
  }

  del(id: string) {
    // this.firestore.deleteTask(id)
    this.store.dispatch(deleteTask({taskId: id}))
  }
}
