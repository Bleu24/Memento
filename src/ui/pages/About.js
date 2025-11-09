export const About = (function () {

    const about = document.createElement("div");
    about.textContent = "About";
    about.dataset.page = "about";
    about.dataset.status = "active";
    about.className = "about";

    return about;

})();