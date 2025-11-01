export const Contact = (function () {

    const contact = document.createElement("div");
    contact.textContent = "Contact";
    contact.dataset.page = "contact";
    contact.dataset.status = "active";
    contact.className = "contact";


    return contact;
})();