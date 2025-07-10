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

export interface TaskFilters {
    search?: string
    status?: Status | undefined
    date?: Date
}

export interface TaskSort {
	key: string
	direction: 'asc' | 'desc';
}