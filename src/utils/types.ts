import { Status } from "./enums";

export interface Task {
    title: string;
    description: string;
    status: Status,
    dueDate: Date;
    id: string
}

export interface FormData extends Omit<Task, 'dueDate' | 'id'> {
    dueDate: Date | undefined;
}