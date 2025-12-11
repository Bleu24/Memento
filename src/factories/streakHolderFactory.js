import { Streak } from "../classes/Streak.js";
import { Time } from "../classes/Time.js";

export const createStreakHolder = (dataObj) => {
    const streaks = [];
    let currentStreak = dataObj.currentStreak || 0;
    let longestStreak = dataObj.longestStreak || 0;
    let inStreak = dataObj.inStreak || false;

    const resetStreak = () => {
        currentStreak = 0;
    }

    const logActivity = () => {
        currentStreak++;
        streaks.push(new Streak(Time.dateNow, true));
    }

    const hardResetStreak = () => {
        currentStreak = 0;
        longestStreak = 0;
        inStreak = false;
    }

    const getLongestStreak = () => {
        if (currentStreak > longestStreak) {
            longestStreak = currentStreak;
        }

        return longestStreak;
    }

    return { resetStreak, logActivity, hardResetStreak, getLongestStreak };
}