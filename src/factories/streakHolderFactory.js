import { Streak } from "../classes/Streak.js";
import { Time } from "../classes/Time.js";
import { deepCopy } from "../utils/deepCopy.js";

export const createStreakHolder = (dataObj) => {
    let streaks = [];
    let currentStreak = dataObj?.currentStreak || 0;
    let longestStreak = dataObj?.longestStreak || 0;

    const resetStreak = () => {
        currentStreak = 0;
    }

    const logActivity = () => {
        const today = Time.dateNow;

        let todayStreak = streaks.find(s => s.dateFormatted === format(today, "dd-MM-yy"));

        if (!todayStreak) {
            todayStreak = new Streak(today);
            streaks.push(todayStreak);
        }
        todayStreak.logTask();
        calculateStreak();
    }

    const hardResetStreak = () => {
        currentStreak = 0;
        longestStreak = 0;
    }

    const getLongestStreak = () => longestStreak;

    const addStreak = (streak) => {
        streaks.push(streak);
    }

    const calculateStreak = () => {
        currentStreak = 0;

        streaks.sort((a, b) => new Date(a.date) - new Date(b.date));

        for (let i = 0; i < streaks.length; i++) {
            const currentDay = streaks[i];

            if (currentDay.status) {
                if (i === 0) currentStreak = 1;
                else {
                    const previousDay = streaks[i - 1];

                    if (Time.isConsecutive(currentDay.date, previousDay.date)) currentStreak++;
                    else currentStreak = 1;
                }
            } else currentStreak = 0;
            
            if (currentStreak > longestStreak) {
                longestStreak = currentStreak;
            }
        }
    }

    const getStreaks = () => deepCopy(streaks);

    return { resetStreak, logActivity, hardResetStreak, getLongestStreak, addStreak };
}