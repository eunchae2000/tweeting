import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCceKUGK-Uxqy8-3wrzGVlnAqQ6Rxt7COY",
  authDomain: "tweeting-a049a.firebaseapp.com",
  projectId: "tweeting-a049a",
  storageBucket: "tweeting-a049a.appspot.com",
  messagingSenderId: "735718141337",
  appId: "1:735718141337:web:839ff962301007c8843708",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const storage = getStorage(app);

export const db = getFirestore(app);
