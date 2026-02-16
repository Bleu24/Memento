import { createProjectHolder } from "../factories/projectHolderFactory.js";
import { createExpHolder } from "../factories/expHolderFactory.js";
import { createTaskHolder } from "../factories/taskHolderFactory.js";
import { createLevelHolder } from "../factories/levelHolderFactory.js";
import { createTabHolder } from "../factories/tabHolderFactory.js";
import { createStreakHolder } from "../factories/streakHolderFactory.js";


export class User {
    #email;
    #name;
    #id;
    #isLoggedIn;
    completionRate;

    constructor(id, email, name, xp, level, isLoggedIn) {
        const invalidXp = typeof xp !== "number" || xp < 0 || Number.isNaN(xp);
        const invalidLevel = typeof level !== "number" || level < 0 || Number.isNaN(level);
        const invalidStatus = typeof isLoggedIn !== "boolean";
        if (invalidXp) xp = 0;
        if (invalidLevel) level = 1;
        if (invalidStatus) isLoggedIn = false;
        const xpHolder = createExpHolder(xp);
        this.#id = id ? id : crypto.randomUUID();
        this.#email = email;
        this.#name = name;
        this.#isLoggedIn = isLoggedIn;
        Object.assign(this, xpHolder, createProjectHolder(), createTaskHolder(), createLevelHolder(xpHolder), createTabHolder("dashboard"), createStreakHolder(undefined));
    }

    get name() {
        return this.#name;
    }

    set name(name) {
        if (typeof name !== 'string') {
            console.error(`${name} must be a string`);
            return;
        }
        this.#name = name;
    }

    get id() {
        return this.#id;
    }

    get email() {
        return this.#email;
    }

    set isLoggedIn(val) {
        if (typeof val !== 'boolean') {
            console.error(`${val} is not boolean!`);
            return;
        }
        this.#isLoggedIn = val;
    }

    get isLoggedIn() {
        return this.#isLoggedIn;
    }

    set completionRate(value) {
        if (!value || typeof value !== 'number') return null;
        this.completionRate = value;
    }

    get completionRate() {
        return this.completionRate;
    }
}