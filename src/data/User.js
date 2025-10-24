import { expHolder } from "../interfaces/ExpInterface.js";
import { taskHolder } from "../interfaces/TaskInterface.js";

export class User {
    id = crypto.randomUUID();
    name;

    constructor(name) {
        this.name = name;
        Object.assign(this, expHolder, taskHolder);
    }

    get name() {
        return this.name;
    }

    set name(name) {
        this.name = name;
    }

}