import React from 'react';

const servicesData = [
  {
    title: 'Exterior washing',
    description: 'Complete high-pressure foam wash, wheel cleaning, and spot-free rinse for a sparkling coat.',
    icon: '/assets/images/icons/car-wash.svg'
  },
  {
    title: 'Seat cleaning',
    description: 'Deep extraction shampooing and premium leather conditioning for spotless, odor-free seats.',
    icon: '/assets/images/icons/seat-cleaning.svg'
  },
  {
    title: 'Vacuuming',
    description: 'Comprehensive high-power interior vacuuming for carpets, floor mats, crevices, and trunk.',
    icon: '/assets/images/icons/vaccuming.svg'
  }
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-16 md:py-24 bg-slate-50 border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-secondary font-semibold text-sm uppercase tracking-wider">
            Our services
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mt-2">
            Premium washing service
          </h2>
          <div className="w-20 h-1 bg-secondary mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {servicesData.map((service) => (
            <div
              key={service.title}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-slate-100 flex flex-col items-center text-center group"
            >
              <div className="w-32 h-32 mb-6 flex items-center justify-center p-4 bg-slate-50 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                <img
                  src={service.icon}
                  alt={service.title}
                  className="w-full h-full object-contain"
                />
              </div>

              <h3 className="text-2xl font-semibold text-primary mb-3">
                {service.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
