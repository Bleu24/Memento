import Chart from 'chart.js/auto'; // might change this to a specific one to allow tree-shaking

export const createChart = (config) => {
    const div = document.createElement("div");
    const canvas = document.createElement("canvas");

    div.className = "chart";
    canvas.className = "chart__canvas";


    new Chart(canvas,
        {
            type: config.type,
            data: config.data,
            options: config.options || {
                scales: {
                    x: { stacked: true },
                    y: { stacked: true, beginAtZero: true }
                }
            }
        }
    );

    div.appendChild(canvas);
    return div;
}

// Helper: Generate weekly tasks chart config (This is AI generated, since I don't know how to use chart.js)
import { Time } from "../../classes/Time";
import { format } from "date-fns";

/**
 * Returns a Chart.js config for weekly tasks completed using streaks and Time.weekNow
 * @param {Array} streaks - Array of streak objects (must have date or dateFormatted, and tasksCompleted)
 * @returns {Object} Chart.js config
 */
export function getWeeklyTaskChartConfig(streaks) {
    // Get week dates in yyyy-MM-dd format
    const weekDates = Time.weekNow.map(dateStr =>
        format(new Date(dateStr), "yyyy-MM-dd")
    );

    // For each day, get tasksCompleted from streaks (default 0)
    const tasksPerDay = weekDates.map(date => {
        const streak = streaks.find(s => s.date === date || s.dateFormatted === date);
        return streak ? streak.tasksCompleted : 0;
    });

    return {
        type: 'bar',
        data: {
            labels: weekDates,
            datasets: [{
                label: 'Tasks Completed',
                data: tasksPerDay,
                backgroundColor: '#18F2B2',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                x: { stacked: true },
                y: { stacked: true, beginAtZero: true }
            }
        }
    };
}