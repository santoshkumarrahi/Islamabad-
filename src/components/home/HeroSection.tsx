import React, { useState, useEffect } from 'react';
import { useCms } from '../../context/CmsContext';
import { ChevronLeft, ChevronRight, Calendar, MapPin, Compass, Search, ShieldCheck, Award, HeartHandshake, Mountain, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  onPlanTrip: () => void;
  onExploreDestinations: () => void;
  onSearchSubmit: (params: { destinationId: string; category: string; date: string }) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onPlanTrip,
  onExploreDestinations,
  onSearchSubmit,
}) => {
  const { heroSlides, destinations } = useCms();
  const activeSlides = heroSlides.filter((s) => s.isActive);
  const slides = activeSlides.length > 0 ? activeSlides : heroSlides;

  const [currentIdx, setCurrentIdx] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);

  // Form State
  const [selectedDestId, setSelectedDestId] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDate, setSelectedDate] = useState(
    new Date(Date.now() + 86400000 * 5).toISOString().split('T')[0]
  );

  // Autoplay
  useEffect(() => {
    if (!isAutoplay || slides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6500);
    return () => clearInterval(interval);
  }, [isAutoplay, slides.length]);

  const currentSlide = slides[currentIdx] || slides[0];

  const handlePrev = () => {
    setIsAutoplay(false);
    setCurrentIdx((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setIsAutoplay(false);
    setCurrentIdx((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchSubmit({
      destinationId: selectedDestId,
      category: selectedCategory,
      date: selectedDate,
    });
  };

  return (
    <section id="home" className="relative min-h-[96vh] lg:min-h-screen flex flex-col justify-between pt-28 pb-12 overflow-hidden bg-[#07140E]">
      {/* Background Animated Slider with Slow Parallax Zoom */}
      {slides.map((slide, idx) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === currentIdx ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
          } transform transition-transform duration-[10000ms]`}
          style={{ willChange: 'opacity, transform' }}
        >
          <img
            src={slide.imageUrl}
            alt={slide.title}
            className="w-full h-full object-cover object-center"
          />
          {/* Dual Multi-Layer Scrim for Text Legibility & Depth */}
          <div
            className="absolute inset-0 bg-gradient-to-t from-[#07140E] via-[#07140E]/60 to-[#07140E]/40"
            style={{ opacity: slide.overlayOpacity ? slide.overlayOpacity * 1.6 : 0.7 }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(7,20,14,0.7)_100%)]" />
        </div>
      ))}

      {/* Floating Geographic Coordinates Badge */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex justify-between items-center text-[10px] font-mono tracking-widest text-[#D8B574]/80 uppercase">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D8B574] inline-block animate-pulse" />
          <span>33.7294° N, 73.0931° E · Margalla Ridge</span>
        </div>
        <div className="hidden sm:block text-white/50">
          ELEVATION 540M – 1,604M (PIR SOHAWA)
        </div>
      </div>

      {/* Hero Editorial Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto text-center sm:text-left pt-8 sm:pt-14">
        <div className="max-w-3xl space-y-5">
          {/* Top Label */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-[#C5A059]/40 text-[#F3DEB0] text-xs font-semibold uppercase tracking-[0.2em] shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#D8B574]" />
            <span>{currentSlide.subtitle || 'DISCOVER THE BEAUTY OF THE CAPITAL'}</span>
          </div>

          {/* Majestic Serif Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold text-[#FAF8F5] leading-[1.1] tracking-tight drop-shadow-lg text-balance">
            {currentSlide.title || 'Discover the Timeless Beauty of Islamabad.'}
          </h1>

          {/* Description */}
          <p className="text-sm sm:text-base lg:text-lg text-white/85 max-w-2xl font-light leading-relaxed drop-shadow-md">
            {currentSlide.description ||
              'Nestled beneath the majestic Margalla Hills, experience Pakistan’s serene green capital through curated luxury stays, private mountain treks, culinary heritage, and bespoke cultural expeditions.'}
          </p>

          {/* Primary Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-4 justify-center sm:justify-start">
            <button
              onClick={onExploreDestinations}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-[#C5A059] via-[#D8B574] to-[#C5A059] text-[#07140E] font-extrabold text-xs uppercase tracking-widest hover:brightness-110 hover:scale-102 transition-all shadow-xl shadow-black/40"
            >
              {currentSlide.ctaText || 'Explore Islamabad'}
            </button>
            <button
              onClick={onPlanTrip}
              className="px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-[#FAF8F5] font-semibold text-xs uppercase tracking-widest backdrop-blur-md border border-white/25 hover:border-[#D8B574] transition-all shadow-lg"
            >
              {currentSlide.secondaryCtaText || 'Plan Your Trip'}
            </button>
          </div>
        </div>
      </div>

      {/* Floating Interactive Search Bar */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 w-full mt-10">
        <form
          onSubmit={handleSearch}
          className="bg-[#0B2017]/85 backdrop-blur-2xl p-3 sm:p-4 rounded-3xl shadow-2xl border border-[#C5A059]/40 grid grid-cols-1 sm:grid-cols-4 gap-3 items-center"
        >
          {/* Destination Selector */}
          <div className="px-3.5 py-2.5 bg-white/5 rounded-2xl border border-white/10 flex items-center gap-3">
            <MapPin className="w-4 h-4 text-[#D8B574] shrink-0" />
            <div className="flex-1 min-w-0">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#D8B574]/80">
                Destination
              </label>
              <select
                value={selectedDestId}
                onChange={(e) => setSelectedDestId(e.target.value)}
                className="w-full text-xs font-semibold text-white bg-transparent focus:outline-none truncate [&>option]:text-black"
              >
                <option value="">All Iconic Spots</option>
                {destinations.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Category Selector */}
          <div className="px-3.5 py-2.5 bg-white/5 rounded-2xl border border-white/10 flex items-center gap-3">
            <Compass className="w-4 h-4 text-[#D8B574] shrink-0" />
            <div className="flex-1 min-w-0">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#D8B574]/80">
                Experience
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full text-xs font-semibold text-white bg-transparent focus:outline-none truncate [&>option]:text-black"
              >
                <option value="">All Collections</option>
                <option value="Heritage & Architecture">Heritage & Architecture</option>
                <option value="Nature & Trails">Nature & Trails</option>
                <option value="Viewpoints & Dining">Viewpoints & Dining</option>
                <option value="Cultural Museums">Cultural Museums</option>
              </select>
            </div>
          </div>

          {/* Date Picker */}
          <div className="px-3.5 py-2.5 bg-white/5 rounded-2xl border border-white/10 flex items-center gap-3">
            <Calendar className="w-4 h-4 text-[#D8B574] shrink-0" />
            <div className="flex-1 min-w-0">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#D8B574]/80">
                Travel Date
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full text-xs font-semibold text-white bg-transparent focus:outline-none"
              />
            </div>
          </div>

          {/* Search Button */}
          <button
            type="submit"
            className="w-full h-full py-3 sm:py-0 min-h-[48px] rounded-2xl bg-gradient-to-r from-[#C5A059] to-[#D8B574] text-[#07140E] text-xs font-extrabold uppercase tracking-widest hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#D8B574]/20"
          >
            <Search className="w-4 h-4" />
            <span>Search Escapes</span>
          </button>
        </form>

        {/* Trust Badges */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-white/70">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-[#D8B574]" />
            <span>100% Certified Local Historians</span>
          </div>
          <span className="hidden sm:inline text-white/20">·</span>
          <div className="flex items-center gap-2">
            <Mountain className="w-4 h-4 text-[#D8B574]" />
            <span>Private Guided Margalla Expeditions</span>
          </div>
          <span className="hidden sm:inline text-white/20">·</span>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#D8B574]" />
            <span>Registered Capital Tourism Operator</span>
          </div>
        </div>
      </div>

      {/* Slider Controls */}
      {slides.length > 1 && (
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center justify-between mt-6">
          <div className="flex items-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setIsAutoplay(false);
                  setCurrentIdx(i);
                }}
                className={`h-1 rounded-full transition-all duration-300 ${
                  i === currentIdx ? 'w-10 bg-[#D8B574]' : 'w-3 bg-white/30 hover:bg-white/60'
                }`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              className="p-2.5 rounded-full bg-white/5 hover:bg-white/15 text-white/90 border border-white/10 transition-colors"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="p-2.5 rounded-full bg-white/5 hover:bg-white/15 text-white/90 border border-white/10 transition-colors"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
