"use client";

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const Gallery = () => {
    const [galleryItems, setGalleryItems] = useState([]);

  useEffect(() => {
    // Simuler une récupération de données (API ou MongoDB)
    const fetchGallery = async () => {
      const response = await fetch("/api/gallery"); // API fictive pour les images/vidéos
      const data = await response.json();
      setGalleryItems(data);
    };

    fetchGallery();
  }, []);

  return (
    <div>
      {/* Header */}
      <header className="bg-purple-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Galerie</h1>
        <nav>
          <ul className="hidden md:flex space-x-4">
            <li><Link href="/">Accueil</Link></li>
            <li><Link href="/events">Événements</Link></li>
            <li><Link href="/gallery">Galerie</Link></li>
            <li><Link href="/services">Prestations</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </nav>
        {/* Menu mobile */}
        <div className="md:hidden">
          <ion-icon name="menu-outline" size="large"></ion-icon>
        </div>
      </header>

      {/* Contenu */}
      <main className="container mx-auto p-6">
        <h2 className="text-xl font-bold mb-4">Photos et Vidéos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {galleryItems.length > 0 ? (
            galleryItems.map((item, index) => (
              <div key={index} className="border p-2 rounded-md shadow-lg">
                {item.type === "image" ? (
                  <Image
                    src={item.url}
                    alt={`Gallery item ${index + 1}`}
                    width={300}
                    height={200}
                    className="rounded-md"
                  />
                ) : (
                  <iframe
                    className="w-full h-40"
                    src={item.url}
                    title={`Gallery video ${index + 1}`}
                    allowFullScreen
                  ></iframe>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-600">Aucune photo ou vidéo disponible pour le moment.</p>
          )}
        </div>
      </main>

      {/* Scripts pour les icônes */}
      <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
      <script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
    </div>
  );
}

export default Gallery
