import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDyO2kH2uRoDKXyG7d_5PlVkGQxxr5Y4dQ",
  authDomain: "reelflix-movies-d6927.firebaseapp.com",
  projectId: "reelflix-movies-d6927",
  storageBucket: "reelflix-movies-d6927.appspot.com",
  messagingSenderId: "914837518717",
  appId: "1:914837518717:web:747b26ce8a980c5a537414",
  measurementId: "G-HYJMHQX9YM"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Export Firebase Auth & Google provider
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export default app;
