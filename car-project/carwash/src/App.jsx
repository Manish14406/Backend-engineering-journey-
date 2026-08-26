import React, { useState } from 'react';
import TopBar from './components/TopBar';
import Navbar from './components/Navbar';
import HeroSlideshow from './components/HeroSlideshow';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import PricingSection from './components/PricingSection';
import BookingSection from './components/BookingSection';
import ReviewsSection from './components/ReviewsSection';
import FeedbackAndNewsletterSection from './components/FeedbackAndNewsletterSection';
import ReviewModal from './components/ReviewModal';
import Footer from './components/Footer';

export default function App() {
  const [selectedPlan, setSelectedPlan] = useState('');
  const [reviewModalState, setReviewModalState] = useState({
    isOpen: false,
    rating: 0
  });

  const handleRate = (rating) => {
    setReviewModalState({
      isOpen: true,
      rating
    });
  };

  const handleCloseModal = () => {
    setReviewModalState({
      isOpen: false,
      rating: 0
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800 antialiased selection:bg-primary selection:text-white">
      {/* Top information bar */}
      <TopBar />

      {/* Sticky Main Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-grow">
        <HeroSlideshow />
        <AboutSection />
        <ServicesSection />
        <PricingSection onSelectPlan={(plan) => setSelectedPlan(plan)} />
        <BookingSection selectedPlan={selectedPlan} />
        <ReviewsSection />
        <FeedbackAndNewsletterSection onRate={handleRate} />
      </main>

      {/* Dynamic Rating / Feedback Modal */}
      <ReviewModal
        isOpen={reviewModalState.isOpen}
        onClose={handleCloseModal}
        rating={reviewModalState.rating}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
