export const SignUp = (function () {
    const signUp = document.createElement("div");
    const form = document.createElement("form");

    const emailLabel = document.createElement("label");
    const emailInput = document.createElement("input");

    const nameLabel = document.createElement("label");
    const nameInput = document.createElement("input");

    const submitButton = document.createElement("button");

    signUp.className = "signUp";
    form.className = "form";

    emailLabel.className = "form__label";
    nameLabel.className = "form__label";

    emailInput.className = "form__input";
    nameInput.className = "form__input";
    submitButton.className = "form__button";


    emailLabel.textContent = "Email";
    nameLabel.textContent = "Name";
    submitButton.textContent = "Sign Up";

    emailInput.type = "email";
    nameInput.type = "text";
    submitButton.type = "submit";

    emailInput.placeholder = "johndoe@example.com";
    nameInput.placeholder = "John Doe";

    form.appendChild(emailLabel);
    form.appendChild(emailInput);
    form.appendChild(nameLabel);
    form.appendChild(nameInput);
    form.appendChild(submitButton);

    emailInput.required = true;
    nameInput.required = true;

    emailLabel.htmlFor = "email";
    nameLabel.htmlFor = "name";

    emailInput.id = "email";
    nameInput.id = "name";

    emailInput.name = "email";
    nameInput.name = "name";

    signUp.appendChild(form);

    return signUp;

})();