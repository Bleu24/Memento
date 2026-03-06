import { format } from "date-fns";

export class Streak {
    date;
    tasksCompleted = 0;

    constructor(date, tasksCompleted = 0) {
        this.date = date;
        this.tasksCompleted = tasksCompleted;
    }

    get status() {
        return this.tasksCompleted >= 3;
    }

    logTask() {
        this.tasksCompleted++;
    }

    undoLog() {
        this.tasksCompleted--;
    }

    get dateFormatted() {
        return format(this.date, "yyyy-MM-dd");
    }
}