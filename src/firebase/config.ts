import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const {
  VITE_REACT_APP_FIREBASE_API_KEY,
  VITE_REACT_APP_FIREBASE_AUTH_DOMAIN,
  VITE_REACT_APP_FIREBASE_PROJECT_ID,
  VITE_REACT_APP_FIREBASE_STORAGE_BUCKET,
  VITE_REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  VITE_REACT_APP_FIREBASE_APP_ID,
  VITE_REACT_APP_FIREBASE_MEASUREMENT_ID,
} = import.meta.env;

const firebaseConfig = {
  apiKey: VITE_REACT_APP_FIREBASE_API_KEY,
  authDomain: VITE_REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: VITE_REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: VITE_REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: VITE_REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: VITE_REACT_APP_FIREBASE_APP_ID,
  measurementId: VITE_REACT_APP_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const firestore = getFirestore(app);
export const storage = getStorage(app);