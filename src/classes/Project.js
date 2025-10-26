import { createTaskHolder } from "../factories/taskHolderFactory";

export class Project {
    #id;

    constructor(id, title, desc) {
        this.#id = id ? id : crypto.randomUUID();
        this.title = title;
        this.desc = desc;
        Object.assign(this, createTaskHolder());
    }

    get id() {
        return this.#id;
    }
}