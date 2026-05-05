import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDaLFoSzmQfVnFoezBYHRnw8H1saFEb-dA",
  authDomain: "money-dashboard-fc654.firebaseapp.com",
  projectId: "money-dashboard-fc654",
  storageBucket: "money-dashboard-fc654.firebasestorage.app",
  messagingSenderId: "431861096929",
  appId: "1:431861096929:web:77e8df643df2df2be272a0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firestore
export const db = getFirestore(app);