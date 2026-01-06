import { format } from "date-fns";
import { Notifications } from "./Notifications.js";

export class Task {
    #id;
    #completedAt;


    constructor(id, title, description, dueDate, priority) {
        this.#id = id ? id : crypto.randomUUID();
        this.title = title;
        this.description = description;
        this.dueDate = format(dueDate, "yyyy-MM-dd");
        this.priority = priority;
    }

    get id() {
        return this.#id;
    }

    set id(id) {
        if (typeof id !== "string" || !id) return id = crypto.randomUUID();
        this.#id = id;
    }

    get completedAt() {
        return this.#completedAt;
    }

    set completedAt(date) {
        this.#completedAt = date;
    }

}