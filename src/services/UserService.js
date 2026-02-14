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

    const completeTask = (task, taskHolder, user) => {
        taskHolder.completeTask(task);
        Notifications.emit("task:completed", { task, user });
    }

    const undoComplete = (task, taskHolder, user) => {
        taskHolder.undoCompletion(task);
        Notifications.emit("task:undo", { task, user });
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

    //TODO: return total count of tasks from tasks array and projects tasks array
    const getTaskCount = (user) => {
        let count = { unfinished: 0, completed: 0 };

        count.unfinished = user.getTasksCount().unfinished;
        count.completed = user.getTasksCount().completed;

        const projects = user.getProjects("live");

        for (const proj of projects) {
            count.unfinished += proj.getTasksCount().unfinished;
            count.completed += proj.getTasksCount().completed;
        }

        return count;
    }

    const retrieveAllTasks = (user) => {
        let retrievedTasks = []

        const userTasks = user.getTasks();
        const userProjects = user.getProjects("live");


        for (const ut of userTasks) retrievedTasks.push({ ...ut });

        for (const up of userProjects) {
            const projTasks = up.getTasks();

            for (const pt of projTasks) retrievedTasks.push({ ...pt });
        }

        return [...retrievedTasks];
    }




    return {
        assignTask,
        editTask,
        retrieveTask,
        retrieveAllTasks,
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
        retrieveProject,
        getTaskCount
    };
})();   
