import { format } from "date-fns";

export class Task {
    id = crypto.randomUUID();
    title;
    description;
    dueDate;
    priority;


    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = format(dueDate, "dd-MM-yy");
        this.priority = priority;
    }

    get title() {
        return this.title;
    }
    
    set title(title) {
        this.title = title;
    }

    get description() {
        return this.description;
    }

    set description(description) {
        this.description = description
    }

    get dueDate() {
        return this.dueDate;
    }

    set dueDate(dueDate) {
        this.dueDate = format(dueDate, "dd-MM-yy");
    }

    get priority() {
        return this.priority;
    }

    set priority(priority) {
        this.priority = priority;
    }

}