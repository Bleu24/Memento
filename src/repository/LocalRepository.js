import { User } from "../classes/User.js";

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
            isLoggedIn: target.isLoggedIn
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
                console.log(key);
                const parsedObj = JSON.parse(loadedObj);
                const user = new User(parsedObj.id, parsedObj.email, parsedObj.name, parsedObj.xp, parsedObj.level, parsedObj.isLoggedIn);
                parsedObj.tasks.forEach(t => user.addTask(t));
                parsedObj.projects.forEach(p => user.addProject(p));
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
            const user = new User(parsedObj.id, parsedObj.email, parsedObj.name, parsedObj.xp, parsedObj.level, parsedObj.isLoggedIn);
            parsedObj.tasks.forEach(t => user.addTask(t));
            parsedObj.projects.forEach(p => user.addProject(p));
            return user;

        } catch (error) {
            console.error("LocalRepository: failed to load user", getKey(id), error)
        }

    }

    const loadLoggedInUser = () => {
        const users = loadAll();
        const loggedInUser = users.find(user => user.isLoggedIn === true);

        return loggedInUser;
    }


    return { save, loadAll, load, loadLoggedInUser };
})();