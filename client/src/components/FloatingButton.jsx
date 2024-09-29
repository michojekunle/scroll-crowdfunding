import React, { useState } from "react";
import { scrollLogo, alchemyLogo } from "../assets";
import "../floating-button.css";

const FloatingButton = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="fixed bottom-8 right-8 flex flex-col items-center">
      <div
        className="relative flex items-center justify-center w-14 h-14 bg-slate-500 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-110"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Alchemy Logo */}
        <img
          src={alchemyLogo}
          alt="Alchemy"
          className={`w-6 h-6 rounded-xl absolute left-2 duration-500 ${
            hovered ? "animate-bounce" : ""
          }`}
        />
        {/* Scroll Logo */}
        <img
          src={scrollLogo}
          alt="Scroll"
          className={`w-6 h-6 rounded-xl absolute right-2 duration-500 ${
            hovered ? "animate-spin-slow" : ""
          }`}
        />

        {/* Tooltip */}
        {hovered && (
          <div className="absolute bottom-16 sm:bottom-20 right-0 w-max px-3 py-2 text-[11px] sm:text-sm text-white bg-gray-900 rounded-md shadow-lg">
            Powered by Alchemy X Scroll for the Level Up Mini Hack
          </div>
        )}
      </div>
    </div>
  );
};

export default FloatingButton;
