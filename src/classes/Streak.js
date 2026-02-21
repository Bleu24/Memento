import { format } from "date-fns";
import { Time } from "./Time";

export class Streak {
    date;
    tasksCompleted = 0;

    constructor(date, tasksCompleted = 0) {
        // Ensure date is a valid Date object, otherwise default to today
        this.date = date instanceof Date ? date : Time.dateNow;
        this.tasksCompleted = tasksCompleted;
    }

    // Dynamically calculate status based on your 3-task rule
    get status() {
        return this.tasksCompleted >= 3;
    }

    // Method to increment tasks for this specific day
    logTask() {
        this.tasksCompleted++;
    }

    get dateFormatted() {
        return format(this.date, "dd-MM-yy");
    }
}