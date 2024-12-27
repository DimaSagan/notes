import { createFeatureSelector, createSelector } from '@ngrx/store';
import { NotesState } from './state';

export const selectNotesState = createFeatureSelector<NotesState>('notes');

export const selectUserName = createSelector(selectNotesState, state => state.userName)

export const selectTasks = createSelector(selectNotesState, state => state.tasks)

export const selectCurentTask = createSelector(selectNotesState, state=> state.curentTask)
