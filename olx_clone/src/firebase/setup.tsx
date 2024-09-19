
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth'
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBeb2Ry3BmACtrEc6nWjIJ35wiEKzeEFEQ",
  authDomain: "olx-project-a1066.firebaseapp.com",
  projectId: "olx-project-a1066",
  storageBucket: "olx-project-a1066.appspot.com",
  messagingSenderId: "438807352000",
  appId: "1:438807352000:web:bd2e3fe82c88efd270d325"
};


const app = initializeApp(firebaseConfig);
try {
  const app = initializeApp(firebaseConfig);
  console.log("Firebase Initialized");
} catch (error) {
  console.error("Firebase initialization error:", error);
}
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
export const db = getFirestore(app);
export const storage = getStorage(app);