import login from '../src/contenido/login';

describe('login', () => {
  it('debería ser una función', () => {
    expect(typeof login).toBe('function');
  });

  it('debería devolver un elemento de tipo "section"', () => {
    const result = login();
    expect(result.tagName).toBe('SECTION');
  });

  it('debería deshabilitar el botón de inicio de sesión cuando se ingresa una contraseña incorrecta', () => {
    const result = login();
    const emailInput = result.querySelector('input[type="email"]');
    const passwordInput = result.querySelector('input[type="password"]');
    const loginButton = result.querySelector('button[type="submit"]');

    emailInput.value = 'example@gmail.com';
    passwordInput.value = 'pass';

    passwordInput.dispatchEvent(new Event('input'));

    expect(loginButton.disabled).toBe(true);
  });

  it('debería habilitar el botón de inicio de sesión cuando se ingresan datos válidos', () => {
    const result = login();
    const emailInput = result.querySelector('input[type="email"]');
    const passwordInput = result.querySelector('input[type="password"]');
    const loginButton = result.querySelector('button[type="submit"]');

    emailInput.value = 'example@gmail.com';
    passwordInput.value = 'password123';

    emailInput.dispatchEvent(new Event('input'));
    passwordInput.dispatchEvent(new Event('input'));

    expect(loginButton.disabled).toBe(false);
  });

  it('debería redirigir al usuario a la página de publicaciones cuando se inicia sesión correctamente', () => {
    const navigateToMock = jest.fn();
    const result = login(navigateToMock);
    const emailInput = result.querySelector('input[type="email"]');
    const passwordInput = result.querySelector('input[type="password"]');
    const loginButton = result.querySelector('button[type="submit"]');

    emailInput.value = 'example@gmail.com';
    passwordInput.value = 'password123';

    emailInput.dispatchEvent(new Event('input'));
    passwordInput.dispatchEvent(new Event('input'));

    loginButton.dispatchEvent(new Event('click'));

    expect(navigateToMock).toHaveBeenCalledWith('/posts');
  });
});
