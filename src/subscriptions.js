import { Notifications } from "./classes/Notifications";

const onTaskCreated = (data) => {
    
}


const onTaskCompleted = (data) => {
    
}


Notifications.subscribe("task:created", onTaskCreated);
Notifications.subscribe("task:completed", onTaskCompleted);