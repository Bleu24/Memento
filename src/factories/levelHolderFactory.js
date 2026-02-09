export const createLevelHolder = (xpHolder, lvl) => {

    const MAX_LEVEL = 50; //tweakable
    let level = lvl;

    const computeThreshold = () => {
        const baseXP = 100;
        const exponent = 1.3;

        return Math.floor(baseXP * Math.pow(level, exponent));
    }

    const computeXP = () => {
        let currentXP = xpHolder.getXP();
        let threshold = getThreshold();

        while (currentXP >= threshold && level < MAX_LEVEL) {
            currentXP -= threshold;
            level++;
            threshold = computeThreshold();
        }

        while (currentXP > 0 )

        if (level >= MAX_LEVEL) currentXP = Math.min(currentXP, threshold);

        return currentXP;
    }


    // TODO: polish apis
    const getThreshold = () => computeThreshold();
    const getLevel = () => level;



    return { getLevel, getThreshold, computeXP };
}