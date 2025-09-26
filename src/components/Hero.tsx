import React, { useState, useEffect } from 'react';
const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Start with Ferrari image (now index 0)

  const images = [
    {
      url: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&auto=format&fit=crop&w=2670&q=80",
      alt: "Ferrari red supercar"
    },
    {
      url: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80",
      alt: "Luxury supercars at LAMB Auto dealership"
    },
    {
      url: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=2670&q=80",
      alt: "Premium Porsche vehicle"
    },
    {
      url: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2670&q=80",
      alt: "McLaren supercar"
    },
    {
      url: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2670&q=80",
      alt: "Chevrolet sports car"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return <div className="w-full relative">
      <div className="w-full h-screen relative overflow-hidden">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1500 ease-in-out ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image.url}
              alt={image.alt}
              className="w-full h-full object-cover"
            />
          </div>
        ))}

        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        <div className="absolute bottom-8 left-16 text-white z-10">
          <p className="text-sm tracking-widest">
            <span className="text-accent-red">EXCEPTIONAL EXAMPLES</span> | THE
            FINEST SELECTION
          </p>
        </div>
      </div>
    </div>;
};
export default Hero;