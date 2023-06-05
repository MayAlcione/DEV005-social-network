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

export const guardarEmail = (email) => {
  const emailCollection = collection(db, 'emails');
  return addDoc(emailCollection, { email });
};

// Guardar post
export const guardarPost = (post) => {
  const user = getAuth().currentUser;
  if (user) {
    // Si el usuario está autenticado, guardar el post
    const postRef = collection(db, 'posts');
    const newPost = {
      ...post,
      fecha: new Date(),
      usuario: user.email,
    };
    return addDoc(postRef, newPost)
      .then(() => {
        const userEmail = user.email;
        return guardarEmail(userEmail); // Guarda el correo electrónico en la colección 'emails'
      })
      .catch((error) => {
        // console.error('Error al guardar el post:', error);
        throw error; // Lanzar el error
      });
  }

  return null; // O cualquier otro valor que desees devolver si el usuario no está autenticado
};

// Mostrar post
export const getPosts = (callback) => {
  const postsQuery = query(collection(db, 'posts'), orderBy('fecha', 'desc'));
  return onSnapshot(postsQuery, callback);
};

// Eliminar post
export const eliminarPost = (postId, callback) => {
  // eslint-disable-next-line no-alert
  const confirmarEliminar = window.confirm('¿Estás seguro de que deseas eliminar este post?');
  if (confirmarEliminar) {
    deleteDoc(doc(db, 'posts', postId))
      .then(() => {
        callback(true); // Indicar que el post fue eliminado exitosamente
      })
      .catch(() => {
        callback(false); // Indicar que ocurrió un error al eliminar el post
      });
  }
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
