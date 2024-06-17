import React, { useState, useEffect } from "react";

const defaultImages = [
  "https://codeswear.nyc3.cdn.digitaloceanspaces.com/constants/landing/squarebanner/2.webp",
  "https://codeswear.nyc3.cdn.digitaloceanspaces.com/constants/landing/squarebanner/1.webp",
];

const lgImages = [
  "https://codeswear.nyc3.cdn.digitaloceanspaces.com/constants/landing/banner/2.webp",
  "https://codeswear.nyc3.cdn.digitaloceanspaces.com/constants/landing/banner/1.webp",
];

const Carousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState(() => {
    return window.innerWidth >= 770 ? lgImages : defaultImages;
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 770) {
        setImages(lgImages);
      } else {
        setImages(defaultImages);
      }
    };

    handleResize();    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); 

    return () => clearInterval(interval);
  }, [images]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="relative w-full max-w-[97vw] mx-auto">
      <div className="overflow-hidden relative">
        <div
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Slide ${index}`}
              className="w-full"
            />
          ))}
        </div>
      </div>

      <button
        onClick={goToPrevious}
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-3xl text-white p-2 rounded-full z-10 lg:hover:bg-gray-100 lg:hover:text-black"
      >
        &#10094;
      </button>
      <button
        onClick={goToNext}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-3xl text-white p-2 rounded-full z-10 lg:hover:bg-gray-100 lg:hover:text-black"
      >
        &#10095;
      </button>
      <div className="absolute left-1/2 bottom-10 transform -translate-x-1/2 z-10">
        <button className="bg-white hover:bg-gray-200 text-black font-bold py-2 px-6 md:py-2 md:px-8 rounded-xl text-base md:text-lg xl:text-2xl shadow-lg">
          Shop Now
        </button>
      </div>
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentIndex === index ? "w-3 h-3 bg-white" : "bg-gray-400"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
