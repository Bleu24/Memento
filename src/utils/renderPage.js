import { Home } from "../ui/pages/Home/Home.js";
import { About } from "../ui/pages/About.js";
import { Contact } from "../ui/pages/Contact.js";

export const renderPage = (page) => {
    if (!page || typeof page !== "string") {
        throw new Error("Invalid page");
    }
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
        default:
            document.body.appendChild(Home);
            break;
    }
}