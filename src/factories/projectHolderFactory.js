export const createProjectHolder = () => {

    let projects = [];

    const addProject = (project) => {
        projects.push(project);
    }

    const removeProject = (selectedProject) => {
        projects = projects.filter(project => project.id !== selectedProject.id);
    }

    const getProjects = () => structuredClone(projects);

    return { addProject, removeProject, getProjects };
}