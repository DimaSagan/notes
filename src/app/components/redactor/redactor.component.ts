import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectCurentTask } from '../../store/selectors';
import { GetTasks, Task } from '../../models/checkList.model';
import { addTask, clearCurentTask, updateTask } from '../../store/actions';
import { takeUntil } from 'rxjs';
import { FirestoreService } from '../../services/firestore.service';
import { RedactorService } from '../../services/state/redactor.service';
import { SubButtonComponent } from "../buttons/sub-button/sub-button.component";
import { AddButtonComponent } from "../buttons/add-button/add-button.component";
import { ClearObservableDirective } from '../../shared/clear-observable.directive';
import { RedaktorKeysDirective } from '../../shared/redaktor-keys.directive';
import { HeightResizeDirective } from '../../shared/height-resize.directive';

@Component({
  selector: 'app-redactor',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, SubButtonComponent, AddButtonComponent, RedaktorKeysDirective, HeightResizeDirective],
  templateUrl: './redactor.component.html',
  styleUrls: ['./redactor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RedactorComponent extends ClearObservableDirective implements OnInit, OnDestroy {



  checkListBlocks!: FormGroup;

  task: boolean | null = null
  active: boolean = false
  taskId: string | null = null
  constructor(
    private fb: FormBuilder,
    private store: Store,
    private cdr: ChangeDetectorRef,
    public stateService: RedactorService,
    private firestore: FirestoreService
  ) {
    super()
    this.formInit()
  }

  get tasks() {
    return this.checkListBlocks.get('tasks') as FormArray
  }

  ngOnInit(): void {
    this.store.select(selectCurentTask).pipe(takeUntil(this.destroy$))
      .subscribe((tasks$: GetTasks | null) => {
        if (tasks$ !== null) {
          this.taskId = tasks$.id
          this.checkListBlocks = this.fb.group({
            title: tasks$.title,
            tasks: this.fb.array([]),
            date: tasks$.date
          })
          tasks$.tasks.forEach((block: Task) => {
            this.tasks.push(this.createTask(block.checkBox, block.message))
          })
        }

      })
  }

  formInit() {
    this.checkListBlocks = this.fb.group({
      title: new FormControl(''),
      tasks: this.fb.array([this.createTask(this.task)]),
      date: new Date()
    })
  }

  createTask(checkBox: boolean | null, message: string = ''): FormGroup {
    return this.fb.group({
      checkBox: checkBox,
      message: message
    })
  }

  taskToggle() {
    this.active = !this.active
    this.task === null ? this.task = false : this.task = null
    console.log(this.task)
  }

  addTask() {
    this.tasks.push(this.createTask(this.task))
  }

  deleteTask(index: number) {
    this.tasks.removeAt(index)
  }

  close() {
    this.checkListBlocks.reset({ title: '' })
    this.cdr.markForCheck()
    this.store.dispatch(clearCurentTask())
    this.stateService.close()
  }

  onSubmit() {
    if (this.taskId) {
      this.updateTask()
      console.log('upd')
      
    } else {
      console.log('not upd')
      this.store.dispatch(addTask({ task: this.checkListBlocks.value }))
      
    }
    this.close()
  }

  updateTask() {

    const value = this.checkListBlocks.value
    if (this.taskId) {
      this.store.dispatch(updateTask({ taskId: this.taskId, value: value }))
    }
  }

 


}

