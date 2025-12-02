import { createChart } from "./Chart.js";

export const Dashboard = (function () {
    const div = document.createElement("div");

    div.className = "main__dashboard";

    const data = [
        { year: 2010, count: 10 },
        { year: 2011, count: 20 },
        { year: 2012, count: 15 },
        { year: 2013, count: 25 },
        { year: 2014, count: 22 },
        { year: 2015, count: 30 },
        { year: 2016, count: 28 },
    ];

    div.appendChild(createChart(null, null, {
        type: 'bar',
        data: {
            labels: data.map(row => row.year),
            datasets: [
                {
                    label: 'Acquisitions by year',
                    data: data.map(row => row.count)
                }
            ]
        }
    }));

    div.appendChild(createChart(null, null, {
        type: 'bar',
        data: {
            labels: data.map(row => row.year),
            datasets: [
                {
                    label: 'Acquisitions by year',
                    data: data.map(row => row.count)
                }
            ]
        }
    }));
    div.appendChild(createChart(null, null, {
        type: 'bar',
        data: {
            labels: data.map(row => row.year),
            datasets: [
                {
                    label: 'Acquisitions by year',
                    data: data.map(row => row.count)
                }
            ]
        }
    }));
    div.appendChild(createChart(null, null, {
        type: 'bar',
        data: {
            labels: data.map(row => row.year),
            datasets: [
                {
                    label: 'Acquisitions by year',
                    data: data.map(row => row.count)
                }
            ]
        }
    }));


    return div;
})();