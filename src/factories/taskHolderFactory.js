import { Task } from "../classes/Task.js";

export const createTaskHolder = () => {

    let tasks = [];
    let completedTasks = [];

    const createTask = (title, description, dueDate, priority) => {
        return new Task(null, title, description, dueDate, priority)
    }

    const addTask = (task) => {
        tasks.push(task);
    }

    const removeTask = (selectedTask) => {
        tasks = tasks.filter(task => task.id !== selectedTask.id);
    }

    const editTask = (selectedTask, changes) => {
        tasks.forEach(task => {
            if (task.id === selectedTask.id) {
                for (const key in task) {
                    task[key] = changes[key];
                }
            }
        });
    }

    

    const completeTask = (completedTask) => {
        completedTasks.push(completedTask);
        tasks = tasks.filter(task => task.id !== completedTask.id);
    }

    const getTasks = () => structuredClone(tasks);
    const getCompletedTasks = () => structuredClone(completedTasks);

    return { createTask, addTask, removeTask, editTask, completeTask, getTasks, getCompletedTasks };
}