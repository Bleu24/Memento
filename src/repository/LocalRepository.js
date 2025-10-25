import { User } from "../data/User";
import { UserService } from "../services/UserService";

export const LocalRepository = (function () {

    const save = (target) => {
        const state = {
            id: target.id,
            target,
            projects: target.getProjects(),
            task: target.getTasks()
        }

        const stringify = JSON.stringify(state);
        localStorage.setItem(`user__${target.id}`, stringify);

    }

    const load = () => {
        const savedState = localStorage.getItem(`user__${target.id}`);
        const parsedState = JSON.parse(savedState);
        const user = new User(parsedState.target.name);
        parsedState.task.forEach(t => UserService.assignTask(t, user));
        return user;
    }


    return { save, load };
})();