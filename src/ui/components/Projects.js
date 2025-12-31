import { CirclePlus, createElement, Folder, SquarePen, Trash } from 'lucide';
import { MainPanel } from '../components/MainPanel.js';
import { UserService } from '../../services/UserService.js';
import { LocalRepository } from '../../repository/LocalRepository.js';

const displayProjectModal = (mode) => {
    const bg = document.createElement('div');
    const formContainer = document.createElement('div');
    const form = document.createElement('form');
    const formTitle = document.createElement('h1');
    const row1 = document.createElement('div');
    const row2 = document.createElement('div');
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

    form.append(formTitle, row1, row2, submit);
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
    });


    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const projectInfo = Array.from(formData.values());
        const user = UserService.loadLoggedInProfile(LocalRepository);

        switch (mode) {
            case "create":
                const id = crypto.randomUUID();
                const newProject = UserService.createProjectForUser(user, [id, ...projectInfo]);
                UserService.assignProject(newProject, user);
                break;
            case "edit":
                const projectId = form.id
                const retrievedProject = UserService.retrieveProject(projectId, user)
                UserService.editProject(
                    retrievedProject,
                    {
                        title: projectInfo[0],
                        desc: projectInfo[1]
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
        titleInput.placeholder = "Coding: To-Do App";
        descInput.placeholder = "Debugging line 43 col 23";

    }

    if (projectItem) {
        const edit = e.target.closest(".edit");
        const del = e.target.closest(".delete");

        if (edit) {
            projectModal = displayProjectModal("edit");
            MainPanel.el.appendChild(projectModal);

            const user = UserService.loadLoggedInProfile(LocalRepository);
            const id = projectItem.id;
            const project = UserService.retrieveProject(id, user);

            const form = document.querySelector("form");
            const titleInput = document.querySelector("input#title");
            const descInput = document.querySelector("input#description");


            titleInput.value = project.title;
            descInput.value = project.desc;
            form.id = id;
            return;
        }

        if (del) {
            const user = UserService.loadLoggedInProfile(LocalRepository);
            const id = projectItem.id;
            const project = UserService.retrieveProject(id, user);

            UserService.removeProject(project, user);
            UserService.saveProfileToStorage(LocalRepository, user);
            Projects.render(user);
            return;
        }

        




    }
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
            const del = createElement(Trash);
            const projectContainer = document.createElement('li');
            const projectItem = document.createElement('div');
            const projectHeader = document.createElement('div');
            const titleContainer = document.createElement('div');
            const projectTitle = document.createElement('h2');
            const projectIcon = createElement(Folder);
            const projectEdit = createElement(SquarePen);
            const projectDescription = document.createElement('div');

            projectContainer.className = "projectList__container";
            projectItem.className = "projectList__item";
            projectHeader.className = "projectItem__header";
            projectDescription.className = "projectItem__description";
            titleContainer.className = "titleContainer";
            projectEdit.classList.add('edit');
            del.classList.add('delete');

            projectItem.id = project.id;

            projectTitle.textContent = project.title;
            projectDescription.textContent = project.desc;

            titleContainer.append(projectIcon, projectTitle);

            projectHeader.append(titleContainer, projectEdit);

            projectItem.append(projectHeader, projectDescription, del);

            projectContainer.appendChild(projectItem);

            projectsNodes.push(projectContainer);
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