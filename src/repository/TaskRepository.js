export const createTaskRepository = (storageKey = "defaultTasks") => {
     const save = () => {
        const stringify = JSON.stringify(tasks);
        localStorage.setItem(storageKey, stringify);
    }

    const load = () => {
        const savedTasks = localStorage.getItem(storageKey);
        tasks = JSON.parse(savedTasks);
    }

    return { save, load };
}