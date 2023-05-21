import { auth, db, guardarPost, getPosts, eliminarPost, editarPost } from "../lib/firebase.js";

function home(navigatoTo) {
  const section = document.createElement('section');
  const title = document.createElement('h2');

  title.textContent = 'Home';
  section.append(title);

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

  buttonPost.addEventListener('click', (event) => {
    event.preventDefault(); // Evitar la acción por defecto del botón

    const contenido = document.getElementById('postInput').value.trim();
    if (contenido) {
      const post = {
        contenido
      };
      guardarPost(post);
      document.getElementById('postInput').value = '';
    }
  });

  // Renderizar posts
  const postsContainer = document.createElement("div");
  section.appendChild(postsContainer);

  const renderPosts = (querySnapshot) => {
    console.log(querySnapshot)
    postsContainer.innerHTML = '';
    querySnapshot.forEach((doc) => {
      const post = doc.data();
      const idDoc = doc.id;
      const postElement = document.createElement("div");
      postElement.className = "post-box";
      postElement.innerHTML = `
        <span>${post.contenido}</span>
        <button class="eliminar" id="btn-eliminar-${idDoc}">Eliminar</button>
        <button class="editar" id="btn-editar-${idDoc}">Editar</button>
      `;
      postsContainer.appendChild(postElement);

      // Eliminar post
      const btnEliminar = postElement.querySelector(`#btn-eliminar-${idDoc}`);
      btnEliminar.addEventListener("click", () => {
        eliminarPost(idDoc);
        console.log(post.contenido)
        console.log(idDoc)
      });

      // Editar post
      const btnEditar = postElement.querySelector(`#btn-editar-${idDoc}`);
      btnEditar.addEventListener("click", () => {
        const inputElement = document.createElement("input");
        inputElement.type = "text";
        inputElement.value = post.contenido;

        // Reemplaza el elemento span con el input
        const spanElement = postElement.querySelector("span");
        postElement.replaceChild(inputElement, spanElement);

        // Cambia el evento al botón guardar
        btnEditar.removeEventListener("click", guardarCambios);
        btnEditar.addEventListener("click", () => {
          const nuevoContenido = inputElement.value;
          guardarCambios(idDoc, nuevoContenido);
        });
      });

      // Función para guardar los cambios
      const guardarCambios = (postId, nuevoContenido) => {
        // Actualiza el post en la base de datos
        editarPost(postId, nuevoContenido)
          .then(() => {
            // Actualiza el elemento post con el nuevo contenido
            const nuevoSpanElement = document.createElement("span");
            nuevoSpanElement.textContent = nuevoContenido;

            const inputElement = postElement.querySelector("input");
            postElement.replaceChild(nuevoSpanElement, inputElement);

            // Restaura el evento al botón editar
            btnEditar.removeEventListener("click", guardarCambios);
            btnEditar.addEventListener("click", () => {
            });
          })
          .catch((error) => {
            console.error("Error al guardar cambios: ", error);
          });
      };
    });
  };

  getPosts(renderPosts);

  return section;
}

export default home;
