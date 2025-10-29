export const createLevelHolder = (xpHolder) => {

    const threshold = 100;
    const leftoverXp = 0;
    const runningXp = 0;
    let level = 0;

    const onLevelUp = () => {
        threshold += 100;
        level += 1;
    }

    const computeXP = () => {
        if (xpHolder.getXP() >= threshold) {
            leftoverXp = threshold - xpHolder.getXP();
            runningXp = runningXp + xpHolder.getXP() + leftoverXp;
            onLevelUp();
        } else {
            runningXp += xpHolder.getXP();
        }
    }




    const getLevel = () => level;


    return { getLevel, computeXP }
}