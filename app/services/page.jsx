"use client";
import React from "react";

export default function PrestationsPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Nos Prestations</h1>

      <h2 className="text-2xl font-semibold text-center mb-4">Ce que nous proposons</h2>

      <ul className="space-y-6 text-lg">
        <li className="bg-purple-400 p-4 rounded-lg shadow">
          <strong>📅 Organisation d'événements :</strong> Planification et gestion de vos événements.
        </li>

        <li className="bg-purple-400 p-4 rounded-lg shadow">
          <strong>🎥 Streaming en direct :</strong> Diffusion en temps réel avec interaction du chat
        </li>

        <li className="bg-purple-400 p-4 rounded-lg shadow">
          <strong>🕰️ Création de capsules temporelles numériques :</strong> Conservez les souvenirs de vos événements.
        </li>

        <li className="bg-purple-400 p-4 rounded-lg shadow">
          <strong>📸 Gestion de la galerie de photos et vidéos :</strong> Stockage et affichage multimédia.
        </li>
      </ul>
    </div>
  );
}
