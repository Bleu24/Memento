import { Notifications } from "../classes/Notifications.js";

export const UserService = (function () {


    const assignTask = (task, user) => {
        user.addTask(task);
    }

    const editTask = (task, newTask, user) => {
        user.editTask(task, newTask);
    }

    const retrieveTask = (taskId, user) => {
        return user.getTask(taskId);
    }

    const removeTask = (task, user) => {
        user.removeTask(task);
    }

    const assignProject = (project, user) => {
        user.addProject(project);
    }

    const removeProject = (project, user) => {
        user.removeProject(project);
    }

    const assignTaskToProject = (tasks, project) => {
        project.addTask(tasks);
    }

    const removeTaskFromProject = (tasks, project) => {
        project.removeTask(tasks);
    }

    const completeTask = (task, user) => {
        user.completeTask(task);
        Notifications.emit("task:completed", { task, user });
    }

    const saveProfileToStorage = (repo, user) => {
        repo.save(user);
    }

    const loadProfileFromStorage = (repo, id) => {
        return repo.load(id);
    }

    const loadLoggedInProfile = (repo) => {
        return repo.loadCurrentUser();
    }

    const loadAllProfiles = (repo) => {
        return repo.loadAll();
    }

    const createTaskForUser = (user, props) => {
        const task = user.createTask(...props);
        Notifications.emit("task:created", task);
        return task;
    }




    return {
        assignTask,
        editTask,
        retrieveTask,
        removeTask,
        assignProject,
        removeProject,
        assignTaskToProject,
        removeTaskFromProject,
        completeTask,
        saveProfileToStorage,
        loadProfileFromStorage,
        loadLoggedInProfile,
        loadAllProfiles,
        createTaskForUser
    };
})();   
