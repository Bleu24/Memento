export const createTabHolder = (tab) => {

    let currentTab = tab;

    if (typeof tab !== "string" || (tab !== "dashboard" && tab !== "tasks" && tab !== "projects" && tab !== "settings")) {
        currentTab = "dashboard";
    }

    const setTab = (tabName) => {
        if (typeof tabName !== "string" || (tabName !== "dashboard" && tabName !== "tasks" && tabName !== "projects" && tabName !== "settings")) {
            currentTab = "dashboard";
        } else {
            currentTab = tabName;
        }
    }

    const getTab = () => {
        return currentTab;
    }

    return { setTab, getTab };
}