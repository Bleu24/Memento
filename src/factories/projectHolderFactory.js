export const createProjectHolder = (storageKey = "defaultProjects") => {

    let projects = [];

    const addProject = (project) => {
        projects.push(project);
    }

    const removeProject = (selectedProject) => {
        projects = projects.filter(project => project.id !== selectedProject.id);
    }

    const saveProjects = () => {
        const stringify = JSON.stringify(projects);
        localStorage.setItem(storageKey, stringify);
    }

    const loadProjects = () => {
        const savedProjects = localStorage.getItem(storageKey);
        projects = JSON.parse(savedProjects);
    }

    const getProjects = () => structuredClone(projects);

    return { addProject, removeProject, saveProjects, loadProjects, getProjects };
}