import React, { useState } from 'react';
import { Star, Mail, CheckCircle, Send } from 'lucide-react';

export default function FeedbackAndNewsletterSection({ onRate }) {
  const [hoverRating, setHoverRating] = useState(0);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubmitted(true);
      setTimeout(() => {
        setNewsletterSubmitted(false);
        setNewsletterEmail('');
      }, 4000);
    }
  };

  return (
    <section className="py-16 md:py-24 bg-slate-50 border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Newsletter Section */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-lg border border-slate-100 text-center">
          <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Mail className="w-7 h-7" />
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-primary mb-2">
            Special Newsletter Signup
          </h3>
          <p className="text-slate-600 text-sm sm:text-base max-w-md mx-auto mb-6">
            Get exclusive seasonal discounts, detailing tips, and special service packages delivered to your inbox.
          </p>

          {newsletterSubmitted ? (
            <div className="flex items-center justify-center gap-2 text-emerald-600 font-semibold py-3 animate-fade-in">
              <CheckCircle className="w-5 h-5" />
              <span>Thank you for subscribing! Check your email for special welcome offers.</span>
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                required
                placeholder="Enter your email address"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="form-input rounded-full sm:rounded-r-none sm:border-r-0"
              />
              <button
                type="submit"
                className="btn-primary sm:rounded-l-none shrink-0"
              >
                <span>Subscribe</span>
                <Send className="w-4 h-4 ml-1" />
              </button>
            </form>
          )}
        </div>

        {/* Rating Section */}
        <div className="text-center space-y-4">
          <p className="text-secondary font-semibold text-sm uppercase tracking-wider">
            Your opinion matters
          </p>
          <h3 className="text-2xl sm:text-3xl font-bold text-primary">
            Like us? Tell us more
          </h3>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            Click on a star below to rate your experience with Supreme Car Wash.
          </p>

          <div
            className="flex justify-center items-center gap-2 py-4"
            onMouseLeave={() => setHoverRating(0)}
          >
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onMouseEnter={() => setHoverRating(star)}
                onClick={() => onRate(star)}
                className="p-1 text-4xl sm:text-5xl transition-transform duration-200 hover:scale-125 focus:outline-none"
                aria-label={`Rate ${star} out of 5 stars`}
              >
                <Star
                  className={`w-9 h-9 sm:w-12 sm:h-12 transition-colors ${
                    star <= (hoverRating || 0)
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-slate-300'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
