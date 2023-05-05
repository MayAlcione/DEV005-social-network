function login(navigateTo) {
  const section = document.createElement('section');
  const title = document.createElement('h2');
  const buttonRegistro = document.createElement('button');
  const inputEmail = document.createElement('input');
  const inputPass = document.createElement('input');
  const buttonLogin = document.createElement('button');
  const img = document.createElement('img');

  img.src = 'https://cdn-icons-png.flaticon.com/512/6929/6929746.png';
  img.width = 200; // establece el ancho de la imagen a 200 píxeles
  img.height = 200; // establece la altura de la imagen a 200 píxeles
  img.style.margin = '0 auto'; // centra la imagen horizontalmente
  const container = document.getElementById('image-container');
  container.appendChild(img);

  inputEmail.placeholder = 'Ingresar correo eletronico';
  inputPass.placeholder = 'Ingresar contraseña';

  title.textContent = 'Bienvenid@';
  buttonLogin.textContent = 'Iniciar sesión';
  buttonLogin.addEventListener('click', () => {
    navigateTo('/posts');
  });

  buttonRegistro.textContent = 'Crear nueva cuenta';
  buttonRegistro.addEventListener('click', () => {
    navigateTo('/registro');
  });

  section.append(img, title, inputEmail, inputPass, buttonLogin, buttonRegistro);

  return section;
}

export default login;
