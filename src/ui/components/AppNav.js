export const AppNav = (function () {
    const header = document.createElement('header');
    const logoDiv = document.createElement('div');
    const logo = document.createElement('h2');
    const tabContainer = document.createElement('div');
    const tabLabel = document.createElement('h4');
    const suppLabel = document.createElement('p');

    const proper = (tabName) => `${tabName[0].toUpperCase() + tabName.slice(1)}`;

    const render = (user) => {

        if (!user) return;

        const tab = user.getTab();
        switch (tab) {
            case "dashboard":
                tabLabel.textContent = proper(tab);
                suppLabel.textContent = "View your progress";
                break;
            case "tasks":
                tabLabel.textContent = proper(tab);
                suppLabel.textContent = "View your tasks";
                break;
        }
    }


    header.className = "header";
    logoDiv.className = "header__logoDiv";
    logo.className = "header__logo";
    tabContainer.className = "header__tabContainer";
    tabLabel.className = "header__tabLabel";
    suppLabel.className = "header__suppLabel";

    logo.textContent = "Memento";

    logoDiv.appendChild(logo);

    tabContainer.appendChild(tabLabel);
    tabContainer.appendChild(suppLabel);

    header.appendChild(logoDiv);
    header.appendChild(tabContainer);

    return { el: header, render };
})();