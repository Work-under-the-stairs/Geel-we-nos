import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBcJlpFyN49qzzbKn28gbUR0H_TKE7P1Zk",
  authDomain: "geelwnos.firebaseapp.com",
  projectId: "geelwnos",
  storageBucket: "geelwnos.firebasestorage.app",
  messagingSenderId: "648922560312",
  appId: "1:648922560312:web:5fe73a60fb02c1829973cd",
  measurementId: "G-KS5607478F"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);