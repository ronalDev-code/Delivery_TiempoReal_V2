import React, { useState, useEffect } from "react";

const images = [
  "/images/ceviche-clasico.jpg",
  "/images/ceviche-mixto.jpg",
  "/images/tiradito.jpg",
];

const HeaderCarousel: React.FC = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000); // cambia cada 3 segundos
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-64 md:h-96 relative overflow-hidden rounded-b-xl">
      {images.map((src, idx) => (
        <img
          key={idx}
          src={src}
          alt={`banner-${idx}`}
          className={`w-full h-64 md:h-96 object-cover absolute top-0 left-0 transition-opacity duration-1000 ${
            idx === current ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-white text-3xl md:text-5xl font-bold mb-2">
          Bienvenido a Entre Maderas
        </h1>
        <p className="text-white text-lg md:text-2xl mb-4">
          Disfruta de los mejores sabores del mar peruano 🐟🦐
        </p>
      </div>
    </div>
  );
};

export default HeaderCarousel;
