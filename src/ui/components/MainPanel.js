import { Tasks } from "./Tasks.js";
import { Dashboard } from "./Dashboard.js";
import { Projects } from "./Projects.js";

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


        const tab = user.getTab?.() ?? "tasks";
        switch (tab) {
            case "dashboard":
                main.appendChild(Dashboard.el);
                Dashboard.render(user);
                break;
            case "tasks":
                main.appendChild(Tasks.el);
                Tasks.render(user);
                break;
            case "projects":
                main.appendChild(Projects.el);
                Projects.render(user);
        }

    }

    return { el: main, render };
})();