import { Task } from "../data/Task";

export const UserService = (function(){

    const assignTask = (task, target) => {
        target.addTask(new Task('Code', 'Finish Module 1', "10-25-2025", "High"));
    }

    const showTasks = (target) => {
        target.showTasks();
    }


    return { assignTask, showTasks };
})();