const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const messages = [];

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
server.listen(PORT, () => {
  console.log(`Serveur WebSocket en écoute sur le port ${PORT}`);
});
