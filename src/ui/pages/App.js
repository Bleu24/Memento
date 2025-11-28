import { LeftPanel } from "../components/LeftPanel.js";
import { AppNav } from "../components/AppNav.js";
import { MainPanel } from "../components/MainPanel.js";
import { Notifications } from "../../classes/Notifications.js";

export const App = (function () {
    const app = document.createElement("div");
    app.dataset.page = "app";
    app.dataset.status = "active";


    app.appendChild(AppNav.el);
    app.appendChild(LeftPanel.el);
    app.appendChild(MainPanel.el);
    return app;
})();

const handleAppHydration = (userData) => {
    LeftPanel.render(userData);
    MainPanel.render(userData);
}

Notifications.subscribe("app:hydrate", handleAppHydration);