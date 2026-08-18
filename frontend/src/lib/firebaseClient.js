import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, collection, doc, getDoc, setDoc, getDocs, updateDoc, addDoc } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword, signOut as fbSignOut, onAuthStateChanged } from 'firebase/auth';
import { getAnalytics, isSupported } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyBdBGI_1WrzBMHt1KOwmQ8y9LGp1cr7EP4',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'nanda-creative-porto.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'nanda-creative-porto',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'nanda-creative-porto.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '452503029447',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:452503029447:web:3c27fabd7f5bfc85f2a0e2',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || 'G-EJS1GEF7S2',
};

// Cek apakah API Key Firebase aktif
export const isFirebaseConfigured = Boolean(firebaseConfig.apiKey && firebaseConfig.projectId);

let app = null;
let db = null;
let auth = null;
let analytics = null;

try {
  app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  db = getFirestore(app);
  auth = getAuth(app);

  if (typeof window !== 'undefined') {
    isSupported().then((supported) => {
      if (supported) {
        analytics = getAnalytics(app);
      }
    }).catch(() => {});
  }

  console.log('🔥 [Firebase] Connected successfully to project:', firebaseConfig.projectId);
} catch (err) {
  console.warn('⚠️ [Firebase] Initialization error:', err);
}

export {
  app,
  db,
  auth,
  analytics,
  signInWithEmailAndPassword,
  fbSignOut,
  onAuthStateChanged,
  collection,
  doc,
  getDoc,
  setDoc,
  getDocs,
  updateDoc,
  addDoc,
};
