"use client";
import { useEffect, useState, useRef } from "react";

const Chat = ({ username }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const ws = useRef(null);

  useEffect(() => {
    // Se connecter au serveur WebSocket
    ws.current = new WebSocket("ws://localhost:4000");

    ws.current.onopen = () => {
      console.log("Connecté au serveur WebSocket");
    };

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "INITIAL_MESSAGES") {
        setMessages(data.messages);
      } else if (data.type === "NEW_MESSAGE") {
        setMessages((prev) => [...prev, data.message]);
      }
    };

    ws.current.onclose = () => {
      console.log("Déconnecté du serveur WebSocket");
    };

    // Nettoyer à la destruction du composant
    return () => {
      if (ws.current) ws.current.close();
    };
  }, []);

  const sendMessage = () => {
    if (ws.current && newMessage.trim() !== "") {
      const message = {
        username, // Utilisez le nom de l'utilisateur
        text: newMessage,
        timestamp: new Date().toISOString(),
      };

      ws.current.send(JSON.stringify(message));
      setNewMessage("");
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.username === username ? "user" : ""}`}
          >
            <strong>{msg.username}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Écris un message..."
        />
        <button onClick={sendMessage}>Envoyer</button>
      </div>
    </div>
  );
};

export default Chat;