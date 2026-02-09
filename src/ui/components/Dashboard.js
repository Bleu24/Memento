import { createDashboardCard } from "./Card.js";
import { ListTodo, SquareCheckBig, Zap, Trophy, ChartLine, Percent } from "lucide";
import { createDayNodes } from "./DayNodes.js";

const percentage = (num, denom) => {
    let quotient = 0;
    quotient = denom ? `${(num / denom) * 100}%` : `${0}%`;
    return quotient;
}

export const Dashboard = (function () {
    const div = document.createElement("div");
    const progressLabel = document.createElement("label");
    const progress = document.createElement("div");
    const progBar = document.createElement("progress");
    const min = document.createElement("h2");
    const max = document.createElement("h2");
    const cards = document.createElement("div");


    let incompleteTasksCard = document.createElement('div');
    let completeTasksCard = document.createElement('div');
    let streakCard = document.createElement('div');
    let taskCard = document.createElement('div');
    let chartCard = document.createElement('div');
    let completionCard = document.createElement('div');


    // TODO: finalize updateProgress method
    const updateProgress = (user) => {
        if (user) {
            progBar.value = user.computeXP();
            min.textContent = `${user.getLevel()}`;
            max.textContent = `${user.getLevel() + 1}`;
            progBar.max = user.getThreshold();

            
            incompleteTasksCard = createDashboardCard({ svg: ListTodo, options: { stroke: '#18F2B2' } }, "Unfinished Tasks", user.getTasks().length, user.getTasks().length ? "Work your ass off!" : "Good job! No work for today!");
            completeTasksCard = createDashboardCard({ svg: SquareCheckBig, options: { stroke: '#18F2B2' } }, "Finished Tasks", user.getCompletedTasks().length, user.getCompletedTasks().length ? "Good job! Keep on going!" : "Work your ass off!");
            streakCard = createDashboardCard({ svg: Zap, options: { stroke: '#18F2B2' } }, "Streaks", createDayNodes(), "");
            taskCard = createDashboardCard({ svg: Trophy, options: { stroke: '#18F2B2' } }, "Relevant Tasks", 0, "Your top 3 important tasks");
            chartCard = createDashboardCard({ svg: ChartLine, options: { stroke: '#18F2B2' } }, "KPI", 0, "Describes how well you perform");
            completionCard = createDashboardCard({ svg: Percent, options: { stroke: '#18F2B2' } }, "Completion Rate", percentage(user.getCompletedTasks().length, user.getTasks().length), "Your completion rate in percent");

            const cardsArr = [
                incompleteTasksCard,
                completeTasksCard,
                streakCard,
                taskCard,
                chartCard,
                completionCard
            ]

            if (cards.hasChildNodes()) return;

            for (const card of cardsArr) {
                cards.appendChild(card);
            }
        }
    }


    div.className = "main__dashboard";
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