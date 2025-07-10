import { Status } from "./enums";

export interface Task {
    title: string;
    description: string;
    status: Status,
    dueDate: Date;
}

export interface FormData extends Omit<Task, 'dueDate'> {
    dueDate: Date | undefined;
}