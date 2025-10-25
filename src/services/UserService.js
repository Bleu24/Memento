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

    const saveProfileToStorage = (repo, target) => {
        repo.save(target);
    }

    const loadProfileFromStorage = (repo) => {
        return repo.load();
    }


    return { assignTask, removeTask, checkTask, saveProfileToStorage, loadProfileFromStorage };
})();   
