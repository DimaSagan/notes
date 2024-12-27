import { createAction, props } from '@ngrx/store';
import { CheckList, GetTasks } from '../models/checkList.model';

// Check User Login

export const checkLogin = createAction('[check login] Check Login')
export const checkLoginSuccess = createAction('[check login] Check Login Success',
    props<{status: string|null}>()
)



// Login
export const login = createAction('[login] User Login')
export const loginSuccess = createAction('[login] User Login Success',
    props<{userName: string|null}>()
)
export const loginFailure = createAction('[login] User Login Failure',
    props<{error: any}>()
)

// Logout
export const logOut = createAction('[logOut] Log Out')
export const logOutSuccess = createAction('[logOut] Log Out Success',
    props<{userName: null}>()
)

// Get Tasks 

export const getTasks = createAction('[Get Tasks] Get Tasks')
export const getTasksSuccess = createAction('[Get Tasks] Get Tasks Success',
    props<{tasks:GetTasks[]}>()
)
export const getTasksFailure = createAction('[Get Tasks] Get Tasks Failure',
    props<{error: any}>()
)

// Get Curent Task 

export const getCurentTask = createAction('[Qurent Task ] Get Qurent Task',
    props<{task: GetTasks}>()
)

export const getCurentTaskSuccess = createAction('[Qurent Task ] Get Qurent Task Success',
    props<{task: GetTasks}>()
)

// Clear Qurent Task 

export const clearCurentTask = createAction('[Clear Curent Task] Clear Curent Task')
export const clearCurentTaskSuccess = createAction('[Clear Curent Task] Clear Curent Task Success')

// Add Task

export const addTask = createAction('[Add Task] Add Task',
    props<{task: CheckList}>()
)
export const addTaskSuccess = createAction('[Add Task] Add Task Success')

// Delete Task

export const deleteTask = createAction('[Delete Task] Delete Task',
    props<{taskId:string}>()
)
export const deleteTaskSuccess = createAction('[Delete Task] Delete Task Success')

// Update Task

export const updateTask = createAction('[Update Task] Update Task',
    props<{taskId: string, value:CheckList}>()
)
export const updateTaskSuccess = createAction('[Update Task] Update Task Success')







