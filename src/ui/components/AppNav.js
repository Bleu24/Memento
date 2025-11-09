export const AppNav = (function () {
    const header = document.createElement('header');
    const logoDiv = document.createElement('div');
    const logo = document.createElement('h2');
    const tabContainer = document.createElement('div');
    const tabLabel = document.createElement('h4');
    const suppLabel = document.createElement('p');


    header.className = "header";
    logoDiv.className = "header__logoDiv";
    logo.className = "header__logo";
    tabContainer.className = "header__tabContainer";
    tabLabel.className = "header__tabLabel";
    suppLabel.className = "header__suppLabel";

    logo.textContent = "Memento";
    tabLabel.textContent = "Dummy Tab";
    suppLabel.textContent = "This is a dummy tab";



    logoDiv.appendChild(logo);

    tabContainer.appendChild(tabLabel);
    tabContainer.appendChild(suppLabel);

    header.appendChild(logoDiv);
    header.appendChild(tabContainer);

    return header;
})();