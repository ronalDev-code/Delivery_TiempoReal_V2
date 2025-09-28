import React, { useState, useEffect } from "react";

interface Props {
  setCurrentPage: (page: string) => void;
}

const images = [
  "/images/ceviche-clasico.jpg",
  "/images/leche-tigre.jpg",
  "/images/menu-bg3.jpg",
];

const HomePage: React.FC<Props> = ({ setCurrentPage }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Cambiar imagen cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div id="home" className="relative h-[500px] w-full overflow-hidden">
      {/* Imagen de fondo */}
      {images.map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`Fondo ${index}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* Capa negra para contraste */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Contenido */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center z-10 text-white px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold font-poppins mb-4 drop-shadow-lg">
          Bienvenido a Entre Maderas
        </h1>
        <p className="mb-6 text-lg md:text-xl font-roboto drop-shadow-md">
          Disfruta de los mejores sabores del mar peruano 🐟🦐
        </p>
        <button
          onClick={() => setCurrentPage("menu")}
          className="bg-orange-500 hover:bg-orange-600 transition px-6 py-3 rounded-lg shadow-lg font-roboto font-medium"
        >
          Ver Menú
        </button>
      </div>

      {/* Dots / indicadores del carrusel */}
      <div className="absolute bottom-6 flex gap-2 z-20">
        {images.map((_, index) => (
          <span
            key={index}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentIndex ? "bg-white" : "bg-white/50"
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
