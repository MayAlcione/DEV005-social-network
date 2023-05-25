import {auth, db, guardarPost, getPosts, eliminarPost, editarPost, signOut} from '../lib/firebase.js';

function home(navigateTo) {
  const section = document.createElement('section');
  const title = document.createElement('h2');
  title.textContent = `¡Bienvenidos artistas!
   Compartamos nuestros mejores tips y experiencias.`;
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
      const currentUser = auth.currentUser;
      const userEmail = currentUser ? currentUser.email : '';
      const postElement = document.createElement('div');
      postElement.className = 'post-box';
      postElement.innerHTML = `
      <div class="user-info-container">
      <span class="user-icon">${userEmail.charAt(0).toUpperCase()}</span>
      <span class="user-email">${userEmail}</span></div>
      <span>${post.contenido}</span>
      <div class="button-container">
        <button class="eliminar" id="btn-eliminar-${idDoc}">Eliminar</button>
        <button class="editar" id="btn-editar-${idDoc}">Editar</button></div>
        <button id="likeButton" class="heart-button">
        <i class="fas fa-heart"></i>
        <img src="https://static.vecteezy.com/system/resources/previews/001/187/511/non_2x/heart-png.png" alt="Me gusta" class="like" width="30">
        <span id="likeCount">0</span>
        </button>
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

  const modal = document.createElement('div');
  modal.classList.add('modal');

  const modalContent = document.createElement('div');
  modalContent.textContent = 'Editando post';
  modalContent.classList.add('modal-content');

  modalContent.appendChild(inputElement);

  const guardarButton = document.createElement('button');
  guardarButton.textContent = 'Guardar';
  modalContent.appendChild(guardarButton);

  const cancelarButton = document.createElement('button');
  cancelarButton.textContent = 'Cancelar';
  modalContent.appendChild(cancelarButton);

  modal.appendChild(modalContent);
  document.body.appendChild(modal);

  const guardarCambios = () => {
    const nuevoContenido = inputElement.value;
    editarPost(idDoc, nuevoContenido);

    const nuevoSpanElement = document.createElement('span');
    nuevoSpanElement.textContent = nuevoContenido;

    const inputContainer = postElement.querySelector('.input-container');
    if (inputContainer && inputContainer.parentNode) {
      inputContainer.parentNode.replaceChild(nuevoSpanElement, inputContainer);
    }

    btnEditar.addEventListener('click', editarPost);

    document.body.removeChild(modal);
  };

  guardarButton.addEventListener('click', guardarCambios);
  cancelarButton.addEventListener('click', () => {
    document.body.removeChild(modal);
  });
});

      
      let likes = [];
const likeButton = document.getElementById('likeButton');
const likeCount = document.getElementById('likeCount');

likeButton.addEventListener('click', handleLike);

function handleLike() {
  const user = getCurrentUser(); // Obtén el identificador del usuario actual

  if (likes.includes(user)) {
    // El usuario ya ha dado "Me gusta", así que lo eliminamos
    likes = likes.filter((likeUser) => likeUser !== user);
  } else {
    // El usuario no ha dado "Me gusta", así que lo agregamos
    likes.push(user);
  }

  updateLikeButton(); // Actualiza la apariencia del botón de "Me gusta"
  updateLikeCount(); // Actualiza el contador de "Me gusta"
}

function updateLikeButton() {
  const heartIcon = likeButton.querySelector('i');

  if (likes.includes(getCurrentUser())) {
    // El usuario ha dado "Me gusta", cambia la apariencia del botón
    likeButton.classList.add('liked');
    heartIcon.classList.add('fas');
    heartIcon.classList.remove('far');
  } else {
    // El usuario no ha dado "Me gusta", restablece la apariencia del botón
    likeButton.classList.remove('liked');
    heartIcon.classList.remove('fas');
    heartIcon.classList.add('far');
  }
}

function updateLikeCount() {
  likeCount.textContent = likes.length;
}


function getCurrentUser() {
 
  return 'usuario1';
}

     
    });
  };

  getPosts(renderPosts);


  return section;
}

export default home;