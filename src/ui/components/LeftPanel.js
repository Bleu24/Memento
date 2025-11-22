import { createElement, LayoutDashboard, ListTodo, FolderClosed, Bolt, Home } from "lucide";
import { render } from "../../utils/render.js";

export const LeftPanel = (function () {
    const panel = document.createElement("div");
    const sideNav = document.createElement("nav");
    const upperBtnsDiv = document.createElement("div");
    const lowerBtnsDiv = document.createElement("div");
    const userInfo = document.createElement("div");
    const userName = document.createElement("h5");
    const userEmail = document.createElement("p");

    const navButtons = [
        { icon: createElement(LayoutDashboard), name: "Dashboard" },
        { icon: createElement(ListTodo), name: "Tasks" },
        { icon: createElement(FolderClosed), name: "Projects" },
        { icon: createElement(Home), name: "Home" },
        { icon: createElement(Bolt), name: "Settings" }
    ]

    const inMemBtns = [];

    navButtons.forEach(btn => {
        const navBtn = document.createElement("button");
        const btnLabel = document.createElement("p");
        navBtn.className = `${btn.name.toLowerCase()}`;
        btnLabel.textContent = btn.name;
        navBtn.append(btn.icon, btnLabel);
        inMemBtns.push(navBtn);
    })

    const upperBtns = Array.from(inMemBtns).filter(node => node.className !== "settings");
    upperBtns.forEach(node => {
        upperBtnsDiv.appendChild(node);
    });

    const lowerBtns = Array.from(inMemBtns).filter(node => node.className === "settings");
    lowerBtns.forEach(node => {
        lowerBtnsDiv.appendChild(node);
    });

    const navigate = (e) => {
        if (e.target.closest(".home")) {
            render("home");
        }
    }

    panel.addEventListener('click', navigate);










    upperBtnsDiv.className = "leftPanel__upperBtns";
    lowerBtnsDiv.className = "leftPanel__lowerBtns";
    sideNav.className = "leftPanel__sideNav";
    panel.className = "leftPanel";

    sideNav.appendChild(upperBtnsDiv);
    sideNav.appendChild(lowerBtnsDiv);

    panel.appendChild(sideNav);

    return panel;
})();


