import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Facebook, Instagram } from 'lucide-react';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Close mobile drawer when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target) && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    }
    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { label: 'About us', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Price', href: '#pricing' },
    { label: 'Booking', href: '#booking' },
    { label: 'Contact us', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md shadow-md transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <img
            src="/assets/logo.png"
            alt="Supreme Car Wash Logo"
            className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
          <span className="md:hidden text-lg font-bold text-primary tracking-tight">Supreme</span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-3">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-4 py-2 rounded-full text-sm font-medium text-slate-700 hover:text-white hover:bg-primary transition-all duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop Social Links */}
        <div className="hidden md:flex items-center gap-4 text-primary">
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Facebook"
            className="p-2 rounded-full hover:bg-slate-100 hover:text-blue-600 transition-colors duration-200"
          >
            <Facebook className="w-5 h-5" />
          </a>
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Instagram"
            className="p-2 rounded-full hover:bg-slate-100 hover:text-pink-600 transition-colors duration-200"
          >
            <Instagram className="w-5 h-5" />
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-primary hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-primary/20"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity" onClick={() => setIsMobileMenuOpen(false)}>
          <div
            ref={menuRef}
            onClick={(e) => e.stopPropagation()}
            className="absolute top-0 right-0 h-full w-4/5 max-w-sm bg-primary text-white p-6 shadow-2xl flex flex-col justify-between animate-fade-in"
          >
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <img src="/assets/logo.png" alt="Logo" className="h-8 w-auto brightness-0 invert" />
                  <span className="font-bold text-lg">Supreme Car Wash</span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-white hover:bg-white/10 rounded-full"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex flex-col gap-3 mt-6">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="px-4 py-3 rounded-xl text-base font-medium text-white/90 hover:bg-white/10 hover:text-white transition-all"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 flex items-center justify-center gap-6">
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noreferrer noopener"
                className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5 text-white" />
              </a>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer noopener"
                className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
