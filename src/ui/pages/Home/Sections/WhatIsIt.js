import { Zap, ListTodo, Clock } from "lucide";
import { createCard } from "../../../components/Card";

export const WhatIsItSection = (function () {
    const whatIsItSection = document.createElement("div");
    const headingContainer = document.createElement("div");
    const heading = document.createElement("h1");
    const subheading = document.createElement("p");
    const cardContainer = document.createElement("div");

    heading.textContent = "What is it?";
    subheading.textContent = "Memento is a to-do app that helps you accomplish past tasks.";

    headingContainer.className = "witSection__headingContainer"
    cardContainer.className = "witSection__cardContainer"
    whatIsItSection.className = "witSection";
    heading.className = "witSection__heading";
    subheading.className = "witSection__subheading";

    headingContainer.appendChild(heading);
    headingContainer.appendChild(subheading);

    whatIsItSection.appendChild(headingContainer);

    const icons = [Zap, ListTodo, Clock];
    const cardTexts = [
        ["Gamify Tasks", "Earn XP and level up as you accomplish your tasks!"],
        ["Persistent To-Do List", "Your tasks are saved locally, so you can access them anytime."],
        ["Mindful Living", "Your time is precious and so your purpose."]
    ]

    for (let i = 0; i < 3; i++) {
        cardContainer.appendChild(createCard(icons[i], ...cardTexts[i]));
    }


    whatIsItSection.appendChild(cardContainer);

    const cards = whatIsItSection.querySelectorAll(".card");

    const firstCard = cards[0];
    // Or using querySelector for more specific targeting
    const firstTitle = firstCard.querySelector('.card__heading');
    const firstContent = firstCard.querySelector('.card__body');








    return whatIsItSection;
})();