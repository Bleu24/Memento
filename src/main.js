import 'normalize.css';
import './styles.css';
import './utils/subscriptions.js';
import { UserService } from './services/UserService.js';
import { User } from './data/User.js';
import { Task } from './data/Task.js';
import { LocalRepository } from './repository/LocalRepository.js';
import { Home } from './ui/pages/Home.js';
import { Nav } from './ui/components/Nav.js';


document.body.appendChild(Nav);
document.body.appendChild(Home);