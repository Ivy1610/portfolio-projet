"use client"
import React, { useState } from 'react';
import { useRouter } from "next/navigation";

const Event = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const router = useRouter();
  const [error, setError] = useState(null);

  // Données des événements (à remplacer par vos données réelles)
  const events = [
    { id: 2024, name: 'DEMODAY C24', date: "20 Mars", password: 'secret123' },
    { id: 2, name: 'Événement 2', password: 'event2024' },
    { id: 3, name: 'Concert Live', password: 'pass2025' },
  ];

  const handleEventClick = (eventId) => {
    console.log("Événement sélectionné :", eventId); // Affiche l'ID de l'événement
    setSelectedEvent(eventId);
  };


  const handleAccessSubmit = (e) => {
    e.preventDefault();
    const password = e.target.password.value;
    const event = events.find((ev) => ev.id === selectedEvent);
  
    console.log("Événement sélectionné :", selectedEvent); // Affiche l'ID de l'événement
    console.log("Événement trouvé :", event); // Affiche l'événement trouvé
    console.log("Mot de passe saisi :", password); // Affiche le mot de passe saisi
  
    if (event && event.password === password) {
      console.log("Mot de passe correct. Redirection en cours...");
      router.push(`/events/${selectedEvent}`); // Rediriger vers la page de l'événement
    } else {
      setError("Mot de passe incorrect");
    }
  };

  return (
    <div className="container mx-auto p-4 flex-grow">
      <h2 className="text-center text-3xl font-bold mb-6">Événements en cours</h2>

      {/* Bouton de création d'événement */}
      <div className="mb-8">
        <button
          onClick={handleCreateEvent}
          className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition duration-300"
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
          name="password" // ✅ Ajout du "name"
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
    </div>
  );
};

export default Event;