import { Notifications } from "../classes/Notifications";

export const UserService = (function(){


    const assignTask = (task, target) => {
        target.addTask(task);
    }

    const removeTask = (task, target) => {
        target.removeTask(task);
    }

    const completeTask = (task, target) => {
        target.completeTask(task);
    }

    const saveProfileToStorage = (repo, target) => {
        repo.save(target);
    }

    const loadProfileFromStorage = (repo) => {
        return repo.load();
    }




    return { assignTask, removeTask, completeTask, saveProfileToStorage, loadProfileFromStorage };
})();   
