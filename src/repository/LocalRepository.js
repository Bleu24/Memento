import { parse } from "date-fns";
import { User } from "../classes/User.js";

//TODO: refactor to reshape key as array
export const LocalRepository = (function () {

    const getKey = (id) => `user__${id}`;

    const save = (target) => {

        if (!(target instanceof User) || !target) return;


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
        localStorage.setItem(getKey(target.id), stringify);

    };

    const loadAll = () => {

        const users = [];
        const localKeys = Object.keys(localStorage);

        for (const key of localKeys) {
            if (!key.startsWith("user__")) continue;

            const loadedObj = localStorage.getItem(key);
            if (!loadedObj) continue;

            try {
                const parsedObj = JSON.parse(loadedObj);
                const user = new User(parsedObj.id, parsedObj.email, parsedObj.name, parsedObj.xp, parsedObj.level)
                parsedObj.tasks.forEach(t => user.addTask(t));
                parsedState.projects.forEach(p => user.addProject(p));
                users.push(user);
            } catch (error) {
                console.error("LocalRepository: failed to parse", key, error);
            }
        }

        return users;
    };

    const load = (id) => {

        if (!id || typeof id !== 'string') return null;

        const loadedObj = localStorage.getItem(getKey(id));
        if (!loadedObj) return null;

        try {
            const parsedObj = JSON.parse(loadedObj);
            const user = new User(parsedObj.id, parsedObj.email, parsedObj.name, parsedObj.xp, parsedObj.level);
            parsed.tasks.forEach(t => user.addTask(t));
            parsed.projects.forEach(p => user.addProject(p));
            return user;

        } catch (error) {
            console.error("LocalRepository: failed to load user", getKey(id), error)
        }

    }


    return { save, loadAll, load };
})();