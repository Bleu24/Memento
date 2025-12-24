import { Notifications } from "../classes/Notifications.js";
import { createExpHolder } from "../factories/expHolderFactory.js";


const applyXP = (task) => {
    let BASE_XP = 0;


    if (!task) {
        console.error("Invalid Task");
        return;
    }

    if (task.priority === 'low') {
        BASE_XP = 10;
        Object.assign(task, createExpHolder(BASE_XP));
    }
    else if (task.priority === 'mid') {
        BASE_XP = 20;
        Object.assign(task, createExpHolder(BASE_XP));
    }
    else if (task.priority === 'high') {
        BASE_XP = 30
        Object.assign(task, createExpHolder(BASE_XP));
    }
}


const onTaskCompleted = (data) => {
    const { task, user } = data;
    const xp = task.getXP();

    task.reduceXP(xp);
    user.addXP(xp)

    console.log(`User Obtained: ${user.getXP()} XP`);
    console.log(`Completed Tasks:`, user.getCompletedTasks());
}



Notifications.subscribe("task:created", applyXP);
Notifications.subscribe("task:completed", onTaskCompleted);
