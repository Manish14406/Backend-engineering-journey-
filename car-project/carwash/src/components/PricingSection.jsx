import React from 'react';
import { CheckCircle2, XCircle, Sparkles } from 'lucide-react';

const plans = [
  {
    name: 'Basic cleaning',
    price: '$14',
    featured: false,
    features: [
      { name: 'Seat Washing', included: true },
      { name: 'Vacuum Cleaning', included: true },
      { name: 'Exterior Cleaning', included: true },
      { name: 'Interior Wet Cleaning', included: false },
      { name: 'Window Wiping', included: false }
    ]
  },
  {
    name: 'Executive cleaning',
    price: '$25',
    featured: true,
    badge: 'Most Popular',
    features: [
      { name: 'Seat Washing', included: true },
      { name: 'Vacuum Cleaning', included: true },
      { name: 'Exterior Cleaning', included: true },
      { name: 'Interior Wet Cleaning', included: true },
      { name: 'Window Wiping', included: false }
    ]
  },
  {
    name: 'Presidential cleaning',
    price: '$35',
    featured: false,
    features: [
      { name: 'Seat Washing', included: true },
      { name: 'Vacuum Cleaning', included: true },
      { name: 'Exterior Cleaning', included: true },
      { name: 'Interior Wet Cleaning', included: true },
      { name: 'Window Wiping', included: true }
    ]
  }
];

export default function PricingSection({ onSelectPlan }) {
  const handleBookNow = (planName) => {
    if (onSelectPlan) {
      onSelectPlan(planName);
    }
    const bookingElem = document.getElementById('booking');
    if (bookingElem) {
      bookingElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="pricing" className="py-16 md:py-24 bg-white text-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-secondary font-semibold text-sm uppercase tracking-wider">
            Washing plans
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mt-2">
            Choose your plan
          </h2>
          <div className="w-20 h-1 bg-secondary mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-8 items-stretch">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-8 flex flex-col justify-between transition-all duration-300 ${
                plan.featured
                  ? 'bg-white border-2 border-primary shadow-2xl scale-100 md:-translate-y-2'
                  : 'bg-white border border-slate-200 shadow-lg hover:shadow-xl'
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-secondary text-white text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full shadow-md flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  {plan.badge}
                </div>
              )}

              <div>
                <h3 className="text-2xl font-bold text-primary text-center">
                  {plan.name}
                </h3>
                <div className="text-center my-6">
                  <span className="text-5xl font-extrabold text-slate-900">
                    {plan.price}
                  </span>
                  <span className="text-slate-500 text-sm ml-1">/ wash</span>
                </div>

                <ul className="space-y-4 my-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-sm sm:text-base">
                      {feature.included ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                      ) : (
                        <XCircle className="w-5 h-5 text-slate-300 shrink-0" />
                      )}
                      <span
                        className={
                          feature.included
                            ? 'text-slate-700 font-medium'
                            : 'text-slate-400 line-through'
                        }
                      >
                        {feature.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => handleBookNow(plan.name)}
                className={`w-full py-3 px-6 rounded-full font-semibold transition-all duration-300 ${
                  plan.featured
                    ? 'bg-primary hover:bg-primary-light text-white shadow-md hover:shadow-lg hover:scale-105'
                    : 'bg-slate-100 hover:bg-primary hover:text-white text-primary border border-slate-200'
                }`}
              >
                Book now
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
