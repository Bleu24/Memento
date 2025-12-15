import 'normalize.css';
import './styles.css';
import './ui/styles/app.css';
import './utils/subscriptions.js';
import { render } from './utils/pageRouter.js';
import { Notifications } from './classes/Notifications.js';
import { UserService } from './services/UserService.js';
import { LocalRepository } from './repository/LocalRepository.js';


document.addEventListener("DOMContentLoaded", (e) => {
    const loadedProfile = UserService.loadLoggedInProfile(LocalRepository);

    if (loadedProfile) Notifications.emit("app:hydrate", loadedProfile);

    const savedTab = localStorage.getItem("activeTab");
    render(savedTab || "home");



    document.body.addEventListener("click", (e) => {
        const selectedLink = e.target.closest(".nav__link");
        const selectedCta = e.target.closest(".nav__cta");

        if (selectedLink) {
            const navLinks = document.querySelectorAll(".nav__link");

            navLinks.forEach(link => {
                if (link === selectedLink) {
                    link.classList.add("active");
                    render(selectedLink.dataset.page);
                } else {
                    link.classList.remove("active");
                }
            });
        }

        if (selectedCta) {
            selectedCta.classList.add("active");
            const navLinks = document.querySelectorAll(".nav__link");
            navLinks.forEach(link => {
                link.classList.remove("active");
            });
            render(selectedCta.dataset.page)

        }


    });
});


