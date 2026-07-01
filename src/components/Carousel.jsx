import React, { useState } from "react";
import screen1 from "../assets/screen1.jpeg";
import screen2 from "../assets/screen2.jpeg";
import screen3 from "../assets/screen3.jpeg";

export default function Carousel() {
  const slides = [
    {
      title: "الشاشة الرئيسية",
      image: screen3,
    },
    {
      title: "أوضاع القراءة",
      image: screen2,
    },
    {
      title: "المصحف الشريف",
      image: screen1,
    },
  ];


  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-section-gap overflow-hidden bg-gradient-to-b from-transparent to-surface-container-lowest/30">
      
      {/* Title */}
      <div className="px-4 md:px-margin-desktop max-w-container-max mx-auto mb-10 flex flex-col sm:flex-row justify-between items-center gap-4 text-right">
        <div className="flex gap-4 items-center">
          <button
            id="carousel-prev-btn"
            onClick={prevSlide}
            className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all text-on-surface"
            title="السابق"
          >
            <span className="material-symbols-outlined font-bold">chevron_right</span>
          </button>
          <button
            id="carousel-next-btn"
            onClick={nextSlide}
            className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all text-on-surface"
            title="التالي"
          >
            <span className="material-symbols-outlined font-bold">chevron_left</span>
          </button>
        </div>
        <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">
          تجربة مستخدم <span className="text-primary">فريدة</span>
        </h2>
      </div>

      {/* Slide Track */}
      <div className="relative max-w-4xl mx-auto px-4 md:px-0 flex justify-center items-center">
        
        {/* Carousel Container */}
        <div className="relative w-full max-w-[280px] md:max-w-[320px] h-[580px] flex items-center justify-center">
          {slides.map((slide, idx) => {
            // Calculate active, prev, and next slots to create a 3D focus stack
            const isCenter = idx === currentIndex;
            const isLeft = idx === (currentIndex - 1 + slides.length) % slides.length;
            const isRight = idx === (currentIndex + 1) % slides.length;

            let cardStyles = "opacity-0 pointer-events-none scale-75 translate-x-0 z-0";
            if (isCenter) {
              cardStyles = "opacity-100 scale-100 z-30 translate-x-0 cursor-default";
            } else if (isLeft) {
              cardStyles = "opacity-40 scale-85 z-10 -translate-x-[90px] sm:-translate-x-[150px] md:-translate-x-[220px] rotate-[8deg] cursor-pointer blur-[2px] hover:opacity-65";
            } else if (isRight) {
              cardStyles = "opacity-40 scale-85 z-10 translate-x-[90px] sm:translate-x-[150px] md:translate-x-[220px] -rotate-[8deg] cursor-pointer blur-[2px] hover:opacity-65";
            }

            return (
              <div
                key={idx}
                id={`carousel-mockup-${idx}`}
                onClick={() => {
                  if (isLeft) prevSlide();
                  if (isRight) nextSlide();
                }}
                className={`absolute w-[240px] md:w-[280px] iphone-mockup transition-all duration-700 ease-out select-none ${cardStyles}`}
              >
                <img
                  alt={slide.title}
                  src={slide.image}
                  className="w-full h-auto"
                  draggable="false"
                />
                {isCenter && (
                  <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-black/60 backdrop-blur-md border border-white/10 text-white rounded-full font-bold text-sm shadow-lg whitespace-nowrap">
                    {slide.title}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Dots indicators */}
      <div className="flex justify-center gap-2 mt-8">
        {slides.map((_, idx) => (
          <button
            key={idx}
            id={`carousel-dot-${idx}`}
            onClick={() => setCurrentIndex(idx)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              idx === currentIndex ? "w-8 bg-primary" : "w-2.5 bg-surface-container-highest"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
