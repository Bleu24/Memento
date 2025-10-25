export const UserService = (function(){

    const assignTask = (task, target) => {
        target.addTask(task);
    }

    const removeTask = (task, target) => {
        target.removeTask(task);
    }

    // name choice is poor please refactor name lol
    const checkTask = (task, target) => {
        target.completeTask(task);
    }

    const saveTasksToStorage = (target) => {
        target.save();
    }


    return { assignTask, removeTask, checkTask };
})();   