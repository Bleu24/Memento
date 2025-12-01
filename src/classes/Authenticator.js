import { UserService } from "../services/UserService.js";
import { Notifications } from "./Notifications.js";

export class Authenticator {

    constructor(repo) {
        this.repo = repo;
    }

    login(user) {
        let success = false;
        if (this.isExistingUser(user.id)) {
            success = true;
            const loadedUser = this.repo.load(user.id);
            loadedUser.isLoggedIn = success;
            Notifications.emit("app:hydrate", loadedUser);
            return { user: loadedUser, status: success };
        } else {
            return { status: success };
        }
    }

    isExistingUser(userId) {
        let isExisting = false;
        const target = this.repo.load(userId);

        if (target) {
            isExisting = true;
        }
        return isExisting;
    }

    logout(user) {
        let success = false;
        if (this.isExistingUser(user.id)) {
            user.isLoggedIn = false;
            UserService.saveProfileToStorage(this.repo, user);
            success = true;
            return success;
        } else return success;
    }


}