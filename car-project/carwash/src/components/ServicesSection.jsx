import React, { useEffect, useState } from 'react';

export default function ServicesSection() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('http://127.0.0.1:8000/services/')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch services');
        }

        return response.json();
      })
      .then((data) => {
        setServices(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError('Unable to load services');
        setLoading(false);
      });
  }, []);

  return (
    <section
      id="services"
      className="py-16 md:py-24 bg-slate-50 border-y border-slate-200/80"
    >
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

        {loading && (
          <p className="text-center text-slate-600">
            Loading services...
          </p>
        )}

        {error && (
          <p className="text-center text-red-500">
            {error}
          </p>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {services
              .filter((service) => service.is_active)
              .map((service) => (
                <div
                  key={service.id}
                  className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-slate-100 flex flex-col items-center text-center group"
                >
                  <div className="w-32 h-32 mb-6 flex items-center justify-center p-4 bg-slate-50 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                    <img
                      src={service.icon_url}
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
        )}

      </div>
    </section>
  );
} 