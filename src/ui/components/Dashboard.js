import { LocalRepository } from "../../repository/LocalRepository.js";
import { UserService } from "../../services/UserService.js";
import { createDashboardCard } from "./Card.js";
import { createChart } from "./Chart.js";
import { createElement, Percent, ListTodo, SquareCheckBig } from "lucide";

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
    let completeTasksCard = document.createElement('div');


    // TODO: finalize updateProgress method
    const updateProgress = (user) => {
        if (user) {
            const level = user.getLevel();
            const threshold = user.getThreshold();

            min.textContent = `${level}`;
            max.textContent = `${level + 1}`;
            progBar.max = threshold;
            progBar.value = user.computeXP();

            incompleteTasksCard = createDashboardCard({ svg: ListTodo, options: { stroke: '#18F2B2' } }, "Unfinished Tasks", user.getTasks().length, user.getTasks().length ? "Work your ass off!" : "Good job! No work for today!");
            completeTasksCard = createDashboardCard({ svg: SquareCheckBig, options: { stroke: '#18F2B2' } }, "Finished Tasks", user.getCompletedTasks().length, user.getCompletedTasks().length ? "Good job! Keep on going!" : "Work your ass off!");
            

            if (cards.hasChildNodes()) return;

            cards.appendChild(incompleteTasksCard);
            cards.appendChild(completeTasksCard);
            cards.appendChild(completeTasksCard);


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