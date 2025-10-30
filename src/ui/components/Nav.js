export const Nav = (function () {
    const nav = document.createElement("nav");
    const logo = document.createElement("h1");
    const navButtons = document.createElement("div");
    const ctaButtons = document.createElement("div");
    const navButton = document.createElement("button");
    const ctaButton = document.createElement("button");

    const navButtonsArr = ["Home", "About", "Contact"];
    const ctaButtonsArr = ["Login", "Sign Up"];

    navButtonsArr.forEach(button => {
        const navButton = document.createElement("button");
        navButton.textContent = button;
        navButtons.appendChild(navButton);
    });

    ctaButtonsArr.forEach(button => {
        const ctaButton = document.createElement("button");
        ctaButton.textContent = button;
        ctaButtons.appendChild(ctaButton);
    });


    nav.className = "nav";
    logo.className = "nav__logo";
    navButtons.className = "nav__links";
    ctaButtons.className = "nav__ctas";
    navButton.className = "nav__link";
    ctaButton.className = "nav__cta";

    nav.appendChild(logo);
    nav.appendChild(navButtons);
    nav.appendChild(ctaButtons);

    return nav;
})();