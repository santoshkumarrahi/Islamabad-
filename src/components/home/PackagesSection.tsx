import React from 'react';
import { useCms } from '../../context/CmsContext';
import { TravelPackage } from '../../types';
import { Clock, Check, ArrowRight, Sparkles } from 'lucide-react';

interface PackagesSectionProps {
  onSelectPackage: (pkg: TravelPackage) => void;
  onBookPackage: (pkg: TravelPackage) => void;
}

export const PackagesSection: React.FC<PackagesSectionProps> = ({
  onSelectPackage,
  onBookPackage,
}) => {
  const { packages, sections } = useCms();
  const config = sections.find((s) => s.id === 'sec-packages');

  if (config && !config.isVisible) return null;

  const published = packages
    .filter((p) => p.isPublished && p.isAvailable)
    .sort((a, b) => a.order - b.order);

  return (
    <section id="packages" className="py-24 sm:py-32 bg-[#FBF9F5] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-[#C5A059] text-xs font-mono uppercase tracking-[0.25em] mb-3">
            <span>CURATED ITINERARIES</span>
            <span className="w-8 h-[1px] bg-[#C5A059]" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#0B2017] tracking-tight">
            {config?.title || 'Special Travel Packages'}
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-[#4A5D53] font-light max-w-xl mx-auto">
            {config?.subtitle ||
              'Complete all-inclusive expeditions priced transparently in Pakistani Rupees (PKR) with executive chauffeured transport.'}
          </p>
        </div>

        {/* Packages Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {published.map((pkg) => (
            <div
              key={pkg.id}
              className="group bg-white rounded-3xl overflow-hidden border border-[#EBE4DC] hover:border-[#C5A059] shadow-xs hover:shadow-2xl transition-all duration-500 flex flex-col justify-between"
            >
              {/* Photo & Pricing Banner */}
              <div className="relative h-64 overflow-hidden bg-[#07140E]">
                <img
                  src={pkg.featuredImage}
                  alt={pkg.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                <div className="absolute top-4 left-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-[#07140E]/85 backdrop-blur-md text-[#D8B574] border border-[#C5A059]/40">
                    {pkg.category}
                  </span>
                </div>

                <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 text-slate-900 text-xs font-bold shadow-md">
                  <Clock className="w-3.5 h-3.5 text-[#0B2017]" /> {pkg.duration}
                </div>

                {/* Pricing Display */}
                <div className="absolute bottom-4 left-5 right-5 text-white">
                  <span className="text-[10px] font-mono text-[#D8B574] uppercase tracking-widest block">
                    INVESTMENT IN PKR
                  </span>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="text-2xl sm:text-3xl font-serif font-bold text-white drop-shadow">
                      PKR {pkg.pricePkr.toLocaleString()}
                    </span>
                    {pkg.originalPricePkr && (
                      <span className="text-xs text-white/50 line-through font-normal">
                        PKR {pkg.originalPricePkr.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Package Content */}
              <div className="p-7 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="font-serif font-bold text-2xl text-[#0B2017] group-hover:text-[#C5A059] transition-colors leading-snug">
                    {pkg.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-[#4A5D53] line-clamp-2 leading-relaxed font-light">
                    {pkg.description}
                  </p>

                  {/* Highlights checklist */}
                  <div className="mt-5 pt-4 border-t border-[#F0EAE1]">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#8A6D3B] block mb-2 font-mono">
                      INCLUDED PRIVILEGES
                    </span>
                    <ul className="space-y-1.5 text-xs text-slate-700">
                      {pkg.inclusions.slice(0, 3).map((inc, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-[#2D6A4F] shrink-0 mt-0.5" />
                          <span className="line-clamp-1 font-light">{inc}</span>
                        </li>
                      ))}
                      {pkg.inclusions.length > 3 && (
                        <li className="text-[11px] text-[#2D6A4F] font-semibold pl-5">
                          + {pkg.inclusions.length - 3} more curated amenities
                        </li>
                      )}
                    </ul>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-7 pt-5 border-t border-[#F0EAE1] flex items-center gap-3">
                  <button
                    onClick={() => onSelectPackage(pkg)}
                    className="flex-1 py-3 px-4 border border-slate-300 hover:border-[#0B2017] text-slate-700 hover:text-[#0B2017] rounded-2xl text-xs font-semibold transition-colors text-center"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => onBookPackage(pkg)}
                    className="flex-1 py-3 px-4 bg-gradient-to-r from-[#C5A059] to-[#D8B574] text-[#07140E] rounded-2xl text-xs font-extrabold uppercase tracking-widest hover:brightness-110 shadow-md transition-all text-center flex items-center justify-center gap-1.5"
                  >
                    <span>Reserve</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
