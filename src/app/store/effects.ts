import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { addTask, addTaskSuccess, checkLogin, checkLoginSuccess, clearCurentTask, clearCurentTaskSuccess, deleteTask, deleteTaskSuccess, getCurentTask, getCurentTaskSuccess, getTasks, getTasksSuccess, login, loginSuccess, logOut, logOutSuccess, updateTask, updateTaskSuccess } from './actions';
import { FirebaseService } from '../services/firebase.service';
import { FirestoreService } from '../services/firestore.service';
import { Store } from '@ngrx/store';

@Injectable()
export class NotesEffects {
    private actions$ = inject(Actions)

    constructor(
        private firebase: FirebaseService,
        private firestore: FirestoreService,
        private store: Store
    ) { }

    userLogin$ = createEffect(() =>
        this.actions$.pipe(
            ofType(login),
            mergeMap(() => {
                return from(this.firebase.signIn()).pipe(
                    map((name) => {
                        this.store.dispatch(getTasks())
                        return loginSuccess({
                            userName: name
                        })
                    })
                )
            })
        )
    )

    userLogOut$ = createEffect(() =>
        this.actions$.pipe(
            ofType(logOut),
            mergeMap(() => {
                return this.firebase.signOut().pipe(
                    map((userName) => {
                        return logOutSuccess({
                            userName: userName
                        })
                    })
                )
            })
        )
    )

    checkLogin$ = createEffect(() =>
        this.actions$.pipe(
            ofType(checkLogin),
            mergeMap(() => {
                return this.firebase.checkUserLogin().pipe(
                    map((status) => {
                        return checkLoginSuccess({
                            status: status
                        })
                    })
                )
            })
        )
    )

    getTasks$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getTasks),
            mergeMap(() => {
                return this.firestore.getTasks().pipe(
                    map((tasks) => {
                        return getTasksSuccess({
                            tasks: tasks
                        })
                    })
                )
            })
        )
    )

    getQurentTask$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getCurentTask),
            mergeMap(({ task }) => {
                return of(getCurentTaskSuccess({
                    task: task
                }))
            })
        ))


    clearCurentTask$ = createEffect(() =>
        this.actions$.pipe(
            ofType(clearCurentTask),
            mergeMap(() => {
                return of(clearCurentTaskSuccess())
            })
        ))

    addTask$ = createEffect(() =>
        this.actions$.pipe(
            ofType(addTask),
            map(({ task }) => {
                this.firestore.addTask(task)
                this.store.dispatch(getTasks())
                return addTaskSuccess()
            })
        ))

    deleteTask$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteTask),
            map(({ taskId }) => {
                this.firestore.deleteTask(taskId)
                this.store.dispatch(getTasks())
                return deleteTaskSuccess()
            })
        ))

    updateTask$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updateTask),
            map(({ taskId, value }) => {
                this.firestore.updateTask(taskId, value)
                this.store.dispatch(getTasks())
                return updateTaskSuccess()

            })

        )
    )
}
