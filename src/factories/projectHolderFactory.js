import { Project } from '../classes/Project.js'

export const createProjectHolder = () => {

    let projects = [];

    const serialized = (project) => {
        const { addTask, serialize, createTask, removeTask, editTask, completeTask, getTask, getTasks, getCompletedTasks, ...rest } = project;

        const serializedProject = { id: project.id ? project.id : crypto.randomUUID(), ...rest };

        return serializedProject;
    }

    const createProject = (id, title, desc) => {
        if (id) return new Project(id, title, desc);
        else return new Project(null, title, desc);
    }

    const addProject = (project) => {
        projects.push(serialized(project));
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

    const getProjects = () => structuredClone(projects);

    return { createProject, addProject, removeProject, getProject, getProjects };
}