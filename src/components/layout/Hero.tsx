"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image"; // Import Next.js Image component

import e2 from "../../assets/e2.jpg";
import e3 from "../../assets/e3.jpg";

const carouselImages = [e2, e3];

export const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  };

  //   const prevSlide = () => {
  //     setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  //   };

  return (
    <div className="hero min-h-screen relative overflow-hidden">
      {/* Animated Background Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <Image
            src={carouselImages[currentSlide]}
            alt={`Slide ${currentSlide}`}
            layout="fill"
            objectFit="cover"
            priority
          />
        </motion.div>
      </AnimatePresence>

      <div className="hero-overlay bg-opacity-60"></div>

      {/* Hero Content */}
      <div className="hero-content text-neutral-content text-center relative z-10">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold text-black">Hello there</h1>
          <p className="mb-5 text-black">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          <button className="btn btn-primary">Get Started</button>
        </div>
      </div>

      {/* Carousel Controls */}
      {/* <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between z-10">
        <button className="btn btn-circle" onClick={prevSlide}>❮</button>
        <button className="btn btn-circle" onClick={nextSlide}>❯</button>
      </div> */}

      {/* Indicators */}
      <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 space-x-2 z-10">
        {carouselImages.map((_, index) => (
          <div
            key={index}
            className={`w-1 h-1 rounded-full cursor-pointer transition-all duration-300 ${
              currentSlide === index ? "bg-white scale-110" : "bg-gray-400"
            }`}
            onClick={() => setCurrentSlide(index)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Hero;
