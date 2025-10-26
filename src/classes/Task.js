import { format } from "date-fns";

export class Task {
    #id;


    constructor(id, title, description, dueDate, priority) {
        this.#id = id ? id : crypto.randomUUID();
        this.title = title;
        this.description = description;
        this.dueDate = format(dueDate, "dd-MM-yy");
        this.priority = priority;
    }

    get id() {
        return this.#id;
    }

}