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

    const loadProfileFromStorage = (repo, user) => {
        return repo.load(user);
    }

    const createTaskForUser = (user, props) => {
        const task = user.createTask(...props);
        Notifications.emit("task:created", task);
        return task;
    }

    const getTasksForUser = (user) => {
        return user.getTasks();
    }

    const getCompletedTasksForUser = (user) => {
        return user.getCompletedTasks();
    }

    const getProjectsForUser = (user) => {
        return user.getProjects();
    }




    return { 
        assignTask, 
        removeTask, 
        completeTask, 
        saveProfileToStorage, 
        loadProfileFromStorage, 
        createTaskForUser, 
        getTasksForUser, 
        getCompletedTasksForUser, 
        getProjectsForUser 
    };
})();   
