import Chart from 'chart.js/auto'; // might change this to a specific one to allow tree-shaking

export const createChart = (config) => {
    const div = document.createElement("div");
    const canvas = document.createElement("canvas");

    div.className = "chart";
    canvas.className = "chart__canvas";


    new Chart(canvas,
        {
            type: config.type,
            data: {
                labels: config.date,
                datasets: {
                    label: "Tasks completed each week",
                    data: config.data
                }
            }

        }
    );


    div.appendChild(canvas);
    return div;
}