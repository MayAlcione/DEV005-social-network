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
  getFirestore: jest.fn(),
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
  it('deberia iniciar sesion con eamil y contraseña', () => {
    const email = 'test@example.com';
    const password = 'password123';

    const signInWithEmailAndPasswordMock = jest.fn();
    signInWithEmailAndPassword.mockImplementation(signInWithEmailAndPasswordMock);

    signInFirebase(email, password);

    expect(signInWithEmailAndPasswordMock).toHaveBeenCalledWith(auth, email, password);
  });
});

describe('login', () => {
  it('deberia hacer login utilizando email y contraseña', () => {
    const email = 'test@example.com';
    const password = 'password123';

    signInWithEmailAndPassword.mockResolvedValue();

    return login(email, password).then(() => {
      expect(signInWithEmailAndPassword).toHaveBeenCalledWith(auth, email, password);
    });
  });
});

describe('register', () => {
  it('deberia registrar usuario utilizando email y contraseña', () => {
    const email = 'test@example.com';
    const password = 'password123';

    createUserWithEmailAndPassword.mockResolvedValue();

    return register(email, password).then(() => {
      expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(auth, email, password);
    });
  });
});

describe('loginGoogle', () => {
  it('deberia iniciar sesion con Google', () => {
    signInWithPopup.mockResolvedValue();

    return loginGoogle().then(() => {
      expect(signInWithPopup).toHaveBeenCalledWith(auth, new GoogleAuthProvider());
    });
  });
});

describe('guardarPost', () => {
  it('no deberia salvar post de usuario no autenticado', () => {
    jest.spyOn(auth, 'currentUser', 'get').mockReturnValue(null);

    return guardarPost({ contenido: 'Test Post' }).then(() => {
      expect(addDoc).not.toHaveBeenCalled();
    });
  });

  it('deberia salvar post de usuario autenticado', () => {
    const user = { uid: 'testUserId' };
    jest.spyOn(auth, 'currentUser', 'get').mockReturnValue(user);

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
  it('deberia retornar pots y invocar funcion callback', () => {
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
  it('deberia eliminar post si confirmado', () => {
    window.confirm = jest.spyOn().mockReturnValue(true);
    deleteDoc.mockResolvedValue();

    return eliminarPost('postId123').then(() => {
      expect(window.confirm).toHaveBeenCalledWith('¿Estás seguro de que deseas eliminar este post?');
      expect(deleteDoc).toHaveBeenCalledWith(doc(db, 'posts', 'postId123'));
    });
  });

  it('deberia cancelar eliminación del post si es cancelado', () => {
    window.confirm = jest.spyOn().mockReturnValue(false);

    return eliminarPost('postId123').then(() => {
      expect(window.confirm).toHaveBeenCalledWith('¿Estás seguro de que deseas eliminar este post?');
      expect(deleteDoc).not.toHaveBeenCalled();
    });
  });
});

describe('editarPost', () => {
  it('deberia modificar el contenido del post', () => {
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
  it('deberia cerrar sesion de usuario', () => {
    auth.signOut = jest.spyOn().mockResolvedValue();

    return signOut().then(() => {
      expect(auth.signOut).toHaveBeenCalled();
    });
  });
});
