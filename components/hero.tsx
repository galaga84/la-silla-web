"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const slides = [
  { image: "/hero/carrusel-1.png", alt: "Visual 1 del sello" },
  { image: "/hero/carrusel-2.png", alt: "Visual 2 del sello" },
  { image: "/hero/carrusel-3.png", alt: "Visual 3 del sello" },
];

export function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const goToPrev = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  return (
    <section className="bg-white px-6 py-10 md:py-12">
      <div className="mx-auto max-w-7xl">
        <div className="relative h-[70vh] min-h-[420px] overflow-hidden rounded-2xl">
          {slides.map((slide, index) => (
            <div
              key={slide.image}
              className={`absolute inset-0 transition-opacity duration-700 ${
                index === current ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover"
              />
            </div>
          ))}

          <button
            type="button"
            onClick={goToPrev}
            aria-label="Imagen anterior"
            className="absolute left-4 top-1/2 z-10 -translate-y-1/2 text-7xl font-light leading-none text-white/45 transition hover:text-white/80"
          >
            ‹
          </button>

          <button
            type="button"
            onClick={goToNext}
            aria-label="Imagen siguiente"
            className="absolute right-4 top-1/2 z-10 -translate-y-1/2 text-7xl font-light leading-none text-white/45 transition hover:text-white/80"
          >
            ›
          </button>
        </div>

        <div className="flex justify-center py-4">
          <div className="flex items-center gap-3">
            {slides.map((slide, index) => (
              <button
                key={slide.image}
                type="button"
                aria-label={`Ir a la imagen ${index + 1}`}
                onClick={() => setCurrent(index)}
                className={`h-3 w-3 rounded-full border transition ${
                  index === current
                    ? "border-[#E8452C] bg-[#E8452C]"
                    : "border-zinc-300 bg-zinc-200 hover:bg-zinc-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}