import { taskHolder } from "../interfaces/TaskInterface";

class User {
    name;
    STARTING_LEVEL = 0;
    XP = 0

    constructor(name) {
        this.name = name;
        this.taskHolder = taskHolder;
    }

    get name() {
        return this.name;
    }

    set name(name) {
        this.name = name;
    }

}