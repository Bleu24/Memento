export const createLevelHolder = (xpHolder) => {

    const MAX_LEVEL = 50;
    const MIN_LEVEL = 0;
    const xpBar = 100;
    const xp = xpHolder.getXP();
    const leftoverXp = 0;
    const runningXp = 0;


    const onLevelUp = () => {
        level += 100;
    }

    const computeXP = () => {
        if(xp >= xpBar) {
            leftoverXp = xpBar - xp;
            runningXp += xp;
            xpBar += 100;
        }
    }




    const getLevel = () => level;


    return { getLevel, }
}