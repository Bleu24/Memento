export const createExpHolder = (storageKey = "defaultExp") => {
    let xp = 0;

    const addXP = (value) => {
        xp += value;
    }

    const reduceXP = (value) => {
        xp -= value;
    }

    const saveXP = () => {
        const stringify = JSON.stringify(xp);
        localStorage.setItem(storageKey, stringify);
    }

    const loadXP = () => {
        const savedXP = localStorage.getItem(storageKey);
        xp = JSON.parse(savedXP);
    }

    return { xp, addXP, reduceXP, saveXP, loadXP };

};