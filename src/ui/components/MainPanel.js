import { displayTasks, displayCompleteTasks } from "./Tasks.js";
import { Task } from "../../classes/Task.js";
import { UserService } from "../../services/UserService.js"

export const MainPanel = (function () {

    const main = document.createElement('div');
    main.className = 'mainPanel';

    const render = (user) => {
        const userTasks = user.getTasks();
        const userCompletedTasks = user.getCompletedTasks();

        const displayedTasks = displayTasks("All Tasks", userTasks);
        const displayedCompleteTasks = displayCompleteTasks("Completed Tasks", userCompletedTasks);

        if (userTasks.length <= 0) console.log("No tasks yet!");

        if (userCompletedTasks.length <= 0) console.log("Work your ass off!");

        main.appendChild(displayedTasks);
        main.appendChild(displayedCompleteTasks);
    }

    return { el: main, render };
})();