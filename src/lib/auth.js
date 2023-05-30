import {
  app,
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from 'firebase/auth';
import {} from './firebase.js';

export const auth = getAuth(app);

export const addUser = (email, password) => createUserWithEmailAndPassword(auth, email, password);

export const login = (email, password) => signInWithEmailAndPassword(auth, email, password);

export const googleProvider = new GoogleAuthProvider();

export const loginWithGoogle = () => signInWithPopup(auth, googleProvider);

export const recoverPassword = (email) => sendPasswordResetEmail(auth, email);

export const logOut = () => signOut(auth);

export const getCurrentUser = () => auth.currentUser;
