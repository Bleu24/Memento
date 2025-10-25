export const createTaskHolder = () => {

    let tasks = [];
    let completedTasks = [];

    const addTask = (task) => {
        tasks.push(task);
    }

    const removeTask = (selectedTask) => {
        tasks = tasks.filter(task => task.id !== selectedTask.id);
    }

    const editTask = (selectedTask) => {
        tasks.forEach(task => {
            if(task.id === selectedTask.id) {
                task.title = title;
            }
        })
    }

    const completeTask = (selectedTask) => {
        completedTasks.push(selectedTask);
        tasks = tasks.filter(task => task.id !== selectedTask.id);
    }

    const getTasks = () => structuredClone(tasks);
    const getCompletedTasks = () => structuredClone(completedTasks);

    return { addTask, removeTask, completeTask, saveTasks, loadTasks, getTasks, getCompletedTasks };
}