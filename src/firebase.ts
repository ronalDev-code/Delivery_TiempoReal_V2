// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getMessaging } from "firebase/messaging";

// Configuración de tu proyecto Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD_KCLXMc5QZOW5jMkXW7i0FEZ_t_gugN4",
  authDomain: "entremaderasapp.firebaseapp.com",
  projectId: "entremaderasapp",
  storageBucket: "entremaderasapp.firebasestorage.app",
  messagingSenderId: "844027289532",
  appId: "1:844027289532:web:239653c448593ecab715b9"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Firestore
export const db = getFirestore(app);

// Firebase Cloud Messaging
export const messaging = getMessaging(app);

export { app };
