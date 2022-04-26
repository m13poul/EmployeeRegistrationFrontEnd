import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// These could be written in a .env file, but in any case they are not supposed to secret.
const firebaseConfig = {
  apiKey: "AIzaSyAg_ECHv2Z0FqqoIUYDEohJnd_7dmFqfjY",
  authDomain: "employeesregistrydashboard.firebaseapp.com",
  projectId: "employeesregistrydashboard",
  storageBucket: "employeesregistrydashboard.appspot.com",
  messagingSenderId: "754382334005",
  appId: "1:754382334005:web:b7364ed09e7be54652697c",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
