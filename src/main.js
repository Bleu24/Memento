import 'normalize.css';
import './styles.css';
import './utils/subscriptions.js';
import { Nav } from './ui/components/Nav.js';
import { render } from './utils/render.js';


document.body.appendChild(Nav);
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
                localStorage.setItem("activeTab", selectedLink.dataset.page);
                const pageIsActive = document.querySelector(`div[data-status="active"]`);
                if (pageIsActive) {
                    document.body.removeChild(pageIsActive);
                }
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
        const pageIsActive = document.querySelector(`div[data-status="active"]`);
        localStorage.setItem("activeTab", selectedCta.dataset.page);
        if (pageIsActive) {
            document.body.removeChild(pageIsActive);
        }
        render(selectedCta.dataset.page)

    }


});