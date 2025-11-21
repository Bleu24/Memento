import { Home } from "../ui/pages/Home/Home.js";
import { About } from "../ui/pages/About.js";
import { Contact } from "../ui/pages/Contact.js";
import { SignUp } from "../ui/pages/SignUp.js";
import { App } from "../ui/pages/App.js";
import { Nav } from "../ui/components/Nav.js";


export const render = (page) => {
    document.body.appendChild(Nav);

    if (!page || typeof page !== "string") {
        throw new Error("Invalid page");
    }
    const pageIsActive = document.querySelector(`div[data-status="active"]`);
    if (pageIsActive) {
        document.body.removeChild(pageIsActive);
    }

    localStorage.setItem("activeTab", page);

    switch (page) {
        case "home":
            document.body.appendChild(Home);
            break;
        case "about":
            document.body.appendChild(About);
            break;
        case "contact":
            document.body.appendChild(Contact);
            break;
        case "sign up":
            document.body.appendChild(SignUp);
            break;
        case "app":
            document.body.removeChild(Nav);
            document.body.appendChild(App);
            break;
        default:
            document.body.appendChild(Home);
            break;
    }
}