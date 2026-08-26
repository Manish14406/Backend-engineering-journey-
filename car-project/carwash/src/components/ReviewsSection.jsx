import React, { useState, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const reviewsData = [
  {
    quote: "Supreme Car Wash gave my SUV a showroom-level shine! Their attention to detailing on the seats and wheels is unmatched in the Cypress area.",
    name: "Sandra Brooks",
    role: "Verified Customer",
    rating: 5
  },
  {
    quote: "Fast, efficient, and genuinely friendly service. The executive cleaning package removed stubborn pet hair completely. Highly recommended!",
    name: "Joshua Simmons",
    role: "Regular Client",
    rating: 5
  },
  {
    quote: "Best car wash in town hands down. The booking was effortless, and the car smelled fresh and clean for weeks after the wet wash.",
    name: "Roger Neely",
    role: "Verified Customer",
    rating: 5
  }
];

export default function ReviewsSection() {
  const [currentReview, setCurrentReview] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentReview((prev) => (prev === reviewsData.length - 1 ? 0 : prev + 1));
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-16 md:py-24 bg-white text-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-secondary font-semibold text-sm uppercase tracking-wider">
            Testimonials
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mt-2">
            What some of our clients say
          </h2>
          <div className="w-20 h-1 bg-secondary mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Testimonial Carousel Card */}
        <div className="max-w-3xl mx-auto bg-slate-50 border border-slate-200/80 rounded-3xl p-8 sm:p-12 shadow-lg relative">
          <Quote className="w-12 h-12 text-primary/10 absolute top-6 left-6 -rotate-12 pointer-events-none" />

          <div className="min-h-[160px] flex flex-col justify-center text-center relative z-10">
            <div className="flex justify-center gap-1 text-amber-400 mb-4">
              {[...Array(reviewsData[currentReview].rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
            </div>

            <p className="text-base sm:text-lg text-slate-700 italic font-normal leading-relaxed transition-all duration-500">
              "{reviewsData[currentReview].quote}"
            </p>

            <div className="mt-6">
              <h4 className="font-bold text-primary text-base">
                {reviewsData[currentReview].name}
              </h4>
              <p className="text-xs text-slate-500">
                {reviewsData[currentReview].role}
              </p>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center items-center gap-2 mt-8">
            {reviewsData.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentReview(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentReview
                    ? 'w-6 h-2 bg-primary'
                    : 'w-2 h-2 bg-slate-300 hover:bg-slate-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Google Map Section */}
        <div id="contact" className="mt-20">
          <div className="text-center mb-8">
            <h3 className="text-2xl sm:text-3xl font-bold text-primary">
              On the map
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              Visit our facility at 12111 Cypress, TX, United States
            </p>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-200 h-[380px] w-full max-w-5xl mx-auto">
            <iframe
              title="Supreme Car Wash Location"
              src="https://maps.google.com/maps?q=12111+Cypress+TX+USA&t=&z=13&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full border-0"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
