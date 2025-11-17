import { createElement, Dot, Ellipsis } from "lucide";

export function displayTasks(tasks) {
    const tasksDiv = document.createElement("div");
    const header = document.createElement('header');
    const heading = document.createElement("h2");
    const taskCounter = document.createElement("span");
    const taskList = document.createElement("ul");


    header.className = "taskHeader";
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

        taskItem.className = "taskList__item";
        leftSideOfItem.className = "item__left";
        rightSideOfItem.className = "item__right";

        //left side elements
        const checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
        checkBox.id = 'user__task';
        checkBox.name = 'user__task';
        const taskTitle = document.createElement('label');
        taskTitle.textContent = task.title;
        taskTitle.setAttribute("for", checkBox.id);

        //right side elements
        const dueDate = document.createElement('time');
        dueDate.textContent = task.dueDate;

        const prio = createElement(Dot);
        const edit = createElement(Ellipsis);


        for (const arr of prioMap) {
            if (arr[0] === task.priority) {
                prio.style.setProperty('stroke', arr[1]);
            }
        }

        // append nodes to corresponding parents

        leftSideOfItem.append(checkBox, taskTitle);
        rightSideOfItem.append(dueDate, prio, edit);

        taskItem.append(leftSideOfItem, rightSideOfItem);

        taskList.appendChild(taskItem);
    });

    taskCounter.textContent = tasks.length;


    header.append(heading, taskCounter);
    tasksDiv.appendChild(header);
    tasksDiv.appendChild(taskList);


    return tasksDiv;
}