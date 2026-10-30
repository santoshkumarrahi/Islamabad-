import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { Service } from '../../types';
import { Compass, Mountain, Hotel, Users, Tent, Car, Utensils, Camera, Sparkles, ArrowRight } from 'lucide-react';

interface ServicesSectionProps {
  onSelectService: (service: Service) => void;
}

const iconComponents: Record<string, React.ElementType> = {
  Compass,
  Mountain,
  Hotel,
  Users,
  Tent,
  Car,
  Utensils,
  Camera,
  Sparkles,
};

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const { services, sections } = useCms();
  const config = sections.find((s) => s.id === 'sec-services');

  const [selectedCat, setSelectedCat] = useState('All');

  if (config && !config.isVisible) return null;

  const enabledServices = services
    .filter((s) => s.isEnabled)
    .sort((a, b) => a.order - b.order);

  const categories = ['All', ...Array.from(new Set(enabledServices.map((s) => s.category)))];

  const filtered = selectedCat === 'All'
    ? enabledServices
    : enabledServices.filter((s) => s.category === selectedCat);

  return (
    <section id="services" className="py-24 sm:py-32 bg-[#FBF9F5] relative overflow-hidden">
      {/* Decorative Subtle Background Crest Watermark */}
      <div className="absolute right-0 top-1/4 -translate-y-1/2 w-96 h-96 rounded-full bg-[#C5A059]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-[#E5DFD7] pb-8">
          <div>
            <div className="flex items-center gap-2 text-[#C5A059] text-xs font-mono uppercase tracking-[0.25em] mb-3">
              <span>EXPEDITION CHAPTERS</span>
              <span className="w-8 h-[1px] bg-[#C5A059]" />
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#0B2017] tracking-tight">
              {config?.title || 'Curated Travel Experiences'}
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-[#4A5D53] max-w-md font-light leading-relaxed">
            {config?.subtitle ||
              'Handcrafted itineraries for discerning travelers, featuring diplomatic security, certified historians, and private alpine trail escorts.'}
          </p>
        </div>

        {/* Filter Category Tabs */}
        {categories.length > 2 && (
          <div className="flex flex-wrap items-center gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                  selectedCat === cat
                    ? 'bg-[#0B2017] text-[#D8B574] shadow-md'
                    : 'bg-white text-slate-600 hover:text-slate-900 border border-[#E5DFD7]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* 3-Column Luxury Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {filtered.map((service, index) => {
            const Icon = iconComponents[service.iconName] || Sparkles;
            const chapterIndex = String(index + 1).padStart(2, '0');

            return (
              <div
                key={service.id}
                onClick={() => onSelectService(service)}
                className="group bg-white rounded-3xl overflow-hidden border border-[#EBE4DC] hover:border-[#C5A059] shadow-xs hover:shadow-2xl transition-all duration-500 flex flex-col justify-between cursor-pointer"
              >
                {/* Image Showcase */}
                <div className="relative h-64 overflow-hidden bg-[#07140E]">
                  <img
                    src={service.imageUrl}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                  {/* Chapter Number Emblem */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#D8B574] bg-[#07140E]/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-[#C5A059]/40">
                      {chapterIndex}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-white/20 backdrop-blur-md text-white">
                      {service.category}
                    </span>
                  </div>

                  {/* Icon Badge */}
                  <div className="absolute top-4 right-4 p-2.5 rounded-full bg-[#07140E]/80 backdrop-blur-md text-[#D8B574] border border-[#C5A059]/40 shadow-md">
                    <Icon className="w-4 h-4" />
                  </div>

                  {/* Status Tag */}
                  {service.statusBadge && (
                    <div className="absolute bottom-4 right-4 text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full bg-[#C5A059] text-[#07140E]">
                      {service.statusBadge}
                    </div>
                  )}
                </div>

                {/* Content Area */}
                <div className="p-7 flex flex-col flex-1 justify-between">
                  <div>
                    <h3 className="font-serif font-bold text-2xl text-[#0B2017] group-hover:text-[#C5A059] transition-colors leading-snug">
                      {service.title}
                    </h3>
                    <p className="mt-3 text-xs sm:text-sm text-[#4A5D53] line-clamp-3 leading-relaxed font-light">
                      {service.shortDescription}
                    </p>
                  </div>

                  {/* Action Link */}
                  <div className="mt-6 pt-5 border-t border-[#F0EAE1] flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#0B2017] group-hover:text-[#C5A059] flex items-center gap-2 transition-colors">
                      <span>Curate Experience</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1.5" />
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">Bespoke</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
