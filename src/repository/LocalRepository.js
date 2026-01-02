import { User } from "../classes/User.js";
import { UserService } from "../services/UserService.js";

export const LocalRepository = (function () {

    const getUserKey = (id) => `user__${id}`;

    const save = (target) => {

        if (!target) return;


        const state = {
            id: target.id,
            email: target.email,
            name: target.name,
            xp: target.getXP(),
            level: target.getLevel(),
            projects: target.getProjects(),
            tasks: target.getTasks(),
            isLoggedIn: target.isLoggedIn,
            tab: target.getTab()
        }

        const stringify = JSON.stringify(state);
        localStorage.setItem(getUserKey(target.id), stringify);
        localStorage.setItem('currentUser', stringify);

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
                const user = new User(parsedObj.id, parsedObj.email, parsedObj.name, parsedObj.xp, parsedObj.level);
                parsedObj.tasks.forEach(t => {
                    const { id, title, description, dueDate, priority } = t
                    const taskProps = [id, title, description, dueDate, priority];

                    const task = UserService.createTaskForUser(user, taskProps);
                    user.addTask(task);
                });
                parsedObj.projects.forEach(p => {
                    const { id, title, desc } = p;
                    const projProps = [id, title, desc];

                    const project = UserService.createProjectForUser(user, projProps);
                    user.addProject(project);
                });
                user.setTab(parsedObj.tab);
                user.isLoggedIn = parsedObj.isLoggedIn;
                users.push(user);
            } catch (error) {
                console.error("LocalRepository: failed to parse", key, error);
            }
        }

        return users;
    };

    const load = (id) => {

        if (!id || typeof id !== 'string') return null;

        const loadedObj = localStorage.getItem(getUserKey(id));
        if (!loadedObj) return null;

        try {
            const parsedObj = JSON.parse(loadedObj);
            const user = new User(parsedObj.id, parsedObj.email, parsedObj.name, parsedObj.xp, parsedObj.level);
            parsedObj.tasks.forEach(t => {
                const { id, title, description, dueDate, priority } = t
                const taskProps = [id, title, description, dueDate, priority];

                const task = UserService.createTaskForUser(user, taskProps);
                user.addTask(task);
            });
            parsedObj.projects.forEach(p => {
                const { id, title, desc } = p;
                const projProps = [id, title, desc];

                const project = UserService.createProjectForUser(user, projProps);
                user.addProject(project);
            });
            user.setTab(parsedObj.tab);
            user.isLoggedIn = parsedObj.isLoggedIn;
            return user;

        } catch (error) {
            console.error("LocalRepository: failed to load user", getUserKey(id), error);
        }

    }

    const loadCurrentUser = () => {
        const loadedObj = localStorage.getItem('currentUser');
        if (!loadedObj) return null;

        try {
            const parsedObj = JSON.parse(loadedObj);
            const user = new User(parsedObj.id, parsedObj.email, parsedObj.name, parsedObj.xp, parsedObj.level);
            parsedObj.tasks.forEach(t => {
                const { id, title, description, dueDate, priority } = t
                const taskProps = [id, title, description, dueDate, priority];

                const task = UserService.createTaskForUser(user, taskProps);
                user.addTask(task);
            });
            parsedObj.projects.forEach(p => {
                const { id, title, desc } = p;
                const projProps = [id, title, desc];

                const project = UserService.createProjectForUser(user, projProps);
                user.addProject(project);
            });
            user.setTab(parsedObj.tab);
            user.isLoggedIn = parsedObj.isLoggedIn;
            return user;

        } catch (error) {
            console.error("LocalRepository: failed to load user", error);
        }
    }

    const clearCurrentUser = () => {
        localStorage.removeItem("currentUser");
    }


    return { save, loadAll, load, loadCurrentUser, getUserKey, clearCurrentUser };
})();