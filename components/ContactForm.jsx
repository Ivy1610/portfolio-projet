"use client";

import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setResponse({ success: false, message: "❌ Veuillez remplir tous les champs." });
      return;
    }

    setLoading(true);
    setResponse(null);

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setResponse({ success: true, message: "✅ Message envoyé avec succès !" });
        setFormData({ name: "", email: "", message: "" });
      } else {
        setResponse({ success: false, message: "❌ Une erreur est survenue lors de l'envoi." });
      }
    } catch (error) {
      console.error("Erreur:", error);
      setResponse({ success: false, message: "❌ Une erreur s'est produite, veuillez réessayer." });
    }

    setLoading(false);
  };

  return (
    <section className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Contactez-nous</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Nom */}
        <div>
          <label htmlFor="name" className="block text-gray-700 font-semibold">Nom Prénom :</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-gray-700 font-semibold">Email :</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-gray-700 font-semibold">Message :</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows="4"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Bouton d'envoi avec animation */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full text-white py-3 rounded-lg flex items-center justify-center transition ${
            loading ? "bg-[#9C27B0] cursor-not-allowed" : "bg-[#AB47BC] hover:bg-[#BA68C8]"
          }`}
        >
          {loading ? (
            <>
              <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
              </svg>
              Envoi en cours...
            </>
          ) : (
            "Envoyer"
          )}
        </button>

        {/* Message de réponse */}
        {response && (
          <p className={`text-center mt-4 font-semibold ${response.success ? "text-green-600" : "text-red-600"}`}>
            {response.message}
          </p>
        )}
      </form>
    </section>
  );
}
