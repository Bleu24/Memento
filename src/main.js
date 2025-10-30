import 'normalize.css';
import './styles.css';
import './utils/subscriptions.js';
import { Home } from './ui/pages/Home.js';
import { Nav } from './ui/components/Nav.js';


document.body.appendChild(Nav);
document.body.appendChild(Home);