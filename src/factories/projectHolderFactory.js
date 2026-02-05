import { Project } from '../classes/Project.js'

export const createProjectHolder = () => {

    let projects = [];

    const serialized = (project) => {
        const { addTask, serialize, createTask, removeTask, editTask, completeTask, undoCompletion, getTask, getTasks, getCompletedTasks, ...rest } = project;

        const serializedProject = { id: project.id ? project.id : crypto.randomUUID(), ...rest, tasks: project.getTasks() };

        return serializedProject;
    }

    const createProject = (id, title, desc) => {
        if (id) return new Project(id, title, desc);
        else return new Project(null, title, desc);
    }

    const addProject = (project) => {
        projects.push(project);
    }

    const editProject = (selectedProject, changes) => {
        projects.forEach(project => {
            if (project.id === selectedProject.id) {
                for (const key in project) {
                    if (key === 'id' || typeof project[key] === "function") continue;
                    project[key] = changes[key];
                }
            }
        });
    }

    const removeProject = (selectedProject) => {
        projects = projects.filter(project => project.id !== selectedProject.id);
    }

    const getProject = (id) => {
        if (!id) {
            console.log("Invalid Project Id");
            return;
        }

        for (const project of projects) {
            if (project.id === id) {
                return project;
            }
        }
    }

    const getProjects = () => projects.map(p => serialized(p));

    return { createProject, addProject, editProject, removeProject, getProject, getProjects };
}