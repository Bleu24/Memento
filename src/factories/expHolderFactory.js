export const createExpHolder = (initialXp) => {
    let xp = initialXp;

    const addXP = (value) => {
        xp += value;
    }

    const reduceXP = (value) => {
        xp -= value;
    }

    const getXP = () => {
        return xp;
    }

    const setXP = (value) => {
        xp = value;
    }

    return { addXP, reduceXP, getXP, setXP };

};