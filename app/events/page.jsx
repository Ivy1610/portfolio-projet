"use client"
import React, { useState } from 'react';

const Event = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Données des événements (à remplacer par vos données réelles)
  const events = [
    { id: 2024, name: 'DEMODAY C24', password: 'secret123' },
    { id: 2, name: 'Événement 2', password: 'event2024' },
    { id: 3, name: 'Événement 3', password: 'pass2025' },
  ];

  const handleEventClick = (eventId) => {
    setSelectedEvent(eventId);
  }


  const handleAccessSubmit = (e) => {
    e.preventDefault();
    const password = e.target.password.value; // Récupérer le mot de passe
    console.log('Accès à l\'événement:', { eventId: selectedEvent, password });
    // Logique pour accéder à l'événement
    alert(`Accès à l'événement ${selectedEvent} demandé`);
  };

  return (
    <div className="container mx-auto p-4 flex-grow">
      <h2 className="text-center text-3xl font-bold mb-6">Événements en cours</h2>

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