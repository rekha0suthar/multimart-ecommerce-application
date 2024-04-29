import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import  { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyApPYjPB9T9FLC3N0kRfN4QQ8v1DZgupuQ",
  authDomain: "multimart-dca31.firebaseapp.com",
  projectId: "multimart-dca31",
  storageBucket: "multimart-dca31.appspot.com",
  messagingSenderId: "109262057630",
  appId: "1:109262057630:web:82dcd378bd4b91ae570b8f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

export default app