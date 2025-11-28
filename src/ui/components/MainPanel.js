import { displayTasks, displayCompleteTasks } from "./Tasks.js";
import { Task } from "../../classes/Task.js";
import { UserService } from "../../services/UserService.js"

export const MainPanel = (function () {

    const main = document.createElement('div');
    main.className = 'mainPanel';

    const render = (user) => {
        const displayedTasks = displayTasks("All Tasks", user.getTasks());
        const displayedCompleteTasks = displayCompleteTasks("Completed Tasks", user.getCompleteTasks());
        main.appendChild(displayedTasks);
        main.appendChild(displayedCompleteTasks);
    }

    return { el: main, render };
})();