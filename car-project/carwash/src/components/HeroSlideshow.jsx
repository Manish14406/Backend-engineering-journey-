import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slidesData = [
  {
    image: '/assets/images/slideshow/car-wash.jpg',
    title: 'Supreme car wash',
    subtitle: 'Professional exterior & high-pressure foam wash',
    badge: '1 / 3'
  },
  {
    image: '/assets/images/slideshow/interior.jpg',
    title: 'Interior car wash',
    subtitle: 'Deep upholstery detailing, sanitization & conditioning',
    badge: '2 / 3'
  },
  {
    image: '/assets/images/slideshow/sponge-car-wash.jpg',
    title: 'Best car wash',
    subtitle: 'Meticulous hand wash with scratch-free microfibers',
    badge: '3 / 3'
  }
];

export default function HeroSlideshow() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === slidesData.length - 1 ? 0 : prev + 1));
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? slidesData.length - 1 : prev - 1));
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, [nextSlide, isPaused]);

  return (
    <section
      className="relative w-full h-[320px] sm:h-[450px] md:h-[580px] lg:h-[650px] overflow-hidden bg-slate-900"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slides */}
      {slidesData.map((slide, index) => (
        <div
          key={slide.title}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          {/* Background Image */}
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover transform scale-105 transition-transform duration-10000"
          />

          {/* Dark Gradient Overlay for optimal legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40"></div>

          {/* Slide Number Badge */}
          <div className="absolute top-6 left-6 z-20 px-3 py-1 bg-black/50 backdrop-blur-md rounded-full text-xs font-semibold text-white/90 border border-white/20">
            {slide.badge}
          </div>

          {/* Slide Caption */}
          <div className="absolute bottom-16 sm:bottom-20 left-0 right-0 z-20 text-center px-4 max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight drop-shadow-lg mb-2">
              {slide.title}
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-slate-200 font-light drop-shadow">
              {slide.subtitle}
            </p>
          </div>
        </div>
      ))}

      {/* Prev Navigation Button */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-3 rounded-full bg-black/40 text-white hover:bg-black/80 backdrop-blur-sm border border-white/20 transition-all duration-200 focus:outline-none"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
      </button>

      {/* Next Navigation Button */}
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-3 rounded-full bg-black/40 text-white hover:bg-black/80 backdrop-blur-sm border border-white/20 transition-all duration-200 focus:outline-none"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-6 left-0 right-0 z-30 flex justify-center items-center gap-2.5">
        {slidesData.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentSlide
                ? 'w-8 h-2.5 bg-white shadow-md'
                : 'w-2.5 h-2.5 bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
