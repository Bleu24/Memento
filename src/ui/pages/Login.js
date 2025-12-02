import { UserService } from "../../services/UserService.js";
import { LocalRepository } from "../../repository/LocalRepository.js";
import { render } from "../../utils/pageRouter.js";
import { AuthenticationService } from "../../services/AuthenticationService.js";


export const Login = (function () {
    const login = document.createElement("div");
    const form = document.createElement("form");

    const idLabel = document.createElement("label");
    const idInput = document.createElement("input");

    const usernameLabel = document.createElement("label");
    const usernameInput = document.createElement("input");

    const submitButton = document.createElement("button");
    const idGroup = document.createElement("div");
    const usernameGroup = document.createElement("div");
    const heading = document.createElement("h1");

    const signUp = document.createElement('p');

    login.dataset.status = "active";

    login.className = "signUp"; // Reuse signUp class for similar styling
    form.className = "form";
    idGroup.className = "form__group";
    usernameGroup.className = "form__group";

    idLabel.className = "form__label";
    usernameLabel.className = "form__label";

    idInput.className = "form__input";
    usernameInput.className = "form__input";
    submitButton.className = "form__button";

    signUp.className = 'form__signUp';

    idLabel.textContent = "ID";
    usernameLabel.textContent = "Username";
    submitButton.textContent = "Log In";
    heading.textContent = "Log in to Memento";
    heading.className = "signUp__heading";

    signUp.innerHTML = "No account yet? <a class=\"form__signUpLink\">Sign Up</a> here";

    const signUpLink = signUp.querySelector('.form__signUpLink');

    signUpLink.addEventListener('click', (e) => {
        render("sign up");
    })

    idInput.type = "text";
    usernameInput.type = "username";
    submitButton.type = "submit";

    idInput.placeholder = `${crypto.randomUUID()}`;
    usernameInput.placeholder = "Bleu24";

    form.appendChild(idGroup);
    idGroup.appendChild(idLabel);
    idGroup.appendChild(idInput);
    form.appendChild(usernameGroup);
    usernameGroup.appendChild(usernameLabel);
    usernameGroup.appendChild(usernameInput);
    form.appendChild(submitButton);

    idInput.required = true;
    usernameInput.required = true;

    idLabel.htmlFor = "id";
    usernameLabel.htmlFor = "username";

    idInput.id = "id";
    usernameInput.id = "username";

    idInput.name = "id";
    usernameInput.name = "username";

    login.appendChild(heading);
    login.appendChild(form);
    login.appendChild(signUp);

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const id = formData.get("id");
        const username = formData.get("username"); // Note: username is not stored, so this is just for form; actual auth might need token or something

        // Assuming login by id; load user and set logged in
        const authenticated = AuthenticationService.authenticate({ id, name: username });

        if (authenticated.status) {
            authenticated.user.isLoggedIn = true;
            UserService.saveProfileToStorage(LocalRepository, authenticated.user);
            render("app");
        } else {
            // Handle invalid login, e.g., show error
            console.error("Invalid id or username");
        }
    });

    return login;
})();
