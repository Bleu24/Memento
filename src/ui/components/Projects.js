import { CirclePlus, createElement } from 'lucide';
import { MainPanel } from '../components/MainPanel.js';

const displayProjectModal = (mode) => {
    const bg = document.createElement('div');
    const formContainer = document.createElement('div');
    const form = document.createElement('form');
    const formTitle = document.createElement('h1');
    const row1 = document.createElement('div');
    const row2 = document.createElement('div');
    const row3 = document.createElement('div');
    const row4 = document.createElement('div');
    const submit = document.createElement('button');

    bg.className = "modal__overlay";
    formContainer.className = "formContainer";
    form.className = "projectForm";
    formTitle.className = "projectForm__title";


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
   
    switch (mode) {
        case "create":
            submit.textContent = "Create";
            formTitle.textContent = "Create Project";
            break;
        case "edit":
            submit.textContent = "Edit";
            formTitle.textContent = "Edit project";
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
        const projectInfo = Array.from(formData.values());
        const user = UserService.loadLoggedInProfile(LocalRepository);

        switch (mode) {
            case "create":
                const newProject = UserService.createProjectForUser(user, projectInfo);
                UserService.assignProject(newProject, user);
                break;
            case "edit":
                const projectId = form.id
                const retrievedProject = UserService.retrieveProject(projectId, user)

                UserService.editProject(
                    retrievedProject,
                    {
                        title: projectInfo[0],
                        description: projectInfo[1],
                        dueDate: projectInfo[2],
                        priority: projectInfo[3]
                    },
                    user
                );

                break;
            default:
                break;
        }


        UserService.saveProfileToStorage(LocalRepository, user);
        Projects.render(user);

        setTimeout(() => {
            bg.remove();
        }, 1000);

    });

    return bg;
}

const handleClick = (e) => {
    let projectModal = "";
    const projectItem = e.target.closest(".projectList__item");
    const projectBtn = e.target.closest(".project__btn");

    if (projectBtn) {
        projectModal = displayProjectModal("create");
        MainPanel.el.appendChild(projectModal);

        const titleInput = document.querySelector("input#title");
        const descInput = document.querySelector("input#description");
        const dateInput = document.querySelector("input#date");
        titleInput.placeholder = "Coding: To-Do App";
        descInput.placeholder = "Debugging line 43 col 23";
        dateInput.placeholder = "08/19/2025";
    }

    if (projectItem) {
        const edit = projectItem.querySelector(".edit");
        if (edit) {
            projectModal = displayProjectModal("edit");
            MainPanel.el.appendChild(projectModal);

            const user = UserService.loadLoggedInProfile(LocalRepository);
            const id = projectItem.querySelector("input[type='checkbox']").id;
            const project = UserService.retrieveProject(id, user);

            const form = document.querySelector("form");
            const titleInput = document.querySelector("input#title");
            const descInput = document.querySelector("input#description");
            const dateInput = document.querySelector("input#date");
            const radioInput = document.querySelector(`input#${project.priority}`);


            titleInput.value = project.title;
            descInput.value = project.description;
            dateInput.value = project.dueDate;
            radioInput.checked = true;
            form.id = id;
        }
    }

    return;
}

export const Projects = (function () {
    const projectsDiv = document.createElement("div");
    const header = document.createElement('header');
    const heading = document.createElement("h2");
    const projectCounter = document.createElement("span");
    const projectList = document.createElement("ul");
    const addProjectBtn = document.createElement('button');
    const plus = createElement(CirclePlus);


    header.className = "projectHeader";
    projectsDiv.className = "projectsContainer";
    heading.className = "projectsContainer__heading";
    projectCounter.className = "projectsContainer__projectCounter";
    projectList.className = "projectsContainer__projectList";
    addProjectBtn.className = "project__btn";

    heading.textContent = "Your projects";

    // TODO: Make projects card type
    const render = (user) => {
        const projects = user.getProjects();
        const projectsNodes = []

        projects.forEach(project => {
            const projectItem = document.createElement('li');
            const leftSideOfItem = document.createElement('div');
            const rightSideOfItem = document.createElement('div');

            projectItem.className = "projectList__item";
            leftSideOfItem.className = "item__left";
            rightSideOfItem.className = "item__right";

            //left side elements
            const checkBox = document.createElement('input');
            checkBox.type = 'checkbox';
            checkBox.id = project.id;
            checkBox.name = 'user__project';
            const projectTitle = document.createElement('label');
            projectTitle.textContent = project.title;
            projectTitle.setAttribute("for", checkBox.id);

            //right side elements
            const dueDate = document.createElement('time');
            dueDate.textContent = project.dueDate;

            const prio = createElement(Dot);
            const edit = createElement(Ellipsis);

            edit.classList.add("edit");


            for (const arr of prioMap) {
                if (arr[0] === project.priority) {
                    prio.style.setProperty('stroke', arr[1]);
                }
            }

            // append nodes to corresponding parents
            leftSideOfItem.append(checkBox, projectTitle);
            rightSideOfItem.append(dueDate, prio, edit);

            projectItem.append(leftSideOfItem, rightSideOfItem);

            projectsNodes.push(projectItem);
        });

        projectList.replaceChildren(...projectsNodes);

        projectList.appendChild(addProjectBtn);
        addProjectBtn.appendChild(plus);

        projectCounter.textContent = projects.length;
    }

    projectList.addEventListener('click', handleClick);

    header.append(heading, projectCounter);
    projectsDiv.appendChild(header);
    projectsDiv.appendChild(projectList);


    return { el: projectsDiv, render };
})();