import { createProjectHolder } from "../factories/projectHolderFactory.js";
import { createExpHolder } from "../factories/expHolderFactory.js";
import { createTaskHolder } from "../factories/taskHolderFactory.js";
import { createLevelHolder } from "../factories/levelHolderFactory.js";


export class User {
    #email;
    #name;
    #id;

    constructor(id, email, name, xp, level) {
        const invalidXp = typeof xp !== "number" || xp < 0 || Number.isNaN(xp);
        const invalidLevel = typeof level !== "number" || level < 0 || Number.isNaN(level);
        if (invalidXp) xp = 0;
        if (invalidLevel) level = 0;
        const xpHolder = createExpHolder(xp);
        this.#email = email;
        this.#id = id ? id : crypto.randomUUID();
        this.#name = name;
        Object.assign(this, xpHolder, createProjectHolder(), createTaskHolder(), createLevelHolder(xpHolder));
    }

    get name() {
        return this.#name;
    }

    set name(name) {
        if (name) this.#name = name;
        else {
            console.error("Name must be truthy!");
        }
    }

    get id() {
        return this.#id;
    }

    get email() {
        return this.#email;
    }
}