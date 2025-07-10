'use client';

import { createContext, PropsWithChildren, useCallback, useContext, useMemo, useState } from 'react';
import { FormData, Task } from '../utils/types';

type TasksContext = {
    getTasks: () => Promise<Array<Task> | null>,
    getTask: (taskId: string) => Promise<Task | undefined>,
    createTask: (formData: FormData) => Promise<void>;
    editTask: (formData: FormData) => Promise<void>;
    deleteTask: (taskId: string) => Promise<void>;
} | null;

const tasksContext = createContext<TasksContext>(null);

export function TasksProvider({ children }: PropsWithChildren) {
    const [tasks, setTasks] = useState<Array<Task> | null>(null);

    const getTasks = useCallback(async () => tasks, [tasks]);

    const getTask = useCallback(async (taskId: string) => tasks?.find(({id}) => id === taskId), [tasks]);

    const createTask = useCallback(async (formData: FormData) => {
        const newTask = { ...formData, id: Date.now().toString() } as Task;


        setTasks(prev => ([
            ...(prev || []),
            newTask
        ]));
    }, []);

    const editTask = useCallback(async (formData: FormData) => {
        const taskToUpdate = formData as Task
        setTasks(prev => prev?.map(task => task.id === taskToUpdate.id ? taskToUpdate : task) || null);
    }, []);

    const deleteTask = useCallback(async (taskId: string) => {
        setTasks(prev => prev?.filter(task => task.id !== taskId) || null);
    }, []);

    const value = useMemo(() => ({
        getTasks,
        getTask,
        createTask,
        editTask,
        deleteTask
    }), [createTask, deleteTask, editTask, getTask, getTasks]);

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