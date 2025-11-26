import { LeftPanel } from "../components/LeftPanel.js";
import { AppNav } from "../components/AppNav.js";
import { MainPanel } from "../components/MainPanel.js";

export const App = (function () {
    const app = document.createElement("div");
    app.dataset.page = "app";
    app.dataset.status = "active";


    app.appendChild(AppNav);
    app.appendChild(LeftPanel.el);
    app.appendChild(MainPanel);
    return app;
})(); 