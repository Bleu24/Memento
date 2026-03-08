import { Flame, createElement } from "lucide";
import { Time } from "../../classes/Time";
import { format } from "date-fns";

export function createDayNodes(streaks) {
    const container = document.createElement('div');
    container.className = 'week';

    const weekNow = Time.weekNow;

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    for (const day of days) {
        const span = document.createElement('span');
        const p = document.createElement('p');
        const flame = createElement(Flame)

        span.appendChild(flame);
        span.appendChild(p);

        span.className = `node__${day.toLowerCase()}`;
        span.dataset.date = format(weekNow.find(date => date.split(' ')[0].toLowerCase() === day.slice(0, 3).toLowerCase()).slice(4, 15), "yyyy-MM-dd");
        p.className = 'node__text';

        p.textContent = day[0];
        container.appendChild(span);

        if (day === Time.dayNow) {
            span.style.backgroundColor = "#0E0E10"
            span.style.paddingLeft = "0.2rem";
            span.style.paddingRight = "0.2rem";
            span.style.borderRadius = "999px";
            span.style.border = "1px solid #18F2B2";
            flame.style.border = "0px";
        }
    }

    const weekNodes = Array.from(container.children);

    for (const node of weekNodes) {
        const nodeDate = node.dataset.date;
        const streak = streaks.find(s => s.date === nodeDate);

        if (streak && streak.tasksCompleted >= 3) {
            const flameSvg = node.querySelector('svg');
            const text = node.querySelector('p');
            flameSvg.style.stroke = '#f2a618';
            text.style.color = '#f2a618';

            if (nodeDate === Time.dateNow) node.style.border = "1px solid #f2a618";
        }
    }



    return container;
}