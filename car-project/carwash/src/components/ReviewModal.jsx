import React, { useState } from 'react';
import { X, Star, ExternalLink, CheckCircle } from 'lucide-react';

export default function ReviewModal({ isOpen, onClose, rating }) {
  const [feedbackText, setFeedbackText] = useState('');
  const [submittedFeedback, setSubmittedFeedback] = useState(false);

  if (!isOpen) return null;

  const isHighRating = rating >= 4;

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    setSubmittedFeedback(true);
    setTimeout(() => {
      setSubmittedFeedback(false);
      setFeedbackText('');
      onClose();
    }, 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative border border-slate-100 animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Stars preview */}
        <div className="flex justify-center gap-1.5 mb-4 text-amber-400">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-6 h-6 ${
                star <= rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'
              }`}
            />
          ))}
        </div>

        {submittedFeedback ? (
          <div className="text-center py-6 space-y-3">
            <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto" />
            <h3 className="text-xl font-bold text-slate-800">Thank you for your feedback!</h3>
            <p className="text-sm text-slate-600">
              We appreciate your thoughts and will work on improving our service.
            </p>
          </div>
        ) : (
          <div className="text-center">
            {isHighRating ? (
              <>
                <h3 className="text-2xl font-bold text-primary mb-2">Thank you!</h3>
                <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                  We are pleased to hear you like our service. Could you please take 30 seconds to rate us on Google Maps?
                </p>
                <div className="flex justify-center">
                  <a
                    href="https://maps.app.goo.gl/"
                    target="_blank"
                    rel="noreferrer noopener"
                    onClick={onClose}
                    className="btn-primary inline-flex items-center"
                  >
                    <span>Open Google Maps</span>
                    <ExternalLink className="w-4 h-4 ml-1" />
                  </a>
                </div>
              </>
            ) : (
              <form onSubmit={handleFeedbackSubmit}>
                <h3 className="text-2xl font-bold text-primary mb-2">
                  We are sorry you were disappointed
                </h3>
                <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                  Please let us know what went wrong and how we can improve our service for your next visit.
                </p>
                <textarea
                  required
                  rows={4}
                  maxLength={1000}
                  placeholder="Share your experience or suggestions..."
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  className="form-input text-sm mb-4"
                ></textarea>
                <div className="flex justify-center">
                  <button type="submit" className="btn-secondary w-full">
                    Submit Private Feedback
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
