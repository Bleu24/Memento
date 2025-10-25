import { createProjectHolder } from "../factories/projectHolderFactory.js";
import { createExpHolder } from "../factories/expHolderFactory.js";
import { createTaskHolder } from "../factories/taskHolderFactory.js";


export class User {
    id = crypto.randomUUID();
    name;

    constructor(name) {
        this.name = name;
        Object.assign(this, createExpHolder(), createProjectHolder(), createTaskHolder());
    }

    get id() {
        return this.id;
    }

    set id(id) {
        this.id = id;
    }

    get name() {
        return this.name;
    }

    set name(name) {
        this.name = name;
    }

}