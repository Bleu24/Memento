import { Notifications } from "../classes/Notifications.js";
import { createExpHolder } from "../factories/expHolderFactory.js";


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
    console.log(`Completed Tasks:`, user.getCompletedTasks())
}

const onUserCreated = (user) => {

}


Notifications.subscribe("task:created", onTaskCreated);
Notifications.subscribe("task:completed", onTaskCompleted);