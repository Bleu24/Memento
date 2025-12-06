import { displayTasks, displayCompleteTasks } from "./Tasks.js";
import { Dashboard } from "./Dashboard.js";

export const MainPanel = (function () {

    const main = document.createElement('div');
    main.className = 'mainPanel';


    //Refactor Main Panel divide to 4 parts
    const render = (user) => {

        if (main.hasChildNodes()) {
            const children = Array.from(main.children);

            for (const child of children) {
                child.remove();
            }
        }

        const tab = user.getTab();
        switch (tab) {
            case "dashboard":
                main.appendChild(Dashboard.el);
                Dashboard.render(user);
            case "tasks":
                const userTasks = user.getTasks();
                const userCompletedTasks = user.getCompletedTasks();

                const displayedTasks = displayTasks("All Tasks", userTasks);
                const displayedCompleteTasks = displayCompleteTasks("Completed Tasks", userCompletedTasks);

                if (userTasks.length <= 0) console.log("No tasks yet!");

                if (userCompletedTasks.length <= 0) console.log("Work your ass off!");

                main.appendChild(displayedTasks);
                main.appendChild(displayedCompleteTasks);
                break;
        }

    }

    return { el: main, render };
})();