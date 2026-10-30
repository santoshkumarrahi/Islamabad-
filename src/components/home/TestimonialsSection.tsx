import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { Star, ChevronLeft, ChevronRight, Quote, CheckCircle2 } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const { testimonials, sections } = useCms();
  const config = sections.find((s) => s.id === 'sec-testimonials');

  const approved = testimonials
    .filter((t) => t.isApproved)
    .sort((a, b) => a.order - b.order);

  const [currentIdx, setCurrentIdx] = useState(0);

  if (config && !config.isVisible) return null;
  if (approved.length === 0) return null;

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev === 0 ? approved.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIdx((prev) => (prev === approved.length - 1 ? 0 : prev + 1));
  };

  const current = approved[currentIdx] || approved[0];

  return (
    <section id="testimonials" className="py-24 sm:py-32 bg-[#FBF9F5] relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-[#C5A059] text-xs font-mono uppercase tracking-[0.25em] mb-3">
            <span>DISTINGUISHED VOICES</span>
            <span className="w-8 h-[1px] bg-[#C5A059]" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#0B2017] tracking-tight">
            {config?.title || 'What Our Travelers Say'}
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-[#4A5D53] font-light">
            {config?.subtitle || 'Reflections from international guests, diplomats, and avid explorers.'}
          </p>
        </div>

        {/* Guestbook Parchment Card */}
        <div className="relative bg-white rounded-3xl p-8 sm:p-14 shadow-2xl border border-[#C5A059]/40 flex flex-col items-center text-center">
          {/* Top Wax Seal Motif */}
          <div className="w-14 h-14 rounded-full bg-[#0B2017] text-[#D8B574] flex items-center justify-center mb-8 shadow-xl border border-[#C5A059]/60">
            <Quote className="w-6 h-6 fill-current text-[#D8B574]" />
          </div>

          {/* 5-Star Ratings */}
          <div className="flex items-center gap-1.5 text-[#C5A059] mb-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < current.rating ? 'fill-current text-[#C5A059]' : 'text-slate-200'
                }`}
              />
            ))}
          </div>

          {/* Review Quote */}
          <p className="font-serif text-xl sm:text-3xl text-[#0B2017] italic leading-relaxed max-w-3xl font-normal">
            "{current.review}"
          </p>

          {/* Customer Avatar & Bio */}
          <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
            <img
              src={current.photoUrl}
              alt={current.customerName}
              className="w-16 h-16 rounded-full object-cover border-2 border-[#C5A059] shadow-lg"
            />
            <div className="text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-1.5 font-bold text-lg text-[#0B2017]">
                <span>{current.customerName}</span>
                <span title="Verified Guest">
                  <CheckCircle2 className="w-4 h-4 text-[#2D6A4F]" />
                </span>
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                {current.location} · <span className="text-[#C5A059] font-medium">{current.experience}</span>
              </div>
            </div>
          </div>

          {/* Carousel Controls */}
          {approved.length > 1 && (
            <div className="flex items-center justify-between w-full mt-10 pt-6 border-t border-[#F0EAE1]">
              <div className="flex items-center gap-2">
                {approved.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIdx(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === currentIdx ? 'w-10 bg-[#0B2017]' : 'w-3 bg-slate-300'
                    }`}
                    aria-label={`Slide ${i + 1}`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handlePrev}
                  className="p-3 rounded-full border border-slate-300 text-[#0B2017] hover:bg-[#0B2017] hover:text-[#D8B574] transition-colors"
                  aria-label="Previous review"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-3 rounded-full border border-slate-300 text-[#0B2017] hover:bg-[#0B2017] hover:text-[#D8B574] transition-colors"
                  aria-label="Next review"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
