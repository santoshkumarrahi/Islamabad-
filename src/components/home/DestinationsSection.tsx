import React, { useState, useRef } from 'react';
import { useCms } from '../../context/CmsContext';
import { Destination } from '../../types';
import { MapPin, Star, ArrowRight, ChevronLeft, ChevronRight, Clock, DollarSign, Compass } from 'lucide-react';

interface DestinationsSectionProps {
  onSelectDestination: (dest: Destination) => void;
  filterDestinationId?: string;
}

export const DestinationsSection: React.FC<DestinationsSectionProps> = ({
  onSelectDestination,
  filterDestinationId,
}) => {
  const { destinations, sections } = useCms();
  const config = sections.find((s) => s.id === 'sec-destinations');

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  if (config && !config.isVisible) return null;

  const publishedDestinations = destinations
    .filter((d) => d.isPublished)
    .sort((a, b) => a.order - b.order);

  const categories = [
    'All',
    'Heritage & Architecture',
    'Nature & Trails',
    'Viewpoints & Dining',
    'Cultural Museums',
  ];

  const filteredDestinations = publishedDestinations.filter((d) => {
    if (filterDestinationId && d.id === filterDestinationId) return true;
    if (activeCategory === 'All') return true;
    return d.category === activeCategory;
  });

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const amount = direction === 'left' ? -420 : 420;
      scrollContainerRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  return (
    <section id="destinations" className="py-24 sm:py-32 bg-[#F3EFEA] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Row with Editorial Subtitle */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-[#C5A059] text-xs font-mono uppercase tracking-[0.25em] mb-3">
              <span>ICONIC LANDMARKS</span>
              <span className="w-8 h-[1px] bg-[#C5A059]" />
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#0B2017] tracking-tight">
              {config?.title || 'Popular Islamabad Destinations'}
            </h2>
            <p className="text-xs sm:text-sm text-[#4A5D53] mt-2 max-w-xl font-light">
              {config?.subtitle ||
                'From sacred marble sanctuaries to 3,900-foot alpine dining terraces suspended over clouds.'}
            </p>
          </div>

          {/* Navigation Chevrons */}
          <div className="flex items-center gap-3 self-start md:self-end">
            <button
              onClick={() => scroll('left')}
              className="p-3.5 rounded-full bg-white text-[#0B2017] hover:bg-[#0B2017] hover:text-[#D8B574] transition-all shadow-md border border-[#D5CEC5]"
              aria-label="Previous Destinations"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-3.5 rounded-full bg-white text-[#0B2017] hover:bg-[#0B2017] hover:text-[#D8B574] transition-all shadow-md border border-[#D5CEC5]"
              aria-label="Next Destinations"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider whitespace-nowrap shrink-0 transition-all ${
                activeCategory === cat
                  ? 'bg-[#0B2017] text-[#D8B574] shadow-md'
                  : 'bg-white text-slate-700 hover:text-slate-900 border border-[#D5CEC5]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Spatial Destination Slider */}
        <div
          ref={scrollContainerRef}
          className="flex gap-8 overflow-x-auto pb-6 scroll-smooth snap-x snap-mandatory no-scrollbar"
        >
          {filteredDestinations.map((dest) => (
            <div
              key={dest.id}
              onClick={() => onSelectDestination(dest)}
              className="snap-start shrink-0 w-[320px] sm:w-[400px] bg-white rounded-3xl overflow-hidden border border-[#E5DFD7] hover:border-[#C5A059] shadow-xs hover:shadow-2xl transition-all duration-500 flex flex-col justify-between group cursor-pointer"
            >
              {/* Photo Showcase */}
              <div className="relative h-72 overflow-hidden bg-[#07140E]">
                <img
                  src={dest.featuredImage}
                  alt={dest.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                {/* Badges */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-[#07140E]/80 backdrop-blur-md text-[#D8B574] border border-[#C5A059]/40">
                    {dest.category}
                  </span>
                  {dest.isFeatured && (
                    <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-[#C5A059] text-[#07140E]">
                      Must Visit
                    </span>
                  )}
                </div>

                <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#07140E]/80 backdrop-blur-md text-[#D8B574] text-xs font-bold border border-white/10">
                  <Star className="w-3.5 h-3.5 fill-current" /> {dest.rating}
                </div>

                {/* Name over Photo */}
                <div className="absolute bottom-4 left-5 right-5 text-white">
                  <h3 className="font-serif font-bold text-2xl sm:text-3xl text-[#FAF8F5] drop-shadow-md">
                    {dest.name}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-white/80 mt-1 font-light">
                    <MapPin className="w-3.5 h-3.5 text-[#D8B574]" />
                    <span className="truncate">{dest.location}</span>
                  </div>
                </div>
              </div>

              {/* Information Strip */}
              <div className="p-6 flex flex-col justify-between flex-1">
                <p className="text-xs sm:text-sm text-[#4A5D53] line-clamp-2 leading-relaxed font-light">
                  {dest.shortDescription}
                </p>

                {/* Facts row */}
                <div className="mt-5 grid grid-cols-2 gap-2 text-xs py-3 border-y border-[#F0EAE1]">
                  <div className="flex items-center gap-1.5 text-slate-600">
                    <Clock className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>Duration: <strong>{dest.typicalDuration}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-600">
                    <DollarSign className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span className="truncate">Fee: <strong>{dest.entryFee}</strong></span>
                  </div>
                </div>

                {/* Explore Action Button */}
                <div className="mt-5 flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#0B2017] group-hover:text-[#C5A059] flex items-center gap-1.5 transition-colors">
                    <span>View Dossier</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">Guided Tours Available</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
