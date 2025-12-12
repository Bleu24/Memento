import { format } from "date-fns";

export class Streak {
    #date;
    #status;

    constructor(date, status) {
        if (!(date instanceof Date) && !status) {
            this.#date = format(new Date(Date.now()), "dd-MM-yy");
            this.#status = true;
            return;
        }

        this.#date = date;
        this.#status = date;
    }
}