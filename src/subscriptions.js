import { Notifications } from "./classes/Notifications.js";
import { User } from "./classes/User.js";
import { createExpHolder } from "./factories/expHolderFactory.js";

const onTaskCreated = (task) => {
    if (!task) {
        console.error("Invalid Task");
        return;
    }

    if (task.priority === 'low') Object.assign(task, createExpHolder(10));
    else if (task.priority === 'medium') Object.assign(task, createExpHolder(20));
    else if (task.priority === 'high') Object.assign(task, createExpHolder(30));

    console.log(task.getXP());
}


const onTaskCompleted = (data) => {
    const { task, user } = data;
    const xp = task.getXP();

    task.reduceXP(xp);
    user.addXP(xp)

    console.log(task.getXP());
    console.log(user.getXP());
}


Notifications.subscribe("task:created", onTaskCreated);
Notifications.subscribe("task:completed", onTaskCompleted);