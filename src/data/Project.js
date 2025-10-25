import { createTaskHolder } from "../factories/taskHolderFactory";

export class Project {
    id = crypto.randomUUID();
    title;
    desc;

    constructor(title, desc) {
        this.title = title;
        this.desc = desc;
        Object.assign(this, createTaskHolder());
    }

    get title() {
        return this.title;
    }

    set title(title) {
        this.title = title;
    }

    get desc() {
        return this.desc;
    }

    set desc(desc) {
        this.desc = desc;
    }
}