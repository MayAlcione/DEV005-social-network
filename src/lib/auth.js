import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    GoogleAuthProvider,
    signInWithPopup,
    sendPasswordResetEmail,
  } from 'firebase/auth';
  import { app } from './firebase-config.js';
  
  export const auth = getAuth(app);
  
  // eslint-disable-next-line max-len
  export const addUser = (email, password) => createUserWithEmailAndPassword(auth, email, password);
  
  export const login = (email, password) => signInWithEmailAndPassword(auth, email, password);
  
  export const google = new GoogleAuthProvider();
  
  export const loginGoogle = () => signInWithPopup(auth, google);
  export const recoverPassword = (email) => sendPasswordResetEmail(email);
  export const logOut = () => signOut(auth);
  export const currentUser = () => auth.currentUser;