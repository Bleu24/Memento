import { format, differenceInCalendarDays, addDays, startOfWeek, getDay } from "date-fns";

export class Time {

    static #dateNow;
    static #weekNow;
    static #dayNow;

    static get dateNow() {
        this.#dateNow = new Date(Date.now());
        return format(this.#dateNow, "dd-MM-yy");
    }

    static getDifferenceFromNow(date) {
        return differenceInCalendarDays(this.#dateNow, date);
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
        this.#weekNow = [];
        const start = startOfWeek(this.#dateNow);

        for (let i = 0; i < 7; i++) {
            week.push(addDays(start, i).toDateString());
        }

        return [...this.#weekNow];
    }

    static get dayNow() {
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let currentDay = null;

        days.forEach(day => {
            if (days.indexOf(day) === getDay(this.dateNow)) {
                currentDay = day;
            }
        });

        return currentDay;
    }
}