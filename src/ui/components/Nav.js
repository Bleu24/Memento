import { createElement, User } from 'lucide';

export const Nav = (function () {

    const nav = document.createElement("nav");
    const logo = document.createElement("h1");
    const navButtons = document.createElement("div");
    const ctaButtons = document.createElement("div");
    const signUpIcon = createElement(User);
    const navButtonsArr = ["Home", "About", "Contact"];
    const ctaButtonsArr = ["Sign Up"];

    navButtonsArr.forEach(button => {
        const navButton = document.createElement("button");
        navButton.dataset.page = button.toLowerCase();  
        navButton.textContent = button;
        navButton.className = "nav__link";
        navButtons.appendChild(navButton);
    });

    ctaButtonsArr.forEach(button => {
        const ctaButton = document.createElement("button");
        const textNode = document.createElement("span");
        textNode.textContent = button;
        ctaButton.append(signUpIcon, textNode);
        ctaButton.className = "nav__cta";
        ctaButtons.appendChild(ctaButton);
    });


    nav.className = "nav";
    logo.className = "nav__logo";
    navButtons.className = "nav__links";
    ctaButtons.className = "nav__ctas";

    logo.textContent = "Memento";

    nav.appendChild(logo);
    nav.appendChild(navButtons);
    nav.appendChild(ctaButtons);

    return nav;
})();