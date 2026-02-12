import { Task } from "../classes/Task.js";
import { format } from "date-fns";

export const createTaskHolder = () => {

    let tasks = [];
    let completedTasks = [];

    const serialize = (task) => {
        const { addXP, reduceXP, getXP, setXP, ...rest } = task;

        const serializedTask = {
            ...rest,
            id: task.id ? task.id : crypto.randomUUID(),
            completedAt: task.completedAt ? task.completedAt : null,
            xp: getXP()
        };

        return structuredClone(serializedTask);
    }

    const createTask = (id, title, description, dueDate, priority, isDone, completedAt) => {
        if (id) {
            const task = new Task(id, title, description, dueDate, priority);
            task.isDone = isDone;
            task.completedAt = completedAt;
            return task;
        }
        else {
            const task = new Task(null, title, description, dueDate, priority);
            task.isDone = isDone;
            return task;
        }
    }

    const addTask = (task) => {
        if (task.isDone && task.isDone === true) completedTasks.push(task);
        else {
            task.isDone = false;
            tasks.push(task);
        }
    }

    const removeTask = (selectedTask) => {
        tasks = tasks.filter(task => task.id !== selectedTask.id);
        completedTasks = completedTasks.filter(ct => ct.id !== selectedTask.id);
    }

    const editTask = (selectedTask, changes) => {
        tasks.forEach(task => {
            if (task.id === selectedTask.id) {
                for (const key in task) {
                    if (key === "id" || key === "completedAt") continue;
                    task[key] = changes[key];
                }
                task.xp =
                    task.priority === 'high' ? 30 :
                        task.priority === 'mid' ? 20 :
                            task.priority === 'low' ? 10 :
                                0;
            }
        });
    }

    // inefficient, might refactor
    const getTask = (id) => {
        for (const task of tasks) {
            if (task.id === id) {
                return task;
            }
        }

        for (const ct of completedTasks) {
            if (ct.id === id) {
                return ct;
            }
        }
    }

    const completeTask = (completedTask) => {
        completedTask.isDone = true;
        completedTask.completedAt = Date.now();
        tasks = tasks.filter(task => task.id !== completedTask.id);
        completedTasks.push(completedTask);
    }

    const undoCompletion = (task) => {
        task.isDone = false;
        task.completedAt = null;
        completedTasks = completedTasks.filter(ct => ct.id !== task.id);
        tasks.push(task);
    }

    const getTasks = () => tasks.map(task => serialize(task));
    const getCompletedTasks = () => completedTasks.map(ct => serialize(ct));
    const getTasksCount = () => ({ unfinished: tasks.length, completed: completedTasks.length });

    return { createTask, addTask, removeTask, editTask, completeTask, undoCompletion, getTasks, getCompletedTasks, getTask, getTasksCount };
}