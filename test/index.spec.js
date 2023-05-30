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
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore';

// Import the functions to test
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
  likePost,
  unlikePost,
  signOut,
} from '../src/lib/firebase';

// Mock Firebase functions
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
  it('should sign in the user with email and password', () => {
    const email = 'test@example.com';
    const password = 'password123';

    const signInWithEmailAndPasswordMock = jest.fn();
    signInWithEmailAndPassword.mockImplementation(signInWithEmailAndPasswordMock);

    signInFirebase(email, password);

    expect(signInWithEmailAndPasswordMock).toHaveBeenCalledWith(email, password);
  });
});

describe('login', () => {
  it('should sign in the user with email and password', () => {
    const email = 'test@example.com';
    const password = 'password123';

    signInWithEmailAndPassword.mockResolvedValue();

    return login(email, password).then(() => {
      expect(signInWithEmailAndPassword).toHaveBeenCalledWith(auth, email, password);
    });
  });
});

describe('register', () => {
  it('should register a new user with email and password', () => {
    const email = 'test@example.com';
    const password = 'password123';

    createUserWithEmailAndPassword.mockResolvedValue();

    return register(email, password).then(() => {
      expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(auth, email, password);
    });
  });
});

describe('loginGoogle', () => {
  it('should sign in the user with Google', () => {
    signInWithPopup.mockResolvedValue();

    return loginGoogle().then(() => {
      expect(signInWithPopup).toHaveBeenCalledWith(auth, new GoogleAuthProvider());
    });
  });
});

describe('guardarPost', () => {
  it('should not save a post if the user is not authenticated', () => {
    // Simulate that the user is not authenticated
    jest.fn(auth, 'currentUser', 'get').mockReturnValue(null);

    return guardarPost({ contenido: 'Test Post' }).then(() => {
      expect(addDoc).not.toHaveBeenCalled();
    });
  });

  it('should save a post if the user is authenticated', () => {
    // Mock auth.currentUser to simulate an authenticated user
    const user = { uid: 'testUserId' };
    jest.fn(auth, 'currentUser', 'get').mockReturnValue(user);

    // Mock addDoc to simulate the save function
    const addDocMock = jest.fn();
    addDoc.mockImplementation(addDocMock);

    const post = { contenido: 'Test Post' };

    // Call the function to save the post
    return guardarPost(post).then(() => {
      // Verify that addDoc has been called correctly
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
  it('should retrieve posts and invoke the callback', () => {
    const callback = jest.fn();
    const postsQuery = { /* mock posts query */ };

    query.mockReturnValue(postsQuery);
    onSnapshot.mockReturnValue();

    getPosts(callback);

    expect(query).toHaveBeenCalledWith(collection(db, 'posts'), orderBy('fecha', 'desc'));
    expect(onSnapshot).toHaveBeenCalledWith(postsQuery, callback);
  });
});

describe('eliminarPost', () => {
  it('should delete a post if confirmed', () => {
    window.confirm = jest.fn().mockReturnValue(true);
    deleteDoc.mockResolvedValue();

    return eliminarPost('postId123').then(() => {
      expect(window.confirm).toHaveBeenCalledWith('¿Estás seguro de que deseas eliminar este post?');
      expect(deleteDoc).toHaveBeenCalledWith(doc(db, 'posts', 'postId123'));
    });
  });

  it('should not delete a post if not confirmed', () => {
    window.confirm = jest.fn().mockReturnValue(false);

    return eliminarPost('postId123').then(() => {
      expect(window.confirm).toHaveBeenCalledWith('¿Estás seguro de que deseas eliminar este post?');
      expect(deleteDoc).not.toHaveBeenCalled();
    });
  });
});

describe('editarPost', () => {
  it('should update the content of a post', () => {
    updateDoc.mockResolvedValue();

    return editarPost('postId123', 'New Content').then(() => {
      expect(updateDoc).toHaveBeenCalledWith(
        doc(db, 'posts', 'postId123'),
        expect.objectContaining({ contenido: 'New Content' }),
      );
    });
  });
});

describe('likePost', () => {
  it('should add the userId to the likes array of a post', () => {
    const postId = 'postId123';
    const userId = 'userId123';

    updateDoc.mockResolvedValue();

    return likePost(postId, userId).then(() => {
      expect(updateDoc).toHaveBeenCalledWith(
        doc(db, 'posts', postId),
        expect.objectContaining({
          likes: arrayUnion(userId),
        }),
      );
    });
  });
});

describe('unlikePost', () => {
  it('should remove the userId from the likes array of a post', () => {
    const postId = 'postId123';
    const userId = 'userId123';

    updateDoc.mockResolvedValue();

    return unlikePost(postId, userId).then(() => {
      expect(updateDoc).toHaveBeenCalledWith(
        doc(db, 'posts', postId),
        expect.objectContaining({
          likes: arrayRemove(userId),
        }),
      );
    });
  });
});
describe('signOut', () => {
  it('should sign out the user', () => {
    auth.signOut = jest.fn().mockResolvedValue();

    return signOut().then(() => {
      expect(auth.signOut).toHaveBeenCalled();
    });
  });
});
