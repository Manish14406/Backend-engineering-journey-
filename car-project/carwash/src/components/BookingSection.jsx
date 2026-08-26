import React, { useState, useMemo } from 'react';
import { ArrowRight, Phone, CheckCircle, Calendar, Clock } from 'lucide-react';

export default function BookingSection({ selectedPlan }) {
  const today = useMemo(() => new Date().toISOString().split('T')[0], []);

  // Generate timings: 7:00, 7:30, 8:00 ... 19:30
  const timeSlots = useMemo(() => {
    const slots = [];
    for (let h = 7; h < 20; h++) {
      slots.push(`${h.toString().padStart(2, '0')}:00`);
      slots.push(`${h.toString().padStart(2, '0')}:30`);
    }
    return slots;
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    time: timeSlots[0] || '07:00',
    date: today,
    inquiry: selectedPlan ? `Selected Plan: ${selectedPlan}` : ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      phone: '',
      email: '',
      time: timeSlots[0] || '07:00',
      date: today,
      inquiry: ''
    });
  };

  return (
    <section id="booking" className="py-16 md:py-24 bg-slate-100/80 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Side Image */}
          <div className="hidden lg:block lg:col-span-5 relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-primary to-secondary rounded-2xl filter blur opacity-30 group-hover:opacity-50 transition duration-500"></div>
            <div className="relative h-[480px] rounded-2xl overflow-hidden shadow-xl border-4 border-white">
              <img
                src="/assets/images/homepage/car-washing.jpg"
                alt="Car Wash in progress"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-2xl shadow-xl border border-slate-200/80">
            <div className="mb-6">
              <span className="text-secondary font-semibold text-sm uppercase tracking-wider">
                Fast & Reliable
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-primary mt-1">
                Request car wash
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Book your detailing session in less than 2 minutes.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-4 animate-fade-in">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-emerald-800">Booking Request Received!</h3>
                <p className="text-emerald-700 text-sm max-w-md mx-auto">
                  Thank you, <strong>{formData.name}</strong>. We have reserved your appointment for{' '}
                  <strong>{formData.date}</strong> at <strong>{formData.time}</strong>. Our team will call you at{' '}
                  <strong>{formData.phone}</strong> shortly to confirm.
                </p>
                <button
                  onClick={handleReset}
                  className="btn-primary mt-4 text-sm"
                >
                  Book Another Service
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      maxLength={50}
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Time */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      Preferred Time *
                    </label>
                    <div className="relative">
                      <select
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        className="form-input appearance-none pr-10 cursor-pointer"
                      >
                        {timeSlots.map((time) => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>
                      <Clock className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  {/* Date */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      Preferred Date *
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        name="date"
                        required
                        min={today}
                        value={formData.date}
                        onChange={handleChange}
                        className="form-input cursor-pointer"
                      />
                    </div>
                  </div>
                </div>

                {/* Inquiry */}
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Additional Notes / Selected Plan
                  </label>
                  <textarea
                    name="inquiry"
                    rows={3}
                    placeholder="Vehicle model, specific stain removal requirements, or plan details..."
                    value={formData.inquiry}
                    onChange={handleChange}
                    className="form-input resize-y"
                  ></textarea>
                </div>

                {/* Submit button */}
                <div className="pt-2 flex justify-end">
                  <button type="submit" className="btn-primary w-full sm:w-auto">
                    <span>Request Appointment</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

            {/* Direct Phone Assistance */}
            <div className="mt-8 pt-6 border-t border-slate-100 text-center">
              <p className="text-xs uppercase font-bold tracking-wider text-slate-400">
                Prefer to book over the phone?
              </p>
              <a
                href="tel:+1122122122"
                className="inline-flex items-center gap-2 text-2xl font-bold text-primary hover:text-secondary transition-colors mt-1"
              >
                <Phone className="w-5 h-5 text-secondary" />
                +1 122-122-122
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
