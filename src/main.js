import login from './components/login.js';
import notFound from './components/notFound.js';
import './components/registro.js'; 
import home from './components/home.js';
import registro from './components/registro.js';

const root = document.getElementById('root');
const routes = [
  { path: '/', components: login },
  { path: '/home', components: home },
  { path: '/registro', components: registro},
  { path: '/notFound', components: notFound },
];

const defaultRoute = '/';

function navigateTo(hash) {
  const route = routes.find((routeFind) => routeFind.path === hash);
  if (route && route.components) {
    window.history.pushState(
      {},
      route.path,
      window.location.origin + route.path,
    );
    if (root.firstChild) {
      root.removeChild(root.firstChild);
    }
    root.appendChild(route.components(navigateTo));
  } else {
    navigateTo('/notFound');
  }
}

window.onpopstate = () => {
  navigateTo(window.location.pathname);
};
navigateTo(window.location.pathname || defaultRoute);
