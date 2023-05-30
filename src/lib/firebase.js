import {
  initializeApp,
} from 'firebase/app';

import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from 'firebase/auth';

import {
  getFirestore,
  collection,
  addDoc,
  orderBy,
  query,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore';

import {
  firebaseConfig,
} from './firebase-config.js';

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);

export const db = getFirestore();

export const signInFirebase = (email, password) => signInWithEmailAndPassword(email, password);

export const login = (email, password) => signInWithEmailAndPassword(auth, email, password);

export const register = (email, password) => createUserWithEmailAndPassword(auth, email, password);

// Iniciar sesión con Google
const provider = new GoogleAuthProvider();
export const loginGoogle = () => signInWithPopup(auth, provider);

// Guardar post
export const guardarPost = (post) => {
  const user = getAuth().currentUser;
  if (user) {
    // Si el usuario está autenticado, guardar el post
    addDoc(collection(db, 'posts'), {
      ...post,
      fecha: new Date(),
      usuario: auth.currentUser.uid,
    });
  }
};

// Mostrar post
export const getPosts = (callback) => {
  const postsQuery = query(collection(db, 'posts'), orderBy('fecha', 'desc'));
  return onSnapshot(postsQuery, callback);
};

// Eliminar post
export const eliminarPost = (postId) => {
  // eslint-disable-next-line no-alert
  const confirmarEliminar = window.confirm('¿Estás seguro de que deseas eliminar este post?');
  if (confirmarEliminar) {
    return deleteDoc(doc(db, 'posts', postId));
  }
  return null;
};

// Editar post
export const editarPost = (postId, newContent) => {
  const postRef = doc(db, 'posts', postId);
  return updateDoc(postRef, { contenido: newContent });
};

// Like
export const likePost = (postId, userId) => {
  const postRef = doc(db, 'posts', postId);
  return updateDoc(postRef, {
    likes: arrayUnion(userId),
  });
};

export const unlikePost = (postId, userId) => {
  const postRef = doc(db, 'posts', postId);
  return updateDoc(postRef, {
    likes: arrayRemove(userId),
  });
};

// Función para cerrar sesión
export const signOut = () => auth.signOut();
// export const signOut = () => signOut(auth);
