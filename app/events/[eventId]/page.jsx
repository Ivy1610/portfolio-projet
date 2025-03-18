"use client";
import { useState, useEffect } from "react";
import LoginForm from "../../../components/LoginForm";
import Chat from "../../../components/chat";
import LiveStream from "../../../components/Livestream";

export default function EventPage({ params }) {
  const { eventId } = params;
  const [username, setUsername] = useState(null);
  const [eventData, setEventData] = useState(null); 
  
  // Fonction pour gérer la connexion de l'utilisateur
  const handleLogin = (username) => {
    setUsername(username);
  };
  // Récupération des données de l'événement côté client
  useEffect(() => {
    async function fetchEventData() {
      try {
        const res = await fetch(`/api/events/${eventId}`);
        const data = await res.json();
        setEventData(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des données de l'événement :", error);
      }
    }

    fetchEventData();
  }, [eventId]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">
        Événement {eventId} {eventData ? `: ${eventData.name}` : ""}
      </h1>

      {/* Lecteur de streaming */}
      <div className="mb-8">
        <LiveStream eventId={eventId} />
      </div>

      {/* Chat en temps réel */}
      <div className="mb-8 bg-gray-50 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Chat en direct</h2>
        {username ? (
          <Chat username={username} />
        ) : (
          <LoginForm onLogin={handleLogin} />
        )}
      </div>
    </div>
  );
}