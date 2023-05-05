function login(navigateTo) {
    const section = document.createElement('section');
    const title = document.createElement('h2');
    const buttonRegistro = document.createElement('button');
    const buttonLogin = document.createElement('button');
    const buttonGoogle = document.createElement('button');
    const inputEmail = document.createElement('input');
    const inputPass = document.createElement('input');
    const img = document.createElement("img");
  
    img.src = "https://cdn-icons-png.flaticon.com/512/6929/6929746.png";
    img.width = 200;
    img.height = 200;
    img.style.margin = "0 auto";
    const container = document.getElementById("image-container");
    container.appendChild(img);
    
    inputEmail.placeholder = 'Ingresar correo eletronico';
    inputPass.placeholder = 'Ingresar contraseña';
    inputPass.type = 'password'; 
  
    title.textContent = 'Bienvenid@';
    buttonLogin.textContent = 'Iniciar sesión';
    buttonLogin.addEventListener('click', () => {
      navigateTo('/posts');  
    });
    
    buttonRegistro.textContent = 'Crear nueva cuenta';
    buttonRegistro.addEventListener('click', () => {
      navigateTo('/registro');  
    });
  
    buttonGoogle.textContent = 'Acceder con Google';
    buttonGoogle.addEventListener('click', () => {
      navigateTo('/posts');  
    });
  
    section.append(img, title, inputEmail, inputPass, buttonLogin, buttonRegistro, buttonGoogle);

    return section;
  }
  
  export default login;
  ``
  