import { createElement, Dot, Ellipsis, CirclePlus } from "lucide";
import { MainPanel } from '../components/MainPanel.js';
import { UserService } from "../../services/UserService";
import { LocalRepository } from "../../repository/LocalRepository";

const displayTaskModal = (mode) => {
    const bg = document.createElement('div');
    const formContainer = document.createElement('div');
    const form = document.createElement('form');
    const formTitle = document.createElement('h1');
    const row1 = document.createElement('div');
    const row2 = document.createElement('div');
    const row3 = document.createElement('div');
    const row4 = document.createElement('div');
    const submit = document.createElement('button');
    const fieldSet = document.createElement('fieldset');
    const legend = document.createElement('legend');
    legend.textContent = "Priority: ";

    bg.className = "modal__overlay";
    formContainer.className = "formContainer";
    form.className = "taskForm";
    formTitle.className = "taskForm__title";


    // For row 1
    const titleLabel = document.createElement('label');
    const titleInput = document.createElement('input');
    titleLabel.textContent = "Title: ";
    titleLabel.setAttribute("for", "title");
    titleInput.id = "title";
    titleInput.name = "title";
    titleInput.type = "text";
    titleInput.required = true;
    row1.append(titleLabel, titleInput);


    // row 2
    const descLabel = document.createElement('label');
    const descInput = document.createElement('input');
    descLabel.textContent = "Description: ";
    descLabel.setAttribute("for", "description");
    descInput.id = "description";
    descInput.name = "description";
    descInput.type = "text";
    row2.append(descLabel, descInput);

    // row 3
    const dateLabel = document.createElement('label');
    const dateInput = document.createElement('input');
    dateLabel.textContent = "Date: ";
    dateLabel.setAttribute("for", "date");
    dateInput.id = "date";
    dateInput.name = "date";
    dateInput.type = "text";
    dateInput.required = true;
    row3.append(dateLabel, dateInput);


    // row 4
    fieldSet.appendChild(legend);
    const priorities = ["high", "mid", "low"];

    for (const prio of priorities) {
        const radioGroup = document.createElement('div');
        const prioLabel = document.createElement('label');
        const prioInput = document.createElement('input');
        prioLabel.textContent = `${prio[0].toUpperCase() + prio.slice(1)}`;
        prioLabel.setAttribute("for", prio);
        prioInput.id = prio;
        prioInput.name = "priority";
        prioInput.type = "radio";
        prioInput.value = prio;
        radioGroup.append(prioLabel, prioInput);
        fieldSet.append(radioGroup);
        row4.append(fieldSet);
        prioInput.required = true;
    }
    switch (mode) {
        case "create":
            submit.textContent = "Create";
            formTitle.textContent = "Create Task";
            break;
        case "edit":
            submit.textContent = "Edit";
            formTitle.textContent = "Edit Task";
            break;
    }

    form.append(formTitle, row1, row2, row3, row4, submit);
    formContainer.appendChild(form);
    bg.appendChild(formContainer);

    // Listeners

    bg.addEventListener('click', (e) => {
        if (e.target.closest(".modal__overlay")) {
            bg.remove();
        }
    })

    form.addEventListener('click', (e) => {
        e.stopPropagation();

        if (e.target.closest("input#date")) {
            dateInput.setAttribute("type", "date");
        } else {
            dateInput.setAttribute("type", "text");
        }
    })

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const taskInfo = Array.from(formData.values());
        const user = UserService.loadLoggedInProfile(LocalRepository);

        switch (mode) {
            case "create":
                const newTask = UserService.createTaskForUser(user, taskInfo);
                UserService.assignTask(newTask, user);
                break;
            case "edit":
                const taskId = form.id
                const retrievedTask = UserService.retrieveTask(taskId, user)

                UserService.editTask(
                    retrievedTask,
                    {
                        title: taskInfo[0],
                        description: taskInfo[1],
                        dueDate: taskInfo[2],
                        priority: taskInfo[3]
                    },
                    user
                );

                break;
            default:
                break;
        }


        UserService.saveProfileToStorage(LocalRepository, user);
        Tasks.render(user);

        setTimeout(() => {
            bg.remove();
        }, 1000);

    });

    return bg;
}

const handleClick = (e) => {
    let taskModal = "";
    const taskItem = e.target.closest(".taskList__item");
    const taskBtn = e.target.closest(".task__btn");

    if (taskBtn) {
        taskModal = displayTaskModal("create");
        MainPanel.el.appendChild(taskModal);

        const titleInput = document.querySelector("input#title");
        const descInput = document.querySelector("input#description");
        const dateInput = document.querySelector("input#date");
        titleInput.placeholder = "Coding: To-Do App";
        descInput.placeholder = "Debugging line 43 col 23";
        dateInput.placeholder = "08/19/2025";
    }

    if (taskItem) {
        const edit = taskItem.querySelector(".edit");
        if (edit) {
            taskModal = displayTaskModal("edit");
            MainPanel.el.appendChild(taskModal);

            const user = UserService.loadLoggedInProfile(LocalRepository);
            const id = taskItem.querySelector("input[type='checkbox']").id;
            const task = UserService.retrieveTask(id, user);

            const form = document.querySelector("form");
            const titleInput = document.querySelector("input#title");
            const descInput = document.querySelector("input#description");
            const dateInput = document.querySelector("input#date");
            const radioInput = document.querySelector(`input#${task.priority}`);


            titleInput.value = task.title;
            descInput.value = task.description;
            dateInput.value = task.dueDate;
            radioInput.checked = true;
            form.id = id;
        }
    }

    return;
}

export const Tasks = (function () {
    const tasksDiv = document.createElement("div");
    const header = document.createElement('header');
    const heading = document.createElement("h2");
    const taskCounter = document.createElement("span");
    const taskList = document.createElement("ul");
    const addTaskBtn = document.createElement('button');
    const plus = createElement(CirclePlus);


    header.className = "taskHeader";
    tasksDiv.className = "tasksContainer";
    heading.className = "tasksContainer__heading";
    taskCounter.className = "tasksContainer__taskCounter";
    taskList.className = "tasksContainer__taskList";
    addTaskBtn.className = "task__btn";

    heading.textContent = "Your Tasks";


    const prioMap = [
        ['low', 'green'],
        ['mid', 'blue'],
        ['high', 'red']
    ];


    const render = (user) => {
        const tasks = user.getTasks();
        const tasksNodes = []

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

            tasksNodes.push(taskItem);
        });

        taskList.replaceChildren(...tasksNodes);

        taskList.appendChild(addTaskBtn);
        addTaskBtn.appendChild(plus);

        taskCounter.textContent = tasks.length;
    }

    taskList.addEventListener('click', handleClick);

    header.append(heading, taskCounter);
    tasksDiv.appendChild(header);
    tasksDiv.appendChild(taskList);


    return { el: tasksDiv, render };
})();