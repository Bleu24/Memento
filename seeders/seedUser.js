import { LocalRepository } from "../src/repository/LocalRepository.js";
import { UserService } from "../src/services/UserService.js";
import { Task } from "../src/classes/Task.js";
import { Project } from "../src/classes/Project.js";

export function seedUser(user) {
    const target = user;

    const projects = [
        new Project(null, "Project 1", "This is project 1"),
        new Project(null, "Project 2", "This is project 2"),
        new Project(null, "Project 3", "This is project 3"),
    ]


    const tasks = [
        new Task(null, "Complete project proposal", "Write and review the Q1 project proposal", new Date("2025-12-15"), "high"),
        new Task(null, "Buy groceries", "Pick up milk, bread, and vegetables", new Date("2025-12-05"), "low"),
        new Task(null, "Schedule team meeting", "Organize a meeting for next week", new Date("2025-12-10"), "mid"),
        new Task(null, "Update resume", "Add recent achievements and skills", new Date("2025-12-20"), "mid"),
        new Task(null, "Fix bug in login", "Debug and resolve authentication issue", new Date("2025-12-08"), "high")
    ]

    for (let i = 0; i < tasks.length; i++) {
        UserService.assignTask(tasks[i], target);
    }

    projects[0].addTask(tasks[0]);
    projects[0].addTask(tasks[1]);

    projects[1].addTask(tasks[2]);
    projects[1].addTask(tasks[3]);

    projects[2].addTask(tasks[4]);

    for (let i = 0; i < projects.length; i++) {
        UserService.assignProject(projects[i], target);
    }

    UserService.saveProfileToStorage(LocalRepository, target);

}