"use client"
import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { useUser } from "@/app/context/UserContext";
import { Libre_Baskerville } from 'next/font/google';

export default function EventsPage() {
  const { user } = useUser();
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const router = useRouter();
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        console.log("👤 userId utilisé :", user?.id); // ✅ Vérifier si user.id est bien défini
        if (!user?.id) return;

        const response = await fetch(`/api/events?userId=${user.id}`);
        const data = await response.json();

        console.log("📌 Événements récupérés :", data); // ✅ Vérifier la réponse de l'API
        if (!response.ok) throw new Error('Erreur lors de la récupération des événements');

        setEvents(data);
      } catch (error) {
        console.error("❌ Erreur lors de la récupération des événements :", error);
        setError('Erreur de connexion au serveur');
      }
    };

    fetchEvents();
  }, [user]);

  const handleAccess = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const password = formData.get("password");
    
    try {
      const response = await fetch(`/api/events/${selectedEvent}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
       },
       body: JSON.stringify({ password }),
     });

    if (response.ok) {
      router.push(`/events/${selectedEvent}`);
    } else {
      setError("Mot de passe incorrect");
    }
  } catch (error) {
    console.error("Erreur lors de la connexion à l'événement:", error);
    setError("Erreur de connexion au serveur");
  }
};

return (
  <div className="container mx-auto p-4 flex-grow">
    <h2 className="text-center text-3xl font-bold mb-6">Événements en cours...</h2>

    {/* Bouton de création d'événement */}
    <div className="mb-8">
      <button
        onClick={() => router.push("/create-event")}
        className="w-full bg-purple-700 text-white p-2 rounded-md hover:bg-purple-900 transition duration-300"
      >
        Créer un nouvel événement
      </button>
    </div>

    {/* Liste des événements */}
    {error && <div className="text-red-500 mb-4">{error}</div>}

    <div className="mb-8 bg-pink-150 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Evénements disponibles</h2>
      <ul className="space-y-3">
        {events.map((event) => (
          <li
            key={event._id}>
            <button
              onClick={() => setSelectedEvent(event._id)}
              className="w-full bg-purple-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300"
            >
              <h3 className="font-semibold">{event.name}</h3>
              <p className="text-sm">
                {new Date(event.date).toLocaleDateString('fr-FR')}
                {event.startTime} - {event.endTime}
              </p>
            </button>
          </li>
        ))}
      </ul>
    </div>

    {/* Formulaire d'accès à l'événement */}
    {selectedEvent && (
      <div className="bg-purple p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Accès à l'événement</h2>
        <form onSubmit={handleAccess} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Mot de passe :
            </label>
            <input
              type="password"
              name="password" // ✅ Ajout du "name"
              placeholder="Entrez le mot de passe de l\'événement"
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-700 text-white p-2 rounded-md hover:bg-purple-800"
          >
            Accéder à l'événement
          </button>
        </form>
      </div>
    )}
  </div>
);
};

