import { createExpHolder } from "../interfaces/ExpInterface.js";
import { createTaskHolder } from "../interfaces/TaskInterface.js";

export class User {
    id = crypto.randomUUID();
    name;

    constructor(name) {
        this.name = name;
        Object.assign(this, createExpHolder(), createTaskHolder());
    }

    get name() {
        return this.name;
    }

    set name(name) {
        this.name = name;
    }

}