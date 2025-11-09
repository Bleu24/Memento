export const createLevelHolder = (xpHolder) => {

    const MAX_LEVEL = 50; //tweakable
    const threshold = 100;
    const leftoverXp = 0;
    const runningXp = 0;
    let level = 0;

    const onLevelUp = () => {
        const isMaxLevel = level >= MAX_LEVEL;

        if (isMaxLevel) return;

        threshold += 100;
        level += 1;
    }

    const computeXP = () => {
        const xp = xpHolder.getXP();
        if (xp >= threshold) {
            leftoverXp = xp - threshold;
            runningXp = runningXp + xp + leftoverXp;
            onLevelUp();
        } else {
            runningXp += xp;
        }
    }




    const getLevel = () => level;


    return { getLevel, computeXP }
}