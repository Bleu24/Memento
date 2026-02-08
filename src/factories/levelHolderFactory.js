export const createLevelHolder = (xpHolder) => {

    const MAX_LEVEL = 50; //tweakable
    let threshold = 100;
    let level = 1;

    const computeXP = () => {
        let currentXP = xpHolder.getXP();


        while (currentXP >= threshold && level < MAX_LEVEL) {
            currentXP -= threshold;
            level++;
            threshold += 100;
        }


        if (level >= MAX_LEVEL) currentXP = Math.min(currentXP, threshold);

        return currentXP; // This is your new "leftover" or current XP
    }


    // TODO: polish apis
    const getThreshold = () => threshold;
    const getLevel = () => level;


    return { getLevel, getThreshold, computeXP };
}