// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { firebaseConfig } from './firebase-config.js';
import { getFirestore, collection, addDoc, getDocs, orderBy, query, deleteDoc, doc, setDoc } from 'firebase/firestore';


// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Export Firebase app and auth objects
export const auth = getAuth(firebaseApp);
export const db = getFirestore();


export const signInFirebase = (auth, email, password) => {
  return auth.signInWithEmailAndPassword(email, password);
};

// Exportar login
export const login = (email, password) => {
  const userCredential = auth.signInWithEmailAndPassword(email, password);
  return userCredential;
};

// Registrarse
export const register = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

// Iniciar sesión con Google
const provider = new GoogleAuthProvider();
export const loginGoogle = () => {
  return signInWithPopup(auth, provider);
}; 

// guardar post
export const guardarPost = (post) => {
  const user = auth.currentUser;
  if (user) {
    // Si el usuario está autenticado, guardar el post
    addDoc(collection(db, "posts"), {
      contenido: JSON.stringify(post), // Convertir a cadena JSON
      fecha: new Date(),
      usuario: user.uid,
    });
  }
};

// Renderizar post
export const getPosts = () => {
  const postsQuery = query(collection(db, 'posts'), orderBy('fecha', 'desc'));
  return getDocs(postsQuery)
    .then((querySnapshot) => {
      const posts = querySnapshot.docs.map((doc) => doc.data());
      return posts;
    })
    .catch((error) => {
      console.error('Error al cargar los posts: ', error);
      return [];
    });
};


// Eliminar post
export const eliminarPost = (postId) => {
  deleteDoc(doc(db, "posts", postId))
    .then(() => {
      console.log("Post eliminado con ID: ", postId);
    })
    .catch((error) => {
      console.error("Error al eliminar post: ", error);
    });
};

// Editar post
export const editarPost = (postId, nuevoContenido) => {
  updateDoc(doc(db, "posts", postId), {
    contenido: nuevoContenido,
  })
    .then(() => {
      console.log("Post editado con ID: ", postId);
    })
    .catch((error) => {
      console.error("Error al editar post: ", error);
    });
};



