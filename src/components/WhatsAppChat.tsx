import React from "react";
import { X } from "lucide-react";

interface Props {
  show: boolean;
  toggle: () => void;
}

const WhatsAppChat: React.FC<Props> = ({ show, toggle }) => {
  return (
    <div
      className={`
        fixed bottom-20 right-4
        bg-white shadow-lg rounded-lg w-80 p-4
        z-[1100] flex flex-col
        transition-transform duration-300
        ${show ? "translate-y-0 opacity-100 animate-bounce" : "translate-y-10 opacity-0 pointer-events-none"}
        sm:bottom-24 sm:right-6
      `}
    >
      <div className="flex justify-between items-center mb-3 bg-green-500 text-white px-3 py-2 rounded">
        <span>Chat de Ayuda</span>
        <button onClick={toggle}>
          <X size={20} />
        </button>
      </div>
      <div className="space-y-2">
        <button
          onClick={() =>
            window.open(
              "https://wa.me/51960334494?text=Hola, quiero hacer un pedido"
            )
          }
          className="w-full bg-green-100 p-2 rounded hover:bg-green-200"
        >
          🍽️ Hacer un pedido
        </button>
        <button
          onClick={() =>
            window.open(
              "https://wa.me/51960334494?text=Hola, tengo una consulta sobre el menú"
            )
          }
          className="w-full bg-green-100 p-2 rounded hover:bg-green-200"
        >
          📋 Consultar el menú
        </button>
        <button
          onClick={() =>
            window.open(
              "https://wa.me/51960334494?text=Hola, ¿cuál es el tiempo de delivery?"
            )
          }
          className="w-full bg-green-100 p-2 rounded hover:bg-green-200"
        >
          🚚 Tiempo de delivery
        </button>
      </div>
    </div>
  );
};

export default WhatsAppChat;
