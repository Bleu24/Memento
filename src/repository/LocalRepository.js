import { User } from "../classes/User.js";
import { storageKey } from "../utils/keys.js";

//TODO: refactor to reshape key as array
export const LocalRepository = (function () {

    const save = (target) => {
        const state = {
            id: target.id,
            email: target.email,
            name: target.name,
            xp: target.getXP(),
            level: target.getLevel(),
            projects: target.getProjects(),
            tasks: target.getTasks(),
        }

        const stringify = JSON.stringify(state);
        localStorage.setItem(`user${target.id}active`, stringify);

    }

    const load = (target) => {
        const savedState = localStorage.getItem(`user__${storageKey}`);
        const parsedState = JSON.parse(savedState);
        const user = new User(parsedState.id, parsedState.email, parsedState.name, parsedState.xp, parsedState.level);
        parsedState.tasks.forEach(t => user.addTask(t));
        parsedState.projects.forEach(p => user.addProject(p));
        return user;
    }


    return { save, load };
})();