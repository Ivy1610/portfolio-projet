"use client";

import { useState, useEffect } from "react";
import { imagesArray } from "@/utils/imagesLink";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleSlides = 4; // Nombre d'images affichées simultanément

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Défilement automatique toutes les 5 secondes
    return () => clearInterval(interval);
  }, [currentIndex]);

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? imagesArray.length - visibleSlides : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev >= imagesArray.length - visibleSlides ? 0 : prev + 1
    );
  };

  return (
    <>
      <div className="container mx-auto p-4">
        {/* Carousel */}
        <h1 className="text-center text-3xl font-bold mb-6">
          Bienvenue sur notre plateforme d'événements
        </h1>
        <div className="relative w-full max-w-5xl mx-auto overflow-hidden">
          {/* Bouton Précédent */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full z-10"
          >
            ◀
          </button>

          {/* Images du carousel */}
          <div className="flex transition-transform duration-500 overflow-hidden">
            {imagesArray
              .slice(currentIndex, currentIndex + visibleSlides)
              .map((image, index) => (
                <div key={index} className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-2">
                  <Image
                    src={image}
                    alt={`Slide ${index + 1}`}
                    width={300}
                    height={200}
                    className="rounded-lg"
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,..."
                  />
                </div>
              ))}
          </div>

          {/* Bouton Suivant */}
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full z-10"
          >
            ▶
          </button>
        </div>

        {/* Indicateurs de position */}
        <div className="flex justify-center mt-4 space-x-2">
          {Array.from({ length: imagesArray.length - visibleSlides + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full ${currentIndex === index ? "bg-gray-800" : "bg-gray-400"
                }`}
            />
          ))}
        </div>

        {/* Section YOULIVEVENT */}
        <section className="mt-10 text-center">
          <h2 className="text-2xl font-bold">Qu'est-ce que YOULIVEVENT ?</h2>
          <div className="mt-4 text-lg">
            <p className="mt-4 text-lg">
              Découvrez YOULIVEVENT, une plateforme interactive révolutionnaire pour vos événements.
              Grâce à notre service, chaque participant peut partager en direct des vidéos et des contenus,
              créant ainsi une expérience immersive et collective.
            </p>
            <br />
            <p className="mt-4 text-lg">
              Que vous soyez sur place ou à distance, participez à l'événement en temps réel
              et partagez vos souvenirs avec les autres. <strong>YOULIVEVENT</strong> est une solution innovante
              pour capturer des moments uniques lors de vos événements.
            </p>
            <br />
            <p className="mt-4 text-lg">
              Nous rassemblons tous ces contenus pour créer une capsule temporelle numérique,
              préservant vos souvenirs de manière innovante et durable. Les vidéos en direct permettent à chaque
              participant de contribuer à l'événement en temps réel, qu'il soit présent ou non.
            </p>
            <div>
              <p className="mt-4 text-lg">
                <strong>YOULIVEVENT</strong>
                est la solution idéale pour immortaliser vos événements,
                qu'ils soient professionnels ou personnels
              </p>
              <br />
              <p className="mt-4 text-lg">
                En compilant tous les contenus partagés,
                nous formons une capsule temporelle numérique qui préserve vos souvenirs de manière
                innovante et durable. Grâce aux vidéos en direct, chaque participant peut s'impliquer activement,
                même à distance.
              </p>
            </div>
          </div>
        </section>

        {/* Barre de redirection vers la page de contact */}
        <div className="mt-10 text-center">
          <p className="text-lg">
            Vous souhaitez en savoir plus sur nos services
            ou nous contacter pour une demande spécifique ?
          </p>
          <br />
          <Link
            href="/contact"
            className="inline-block bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
          >
            Contactez-nous
          </Link>
        </div>
      </div>
    </>
  );
}

