import { parse } from "date-fns";
import { User } from "../classes/User.js";

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
        localStorage.setItem(`user__${target.id}`, stringify);

    }

    const load = () => {

        const users = [];
        const localKeys = Object.keys(localStorage);
        const user = {};

        localKeys.forEach(key => {
            loadedObj = localStorage.getItem(`user__${key}`);
            parsedObj = JSON.parse(loadedObj);
            user = new User(parsedObj.id, parsedObj.email, parsedObj.name, parsedObj.xp, parsedObj.level)
            parsedObj.tasks.forEach(t => user.addTask(t));
            parsedState.projects.forEach(p => user.addProject(p));
            users.push(user);
        })

        const filteredUser = users.filter(user => user.isLoggedIn === true);
        const loggedInUser = filteredUser.reduce((prev, curr) => {
            return { ...curr };
        }, {});

        return user;
    }


    return { save, load };
})();