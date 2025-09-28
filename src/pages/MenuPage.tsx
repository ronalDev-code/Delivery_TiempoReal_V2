import React from "react";
import { products } from "../data/products";

interface Props {
  selectedCategory: string;
  setSelectedCategory: (id: string) => void;
  addToCart: (product: any) => void;
}

const categories = [
  { id: "todos", name: "Todos", icon: "🍽️" },
  { id: "ceviches", name: "Ceviches", icon: "🐟" },
  { id: "tiraditos", name: "Tiraditos", icon: "🍣" },
  { id: "platos-calientes", name: "Platos Calientes", icon: "🍛" },
  { id: "bebidas", name: "Bebidas", icon: "🥤" },
];

const MenuPage: React.FC<Props> = ({ selectedCategory, setSelectedCategory, addToCart }) => {
  const filteredProducts =
    selectedCategory === "todos"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <div
      id="menu"
      className="p-10 rounded-xl"
      style={{
        backgroundImage: "url(/images/menu-bg1.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h2 className="text-3xl font-extrabold font-poppins mb-6 text-white drop-shadow-lg">
        Nuestro Menú
      </h2>

      <div className="flex gap-4 mb-6 flex-wrap">
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelectedCategory(c.id)}
            className={`px-4 py-2 rounded-full font-roboto font-medium transition-colors ${
              selectedCategory === c.id
                ? "bg-gradient-to-r from-yellow-400 to-pink-500 text-white shadow-lg"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            {c.icon} {c.name}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((p) => (
          <div
            key={p.id}
            className="bg-white/80 backdrop-blur-sm rounded-xl shadow p-4 flex flex-col justify-between"
          >
            <img
              src={p.image}
              alt={p.name}
              className="rounded-lg mb-4 w-full h-48 md:h-56 lg:h-64 object-cover"
            />
            <div className="flex-1">
              <h3 className="font-poppins font-bold text-lg">{p.name}</h3>
              <p className="text-gray-700 mt-1 font-roboto">{p.description}</p>
            </div>
            <div className="mt-4 flex flex-col gap-2">
              <p className="text-orange-600 font-bold text-lg font-roboto">
                S/ {p.price.toFixed(2)}
              </p>
              <button
                onClick={() => addToCart(p)}
                className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-4 py-2 rounded shadow hover:scale-105 transition-transform font-roboto"
              >
                Agregar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuPage;
