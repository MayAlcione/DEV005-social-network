import {auth, db, guardarPost, getPosts, eliminarPost, editarPost, signOut} from '../lib/firebase.js';

function home(navigateTo) {
  const section = document.createElement('section');
  const title = document.createElement('h2');

  title.textContent = 'Home';
  section.append(title);
  
  // Logout
  const navbar = document.querySelector('nav ul');
  const btnLogout = document.createElement('btn-logout');
  btnLogout.classList.add('btn-logout');
  btnLogout.textContent = 'Cerrar sesión';
  btnLogout.addEventListener('click', () => {
    signOut(auth)
      .then(() => {
        console.log('Usuario cerró sesión exitosamente');
        showModal('¡Sesión cerrada exitosamente!');
        navigateTo('/');
        navbar.removeChild(btnLogout); // Eliminar el botón del navbar
      })
      .catch((error) => {
        console.error('Error al cerrar sesión:', error);
        showModal('Error al cerrar sesión. Por favor, intenta nuevamente.');
      });
  });

  navbar.appendChild(btnLogout);

  // Modal
  function showModal(message) {
    // Crear el elemento del modal
    const modal = document.createElement('div');
    modal.classList.add('modal');
    
    // Crear el contenido del modal
    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');
    
    // Agregar el mensaje al contenido del modal
    const messageElement = document.createElement('p');
    messageElement.textContent = message;
    modalContent.appendChild(messageElement);
    
    // Agregar el contenido del modal al modal
    modal.appendChild(modalContent);
    
    // Agregar el modal al documento
    document.body.appendChild(modal);
    
    // Remover el modal después de cierto tiempo (opcional)
    setTimeout(() => {
      document.body.removeChild(modal);
    }, 3000);
  }
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
        contenido,
      };
      guardarPost(post);
      document.getElementById('postInput').value = '';
    }
  });

  // Renderizar posts
  const postsContainer = document.createElement('div');
  section.appendChild(postsContainer);

  const renderPosts = (querySnapshot) => {
    console.log(querySnapshot);
    postsContainer.innerHTML = '';
    querySnapshot.forEach((doc) => {
      const post = doc.data();
      const idDoc = doc.id;
      const postElement = document.createElement('div');
      postElement.className = 'post-box';
      postElement.innerHTML = `
        <span>${post.contenido}</span>
        <button class="eliminar" id="btn-eliminar-${idDoc}">Eliminar</button>
        <button class="editar" id="btn-editar-${idDoc}">Editar</button>
      `;
      postsContainer.appendChild(postElement);

      // Eliminar post
      const btnEliminar = postElement.querySelector(`#btn-eliminar-${idDoc}`);
      btnEliminar.addEventListener('click', () => {
        eliminarPost(idDoc);
        console.log(post.contenido);
        console.log(idDoc);
      });

      // Editar post
      const btnEditar = postElement.querySelector(`#btn-editar-${idDoc}`);
      btnEditar.addEventListener('click', () => {
        const inputElement = document.createElement('input');
        inputElement.type = 'text';
        inputElement.value = post.contenido;
        

        // Reemplaza el elemento span con el input
        const spanElement = postElement.querySelector('span');
        postElement.replaceChild(inputElement, spanElement);

        // Cambia el evento al botón guardar
        btnEditar.removeEventListener('click', guardarCambios);
        btnEditar.addEventListener('click', () => {
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
            const nuevoSpanElement = document.createElement('span');
            nuevoSpanElement.textContent = nuevoContenido;

            const inputElement = postElement.querySelector('input');
            postElement.replaceChild(nuevoSpanElement, inputElement);

            // Restaura el evento al botón editar
            btnEditar.removeEventListener('click', guardarCambios);
            btnEditar.addEventListener('click', () => {
            });
          })
          .catch((error) => {
            console.error('Error al guardar cambios: ', error);
          });
      };         
    });
  };

  getPosts(renderPosts);


  return section;
}

export default home;
