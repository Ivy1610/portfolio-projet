"use client";

import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prevState) => {
      const newState = { ...prevState, [e.target.name]: e.target.value };
      console.log("Nouveau formData:", newState);
      return newState;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      alert("Veuillez remplir tous les champs");
      return;
    }

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Message envoyé !");
        setFormData({ name: "", email: "", message: "" });
      } else {
        console.log("Données envoyées:", formData);
        alert("Une erreur est survenue, lors de l'envoie du message. !");
      }
    } catch (error) {
      console.error("Erreur:", error);
      alert("Une erreur est survenue, lors de l'envoie du message. !");
    }
  };

  return (
    <section className="mt-10 p-4 bg-gray-100 rounded-lg container mx-auto">
      <h2 className="text-2xl font-bold text-center">Formulaire de Contact</h2>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label htmlFor="name" className="block text-gray-700 font-semibold">
            Nom Prénom :
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-gray-700 font-semibold">
            Email :
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-gray-700 font-semibold">
            Message :
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Envoyer
        </button>
      </form>
    </section>
  );
}
