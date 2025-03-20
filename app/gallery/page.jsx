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

  // Séparation des médias
  const specialVideo = galleryItems.find(item => item.category === 'special_video');
  const regularMedia = galleryItems.filter(item => item.category !== 'special_video');

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">📸 Galerie</h1>

      {/* Section vidéo spéciale */}
      {specialVideo && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-center mb-4">Vidéo Principale</h2>
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              src={`https://player.cloudinary.com/embed/?cloud_name=${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}&public_id=${specialVideo.public_id}&profile=youlive-1`}
              allowFullScreen
              className="rounded-lg shadow-xl w-full h-full"
            />
          </div>
        </div>
      )}

      {/* Galerie standard */}
      <h2 className="text-2xl font-bold text-center mb-4">Photos et Vidéos</h2>

      {loading && <p className="text-center text-gray-500">Chargement des images...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {regularMedia.length > 0 ? (
          regularMedia.map((item, index) => (
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
                <div className="relative" style={{ paddingTop: '56.25%' }}>
                  <iframe
                    className="absolute top-0 left-0 w-full h-full rounded-md"
                    src={`https://player.cloudinary.com/embed/?cloud_name=${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}&public_id=a1chebfnwpxkyskqquus&profile=youlive-1`}
                    title={`Gallery video ${index + 1}`}
                    allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              )}
            </div>
          ))
        ) : (
          !loading && <p className="text-gray-500 text-center col-span-3">Aucune photo ou vidéo disponible.</p>
        )}
      </div>

      <GalleryManage />
    </div>
  );
}
