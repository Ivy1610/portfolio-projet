"use client";

import { useState, useEffect } from "react";
import { imagesArray } from "@/utils/imagesLink";
import Image from "next/image";
import { Navbar } from "../components/navbar";
import { Footer } from "../components/footer";
import  ContactForm  from "../components/ContactForm";

export default function Home() {
  const session = null;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? imagesArray.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === imagesArray.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
    <div className="container mx-auto p-4">
      {/* Carousel */}
      <h1><strong>Bienvenue sur notre plateforme d'évenements</strong></h1>
      <div className="relative w-full max-w-4xl mx-auto overflow-hidden">
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
        >
          ◀
        </button>

        <div className="flex transition-transform duration-500">
          {imagesArray.map((image, index) => (
            <div key={index} className={`w-full flex-shrink-0 ${index === currentIndex ? "block" : "hidden"}`}>
              <Image src={image} alt={`Slide ${index + 1}`} width={800} height={500} className="mx-auto" />
            </div>
          ))}
        </div>

        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
        >
          ▶
        </button>
      </div>

      {/* Section YOULIVEVENT */}
      <section className="mt-10 text-center">
        <h2 className="text-2xl font-bold">Qu'est-ce que YOULIVEVENT ?</h2>
        <p className="mt-4 text-lg">
          Découvrez YOULIVEVENT, une plateforme interactive révolutionnaire pour vos événements. Avec notre service,
          chaque participant peut partager en direct des vidéos et contenus qui seront projetés sur des écrans sur place,
          créant ainsi une expérience immersive et collective.
        </p>
        <p className="mt-4 text-lg">
          Nous compilons tous ces contenus pour former une capsule temporelle numérique, préservant vos souvenirs
          de manière innovante et durable. Grâce aux vidéos en direct, chaque participant contribue à l'événement
          en temps réel, qu'il soit présent ou non.
        </p>
      </section>
    </div>
    </>
  );
}


