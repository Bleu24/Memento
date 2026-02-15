import { UserService } from "../../services/UserService";
import { createElement, X, Dot, Ellipsis } from "lucide";

export const displayThreeTasks = (user) => {
    const container = document.createElement('div');
    const ul = document.createElement('ul');

    container.className = 'recommendationContainer';
    ul.className = 'recommendedTaskList';

    const userTasks = UserService.retrieveAllTasks(user);


    const priorityOrder = { 'high': 1, 'mid': 2, 'low': 3 };


    const tasks = userTasks
        .sort((a, b) => {
            const prioA = priorityOrder[a.priority] || 99; // Default to low/99 if undefined
            const prioB = priorityOrder[b.priority] || 99;
            return prioA - prioB;
        })
        .slice(0, 3);

    const prioMap = [
        ['low', 'green'],
        ['mid', 'blue'],
        ['high', 'red']
    ];

    for (const task of tasks) {
        const del = createElement(X);
        const taskContainer = document.createElement('li');
        const taskItem = document.createElement('div');
        const leftSideOfItem = document.createElement('div');
        const rightSideOfItem = document.createElement('div');

        del.setAttribute('class', 'delete');
        taskContainer.className = "taskList__container";
        taskItem.className = "taskList__item";
        leftSideOfItem.className = "item__left";
        rightSideOfItem.className = "item__right";

        //left side elements
        const checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
        checkBox.id = task.id;
        checkBox.name = 'user__task';
        const taskTitle = document.createElement('label');
        taskTitle.textContent = task.title;
        taskTitle.setAttribute("for", checkBox.id);

        //right side elements
        const dueDate = document.createElement('time');
        dueDate.textContent = task.dueDate;

        const prio = createElement(Dot);
        const edit = createElement(Ellipsis);

        edit.classList.add("edit");


        for (const arr of prioMap) {
            if (arr[0] === task.priority) {
                prio.style.setProperty('stroke', arr[1]);
            }
        }

        // append nodes to corresponding parents
        leftSideOfItem.append(checkBox, taskTitle);
        rightSideOfItem.append(dueDate, prio, edit);

        taskItem.append(leftSideOfItem, rightSideOfItem);
        taskContainer.append(taskItem, del);

        ul.appendChild(taskContainer);
    }

    container.appendChild(ul);

    return container;
}
