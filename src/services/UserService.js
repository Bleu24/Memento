import { Notifications } from "../classes/Notifications.js";
import { LocalRepository } from "../repository/LocalRepository.js";
import { Project } from "../classes/Project.js";

export const UserService = (function () {


    const assignTask = (task, taskHolder) => {
        taskHolder.addTask(task);
    }

    const editTask = (task, newTask, user) => {
        const editedTask = user.editTask(task, newTask);
        Notifications.emit("task:edited", editedTask);
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

    const editProject = (project, newProject, user) => {
        user.editProject(project, newProject);
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
        // Notifications.emit("task:completed", { task, user });
    }

    const undoComplete = (task, user) => {
        user.undoCompletion(task);
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

    const createTaskForUser = (taskHolder, props) => {
        const task = taskHolder.createTask(...props);
        Notifications.emit("task:created", task);
        return task;
    }

    const createProjectForUser = (user, props) => {
        const project = user.createProject(...props);
        return project;
    }

    const retrieveProject = (projectId, user) => {
        return user.getProject(projectId);
    }




    return {
        assignTask,
        editTask,
        retrieveTask,
        removeTask,
        assignProject,
        editProject,
        removeProject,
        assignTaskToProject,
        removeTaskFromProject,
        completeTask,
        undoComplete,
        saveProfileToStorage,
        loadProfileFromStorage,
        loadLoggedInProfile,
        loadAllProfiles,
        createTaskForUser,
        createProjectForUser,
        retrieveProject
    };
})();   
