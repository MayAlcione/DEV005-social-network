import { auth, db, guardarPost, getPosts, eliminarPost, editarPost } from "../lib/firebase.js";

function home() {
  const section = document.createElement('section');
  const title = document.createElement('h2');

  title.textContent = 'Home';
  section.appendChild(title);

  // Crear input que reciba post
  const formPost = document.createElement('form');
  const inputPost = document.createElement('input');
  const buttonPost = document.createElement('button');

  inputPost.type = 'text';
  inputPost.placeholder = 'Escribe tu post';
  inputPost.id = 'postInput'; // Identificador único
  buttonPost.textContent = 'Publicar';

  formPost.appendChild(inputPost);
  formPost.appendChild(buttonPost);
  section.appendChild(formPost);

  formPost.addEventListener('submit', (e) => {
    e.preventDefault();

    const contenido = inputPost.value.trim();
    if (contenido) {
      const post = {
        contenido: contenido
      };
      guardarPost(post);
      inputPost.value = '';
    }
  });

  // Agregar un evento al botón de guardar
  buttonPost.textContent = 'Publicar';
  buttonPost.addEventListener('click', () => {
    const contenido = document.getElementById('postInput').value.trim();
    if (contenido) {
      const post = {
        contenido: contenido
      };
      guardarPost(post);
      document.getElementById('postInput').value = '';
    }
  });

  // Obtener post y renderizar
  const postsContainer = document.createElement("div");
  section.appendChild(postsContainer);

  getPosts().then((posts) => {
    posts.forEach((post) => {
      const postElement = document.createElement("div");
      postElement.innerHTML = `
        <p>${post.contenido}</p>
        <button class="eliminar" data-postId="${post.id}">Eliminar</button>
        <button class="editar" data-id="${post.id}">Editar</button>
      `;
      // Agregar el post al contenedor
      postsContainer.appendChild(postElement);
    });

// Obtener referencia a todos los botones de eliminar
const btnEliminar = document.querySelectorAll('.eliminar');

// Agregar event listener a cada botón de eliminar
btnEliminar.forEach((btnEliminar) => {
  btnEliminar.addEventListener('click', () => {
    const postId = btnEliminar.dataset.postId;
    eliminarPost(postId);
  });
});

    // Boton editar
    document.querySelectorAll(".editar").forEach((botonEditar) => {
      botonEditar.addEventListener("click", () => {
        const postId = botonEditar.dataset.id;
        const nuevoContenido = prompt("Introduce el nuevo contenido:");
        if (nuevoContenido) {
          editarPost(postId, nuevoContenido);
        }
      });
    });
  });

  return section;
}

export default home;
