import { displayTasks } from "./Tasks.js";
import { Task } from "../../classes/Task.js";

export const MainPanel = (function () {

    const main = document.createElement('div');
    main.className = 'mainPanel';


    const dummyTasks = [new Task(null, "Coding", "Write upload feature", "July 9, 2026", "high")];
    const displayedTasks = displayTasks(dummyTasks);

    main.appendChild(displayedTasks);

    return main;
})();