import React from 'react';
import { Facebook, Twitter, MapPin, Phone, Mail, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary text-white pt-16 pb-12 border-t border-primary-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-12 border-b border-white/10">
          {/* Col 1: Brand & Address */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/assets/logo.png"
                alt="Supreme Car Wash Logo"
                className="h-10 w-auto brightness-0 invert"
              />
              <span className="text-xl font-bold tracking-tight">Supreme Car Wash</span>
            </div>
            <div className="text-sm text-slate-300 space-y-1">
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-secondary shrink-0" />
                12111 Cypress, TX, United States
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-secondary shrink-0" />
                +1 222-222-222
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-secondary shrink-0" />
                supreme@example.com
              </p>
            </div>

            <div className="pt-2">
              <p className="text-xs uppercase font-semibold tracking-wider text-slate-300 mb-3">
                Follow Us
              </p>
              <div className="flex items-center gap-3">
                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="Facebook"
                  className="p-2.5 bg-white/10 rounded-full hover:bg-white/20 hover:text-secondary transition-all"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="https://twitter.com/pauls_freeman"
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="Twitter"
                  className="p-2.5 bg-white/10 rounded-full hover:bg-white/20 hover:text-secondary transition-all"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Services */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4">Services</h4>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li>
                <a href="#services" className="hover:text-secondary transition-colors">
                  Exterior Foam Wash
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-secondary transition-colors">
                  Interior Deep Cleaning
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-secondary transition-colors">
                  Seat Extraction & Shampoo
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-secondary transition-colors">
                  Window Streak-Free Wiping
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-secondary transition-colors">
                  High-Power Vacuuming
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Resources */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4">Resources</h4>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li>
                <a href="#about" className="hover:text-secondary transition-colors">
                  About Our Team
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-secondary transition-colors">
                  Washing Plans & Pricing
                </a>
              </li>
              <li>
                <a href="#booking" className="hover:text-secondary transition-colors">
                  Book an Appointment
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-secondary transition-colors">
                  Location & Map
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-secondary transition-colors">
                  Privacy Policy & Terms
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Operating Hours */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4">Operating Hours</h4>
            <div className="space-y-2 text-sm text-slate-300">
              <div className="flex justify-between py-1 border-b border-white/5">
                <span>Monday – Friday</span>
                <span className="font-semibold text-white">8:00 AM – 9:00 PM</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span>Saturday</span>
                <span className="font-semibold text-white">8:00 AM – 8:00 PM</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Sunday</span>
                <span className="font-semibold text-white">9:00 AM – 6:00 PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} Supreme Car Wash. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with React & Vite
          </p>
        </div>
      </div>
    </footer>
  );
}
