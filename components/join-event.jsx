"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';


const JoinEvent = () => {
  const router = useRouter();
  const [eventId, setEventId] = useState('');
  const [guestId, setGuestId] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/events/${eventId}/route`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ guestId, password }),
      });

      if (response.ok) {
        router.push(`/events/${eventId}`); // Rediriger vers la page de l'événement
      } else {
        const data = await response.json();
        console.error(data.message);
      }
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  return (
    <div className="container mx-auto p-4 flex-grow">
      <h2 className="text-center text-3xl font-bold mb-6">Rejoindre un événement</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            ID de l'événement:
          </label>
          <input
            type="text"
            value={eventId}
            onChange={(e) => setEventId(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Guest ID:
          </label>
          <input
            type="text"
            value={guestId}
            onChange={(e) => setGuestId(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Mot de passe:
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Rejoindre l'événement
        </button>
      </form>
    </div>
  );
};

export default JoinEvent;
