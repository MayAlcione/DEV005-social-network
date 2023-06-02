import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from 'firebase/auth';

import {
  collection,
  addDoc,
  orderBy,
  query,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from 'firebase/firestore';

import {
  auth,
  db,
  signInFirebase,
  login,
  register,
  loginGoogle,
  guardarPost,
  getPosts,
  eliminarPost,
  editarPost,
  signOut,
} from '../src/lib/firebase';

// Simular las funciones de Firebase
jest.mock('firebase/app', () => ({
  initializeApp: jest.fn(),
}));

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
  GoogleAuthProvider: jest.fn(),
  signInWithPopup: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
}));

jest.mock('firebase/firestore', () => ({
  getDatabase: jest.fn(),
  collection: jest.fn(),
  addDoc: jest.fn(),
  orderBy: jest.fn(),
  query: jest.fn(),
  deleteDoc: jest.fn(),
  doc: jest.fn(),
  onSnapshot: jest.fn(),
  updateDoc: jest.fn(),
  arrayUnion: jest.fn(),
  arrayRemove: jest.fn(),
}));

describe('signInFirebase', () => {
  it('debería iniciar sesión con el correo electrónico y la contraseña del usuario', () => {
    const email = 'test@example.com';
    const password = 'password123';

    const signInWithEmailAndPasswordMock = jest.fn();
    signInWithEmailAndPassword.mockImplementation(signInWithEmailAndPasswordMock);

    signInFirebase(email, password);

    expect(signInWithEmailAndPasswordMock).toHaveBeenCalledWith(auth, email, password);
  });
});

describe('login', () => {
  it('debería iniciar sesión con el correo electrónico y la contraseña del usuario', () => {
    const email = 'test@example.com';
    const password = 'password123';

    signInWithEmailAndPassword.mockResolvedValue();

    return login(email, password).then(() => {
      expect(signInWithEmailAndPassword).toHaveBeenCalledWith(auth, email, password);
    });
  });
});

describe('register', () => {
  it('debería registrar a un nuevo usuario con el correo electrónico y la contraseña', () => {
    const email = 'test@example.com';
    const password = 'password123';

    createUserWithEmailAndPassword.mockResolvedValue();

    return register(email, password).then(() => {
      expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(auth, email, password);
    });
  });
});

describe('loginGoogle', () => {
  it('debería iniciar sesión con Google', () => {
    signInWithPopup.mockResolvedValue();

    return loginGoogle().then(() => {
      expect(signInWithPopup).toHaveBeenCalledWith(auth, new GoogleAuthProvider());
    });
  });
});

describe('guardarPost', () => {
  it('no debería guardar un post si el usuario no está autenticado', () => {
    jest.spyOn(auth, 'currentUser', 'get').mockReturnValue(null);

    return guardarPost({ contenido: 'Test Post' }).then(() => {
      expect(addDoc).not.toHaveBeenCalled();
    });
  });

  it('debería guardar un post si el usuario está autenticado', () => {
    // Simular el usuario autenticado
    const user = { uid: 'testUserId' };
    jest.spyOn(auth, 'currentUser', 'get').mockReturnValue(user);

    // Simular la función addDoc para verificar su llamado
    const addDocMock = jest.fn();
    addDoc.mockImplementation(addDocMock);

    const post = { contenido: 'Test Post' };

    return guardarPost(post).then(() => {
      expect(addDocMock).toHaveBeenCalledWith(
        collection(db, 'posts'),
        expect.objectContaining({
          ...post,
          fecha: expect.any(Date),
          usuario: user.uid,
        }),
      );
    });
  });
});

describe('getPosts', () => {
  it('debería recuperar los posts e invocar la función de callback', () => {
    const callback = jest.fn();
    const postsQuery = {};

    query.mockReturnValue(postsQuery);
    onSnapshot.mockReturnValue();

    getPosts(callback);

    expect(query).toHaveBeenCalledWith(collection(db, 'posts'), orderBy('fecha', 'desc'));
    expect(onSnapshot).toHaveBeenCalledWith(postsQuery, callback);
  });
});

describe('eliminarPost', () => {
  it('debería eliminar un post si se confirma', () => {
    window.confirm = jest.fn().mockReturnValue(true);
    deleteDoc.mockResolvedValue();

    return eliminarPost('postId123').then(() => {
      expect(window.confirm).toHaveBeenCalledWith('¿Estás seguro de que deseas eliminar este post?');
      expect(deleteDoc).toHaveBeenCalledWith(doc(db, 'posts', 'postId123'));
    });
  });

  it('debería cancelar la eliminación de un post si se cancela', () => {
    window.confirm = jest.fn().mockReturnValue(false);

    return eliminarPost('postId123').then(() => {
      expect(window.confirm).toHaveBeenCalledWith('¿Estás seguro de que deseas eliminar este post?');
      expect(deleteDoc).not.toHaveBeenCalled();
    });
  });
});

describe('editarPost', () => {
  it('debería modificar el contenido de un post', () => {
    updateDoc.mockResolvedValue();

    return editarPost('postId123', 'nuevo contenido').then(() => {
      expect(updateDoc).toHaveBeenCalledWith(
        doc(db, 'posts', 'postId123'),
        expect.objectContaining({ contenido: 'nuevo contenido' }),
      );
    });
  });
});

describe('signOut', () => {
  it('debería cerrar la sesión del usuario', () => {
    auth.signOut = jest.fn().mockResolvedValue();

    return signOut().then(() => {
      expect(auth.signOut).toHaveBeenCalled();
    });
  });
});
