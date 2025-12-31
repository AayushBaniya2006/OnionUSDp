// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration - hardcoded for demo/portfolio deployment
// Note: Firebase API keys are safe to expose in frontend code
// Security is enforced through Firebase Security Rules
const firebaseConfig = {
  apiKey: "AIzaSyDzpvYS7rFTcYix8qqgqTcxyrj6f6DoTLg",
  authDomain: "oniondao-45e02.firebaseapp.com",
  projectId: "oniondao-45e02",
  storageBucket: "oniondao-45e02.firebasestorage.app",
  messagingSenderId: "292074727636",
  appId: "1:292074727636:web:48fbb0a68572c0903d7341"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;
