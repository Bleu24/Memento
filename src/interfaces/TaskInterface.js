export const createTaskHolder = () => {

    let tasks = [];
    let completedTasks = [];

    const addTask = (task) => {
        tasks.push(task);
    }

    const removeTask = (selectedTask) => {
        tasks = tasks.filter(task => task.id !== selectedTask.id);
    }

    return { tasks, completedTasks, addTask, removeTask };
}