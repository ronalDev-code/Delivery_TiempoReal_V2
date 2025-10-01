// public/firebase-messaging-sw.js

importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-messaging-compat.js');

// Configuración de Firebase
firebase.initializeApp({
  apiKey: "AIzaSyD_KCLXMc5QZOW5jMkXW7i0FEZ_t_gugN4",
  authDomain: "entremaderasapp.firebaseapp.com",
  projectId: "entremaderasapp",
  storageBucket: "entremaderasapp.firebasestorage.app",
  messagingSenderId: "844027289532",
  appId: "1:844027289532:web:239653c448593ecab715b9",
});

// Inicializar messaging
const messaging = firebase.messaging();

// Mensajes en segundo plano
messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Mensaje recibido en segundo plano ', payload);
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: '/images/icono.png' // Cambia por tu ícono si quieres
  });
});
