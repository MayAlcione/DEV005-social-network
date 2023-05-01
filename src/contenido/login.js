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
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAVD8pMHrq2emL42HYB3NQGqiNqPsCEl8w",
  authDomain: "artcircle-id.firebaseapp.com",
  projectId: "artcircle-id",
  storageBucket: "artcircle-id.appspot.com",
  messagingSenderId: "353855474373",
  appId: "1:353855474373:web:6c32fd554158412310feac",
  measurementId: "G-1LGJ5M3WBK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default login;