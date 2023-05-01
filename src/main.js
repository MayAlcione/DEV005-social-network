import home from './contenido/home.js'; 
import login from './contenido/login.js';
import notFound from './contenido/notFound.js';

const root = document.getElementById('root');

const routes = [
    {path:'/', contenido:home },
    {path:'/login', contenido: login },
    {path:'/notFound', contenido: notFound},
]

const defaultRoute = '/';

function navigateTo(hash){
    const route = routes.find((routeFind) => routeFind.path === hash);
        if(route && route.contenido){
            window.history.pushState(
                {}, 
                route.path,
                window.location.origin + route.path,
            );
            if(root.firstChild){
                root.removeChild(root.firstChild)
            }
            root.appendChild(route.contenido(navigateTo));
        } else {
          navigateTo('/notFound'); 
        }
    }

window.onpopstate = () => {
    navigateTo(window.location.pathname);
}

navigateTo(window.location.pathname || defaultRoute);
