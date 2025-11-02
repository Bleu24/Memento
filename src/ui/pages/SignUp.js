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


    emailLabel.textContent = "Email";
    nameLabel.textContent = "Name";
    submitButton.textContent = "Sign Up";
    heading.textContent = "Sign up now to Memento";
    heading.className = "signUp__heading";

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

    return signUp;

})();