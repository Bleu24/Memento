import { createElement, LayoutDashboard, ListTodo, FolderClosed, Bolt, Home, CircleUser, LogOut } from "lucide";
import { render } from "../../utils/pageRouter.js";
import { UIService } from "../../services/UIService.js";
import { AppNav } from "./AppNav.js";
import { UserService } from "../../services/UserService.js";
import { LocalRepository } from "../../repository/LocalRepository.js";


export const LeftPanel = (function () {
    const panel = document.createElement("div");
    const sideNav = document.createElement("nav");
    const upperBtnsDiv = document.createElement("div");
    const lowerBtnsDiv = document.createElement("div");
    const userContainer = document.createElement("div");
    const userInfo = document.createElement("div");
    const userName = document.createElement("h5");
    const userEmail = document.createElement("p");
    const logOutContainer = document.createElement("button");
    const logOut = document.createElement("p");


    const userIcon = createElement(CircleUser);
    const logoutIcon = createElement(LogOut);

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
        const clickedButton = e.target.closest('button');

        if (!(clickedButton instanceof HTMLButtonElement)) return;

        const classString = clickedButton.className;

        switch (classString) {
            case "home":
                render("home");
                break;
            case "dashboard":
                UIService.render(AppNav, { title: "Dashboard", subTitle: "This is a dashboard tab" });
                break;
            case "tasks":
                UIService.render(AppNav, { title: "Tasks", subTitle: "This is a tasks tab" });
                break;
            case "projects":
                UIService.render(AppNav, { title: "Projects", subTitle: "You're in the projects tab" });
                break;
            case "settings":
                UIService.render(AppNav, { title: "Settings", subTitle: "Settings Tab" });
            default:
                break;
        }
    }

    panel.addEventListener('click', navigate);

    const renderUserInfo = (props) => {

        if (!props) {
            try {
                props = UserService.loadLoggedInProfile(LocalRepository);
            } catch (e) {
                console.error("User loaded unsuccesfully:", e);
            }
        }

        if (props) {
            userName.textContent = props.name;
            userEmail.textContent = props.email;
            logOut.textContent = "Log Out"
            logOutContainer.append(logoutIcon, logOut);
            sideNav.appendChild(logOutContainer);
        } else {
            userName.textContent = "Guest";

        }
    }

    window.addEventListener('load', e => {
        renderUserInfo();
    });


    userContainer.className = "userContainer";
    logOutContainer.className = "logoutContainer";
    userInfo.className = "userInfo";
    userName.className = "userName";
    userEmail.className = "userEmail";
    logOut.className = "logOut";


    upperBtnsDiv.className = "leftPanel__upperBtns";
    lowerBtnsDiv.className = "leftPanel__lowerBtns";
    sideNav.className = "leftPanel__sideNav";
    panel.className = "leftPanel";

    userContainer.append(userIcon, userInfo);
    userInfo.append(userName, userEmail);


    sideNav.appendChild(upperBtnsDiv);
    sideNav.appendChild(lowerBtnsDiv);
    sideNav.appendChild(userContainer);


    panel.appendChild(sideNav);

    return { el: panel, render: renderUserInfo };
})();

