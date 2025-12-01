import { cloneDeep } from "lodash";
import { LocalRepository } from "../repository/LocalRepository.js";
import { Authenticator } from "../classes/Authenticator.js";

export const AuthenticationService = (function () {
    const auth = new Authenticator(LocalRepository);

    const authenticate = (user) => {
        return auth.login(user);
    };

    const clearSession = (user) => {
        auth.logout(user);
    }

    return { authenticate, clearSession };
})();