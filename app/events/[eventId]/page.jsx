"use client"; // Indique que ce composant est côté client
import { useParams } from "next/navigation"; // Pour récupérer l'ID de l'événement
import ChatComponent from "../../../components/chat"; // Composant de chat
import LiveStream from "../../../components/Livestream"; // Composant de streaming

const EventPage = () => {
  const params = useParams();
  const eventId = params.eventId; // Récupère l'ID de l'événement depuis l'URL

  // Simuler un utilisateur connecté
  const user = {
    id: "Ivy24",
    name: "Yveline",
  };

  return (
    <div className="container mx-auto p-4 flex-grow">
      <h2 className="text-center text-3xl font-bold mb-6">
        Événement {eventId}
      </h2>

      {/* Lecteur de streaming */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold mb-4">Live Streaming</h3>
        <LiveStream eventId={eventId} />
      </div>

      {/* Chat en temps réel */}
      <div className="mb-8 bg-gray-50 p-6 rounded-lg shadow-md">
        <h3 className="text-2xl font-bold mb-4">Chat en direct</h3>
        <ChatComponent user={user} eventId={eventId} />
      </div>
    </div>
  );
};

export default EventPage;