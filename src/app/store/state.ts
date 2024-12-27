import { GetTasks } from "../models/checkList.model";

export interface NotesState {
  userName: string | null
  tasks: GetTasks[] | null
  curentTask: GetTasks|null
  }
  
  export const initialState: NotesState = {
    userName: null,
    tasks: null,
    curentTask: null
  };
  