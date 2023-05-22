// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword,} from 'firebase/auth';
import {getFirestore, collection, addDoc, getDocs, orderBy, query, deleteDoc, doc, onSnapshot, updateDoc,} from 'firebase/firestore';
import { firebaseConfig } from './firebase-config.js';

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Export Firebase app and auth objects
export const auth = getAuth(firebaseApp);
export const db = getFirestore();


export const signInFirebase = (auth, email, password) => auth.signInWithEmailAndPassword(email, password);

export const login = (email, password) => signInWithEmailAndPassword(auth, email, password);

// Registrarse
export const register = (email, password) => createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // El usuario ha sido registrado exitosamente
    const user = userCredential.user;
    console.log('Usuario registrado:', user);
    // Puedes realizar cualquier acción adicional después del registro aquí
  })
  .catch((error) => {
    // Ocurrió un error durante el registro
    console.error('Error al registrar usuario:', error);
    // Puedes mostrar un mensaje de error o realizar alguna acción específica en caso de error
  });

// Iniciar sesión con Google
const provider = new GoogleAuthProvider();
export const loginGoogle = () => signInWithPopup(auth, provider);

// guardar post
export const guardarPost = (post) => {
  const user = auth.currentUser;

  if (user) {
    // Si el usuario está autenticado, guardar el post
    addDoc(collection(db, 'posts'), {
      ...post,
      fecha: new Date(),
      usuario: user.uid,
    })
      .then((docRef) => {
        console.log('Post guardado con ID: ', docRef.id);
      })
      .catch((error) => {
        console.error('Error al guardar post: ', error);
        console.log(guardarPost);
      });
  }
};

// Renderizar post
// export const getPosts = () => {
//   const postsQuery = query(collection(db, 'posts'), orderBy('fecha', 'desc'));
//   return getDocs(postsQuery)
//     .then((querySnapshot) => {
//       const posts = querySnapshot.docs.map((doc) => doc.data());
//       return posts;
//     })
//     .catch((error) => {
//       console.error('Error al cargar los posts: ', error);
//       return [];
//     });
// };

export const getPosts = (callback) => {
  const postsQuery = query(collection(db, 'posts'), orderBy('fecha', 'desc'));
  return onSnapshot(postsQuery, callback);
};

// Eliminar post
export const eliminarPost = (postId) => {
  // Mostrar alert de confirmación
  const confirmarEliminar = window.confirm('¿Estás seguro de que deseas eliminar este post?');

  // Si el usuario confirma, eliminar el post
  if (confirmarEliminar) {
    deleteDoc(doc(db, 'posts', postId))
      .then(() => {
        console.log('Post eliminado con ID: ', postId);
      })
      .catch((error) => {
        console.error('Error al eliminar post: ', error);
      });
  }
};

// Editar post
export const editarPost = (postId, nuevoContenido) => {
  updateDoc(doc(db, 'posts', postId), {
    contenido: nuevoContenido,
  })
    .then(() => {
      console.log('Post editado con ID: ', postId);
    })
    .catch((error) => {
      console.error('Error al editar post: ', error);
    });
};

// Función para cerrar sesión
export const signOut = (auth) => {
  return auth.signOut();
};



