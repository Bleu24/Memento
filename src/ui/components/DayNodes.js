import { Flame, createElement } from "lucide";
import { Time } from "../../classes/Time";
import { px } from "motion";

export function createDayNodes() {
    const container = document.createElement('div');
    container.className = 'week';

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    for (const day of days) {
        const span = document.createElement('span');
        const p = document.createElement('p');
        const flame = createElement(Flame)

        span.appendChild(flame);
        span.appendChild(p);

        span.className = `node__${day.toLowerCase()}`;
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

    return container;
}