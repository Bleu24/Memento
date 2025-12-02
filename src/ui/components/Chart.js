import Chart from 'chart.js/auto';

export const createChart = (icon, title, option) => {
    const { type, data, options } = option;
    const div = document.createElement("div");
    const heading = document.createElement("h1");
    const canvas = document.createElement("canvas");

    div.className = "chart";
    heading.className = "chart__heading";
    canvas.className = "chart__canvas";

    title = "test";
    heading.textContent = title;
    new Chart(canvas, { type, data, options });

    div.appendChild(heading);
    div.appendChild(canvas);
    return div;
}