import React, { useState, useEffect, ReactNode } from "react";

interface Props {
  images: string[];
  children: ReactNode;
  interval?: number;
}

const SectionBackground: React.FC<Props> = ({ images, children, interval = 5000 }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

  return (
    <div className="relative w-full h-full">
      {images.map((img, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${img})`, backgroundSize: "cover", backgroundPosition: "center" }}
        />
      ))}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default SectionBackground;
