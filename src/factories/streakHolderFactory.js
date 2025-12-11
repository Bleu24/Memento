import { Time } from "../classes/Time.js";

export const createStreakHolder = (dataObj) => {
    let currentStreak = dataObj.currentStreak || 0;
    let longestStreak = dataObj.longestStreak || 0;
    let inStreak = dataObj.inStreak || false;
    let lastActivty = 

    const resetStreak = () => {
        currentStreak = 0;
    }

    const logActivity = () => {
        currentStreak++;
    }

    const hardResetStreak = () => {
        currentStreak = 0;
        longestStreak = 0;
        inStreak = false;
    }

    return { resetStreak, logActivity, hardResetStreak };
}