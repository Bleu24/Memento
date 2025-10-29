import { Notifications } from "../classes/Notifications.js";
import { Task } from "../classes/Task.js";
import { User } from "../classes/User.js";
import { createExpHolder } from "../factories/expHolderFactory.js";
import { UserService } from "../services/UserService.js";

const onTaskCreated = (task) => {
    let BASE_XP = null;


    if (!task) {
        console.error("Invalid Task");
        return;
    }

    if (task.priority === 'low') {
        BASE_XP = 10;
        Object.assign(task, createExpHolder(BASE_XP));
    }
    else if (task.priority === 'medium') {
        BASE_XP = 20;
        Object.assign(task, createExpHolder(BASE_XP));
    }
    else if (task.priority === 'high') {
        BASE_XP = 30
        Object.assign(task, createExpHolder(BASE_XP));
    }

    console.log(`Task XP: ${task.getXP()}`);
}


const onTaskCompleted = (data) => {
    const { task, user } = data;
    const xp = task.getXP();

    task.reduceXP(xp);
    user.addXP(xp)

    console.log(`User Obtained: ${user.getXP()} XP`);
    console.log(`Completed Tasks: ${user.getCompletedTasks()}`)
}


Notifications.subscribe("task:created", onTaskCreated);
Notifications.subscribe("task:completed", onTaskCompleted);

const firstUser = new User(null, "Bryan", 0, 0);
const firsttask = UserService.createTaskForUser(firstUser, ["coding", "add module", new Date(24, 7, 2025), "medium"]);
UserService.completeTask(firsttask, firstUser);