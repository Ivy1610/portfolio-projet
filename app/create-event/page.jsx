"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { connectToMongoose } from '@/lib/mongodb';

const CreateEvent = () => {
  const router = useRouter();
  const [eventDetails, setEventDetails] = useState({
    userId: '',
    password: '',
    date: '',
    startTime: '',
    endTime: '',
    numberOfGuests: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    

    try {
      // Connexion à MongoDB via Mongoose
      await connectToMongoose();

      // Envoyer les données à l'API pour créer l'événement
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventDetails),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Événement créé:', data);
        router.push('/events'); // Rediriger vers la page des événements
      } else {
        console.error('Erreur lors de la création de l\'événement');
      }
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  return (
    <div className="container mx-auto p-4 flex-grow">
      <h2 className="text-center text-3xl font-bold mb-6">Créer un nouvel événement</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            User ID:
          </label>
          <input
            type="text"
            name="userId"
            value={eventDetails.userId}
            onChange={handleChange}
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
            name="password"
            value={eventDetails.password}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Date de l'événement:
          </label>
          <input
            type="date"
            name="date"
            value={eventDetails.date}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Heure de début:
          </label>
          <input
            type="time"
            name="startTime"
            value={eventDetails.startTime}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Heure de fin:
          </label>
          <input
            type="time"
            name="endTime"
            value={eventDetails.endTime}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Nombre d'invités:
          </label>
          <input
            type="number"
            name="numberOfGuests"
            value={eventDetails.numberOfGuests}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition duration-300"
        >
          Créer l'événement
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;
