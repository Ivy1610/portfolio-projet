// sert de server ws pr gérer les connexions en tmp réel & la diffusion des messages du chat
const express = require("express"); // framework pour créer un serveur HTTP
const http = require("http"); // Module node.js pour créer un serveur http
const WebSocket = require("ws"); // bibli pr gérer les connexions websocket

// init du server server http est créé avec Express
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const messages = []; // tbl pr stocker ts les messages du chat 
// ecoute des connexion ws
wss.on("connection", (ws) => {
  console.log("Nouvelle connexion WebSocket");

  // Envoyer les messages existants au nouveau client
  ws.send(JSON.stringify({ type: "INITIAL_MESSAGES", messages }));

  // Écouter les nouveaux messages
  ws.on("message", (message) => {
    console.log("Message reçu :", message);

    // Ajouter le message à la liste
    const parsedMessage = JSON.parse(message);
    messages.push(parsedMessage);

    // Diffuser le message à tous les clients connectés
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ type: "NEW_MESSAGE", message: parsedMessage }));
      }
    });
  });

  // Gérer la déconnexion
  ws.on("close", () => {
    console.log("Connexion WebSocket fermée");
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, "0.0.0.0", () => {
  console.log(`Serveur WebSocket en écoute sur le port ${PORT}`);
});