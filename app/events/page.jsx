"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";

const Event = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const router = useRouter();
  const [error, setError] = useState(null);

  // Evenements statiques
const staticEvents = [
    { id: 2024, name: 'DEMODAY C24', date: "20 Mars", password: 'secret123' },
    { id: 2, name: 'Événement 2', password: 'event2024' },
    { id: 3, name: 'Concert Live', password: 'pass2025' },
  ];

  // Initialise les evenements statiques
  const [events, setEvents] = useState(staticEvents);

  const fetchEvents = async () => {
    try{
      const response = await fetch("/api/events");
      if (!response.ok) throw new Error("Erreur lors de la recuperation des evenements.");
      const data = await response.json();

      console.log("Evénements récupérés depuis l'API:", data.events);
      
      // Fusionner les evenements statiques et ceux de la base de donnees
      setEvents([...staticEvents, ...data.events]); 
    } catch (err) {
      console.error(err);
      setError("Imposible de charger les événements.");
    }
  };

  // Charger les événements au montage du composant
  useEffect(() => {
    fetchEvents();
  }, []);

  const handleEventClick = (eventId) => {
    console.log("Événement sélectionné :", eventId);
    setSelectedEvent(eventId);
  };

  const handleAccessSubmit = (e) => {
    e.preventDefault();
    const password = e.target.password.value;
    const event = events.find((ev) => ev.id === selectedEvent);

    console.log("Événement sélectionné :", selectedEvent);
    console.log("Événement trouvé :", event);
    console.log("Mot de passe saisi :", password);

    if (event && event.password === password) {
      console.log("Mot de passe correct. Redirection en cours...");
      router.push(`/events/${selectedEvent}`);
    } else {
      setError("Mot de passe incorrect");
    }
  };

  // Definir la fonction pour créer un événement
   const handleCreateEvent = () => {
    console.log("Créer un nouvel événement");
    router.push("/create-event");
  };

  return (
    <div className="container mx-auto p-4 flex-grow">
      <h2 className="text-center text-3xl font-bold mb-6">Événements en cours</h2>

      {/* Bouton de création d'événement */}
      <div className="mb-8">
        <button
          onClick={handleCreateEvent}
          className="w-full bg-purple-900 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Créer un nouvel événement
        </button>
      </div> 

      {/* Liste des événements */}
      <div className="mb-8 bg-pink-150 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Choisissez un événement</h2>
        <ul className="space-y-3">
          {events.map((event) => (
            <li key={event.id}>
              <button
                onClick={() => handleEventClick(event.id)}
                className="w-full bg-purple-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300"
              >
                {event.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {selectedEvent && (
        <div className="bg-purple p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Accès à l'événement</h2>
          <form onSubmit={handleAccessSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-black-700">
                Identifiant:
              </label>
              <input
                type="text"
                name="identifier"
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Mot de passe :
              </label>
              <input
                type="password"
                name="password"
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-purple-700 text-white p-2 rounded-md hover:bg-purple-800 transition duration-300"
            >
              Accéder à l'événement
            </button>
          </form>
        </div>
      )}

      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
    </div>
  );
};

export default Event;