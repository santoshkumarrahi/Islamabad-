import React from 'react';
import { TravelPackage } from '../../types';
import { X, Check, Clock, DollarSign, Calendar, MapPin } from 'lucide-react';

interface PackageModalProps {
  pkg: TravelPackage | null;
  onClose: () => void;
  onBookNow: (pkg: TravelPackage) => void;
}

export const PackageModal: React.FC<PackageModalProps> = ({
  pkg,
  onClose,
  onBookNow,
}) => {
  if (!pkg) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="fixed inset-0 bg-[#0F241B]/80 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-3xl bg-[#FBF9F5] rounded-3xl shadow-2xl border-2 border-[#C5A059]/40 overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 bg-black/60 hover:bg-black/90 text-white p-2.5 rounded-full transition-colors backdrop-blur-md border border-white/20"
        >
          <X className="w-5 h-5 text-[#D8B574]" />
        </button>

        <div className="relative h-64 sm:h-80 w-full overflow-hidden">
          <img
            src={pkg.featuredImage}
            alt={pkg.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

          <div className="absolute top-6 left-6">
            <span className="text-xs font-semibold uppercase tracking-wider bg-[#133826]/80 text-[#D4A373] px-3 py-1 rounded-md backdrop-blur-sm border border-[#2D6A4F]">
              {pkg.category}
            </span>
          </div>

          <div className="absolute bottom-6 left-6 right-6 text-white">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white drop-shadow">
              {pkg.title}
            </h2>
            <div className="flex flex-wrap items-center gap-4 text-xs text-white/90 mt-2">
              <span className="flex items-center gap-1.5 font-medium">
                <Clock className="w-3.5 h-3.5 text-[#D4A373]" /> {pkg.duration}
              </span>
              <span className="text-white/40">·</span>
              <span className="flex items-center gap-1.5 font-bold text-[#E9D8A6] text-sm">
                PKR {pkg.pricePkr.toLocaleString()}
                {pkg.originalPricePkr && (
                  <span className="text-xs text-white/60 line-through font-normal">
                    PKR {pkg.originalPricePkr.toLocaleString()}
                  </span>
                )}
              </span>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-6 max-h-[50vh] overflow-y-auto">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#133826] mb-2">
              Package Overview
            </h3>
            <p className="text-sm text-[#3E5046] leading-relaxed">
              {pkg.description}
            </p>
          </div>

          {/* Day by Day Itinerary */}
          {pkg.itinerary && pkg.itinerary.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#133826] mb-3">
                Curated Itinerary
              </h3>
              <div className="space-y-3">
                {pkg.itinerary.map((day) => (
                  <div key={day.day} className="flex gap-4 p-3 bg-white rounded-xl border border-[#E5DFD7]">
                    <div className="w-10 h-10 rounded-lg bg-[#133826] text-[#D4A373] flex flex-col items-center justify-center shrink-0 font-serif font-bold text-xs">
                      <span>D{day.day}</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-[#133826]">{day.title}</h4>
                      <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{day.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Inclusions & Exclusions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-[#F0EFEA] rounded-xl border border-[#E0DBD2]">
              <h4 className="text-xs font-bold text-[#133826] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#2D6A4F]" /> What’s Included
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {pkg.inclusions.map((item, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-[#2D6A4F] font-bold">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 bg-[#FAF5F5] rounded-xl border border-[#EFE0E0]">
              <h4 className="text-xs font-bold text-[#8C3A3A] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <X className="w-4 h-4 text-[#B54D4D]" /> What’s Excluded
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-600">
                {pkg.exclusions.map((item, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-red-400 font-bold">✕</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Footer Action */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#E5DFD7]">
            <div>
              <span className="text-xs text-slate-500 block">Total Investment</span>
              <span className="text-xl font-bold text-[#133826]">PKR {pkg.pricePkr.toLocaleString()}</span>
              <span className="text-xs text-slate-500 ml-1.5">(Per person / all inclusions)</span>
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
                  onBookNow(pkg);
                }}
                className="flex-1 sm:flex-none px-6 py-2.5 bg-gradient-to-r from-[#C5A059] to-[#D8B574] text-[#07140E] hover:from-[#D8B574] hover:to-[#E8CF9B] rounded-xl text-xs font-bold shadow-md transition-all"
              >
                Book This Package Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
