"use client";
import React, { FC, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Soup, Users, Utensils } from "lucide-react";
import Image from "next/image";

interface SlideShowProps {}
interface Slide {
  icon: JSX.Element;
  text: string;
}

const SlideShow: FC<SlideShowProps> = ({}) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const slides: Slide[] = [
    { icon: <Utensils />, text: "Personalized Recommendations" },
    { icon: <Soup />, text: "Diverse Cuisine Options" },
    { icon: <Users />, text: "Share Meals with Friends" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="relative h-40 sm:h-48 overflow-hidden rounded-lg mb-6"
    >
      <Image
        src="/slide-bg.jpg"
        alt="Delicious Food"
        className="w-full h-full object-cover"
        width={480}
        height={220}
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="text-white text-center"
        >
          <div className="text-3xl sm:text-4xl mb-2">
            {slides[currentSlide].icon}
          </div>
          <p className="text-lg sm:text-xl font-semibold">
            {slides[currentSlide].text}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SlideShow;
