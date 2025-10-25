export const createProjectHolder = () => {

    let projects = [];

    const addProject = (project) => {
        projects.push(project);
    }

    const removeProject = (selectedProject) => {
        projects = projects.filter(project => project.id !== selectedProject.id);
    }

    const addTasksToProject = (tasks, selectedProject) => {
        projects.forEach(project => {
            if(project.id === selectedProject.id) {
                project.push(tasks);
            }
        });
    }

    const getProjects = () => structuredClone(projects);

    return { addProject, removeProject, addTasksToProject, getProjects };
}