import { Timestamp } from "firebase/firestore"

export interface CheckList{
    title: string,
    tasks: Task[],
    date: Timestamp
}

export interface Task {
    checkBox: boolean,
    message: string
}

export interface GetTasks{
    id: string,
    date: Date,
    title: string,
    tasks: Task[]
}

