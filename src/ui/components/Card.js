import { createElement } from "lucide";

export function createCard(icon, heading, body) {
    const card = document.createElement("div");
    const svg = createElement(icon);
    const title = document.createElement("h2");
    const text = document.createElement("p");

    svg.classList.add("card__icon");
    card.className = "card";
    title.className = "card__heading";
    text.className = "card__body";

    title.append(svg, heading);
    text.textContent = body;

    card.appendChild(title);
    card.appendChild(text);

    return card;
}

export function createDBTopCards(icon, label, data, text) {
    const card = document.createElement("div");
    const svg = createElement(icon);
    const cardLabel = document.createElement("h2");
    const cardText = document.createElement("p");
    const cardHeading = document.createElement("div");
    const cardBody = document.createElement("div");
    const dataHolder = document.createElement("div");

    card.className = "card";
    cardLabel.className = "card__label";
    cardText.className = "card__text";
    cardHeading.className = "card__header";
    svg.classList.add("card__icon");
    cardBody.className = "card__body";

    cardHeading.append(svg, cardLabel);
    cardBody.append(dataHolder, cardText);
    card.append(cardHeading, cardBody);

    cardLabel.textContent = label;
    dataHolder.textContent = data;
    cardText.textContent = text;

    return card;
}