import { Streak } from "../classes/Streak.js";
import { Time } from "../classes/Time.js";
import { format } from "date-fns";

export const createStreakHolder = (dataObj) => {
    let streaks = [];
    let currentStreak = dataObj?.currentStreak || 0;
    let longestStreak = dataObj?.longestStreak || 0;

    const serialize = (streak) => {
        const { logTask, undoLog, ...rest } = streak;

        const serializedStreak = { ...rest };

        return structuredClone(serializedStreak);
    }

    const resetStreak = () => {
        currentStreak = 0;
    }

    const logActivity = () => {
        const today = Time.dateNow;

        let todayStreak = streaks.find(s => s.dateFormatted === format(today, "yyyy-MM-dd"));

        if (!todayStreak) {
            todayStreak = new Streak(today);
            streaks.push(todayStreak);
        }
        todayStreak.logTask();
        calculateStreak();
    }

    const undoLog = () => {
        const today = Time.dateNow;

        let todayStreak = streaks.find(s => s.dateFormatted === format(today, "yyyy-MM-dd"));

        todayStreak.undoLog();
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

    const getStreaks = () => streaks.map(s => serialize(s));

    return {
        resetStreak,
        logActivity,
        undoLog,
        hardResetStreak,
        getLongestStreak,
        addStreak,
        getStreaks,
        serialize
    };
}