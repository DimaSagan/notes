import { createReducer, on } from '@ngrx/store';
import * as NotesActions from './actions';
import { initialState } from './state';

export const notesReducer = createReducer(
  initialState,
    on(NotesActions.loginSuccess, (state, { userName }) => {
        return {
            ...state,
            userName: userName
        }
    }),

    on(NotesActions.logOutSuccess, (state, { userName }) => {
        return {
            ...state,
            userName: userName,
            tasks: null
        }
    }),

    on(NotesActions.checkLoginSuccess, (state, { status }) => {
        return {
            ...state,
            userName: status
        }
    }),

    on(NotesActions.getTasksSuccess, (state, { tasks }) => {
        return {
            ...state,
            tasks:tasks
        }
    }),

    on(NotesActions.getCurentTaskSuccess, (state, { task }) => {
        return {
            ...state,
            curentTask : task
        }
    }),

    on(NotesActions.clearCurentTaskSuccess, (state) => {
        return {
            ...state,
            curentTask : null
        }
    })



);
