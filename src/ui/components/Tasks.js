import { UserService } from "../../services/UserService.js";

export const Tasks = (function () {
    const tasks = document.createElement("div");
    const heading = document.createElement("h2");
    const taskCounter = document.createElement("h6");
    const taskList = document.createElement("ul");
    const loggedInUser = UserService.loadProfileFromStorage();

    
    tasks.className = "tasksContainer";
    heading.className = "tasksContainer__heading";
    taskCounter.className = "tasksContainer__taskCounter";
    taskList.className = "tasksContainer__taskList";
        
    heading.textContent = "All Tasks";

    UserService.getTasksForUser(loggedInUser).forEach(task => {
        const taskItem = document.createElement("li");
        taskItem.id = task.id;
        
        taskList.appendChild(taskItem);
    });



    


    tasks.appendChild(heading);
    tasks.appendChild(taskCounter);
    tasks.appendChild(taskList);


    return tasks;
})();