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
        ["Gamify Tasks", "Turn productivity into play. Every completed task earns you XP, helping you level up and track your progress like a true achievement system. Stay motivated, celebrate wins, and make your to-do list feel like a game worth mastering."],
        ["Persistent To-Do List", "Your tasks stay with you, securely stored on your device for instant access, even offline. No logins, no syncing delays. Just a reliable, always-there list that respects your flow and keeps your goals within reach."],
        ["Mindful Living", "This isn’t just about getting things done, it’s about doing what matters. Prioritize with intention, reflect on your progress, and align your tasks with your deeper purpose. Because your time deserves meaning, not just management."]
    ];

    for (let i = 0; i < 3; i++) {
        cardContainer.appendChild(createCard(icons[i], ...cardTexts[i]));
    }


    whatIsItSection.appendChild(cardContainer);

    return whatIsItSection;
})();