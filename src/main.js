import 'normalize.css';
import './styles.css';
import './utils/subscriptions.js';
import { Home } from './ui/pages/Home/Home.js';
import { Nav } from './ui/components/Nav.js';
import { renderPage } from './utils/renderPage.js';


document.body.appendChild(Nav);
document.body.appendChild(Home);

document.body.addEventListener("click", (e) => {
    const selectedLink = e.target.closest(".nav__link");
    if (!selectedLink) return;

    const navLinks = document.querySelectorAll(".nav__link");

    navLinks.forEach(link => {
        if (link === selectedLink) {
            link.classList.add("active");
            const pageIsActive = document.querySelector(`div[data-status="active"]`);
            if (pageIsActive) {
                document.body.removeChild(pageIsActive);
            }
            renderPage(selectedLink.dataset.page);
        } else {
            link.classList.remove("active");
        }
    });
});