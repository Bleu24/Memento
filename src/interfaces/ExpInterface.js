export const createExpHolder = () => {
    let xp = 0;

    const addXP = (value) => {
        xp += value;
    }

    const reduceXP = (value) => {
        xp -= value;
    }

    return { xp, addXP, reduceXP };

};