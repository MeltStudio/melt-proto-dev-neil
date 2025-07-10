'use client';

import { createContext, PropsWithChildren, useCallback, useContext, useMemo, useState } from 'react';
import { FormData, Task, TaskFilters } from '../utils/types';

type TasksContext = {
    getTasks: () => Promise<Array<Task> | null | undefined>;
    getTask: (taskId: string) => Promise<Task | undefined>;
    createTask: (formData: FormData) => Promise<void>;
    editTask: (formData: FormData) => Promise<void>;
    deleteTask: (taskId: string) => Promise<void>;
    paginateTasks: (
		filters: TaskFilters,
		page: number,
		pageSize: number
	) => { data: Task[]; total: number };
} | null;

const tasksContext = createContext<TasksContext>(null);

export function TasksProvider({ children }: PropsWithChildren) {
    const [tasks, setTasks] = useState<Array<Task> | null | undefined>(null);

    const getTasks = useCallback(async () => tasks, [tasks]);

    const getTask = useCallback(async (taskId: string) => tasks?.find(({ id }) => id === taskId), [tasks]);

    const createTask = useCallback(async (formData: FormData) => {
        const newTask = { ...formData, id: Date.now().toString() } as Task;


        setTasks(prev => ([
            ...(prev || []),
            newTask
        ]));
    }, []);

    const editTask = useCallback(async (formData: FormData) => {
        const taskToUpdate = formData as Task;
        setTasks(prev => prev?.map(task => task.id === taskToUpdate.id ? taskToUpdate : task));
    }, []);

    const deleteTask = useCallback(async (taskId: string) => {
        setTasks(prev => prev?.filter(task => task.id !== taskId));
    }, []);

    const filterTasks = useCallback((filters: TaskFilters) => {
        return tasks?.filter(task => {
            const matchesSearch = filters.search
                ? task.title.toLowerCase().includes(filters.search.toLowerCase()) || task.description.toLowerCase().includes(filters.search.toLowerCase())
                : true;

            const matchesStatus = filters.status
                ? task.status === filters.status
                : true;

            const matchesDate = filters.date
                ? task.dueDate.toDateString() === filters.date.toDateString()
                : true;

            return matchesSearch && matchesStatus && matchesDate;
        })
    }, [tasks]);

    const paginateTasks = useCallback(
	(filters: TaskFilters, page: number, pageSize: number) => {
		const filtered = filterTasks(filters) ?? [];
		const total = filtered.length;
		const start = (page - 1) * pageSize;
		const end = start + pageSize;
		const data = filtered.slice(start, end);
		return { data, total };
	},
	[filterTasks])

    const value = useMemo(() => ({
        getTasks,
        getTask,
        createTask,
        editTask,
        deleteTask,
        paginateTasks
    }), [createTask, deleteTask, editTask, getTask, getTasks, paginateTasks]);

    return (
        <tasksContext.Provider value={value}>
            {children}
        </tasksContext.Provider>
    );
}

export const useTaskContext = () => {
    const context = useContext(tasksContext);

    if (!context) {
        throw new Error('useTaskContext must be used within a TaskProvider');
    }

    return context;
};