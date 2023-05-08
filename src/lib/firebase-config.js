// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAVD8pMHrq2emL42HYB3NQGqiNqPsCEl8w',
  authDomain: 'artcircle-id.firebaseapp.com',
  databaseURL: 'https://artcircle-id-default-rtdb.firebaseio.com',
  projectId: 'artcircle-id',
  storageBucket: 'artcircle-id.appspot.com',
  messagingSenderId: '353855474373',
  appId: '1:353855474373:web:6c32fd554158412310feac',
  measurementId: 'G-1LGJ5M3WBK',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Export Firebase app and auth objects
const firebaseAuth = getAuth(firebaseApp);

export { firebaseApp, firebaseAuth };
