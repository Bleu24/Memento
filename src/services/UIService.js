export const UIService = (function () {

    const render = (el, props) => {

        if (typeof props !== "object") {
            console.error("props is not an object", props);
            return;
        }
        el.render(props);
    };

    return { render }

})();