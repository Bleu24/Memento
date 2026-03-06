import { format, differenceInCalendarDays, addDays, startOfWeek, getDay } from "date-fns";

export class Time {


    static get dateNow() {
        const date = new Date(Date.now()).toISOString().split('T')[0];
        return date;
    }

    static isConsecutive(late, early) {
        return differenceInCalendarDays(late, early) === 1 ? true : false;
    }

    static getWeekOfDate(date) {
        const week = [];
        const start = startOfWeek(date);

        for (let i = 0; i < 7; i++) {
            week.push(addDays(start, i).toDateString());
        }

        return [...week];
    }

    static get weekNow() {
        const week = [];
        const start = startOfWeek(Time.dateNow);

        for (let i = 0; i < 7; i++) {
            week.push(addDays(start, i).toDateString());
        }

        return [...week];
    }

    static get dayNow() {
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let selectedDay = "";

        days.forEach(day => {
            if (days.indexOf(day) === getDay(Time.dateNow)) {
                selectedDay = day;
            }
        });

        return selectedDay;
    }
}