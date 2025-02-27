"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import GalleryManage from "@/components/GalleryManage";

export default function GalleryPage() {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await fetch("/api/gallery");
        if (!response.ok) throw new Error("Erreur de chargement");
        const data = await response.json();
        setGalleryItems(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">📸 Galerie</h1>
      <h2 className="text-2xl font-bold text-center mb-4">Photos et Vidéos</h2>

      {/* Gestion du chargement et des erreurs */}
      {loading && <p className="text-center text-gray-500">Chargement des images...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Affichage de la galerie */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {galleryItems.length > 0 ? (
          galleryItems.map((item, index) => (
            <div key={index} className="border p-2 rounded-lg shadow-md bg-white">
              {item.type === "image" ? (
                <Image
                  src={item.url}
                  alt={`Gallery item ${index + 1}`}
                  width={400}
                  height={250}
                  className="rounded-md"
                  style={{ width: 'auto', height: 'auto' }}
                />
              ) : (
                <iframe
                  className="w-full h-52 rounded-md"
                  src={item.url}
                  title={`Gallery video ${index + 1}`}
                  allowFullScreen
                ></iframe>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-3">Aucune photo ou vidéo disponible.</p>
        )}
      </div>
      
      {/* Gestionaire de gallerie */}
      <GalleryManage />
      </div>
  );
}

