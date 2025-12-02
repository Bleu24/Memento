import { User } from "../../classes/User.js";
import { UserService } from "../../services/UserService.js";
import { LocalRepository } from "../../repository/LocalRepository.js";
import { render } from "../../utils/pageRouter.js";
import { createElement, ClipboardCopy, ClipboardCheck } from "lucide";
import { Notifications } from "../../classes/Notifications.js";
import { AuthenticationService } from "../../services/AuthenticationService.js";

const displayIdModal = (id) => {
    const bg = document.createElement('div');
    const container = document.createElement('div');
    const heading = document.createElement('div');
    const mainText = document.createElement('h3');
    const supportingText = document.createElement('p');
    const idContainer = document.createElement('div');
    const token = document.createElement('p');
    const clipboard = createElement(ClipboardCopy);
    const copySuccess = createElement(ClipboardCheck);

    bg.className = "overlay";
    container.className = "copy__container";
    heading.className = "copy__heading";
    mainText.className = "copy__main";
    supportingText.className = "copy__text";
    idContainer.className = "copy__idContainer";
    token.className = "copy__token";
    clipboard.classList.add("copy__svg");
    copySuccess.classList.add("copy__svg--success");

    bg.appendChild(container);
    container.append(heading, idContainer);
    heading.append(mainText, supportingText);
    idContainer.append(token, clipboard);
    document.body.appendChild(bg);

    mainText.textContent = "Successfully Signed Up!";
    supportingText.textContent = "Please copy the token and save it for login purposes";
    token.textContent = id;

    return { bg, copySuccess };
}



export const SignUp = (function () {
    const signUp = document.createElement("div");
    const form = document.createElement("form");

    const emailLabel = document.createElement("label");
    const emailInput = document.createElement("input");

    const nameLabel = document.createElement("label");
    const nameInput = document.createElement("input");

    const submitButton = document.createElement("button");
    const emailGroup = document.createElement("div");
    const nameGroup = document.createElement("div");
    const heading = document.createElement("h1");

    const login = document.createElement('p');

    signUp.dataset.status = "active";

    signUp.className = "signUp";
    form.className = "form";
    emailGroup.className = "form__group";
    nameGroup.className = "form__group";

    emailLabel.className = "form__label";
    nameLabel.className = "form__label";

    emailInput.className = "form__input";
    nameInput.className = "form__input";
    submitButton.className = "form__button";
    heading.className = "signUp__heading";
    login.className = "form__login";

    heading.textContent = "Sign up now to Memento";
    emailLabel.textContent = "Email";
    nameLabel.textContent = "Name";
    submitButton.textContent = "Sign Up";

    login.innerHTML = "Already have an account? <a class=\"form__loginLink\">Login</a> here";

    const loginLink = login.querySelector("a.form__loginLink");

    loginLink.addEventListener('click', (e) => {
        render("login");
    });


    emailInput.type = "email";
    nameInput.type = "text";
    submitButton.type = "submit";

    emailInput.placeholder = "johndoe@example.com";
    nameInput.placeholder = "John Doe";

    form.appendChild(emailGroup);
    emailGroup.appendChild(emailLabel);
    emailGroup.appendChild(emailInput);
    form.appendChild(nameGroup);
    nameGroup.appendChild(nameLabel);
    nameGroup.appendChild(nameInput);
    form.appendChild(submitButton);

    emailInput.required = true;
    nameInput.required = true;

    emailLabel.htmlFor = "email";
    nameLabel.htmlFor = "name";

    emailInput.id = "email";
    nameInput.id = "name";

    emailInput.name = "email";
    nameInput.name = "name";

    signUp.appendChild(heading);
    signUp.appendChild(form);
    signUp.appendChild(login);



    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const email = formData.get("email");
        const name = formData.get("name");
        const id = crypto.randomUUID();

        if (AuthenticationService.isTaken({ id, email, name })) return null;

        const user = new User(id, email, name, 0, 0, true);
        const modal = displayIdModal(id);

        modal.bg.addEventListener('click', e => {
            e.stopPropagation();
            const isClipboardClicked = e.target.closest('.copy__svg');

            if (!isClipboardClicked) {
                return;
            }

            try {
                navigator.clipboard.writeText(id);
                const idContainer = document.querySelector(".copy__idContainer");
                const svg = document.querySelector(".copy__svg");
                svg.remove();
                idContainer.appendChild(modal.copySuccess);
                Notifications.emit("app:hydrate", user);
                setTimeout(() => {
                    modal.bg.remove();
                    render("app");
                }, 1500);
            } catch (e) {
                console.error(e);
            }

        });

        UserService.saveProfileToStorage(LocalRepository, user);

    });

    return signUp;

})();