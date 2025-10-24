export const taskHolder = {
    tasks: [],

    addTask(task) {
        this.tasks.push(task);
    },

    removeTask(selectedTask) {
        this.tasks = this.tasks.filter(task => task.id !== selectedTask.id);
        return this.tasks;
    },

    showTasks(tasks) {
        tasks.forEach(task => {
            console.log(task);
        });
    }
}