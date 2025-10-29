import { Notifications } from "../classes/Notifications.js";

export const UserService = (function () {


    const assignTask = (task, user) => {
        user.addTask(task);
    }

    const removeTask = (task, user) => {
        user.removeTask(task);
    }

    const completeTask = (task, user) => {
        user.completeTask(task);
        Notifications.emit("task:completed", { task, user });
    }

    const saveProfileToStorage = (repo, user) => {
        repo.save(user);
    }

    const loadProfileFromStorage = (repo) => {
        return repo.load();
    }

    const createTaskForUser = (user, props) => {
        const task = user.createTask(...props);
        Notifications.emit("task:created", task);
        return task;
    }




    return { assignTask, removeTask, completeTask, saveProfileToStorage, loadProfileFromStorage, createTaskForUser };
})();   
