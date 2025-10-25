import { User } from "../data/User";

export const LocalRepository = (function () {

    const save = (target) => {
        const state = {
            id: target.id,
            name: target.name,
            xp: target.getXP(),
            projects: target.getProjects(),
            tasks: target.getTasks()
        }

        const stringify = JSON.stringify(state);
        localStorage.setItem(`user__${target.id}`, stringify);

    }

    const load = () => {
        const savedState = localStorage.getItem(`user__${target.id}`);
        const parsedState = JSON.parse(savedState);
        const user = new User(parsedState.name);
        user.id = parsedState.id;
        user.setXP(parsedState.xp);
        parsedState.tasks.forEach(t => user.addTask(t));
        parsedState.projects.forEach(p => user.addProject(p));
        return user;
    }


    return { save, load };
})();