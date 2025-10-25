import { createProjectHolder } from "../factories/projectHolderFactory.js";
import { createExpHolder } from "../factories/expHolderFactory.js";
import { createTaskHolder } from "../factories/taskHolderFactory.js";


export class User {
    name;

    constructor(name, id = crypto.randomUUID(), xp = 0) {
        this.id = id;
        this.name = name;
        Object.assign(this, createExpHolder(xp), createProjectHolder(), createTaskHolder());
    }

    get name() {
        return this.name;
    }

    set name(name) {
        this.name = name;
    }

}