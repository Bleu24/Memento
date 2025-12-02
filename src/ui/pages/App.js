import { LeftPanel } from "../components/LeftPanel.js";
import { AppNav } from "../components/AppNav.js";
import { MainPanel } from "../components/MainPanel.js";
import { Notifications } from "../../classes/Notifications.js";
import { UserService } from "../../services/UserService.js";
import { LocalRepository } from "../../repository/LocalRepository.js";
import { UIService } from "../../services/UIService.js";

export const App = (function () {
    const app = document.createElement("div");
    app.dataset.page = "app";
    app.dataset.status = "active";

    window.addEventListener('load', (e) => {
        const loadedProfile = UserService.loadLoggedInProfile(LocalRepository);
        Notifications.emit("app:hydrate", loadedProfile);
    });

    app.appendChild(AppNav.el);
    app.appendChild(LeftPanel.el);
    app.appendChild(MainPanel.el);
    return app;
})();

const handleAppHydration = (userData) => {
    UIService.render(LeftPanel, user);
    UIService.render(MainPanel, user);
    UIService.render(AppNav, user); //saves previously clicked tab (user-specific)
}

Notifications.subscribe("app:hydrate", handleAppHydration);