export const StreakService = (function () {

    const addStreak = (user, streak) => {
        user.addStreak(streak);
    }

    const retrieveStreak = (user) => {
        return user.getStreaks();
    }

    const logActivity = (user) => {
        user.logActivity();
    }

    const undoLogActivity = (user) => {
        user.undoLog();
    }


    return {
        addStreak,
        retrieveStreak,
        logActivity,
        undoLogActivity
    };


})();