import React from 'react';
import { ArrowRight, MapPin } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="about" className="py-16 md:py-24 bg-white text-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-secondary font-semibold uppercase tracking-wider text-sm">
            Top Rated Detailing
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mt-2">
            Supreme Car Wash, TX
          </h1>
          <div className="w-20 h-1 bg-secondary mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Garage Image Showcase */}
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl filter blur-xl opacity-70 group-hover:opacity-100 transition duration-500"></div>
            <div className="relative h-[300px] sm:h-[400px] rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src="/assets/images/homepage/garage.jpg"
                alt="Supreme Car Wash Garage and Detailing Bay"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

          {/* Text Content */}
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-6">
              About us
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed text-justify mb-8">
              Supreme Car Wash offers premium car cleaning services, providing meticulous attention to detail to ensure your vehicle shines like new. Our experienced team uses top-quality products and advanced techniques to deliver superior results. Visit us today for a professional car wash experience that leaves your vehicle looking pristine inside and out.
            </p>

            <div className="flex items-center">
              <a
                href="https://maps.app.goo.gl/"
                target="_blank"
                rel="noreferrer noopener"
                className="btn-primary group inline-flex items-center"
              >
                <span>View on map</span>
                <ArrowRight className="w-5 h-5 ml-1 transform group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
