"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from "jwt-decode";

export default function CreateEvent() {
  const [ userId, setUserId] = useState(null);
  const router = useRouter();

  const [form, setForm] = useState({
    name: '',
    password: '',
    date: '',
    startTime: '09:00',
    endTime: '10:00',
    numberOfGuests: 1
  });

  const [error, setError] = useState({});

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserId(decoded.userId); // Extraction de userId du token
      } catch (error) {
        console.error("Erreur lors de la lecture du token:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
      }
    }
  }, []);
  
  const validateEventTime = () => {
    const start = new Date(`${form.date}T${form.startTime}`);
    const end = new Date(`${form.date}T${form.endTime}`);
    return start < end;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      console.error("Erreur: utilisateur non connecté");
      return;
    }

    const eventDate = new Date(form.date);
    if (eventDate < new Date()) {
      console.error("Erreur: La date doit être ultérieure à aujourd\'hui");
      return;
    }

    try {
      // Envoyer les données à l'API pour créer l'événement
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...form,
          userId
        })
      });

      const data = await response.json();
      if (response.ok) {
      console.log('Événement créé:', data);
        router.push('/events'); // Rediriger vers la page des événements

        setTimeout(() => {
          window.location.reload();
        }, 500);
      } else {
        console.error('Erreur lors de la création de l\'événement:', data);
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
            Name:
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
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
            value={form.password}
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
            value={form.date}
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
            value={form.startTime}
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
            value={form.endTime}
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
            value={form.numberOfGuests}
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
