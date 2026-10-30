import React, { useState } from 'react';
import { Destination } from '../../types';
import { X, MapPin, Clock, DollarSign, Calendar, Star, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';

interface DestinationModalProps {
  destination: Destination | null;
  onClose: () => void;
  onBookNow: (destination: Destination) => void;
}

export const DestinationModal: React.FC<DestinationModalProps> = ({
  destination,
  onClose,
  onBookNow,
}) => {
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  if (!destination) return null;

  const images = destination.galleryImages && destination.galleryImages.length > 0
    ? destination.galleryImages
    : [destination.featuredImage];

  const handlePrev = () => {
    setActiveImageIdx((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveImageIdx((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="fixed inset-0 bg-[#0F241B]/80 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-3xl bg-[#FBF9F5] rounded-3xl shadow-2xl border-2 border-[#C5A059]/40 overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 bg-black/60 hover:bg-black/90 text-white p-2.5 rounded-full transition-colors backdrop-blur-md border border-white/20"
        >
          <X className="w-5 h-5 text-[#D8B574]" />
        </button>

        {/* Image Slider */}
        <div className="relative h-72 sm:h-96 w-full bg-slate-900 overflow-hidden">
          <img
            src={images[activeImageIdx]}
            alt={destination.name}
            className="w-full h-full object-cover transition-all duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

          {/* Navigation Chevrons */}
          {images.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Thumbnails */}
              <div className="absolute bottom-4 left-6 right-6 flex items-center gap-2 overflow-x-auto pb-1">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImageIdx(i)}
                    className={`w-14 h-10 rounded-md overflow-hidden shrink-0 border-2 transition-all ${
                      i === activeImageIdx ? 'border-[#D4A373] scale-105' : 'border-white/50 opacity-60'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </>
          )}

          {/* Title Overlay */}
          <div className="absolute top-6 left-6 right-16">
            <span className="text-[#D4A373] text-xs font-semibold uppercase tracking-widest bg-[#133826]/70 px-2.5 py-1 rounded backdrop-blur-sm">
              {destination.category}
            </span>
          </div>

          <div className="absolute bottom-16 sm:bottom-18 left-6 right-6 text-white">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold drop-shadow-md">
              {destination.name}
            </h2>
            <div className="flex items-center gap-2 text-xs text-white/90 mt-1">
              <MapPin className="w-3.5 h-3.5 text-[#D4A373]" />
              <span>{destination.location}</span>
              <span className="text-white/40">·</span>
              <span className="flex items-center gap-1 text-[#E9D8A6]">
                <Star className="w-3.5 h-3.5 fill-current" /> {destination.rating}
              </span>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[50vh] overflow-y-auto">
          {/* Key Facts Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 bg-[#F2EDE5] rounded-xl border border-[#E0D7CB] text-xs">
            <div>
              <span className="text-slate-500 block mb-0.5 flex items-center gap-1">
                <Clock className="w-3 h-3 text-[#133826]" /> Duration
              </span>
              <span className="font-semibold text-[#133826]">{destination.typicalDuration}</span>
            </div>
            <div>
              <span className="text-slate-500 block mb-0.5 flex items-center gap-1">
                <DollarSign className="w-3 h-3 text-[#133826]" /> Entry Fee
              </span>
              <span className="font-semibold text-[#133826]">{destination.entryFee}</span>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <span className="text-slate-500 block mb-0.5 flex items-center gap-1">
                <Calendar className="w-3 h-3 text-[#133826]" /> Best Visiting Time
              </span>
              <span className="font-semibold text-[#133826]">{destination.bestTimeToVisit}</span>
            </div>
          </div>

          {/* Descriptions */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#133826] mb-2">
              Overview & Historical Context
            </h3>
            <p className="text-sm text-[#3E5046] leading-relaxed">
              {destination.fullDescription || destination.shortDescription}
            </p>
          </div>

          {/* Highlights */}
          {destination.highlights && destination.highlights.length > 0 && (
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#133826] mb-3">
                Experience Highlights
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {destination.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 bg-white p-2.5 rounded-lg border border-[#E5DFD7]">
                    <CheckCircle className="w-4 h-4 text-[#2D6A4F] shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#E5DFD7]">
            <div className="text-xs text-slate-500">
              Private guided excursions and luxury transport available daily.
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={onClose}
                className="flex-1 sm:flex-none px-4 py-2.5 border border-slate-300 text-slate-700 rounded-xl text-xs font-semibold hover:bg-slate-100 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  onClose();
                  onBookNow(destination);
                }}
                className="flex-1 sm:flex-none px-6 py-2.5 bg-gradient-to-r from-[#C5A059] to-[#D8B574] text-[#07140E] hover:from-[#D8B574] hover:to-[#E8CF9B] rounded-xl text-xs font-bold shadow-md transition-all"
              >
                Book Tour to This Destination
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
