import React from 'react';
import { Clock, Phone, Mail } from 'lucide-react';

export default function TopBar() {
  return (
    <div className="hidden md:flex w-full bg-slate-100 py-3 px-8 lg:px-16 justify-between items-center border-b border-slate-200 text-sm">
      <div className="flex items-center gap-2">
        <span className="text-2xl font-bold text-primary tracking-tight">Supreme car wash</span>
      </div>

      <div className="flex items-center gap-8 lg:gap-12">
        {/* Opening Hours */}
        <div className="flex items-center gap-3 group">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-secondary text-white shadow-sm transition-transform duration-300 group-hover:scale-110">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm font-semibold text-primary">Opening hours</p>
            <p className="text-xs text-slate-600 font-medium">Mon-Fri, 8:00 - 9:00</p>
          </div>
        </div>

        {/* Phone */}
        <a href="tel:+1222222222" className="flex items-center gap-3 group">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-secondary text-white shadow-sm transition-transform duration-300 group-hover:scale-110">
            <Phone className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm font-semibold text-primary">Call us</p>
            <p className="text-xs text-slate-600 font-medium hover:text-primary transition-colors">+1 222-222-222</p>
          </div>
        </a>

        {/* Email */}
        <a href="mailto:supreme@example.com" className="flex items-center gap-3 group">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-secondary text-white shadow-sm transition-transform duration-300 group-hover:scale-110">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm font-semibold text-primary">Email us</p>
            <p className="text-xs text-slate-600 font-medium hover:text-primary transition-colors">supreme@example.com</p>
          </div>
        </a>
      </div>
    </div>
  );
}
