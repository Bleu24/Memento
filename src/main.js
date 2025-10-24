import 'normalize.css';
import { UserService } from './services/UserService.js';
import { User } from './data/User.js';

const bry = new User("Bryan");

UserService.assignTask(undefined, bry);

UserService.showTasks(bry);