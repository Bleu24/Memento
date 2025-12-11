export class Streak {
    #date; 
    #status;

    constructor(date, status) {
        if(!(date instanceof Date) && !status) {
            this.#date = new Date(Date.now());
            this.#status = true;
            return;
        }

        this.#date = date;
        this.#status = date;
    }
}