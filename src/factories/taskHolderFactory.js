import { id } from "date-fns/locale";
import { Task } from "../classes/Task.js";

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

    const createTask = (id, title, description, dueDate, priority) => {
        if (id) return new Task(id, title, description, dueDate, priority);
        else return new Task(null, title, description, dueDate, priority);
    }

    const addTask = (task) => {
        if (task.isDone && task.isDone === true) completedTasks.push(serialize(task));
        else {
            task.isDone = false;
            tasks.push(serialize(task));
        }
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
                task.xp =
                    task.priority === 'high' ? 30 :
                        task.priority === 'mid' ? 20 :
                            task.priority === 'low' ? 10 :
                                0;
            }
        });
    }

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
        tasks = tasks.filter(task => task.id !== completedTask.id);
        completedTasks.push(completedTask);
    }

    const undoCompletion = (task) => {
        task.isDone = false;
        completedTasks = completedTasks.filter(ct => ct.id !== task.id);
        tasks.push(task);
    }

    const getTasks = () => structuredClone(tasks);
    const getCompletedTasks = () => structuredClone(completedTasks);

    return { createTask, addTask, removeTask, editTask, completeTask, undoCompletion, getTasks, getCompletedTasks, getTask };
}