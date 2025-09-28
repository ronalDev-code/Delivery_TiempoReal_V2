// functions/index.js
const { setGlobalOptions } = require("firebase-functions");
const { onRequest } = require("firebase-functions/https");
const logger = require("firebase-functions/logger");

// Limitar máximo de instancias por función (opcional)
setGlobalOptions({ maxInstances: 10 });

// Ejemplo de función HTTP
exports.helloWorld = onRequest((request, response) => {
  logger.info("Hello logs!", { structuredData: true });
  response.send("Hello from Firebase!");
});

// Aquí puedes agregar tus funciones de notificaciones push más adelante
// Por ejemplo, podrías usar admin.messaging() si agregas Firebase Admin SDK
