import { firebaseAuth } from './firebase-config';

const provider = new firebase.auth.GoogleAuthProvider();
const login = () => {
  firebaseAuth.signInWithPopup(provider)
    .then((result) => {
      // El usuario se autenticó correctamente
      const user = result.user;
    // console.log(user);
    })
    .catch((error) => {
      // Hubo un error en la autenticación
      const errorCode = error.code;
      const errorMessage = error.message;
      // console.log(errorCode, errorMessage);
    });
};

/* const signInFirebase = (auth, email, password) => {
  return auth.signInWithEmailAndPassword(email, password);
}

const login = (email, password) => {
  signInFirebase(firebaseAuth, email, password)
} */

export { login };
