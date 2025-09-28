import React, { useState } from "react";

interface Props {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  getTotalItems: () => number;
}

const Header: React.FC<Props> = ({ currentPage, setCurrentPage, getTotalItems }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (page: string) => {
    setCurrentPage(page);
    setIsOpen(false); // Cierra el menú en mobile

    const element = document.getElementById(page);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header
      className="w-full p-4 flex justify-between items-center shadow-lg rounded-b-xl relative z-50"
      style={{
        backgroundImage: "linear-gradient(135deg, #4ade80 0%, #3b82f6 100%)",
      }}
    >
      <h1
        className="text-white font-extrabold text-2xl md:text-3xl font-poppins cursor-pointer"
        onClick={() => handleClick("home")}
      >
        Entre Maderas
      </h1>

      {/* Menú Desktop */}
      <nav className="hidden md:flex gap-4">
        {["home", "menu", "cart", "orders"].map((page) => (
          <button
            key={page}
            onClick={() => handleClick(page)}
            className={`px-3 py-1 rounded font-medium font-roboto transition ${
              currentPage === page
                ? "bg-white text-green-600"
                : "text-white hover:bg-white hover:text-green-600"
            }`}
          >
            {page === "cart"
              ? `Carrito (${getTotalItems()})`
              : page === "orders"
              ? "Pedidos"
              : page.charAt(0).toUpperCase() + page.slice(1)}
          </button>
        ))}
      </nav>

      {/* Botón hamburguesa Mobile */}
      <div className="md:hidden z-50">
        <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
          {isOpen ? (
            <span className="text-2xl font-bold font-poppins">✖</span>
          ) : (
            <span className="text-2xl font-bold font-poppins">☰</span>
          )}
        </button>
      </div>

      {/* Menú Mobile */}
      <div
        className={`absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 ${
          isOpen ? "translate-y-0 opacity-100" : "translate-y-[-10px] opacity-0 pointer-events-none"
        } md:hidden`}
      >
        {["home", "menu", "cart", "orders"].map((page) => (
          <button
            key={page}
            onClick={() => handleClick(page)}
            className="w-full text-left px-4 py-2 font-roboto hover:bg-gray-200 transition"
          >
            {page === "cart"
              ? `Carrito (${getTotalItems()})`
              : page === "orders"
              ? "Pedidos"
              : page.charAt(0).toUpperCase() + page.slice(1)}
          </button>
        ))}
      </div>
    </header>
  );
};

export default Header;
