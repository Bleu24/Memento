import { LocalRepository } from "../../repository/LocalRepository.js";
import { UserService } from "../../services/UserService.js";
import { createChart } from "./Chart.js";

export const Dashboard = (function () {
    const div = document.createElement("div");
    const charts = document.createElement("div");
    const progressLabel = document.createElement("label");
    const progress = document.createElement("div");
    const progBar = document.createElement("progress");
    const min = document.createElement("h2");
    const max = document.createElement("h2");


    // TODO: finalize updateProgress method
    const updateProgress = (user) => {
        if (user) {
            const level = user.getLevel();
            const threshold = user.getThreshold();
            const runningXp = user.getRunningXp();
            const leftoverXp = user.getLeftoverXp();

            min.textContent = `${level}`;
            max.textContent = `${level + 1}`;
            progBar.max = threshold;
            progBar.value = 20;
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

    progressLabel.htmlFor = "xp";


    progressLabel.textContent = "Your Progress";


    progress.append(min, progBar, max);

    div.appendChild(progressLabel);
    div.appendChild(progress);

    updateProgress(UserService.loadLoggedInProfile(LocalRepository));

    return { el: div, updateProgress };
})();