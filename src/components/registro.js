import { register } from '../lib/firebase.js';

function registro(navigateTo) {
  const section = document.createElement('section');
  const img = document.createElement('img');
  const title = document.createElement('h2');
  const inputEmail = document.createElement('input');
  const inputPass = document.createElement('input');
  const error = document.createElement('p');
  const buttonRegistro = document.createElement('button');
  const button = document.createElement('buttonC');
  const buttonContainer = document.getElementById('buttonC');

  button.textContent = 'Inicio';
  button.addEventListener('click', () => {
    navigateTo('/');
  });

  buttonContainer.appendChild(button);

  img.src = 'https://cdn-icons-png.flaticon.com/512/6929/6929746.png';
  img.width = 200;
  img.height = 200;
  img.style.margin = '0 auto';
  const container = document.getElementById('image-container');
  container.appendChild(img);

  inputEmail.placeholder = 'Ingresar correo electrónico';
  inputEmail.type = 'email';
  inputEmail.addEventListener('input', () => {
    if (!inputEmail.checkValidity()) {
      error.textContent = 'Por favor, ingrese un correo electrónico válido';
      inputEmail.classList.add('invalid');
      inputPass.disabled = true;
      buttonRegistro.disabled = true;
    } else {
      error.textContent = '';
      inputEmail.classList.remove('invalid');
      inputPass.disabled = false;
      buttonRegistro.disabled = false;
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
      buttonRegistro.disabled = true;
    } else {
      error.textContent = '';
      inputPass.classList.remove('invalid');
      buttonRegistro.disabled = false;
    }
  });

  // Habilitando enter
  inputPass.addEventListener('keypress', (event) => {
    if (event.key === 'Enter' && !buttonRegistro.disabled) {
      event.preventDefault();
      buttonRegistro.click();
    }
  });

  // Creando el botón de registro
  title.textContent = 'Registro';
  buttonRegistro.textContent = 'Registrarse';
  buttonRegistro.disabled = true;
  buttonRegistro.addEventListener('click', async () => {
    try {
      await register(inputEmail.value, inputPass.value);
      navigateTo('/home');
    } catch (error) {
      // Manejando el error en caso de que el registro falle
      error.textContent = 'Ha ocurrido un error al registrar su cuenta. Por favor, intente de nuevo más tarde.';
    }
  });

  section.append(
    img,
    title,
    inputEmail,
    inputPass,
    error,
    buttonRegistro,
  );

  return section;
}

export default registro;
