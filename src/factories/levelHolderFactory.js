export const createLevelHolder = (xpHolder) => {

    const MAX_LEVEL = 50; //tweakable
    let threshold = 100;
    let leftoverXp = 0;
    let runningXp = 0;
    let level = 1;

    const onLevelUp = () => {
        const isMaxLevel = level >= MAX_LEVEL;

        if (isMaxLevel) return;

        threshold += 100;
        level++;
        leftoverXp = 0; // not sure if I should be setting this to zero
    }

    // TODO: polish computation of xp
    const computeXP = () => {
        const xp = xpHolder.getXP();
        if (xp >= threshold) {
            leftoverXp = xp - threshold;
            runningXp = runningXp + xp + leftoverXp;
            xpHolder.setXP(runningXp);
            onLevelUp();
            return { runningXp, leftoverXp };
        } else {
            runningXp += xp;
            xpHolder.setXP(runningXp);
            return runningXp;
        }
    }


    // TODO: polish apis
    const getLeftoverXp = () => leftoverXp
    const getRunningXp = () => runningXp;
    const getThreshold = () => threshold;
    const getLevel = () => level;


    return { getLevel, getThreshold, getRunningXp, getLeftoverXp, computeXP };
}