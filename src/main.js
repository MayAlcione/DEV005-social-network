import login from './contenido/login.js';
import notFound from './contenido/notFound.js';
import './lib/firebase.js';
import posts from './contenido/posts.js';
import registro from './contenido/registro.js';

const root = document.getElementById('root');
const routes = [
  { path: '/', contenido: login },
  { path: '/posts', contenido: posts },
  { path: '/notFound', contenido: notFound },
  { path: '/registro', contenido: registro },
];

const defaultRoute = '/';

function navigateTo(hash) {
  const route = routes.find((routeFind) => routeFind.path === hash);
  if (route && route.contenido) {
    window.history.pushState(
      {},
      route.path,
      window.location.origin + route.path,
    );
    if (root.firstChild) {
      root.removeChild(root.firstChild);
    }
    root.appendChild(route.contenido(navigateTo));
  } else {
    navigateTo('/notFound');
  }
}

window.onpopstate = () => {
  navigateTo(window.location.pathname);
};

navigateTo(window.location.pathname || defaultRoute);
