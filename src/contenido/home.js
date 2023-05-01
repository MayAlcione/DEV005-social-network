function home(navigateTo) {
    const section = document.createElement('section');
    const title = document.createElement('h2');
    const button = document.createElement('button');

    button.textContent = 'Login';
    button.addEventListener('click', () => {
      navigateTo('/');  
    });

    title.textContent = '¡Bienvenid@!';
    section.append(title, button);
    return section;
}

export default home;