import Chart, { scales } from 'chart.js/auto'; // might change this to a specific one to allow tree-shaking

export const createChart = (config) => {
    const div = document.createElement("div");
    const canvas = document.createElement("canvas");

    div.className = "chart";
    canvas.className = "chart__canvas";


    new Chart(canvas,
        {
            type: config.type,
            data: {
                datasets: [{
                    data: config.data
                }]
            },
            options: {
                scales: {
                    x: {
                        stacked: true
                    },

                    y: {
                        stacked: true,
                        beginAtZero: true
                    }
                }
            }

        }
    );


    div.appendChild(canvas);
    return div;
}