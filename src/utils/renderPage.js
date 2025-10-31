export const renderPage = (page) => {
    if (!page || typeof page !== "string") {
        throw new Error("Invalid page");
    }

    switch (page) {
        case "home":
            return Home;
        case "about":
            return About;
        case "contact":
            return Contact;
        default:
            return Home;
    }
}