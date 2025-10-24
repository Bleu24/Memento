import { Task } from '../data/Task.js'


const test = new Task('Code', 'please code', "07-24-2024", "high");

for (const prop in test) {
    console.log(test[prop]);
}

const key = "dueDate";

test[key] = "05/06/2025";

console.log(test[key]);
