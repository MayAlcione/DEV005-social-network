function login(navigateTo) {
    const section = document.createElement('section');
    const title = document.createElement('h2');
    const buttonReturn = document.createElement('button');
    const inputEmail = document.createElement('input');
    const inputPass = document.createElement('input');
    const buttonLogin = document.createElement('button');

    inputEmail.placeholder = 'Email';
    inputPass.placeholder = 'Contraseña';

    title.textContent = 'Login';
    buttonLogin.textContent = 'go';
    
    buttonReturn.textContent = 'Inicio';
    buttonReturn.addEventListener('click', () => {
        navigateTo('/');
    });
    section.append(title, inputEmail, inputPass, buttonLogin, buttonReturn);

    return section;
}

export default login;