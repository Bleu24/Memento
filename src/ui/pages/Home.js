export const Home = (function () {
    const home = document.createElement("div");
    const heroBackground = document.createElement("div");
    const heroContainer = document.createElement("div");
    const heroText = document.createElement("h1");
    const heroSubtext = document.createElement("p");
    const heroButton = document.createElement("button");

    home.className = "home";
    heroBackground.className = "hero__bg";
    heroContainer.className = "hero";
    heroText.className = "hero__text";
    heroSubtext.className = "hero__subtext";
    heroButton.className = "hero__button";

    heroBackground.appendChild(heroContainer);

    heroContainer.appendChild(heroText);
    heroContainer.appendChild(heroSubtext);
    heroContainer.appendChild(heroButton);

    home.appendChild(heroBackground);

    return home;
})();