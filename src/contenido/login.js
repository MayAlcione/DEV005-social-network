import { login, loginGoogle } from "../lib/firebase.js";

function createLoginComponent(navigateTo) {
  const section = document.createElement('section');
  const title = document.createElement('h2');
  const buttonRegistro = document.createElement('button');
  const buttonLogin = document.createElement('button');
  const buttonGoogle = document.createElement('button');
  const inputEmail = document.createElement('input');
  const inputPass = document.createElement('input');
  const img = document.createElement('img');
  const error = document.createElement('p');

  img.src = 'https://cdn-icons-png.flaticon.com/512/6929/6929746.png';
  img.width = 200;
  img.height = 200;
  img.style.margin = '0 auto';
  const container = document.getElementById('image-container');
  container.appendChild(img);

  inputEmail.placeholder = 'Ingresar correo eletronico';
  inputEmail.type = 'email';
  inputEmail.addEventListener('input', () => {
    if (!inputEmail.checkValidity()) {
      error.textContent = 'Por favor, ingrese un correo electrónico válido';
      inputEmail.classList.add('invalid');
      inputPass.disabled = true;
      buttonLogin.disabled = true;
    } else {
      error.textContent = '';
      inputEmail.classList.remove('invalid');
      inputPass.disabled = false;
      buttonLogin.disabled = false;
    }
  });

  // Habilitando enter
  inputEmail.addEventListener('keypress', (event) => {
    if (event.key === 'Enter' && !inputEmail.classList.contains('invalid')) {
      event.preventDefault();
      inputPass.focus();
    }
  });

  inputPass.placeholder = 'Ingresar contraseña';
  inputPass.type = 'password';
  inputPass.addEventListener('input', () => {
    if (inputPass.value.length < 6) {
      error.textContent = 'Por favor, ingrese una contraseña de al menos 6 caracteres';
      inputPass.classList.add('invalid');
      buttonLogin.disabled = true;
    } else {
      error.textContent = '';
      inputPass.classList.remove('invalid');
      buttonLogin.disabled = false;
    }
  });

  // Habilitando enter
  inputPass.addEventListener('keypress', (event) => {
    if (event.key === 'Enter' && !buttonLogin.disabled) {
      event.preventDefault();
      buttonLogin.click();
    }
  });

  title.textContent = 'Bienvenid@';
  buttonLogin.textContent = 'Iniciar sesión';
  buttonLogin.addEventListener('click', async () => {
    try {
      await login(inputEmail.value, inputPass.value);
      // Verificar si el usuario está autenticado
      const user = firebase.auth().currentUser;
      if (user) {
        navigateTo('/posts');
      } else {
        throw new Error('El usuario no está autenticado');
      }
    } catch (error) {
      error.textContent = 'Error al iniciar sesión. Intente de nuevo más tarde.';
    }
  });
  

  buttonRegistro.textContent = 'Crear nueva cuenta';
  buttonRegistro.addEventListener('click', () => {
    navigateTo('/registro');
  });

// Obtener una referencia al botón
buttonGoogle.classList.add('buttonGoogle');
buttonGoogle.textContent = 'Acceder con Google';

// Crear una imagen con el logo de Google
const logoGoogle = document.createElement('img');
logoGoogle.src = 'https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-google-icon-logo-png-transparent-svg-vector-bie-supply-14.png';
logoGoogle.width = '40';
logoGoogle.margin = '0 auto';
// Agregar la imagen al botón
buttonGoogle.appendChild(logoGoogle);

// Agregar un evento de clic al botón
buttonGoogle.addEventListener('click', () => {
 loginGoogle()
    .then(result => {
      console.log(`${result.user.email} ha iniciado sesión`)
      navigateTo('/posts');
    }) 
    .catch(error => console.log(`Error ${error.code}: ${error.message}`));
    });
  section.append(
    img,
    title,
    inputEmail,
    inputPass,
    error,
    buttonLogin,
    buttonRegistro,
    buttonGoogle,
  );

  return section;
}

export default createLoginComponent;
