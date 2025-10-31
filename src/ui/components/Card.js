import { createElement } from "lucide";

export function createCard(icon, heading, body) {
    const card = document.createElement("div");
    const svg = createElement(icon);
    const title = document.createElement("h2");
    const text = document.createElement("p");

    card.className = "card";
    title.className = "card__heading";
    text.className = "card__body";

    title.append(svg, heading);
    text.textContent = body;

    card.appendChild(title);
    card.appendChild(text);

    return card;
}