// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { firebaseConfig } from './firebase-config.js';

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);

// Export Firebase app and auth objects
export const auth = getAuth(firebaseApp);

export const signInFirebase = (auth, email, password) => {
  return auth.signInWithEmailAndPassword(email, password);
}
// exportar login
export const login = (email, password) => {
  try {
    const userCredential = firebase.auth().signInWithEmailAndPassword(email, password);
    return userCredential;
  } catch (error) {
    throw new Error('Error al iniciar sesión. Intente de nuevo más tarde.');
  }
}

export const register = (email, password) => {
createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
}
