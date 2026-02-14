import { UserService } from "../../services/UserService";

export const displayThreeTasks = (user) => {
    const container = document.createElement('div');
    const ul = document.createElement('ul');

    const userTasks = UserService.retrieveAllTasks(user);
    const tasks = [];


    // Improve algorithm for prioritizing high priority tasks
    for (const t of userTasks) {

        if (tasks.length === 3) break;

        if (t.priority === 'high') tasks.push(t);
        else if (t.priority === 'mid') tasks.push(t);
        else tasks.push(t);
    }

    console.log(tasks);

}