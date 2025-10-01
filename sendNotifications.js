// sendNotifications.js
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json"); // Tu JSON descargado

// Inicializa Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const messaging = admin.messaging(); // Cliente de mensajería

// Función para obtener todos los tokens de Firestore
const getAllTokens = async () => {
  const tokensSnapshot = await db.collection("tokens").get();
  const tokens = [];
  tokensSnapshot.forEach((doc) => {
    const token = doc.data().token;
    if (token) tokens.push(token);
  });
  return tokens;
};

// Función para enviar notificación a todos los tokens
const sendNotifications = async () => {
  try {
    const tokens = await getAllTokens();

    if (tokens.length === 0) {
      console.log("No hay tokens registrados.");
      return;
    }

    // Cada token se envía individualmente en la versión nueva
    const sendPromises = tokens.map((token) =>
      messaging.send({
        token: token,
        notification: {
          title: "📦 Nuevo Pedido",
          body: "Tienes un pedido nuevo en EntremaderasApp",
        },
      })
    );

    const responses = await Promise.allSettled(sendPromises);

    let successCount = 0;
    let failureCount = 0;

    responses.forEach((res, idx) => {
      if (res.status === "fulfilled") {
        successCount++;
      } else {
        failureCount++;
        console.error(`Error con token ${tokens[idx]}:`, res.reason);
      }
    });

    console.log(`✅ Notificaciones enviadas: ${successCount}`);
    console.log(`❌ Errores: ${failureCount}`);
  } catch (err) {
    console.error("Error enviando notificaciones:", err);
  }
};

// Ejecutar la función
sendNotifications();
