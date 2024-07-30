// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAE25BfzCINuC8hCX8hUKRO6acRPIonUR0',
  authDomain: 'auth-858af.firebaseapp.com',
  projectId: 'auth-858af',
  storageBucket: 'auth-858af.appspot.com',
  messagingSenderId: '282359009485',
  appId: '1:282359009485:web:15b2841c167a1990cc5984',
  measurementId: 'G-9D1P15J8L7',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
