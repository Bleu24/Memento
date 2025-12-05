import { LocalRepository } from "../repository/LocalRepository.js";
import { UserService } from "../services/UserService.js";
import { Notifications } from "./Notifications.js";

export class Authenticator {

    constructor(repo) {
        this.repo = repo;
    }

    login(user) {
        let success = false;
        if (this.isExistingUser(user)) {
            success = true;
            const loadedUser = this.repo.load(user.id);
            loadedUser.isLoggedIn = success;
            Notifications.emit("app:hydrate", loadedUser);
            return { user: loadedUser, status: success };
        } else {
            return { status: success };
        }
    }

    isExistingUser(user) {
        let isExisting = false;
        const target = this.repo.load(user.id);

        if (!target) return;

        try {
            if (target.id === user.id && target.name === user.name) {
                isExisting = true;
                return isExisting;
            } else {
                return isExisting;
            }
        } catch (error) {
            console.error("Failed to find user: ", target, error);
        }

    }

    logout(user) {
        let success = false;
        if (this.isExistingUser(user)) {
            user.isLoggedIn = false;
            UserService.saveProfileToStorage(this.repo, user);
            LocalRepository.clearCurrentUser();
            success = true;
            return success;
        } else return success;
    }

    isTaken(user) {
        let success = false;
        const loadedUsers = this.repo.loadAll();

        for (const u of loadedUsers) {
            if (u.email === user.email && u.name === user.name) {
                success = true;
                console.error(`Both email: ${user.email} and username: ${user.name} are already taken!`);
                return success;
            }

            if (u.email === user.email) {
                success = true;
                console.error(`Email: ${user.email} is already taken`);
                return success;
            }

            if (u.name === user.name) {
                success = true;
                console.error(`Username: ${user.name} is already taken`);
                return success;
            }
        }

        return success;
    }


}