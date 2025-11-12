import { createElement, Dot } from "lucide";

export function displayTasks(tasks) {
    const tasksDiv = document.createElement("div");
    const heading = document.createElement("h2");
    const taskCounter = document.createElement("h6");
    const taskList = document.createElement("ul");


    tasksDiv.className = "tasksContainer";
    heading.className = "tasksContainer__heading";
    taskCounter.className = "tasksContainer__taskCounter";
    taskList.className = "tasksContainer__taskList";

    heading.textContent = "All Tasks";


    const prioMap = [
        ['low', 'green'],
        ['mid', 'blue'],
        ['high', 'red']
    ];


    tasks.forEach(task => {
        const taskItem = document.createElement('li');
        const leftSideOfItem = document.createElement('div');
        const rightSideOfItem = document.createElement('div');

        //left side elements
        const checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
        const taskTitle = document.createElement('p');
        taskTitle.textContent = task.title;

        //right side elements
        const dueDate = document.createElement('time');
        dueDate.textContent = task.dueDate;

        const prio = createElement(Dot);

        for (const arr of prioMap) {
            if (arr[0] === task.priority) {
                prio.style.setProperty('stroke', arr[1]);
            }
        }

        // append nodes to corresponding parents

        leftSideOfItem.append(checkBox, taskTitle);
        rightSideOfItem.append(dueDate, prio);

        taskItem.append(leftSideOfItem, rightSideOfItem);

        taskList.appendChild(taskItem);
    });


    tasksDiv.appendChild(heading);
    tasksDiv.appendChild(taskCounter);
    tasksDiv.appendChild(taskList);


    return tasksDiv;
}