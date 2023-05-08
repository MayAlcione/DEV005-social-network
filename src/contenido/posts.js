function posts(navigateTo) {
  const section = document.createElement('section');
  const title = document.createElement('h2');
  const button = document.createElement('buttonC');
  const buttonContainer = document.getElementById('buttonC');

  button.textContent = 'Inicio';
  button.addEventListener('click', () => {
    navigateTo('/');
  });

  buttonContainer.appendChild(button);

  title.textContent = 'Posts';
  section.append(title);
  return section;
}

export default posts;
