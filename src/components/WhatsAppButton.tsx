import React from "react";

interface Props {
  toggleChat: () => void;
}

const WhatsAppButton: React.FC<Props> = ({ toggleChat }) => (
  <button
    onClick={toggleChat}
    className="
      fixed bottom-4 right-4
      w-16 h-16 rounded-full shadow-lg
      bg-gradient-to-br from-green-400 to-green-600
      text-white text-2xl flex items-center justify-center
      animate-bounce
      hover:scale-110 transition-transform
      z-[1000]
      sm:bottom-6 sm:right-6
    "
  >
    🟢
  </button>
);

export default WhatsAppButton;
