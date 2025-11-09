import { WhatIsItSection } from "./Sections/WhatIsIt";

export const Home = (function () {
    const home = document.createElement("div");
    const heroBackground = document.createElement("div");
    const heroContainer = document.createElement("div");
    const heroTextContainer = document.createElement("div");
    const heroText = document.createElement("h1");
    const heroSubtext = document.createElement("p");
    const heroButton = document.createElement("button");

    home.dataset.page = "home";
    home.dataset.status = "active";
    home.className = "home";
    heroBackground.className = "hero__bg";
    heroContainer.className = "hero";
    heroText.className = "hero__text";
    heroSubtext.className = "hero__subtext";
    heroButton.className = "hero__button";
    heroTextContainer.className = "hero__text--container"

    heroText.textContent = "Keep your past tasks on check";
    heroSubtext.textContent = "Remember your purpose, effort, and progress.";
    heroButton.textContent = "Sign Up";

    heroTextContainer.appendChild(heroText);
    heroTextContainer.appendChild(heroSubtext);

    heroContainer.appendChild(heroTextContainer);
    heroContainer.appendChild(heroButton);

    home.appendChild(heroBackground);
    home.appendChild(heroContainer);
    home.appendChild(WhatIsItSection);

    return home;
})();