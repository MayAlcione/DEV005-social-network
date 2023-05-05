function registro(navigateTo) {
  const section = document.createElement('section');
  const title = document.createElement('h2');
  const element = document.createElement('h3');
  const inputNombre = document.createElement('input');
  const inputCorreo = document.createElement('input');
  const inputContraseña = document.createElement('input');
  const buttonRegistrarse = document.createElement('button');
  const img = document.createElement('img');

  img.src = 'https://cdn-icons-png.flaticon.com/512/6929/6929746.png';
  img.width = 200; // establece el ancho de la imagen a 200 píxeles
  img.height = 200; // establece la altura de la imagen a 200 píxeles
  img.style.margin = '0 auto'; // centra la imagen horizontalmente
  const container = document.getElementById('image-container');
  container.appendChild(img);

  title.textContent = 'Crear nueva cuenta';

  inputNombre.placeholder = 'Ingresa tu nombre';
  element.textContent = 'Nombre de usuario';

  element.textContent = 'Correo Electronico';
  inputCorreo.placeholder = 'Crea tu cuenta';

  element.textContent = 'Contraseña';
  inputContraseña.placeholder = 'Crea contraseña';

  buttonRegistrarse.textContent = 'Registrar';
  buttonRegistrarse.addEventListener('click', () => {
    navigateTo('/posts');
  });
  section.append(img, title, inputNombre, inputCorreo, inputContraseña, buttonRegistrarse, element);
  return section;
}
export default registro;
