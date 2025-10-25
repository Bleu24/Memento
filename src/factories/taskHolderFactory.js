export const createTaskHolder = () => {

    let tasks = [];
    let completedTasks = [];

    const addTask = (task) => {
        tasks.push(task);
    }

    const removeTask = (selectedTask) => {
        tasks = tasks.filter(task => task.id !== selectedTask.id);
    }

    const editTask = (selectedTask, changes) => {
        tasks.forEach(task => {
            if(task.id === selectedTask.id) {
                for (const key in task ) {
                    task[key] = changes[key];
                }
            }
        });
    }

    const completeTask = (selectedTask) => {
        completedTasks.push(selectedTask);
        tasks = tasks.filter(task => task.id !== selectedTask.id);
    }

    const getTasks = () => structuredClone(tasks);
    const getCompletedTasks = () => structuredClone(completedTasks);

    return { addTask, removeTask, editTask, completeTask, getTasks, getCompletedTasks };
}