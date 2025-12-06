import { LocalRepository } from "../../repository/LocalRepository.js";
import { UserService } from "../../services/UserService.js";
import { createDashboardCard } from "./Card.js";
import { createChart } from "./Chart.js";
import { createElement, Percent, ListTodo } from "lucide";

export const Dashboard = (function () {
    const div = document.createElement("div");
    const charts = document.createElement("div");
    const progressLabel = document.createElement("label");
    const progress = document.createElement("div");
    const progBar = document.createElement("progress");
    const min = document.createElement("h2");
    const max = document.createElement("h2");
    const cards = document.createElement("div");


    let incompleteTasksCard = document.createElement('div');


    // TODO: finalize updateProgress method
    const updateProgress = (user) => {
        if (user) {
            const level = user.getLevel();
            const threshold = user.getThreshold();

            min.textContent = `${level}`;
            max.textContent = `${level + 1}`;
            progBar.max = threshold;
            progBar.value = user.computeXP();

            cards.append(incompleteTasksCard = createDashboardCard(createElement(ListTodo), "Unfinished Tasks", user, "FFUKC"));
        }
    }


    div.className = "main__dashboard";
    charts.className = "charts";
    progressLabel.className = "progress__heading";
    progress.className = "progress";
    progBar.id = "xp";
    progBar.className = "progress__bar";
    min.className = "progress__min";
    max.className = "progress__max";
    cards.className = "cards";

    progressLabel.htmlFor = "xp";


    progressLabel.textContent = "Your Progress";


    progress.append(min, progBar, max);

    div.appendChild(progressLabel);
    div.appendChild(progress);
    div.appendChild(cards);



    return { el: div, render: updateProgress };
})();