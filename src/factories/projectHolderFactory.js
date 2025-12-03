export const createProjectHolder = () => {

    let projects = [];

    const serialized = (project) => {
        const { addTask, serialize, createTask, removeTask, editTask, completeTask, getTasks, getCompletedTasks, ...rest } = project;
        return structuredClone(rest);
    }

    const addProject = (project) => {
        projects.push(serialized(project));
    }

    const removeProject = (selectedProject) => {
        projects = projects.filter(project => project.id !== selectedProject.id);
    }

    const getProjects = () => structuredClone(projects);

    return { addProject, removeProject, getProjects };
}