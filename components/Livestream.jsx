"use client"; // Indique que ce composant est côté client
import { useEffect, useState } from "react";
import { StreamVideoClient, StreamVideo } from "@stream-io/video-react-sdk";
import { useCallState } from "@stream-io/video-react-sdk";

const LiveStream = ({ eventId }) => {
  const [videoClient, setVideoClient] = useState(null);
  const [call, setCall] = useState(null);
  const [error, setError] = useState(null); // Pour gérer les erreurs

  useEffect(() => {
    const initStream = async () => {
      try {
        // Récupérer le token côté serveur
        const response = await fetch(`/api/video-token?userId=Ivy24`);
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération du token");
        }
        const { token } = await response.json();

        // Initialiser le client Stream Video
        const client = new StreamVideoClient({
          apiKey: "n3esdddgvfpz", // Votre API Key
          user: {
            id: "Ivy24",
            name: "Yveline",
          },
          token, // Token généré côté serveur
        });

        // Rejoindre le canal de streaming
        const call = client.call("livestream", eventId);
        await call.join({ create: true });

        setVideoClient(client);
        setCall(call);
      } catch (err) {
        console.error("Erreur lors de l'initialisation du streaming :", err);
        setError("Impossible de charger le streaming. Veuillez réessayer.");
      }
    };

    initStream();

    // Nettoyer à la destruction du composant
    return () => {
      if (call) {
        call.leave().catch((err) => {
          console.error("Erreur lors de la déconnexion :", err);
        });
      }
      if (videoClient) {
        videoClient.disconnectUser();
      }
    };
  }, [eventId]);

  if (error) {
    return <div className="text-red-500">{error}</div>; // Afficher l'erreur
  }

  if (!videoClient || !call) {
    return <div>Chargement du streaming...</div>; // État de chargement
  }

  return (
    <StreamVideo client={videoClient}>
      <div className="bg-black aspect-video rounded-lg overflow-hidden">
        {/* Utiliser un composant dédié pour afficher le flux vidéo */}
        <LiveVideo call={call} />
      </div>
    </StreamVideo>
  );
};

// Composant pour afficher le flux vidéo
const LiveVideo = ({ call }) => {
  const { useCallState } = require("@stream-io/video-react-sdk");
  const { camera } = useCallState(call);

  if (!camera) {
    return <div>En attente du flux vidéo...</div>;
  }

  return (
    <video
      controls
      autoPlay
      src={camera.url} // URL du flux vidéo
      className="w-full h-full"
    />
  );
};

export default LiveStream;