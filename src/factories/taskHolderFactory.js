import { Task } from "../classes/Task.js";

export const createTaskHolder = () => {

    let tasks = [];
    let completedTasks = [];

    const serialize = (task) => {
        const { addXP, reduceXP, getXP, setXP, ...rest } = task;

        const serializedTask = {
            ...rest,
            id: task.id ? task.id : crypto.randomUUID(),
            completedAt: task.completedAt ? task.completeTask : null,
            xp: getXP()
        };

        return structuredClone(serializedTask);
    }

    const createTask = (id, title, description, dueDate, priority) => {
        return new Task(id, title, description, dueDate, priority);
    }

    const addTask = (task) => {
        tasks.push(serialize(task));
    }

    const removeTask = (selectedTask) => {
        tasks = tasks.filter(task => task.id !== selectedTask.id);
    }

    const editTask = (selectedTask, changes) => {
        tasks.forEach(task => {
            if (task.id === selectedTask.id) {
                for (const key in task) {
                    if (key === "id" || key === "completedAt") continue;
                    task[key] = changes[key];
                }
            }
        });
    }

    const getTask = (id) => {
        for (const task of tasks) {
            if (task.id === id) {
                return task;
            }
        }
    }

    const completeTask = (completedTask) => {
        completedTasks.push(serialize(completedTask));
        tasks = tasks.filter(task => task.id !== completedTask.id);
    }

    const getTasks = () => structuredClone(tasks);
    const getCompletedTasks = () => structuredClone(completedTasks);

    return { createTask, addTask, removeTask, editTask, completeTask, getTasks, getCompletedTasks, getTask };
}