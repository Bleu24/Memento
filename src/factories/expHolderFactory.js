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

    return { addXP, reduceXP, getXP };

};