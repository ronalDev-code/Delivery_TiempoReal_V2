import React from "react";
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="relative bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 bg-[length:200%_200%] animate-gradient-x text-white py-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
        <p className="text-sm mb-4 md:mb-0 drop-shadow-lg">
          &copy; {new Date().getFullYear()} Entre Maderas. Todos los derechos reservados.
        </p>

        <div className="flex gap-6">
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="transform transition-transform duration-300 hover:scale-125 hover:text-blue-500"
          >
            <FaFacebookF size={24} />
          </a>
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="transform transition-transform duration-300 hover:scale-125 hover:text-pink-500"
          >
            <FaInstagram size={24} />
          </a>
          <a
            href="https://www.tiktok.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="transform transition-transform duration-300 hover:scale-125 hover:text-black"
          >
            <FaTiktok size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
