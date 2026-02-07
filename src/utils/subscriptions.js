import { Notifications } from "../classes/Notifications.js";
import { createExpHolder } from "../factories/expHolderFactory.js";


const applyXP = (task) => {
    let BASE_XP = 0;


    if (!task) {
        console.error("Invalid Task");
        return;
    }

    if (task.isDone === true) {
        Object.assign(task, createExpHolder(BASE_XP)); // assigns zero
    }
    else if (task.priority === 'low') {
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

const onTaskUndo = (data) => {
    const { task, user } = data;
    const xp = task.priority === 'low' ? 10 : task.priority === 'mid' ? 20 : task.priority === 'high' ? 30 : 0;

    user.reduceXP(xp);
    task.addXP(xp);
}



Notifications.subscribe("task:created", applyXP);
Notifications.subscribe("task:completed", onTaskCompleted);
Notifications.subscribe("task:undo", onTaskUndo);
