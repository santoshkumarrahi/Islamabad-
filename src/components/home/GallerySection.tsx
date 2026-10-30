import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { GalleryItem } from '../../types';
import { Maximize2, Camera } from 'lucide-react';

interface GallerySectionProps {
  onOpenLightbox: (items: GalleryItem[], index: number) => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ onOpenLightbox }) => {
  const { gallery, sections } = useCms();
  const config = sections.find((s) => s.id === 'sec-gallery');

  const [activeCategory, setActiveCategory] = useState<string>('All');

  if (config && !config.isVisible) return null;

  const categories = ['All', 'Monuments', 'Margalla Trails', 'Scenic Vistas', 'Culture & Food'];

  const filteredItems = activeCategory === 'All'
    ? gallery
    : gallery.filter((item) => item.category === activeCategory);

  return (
    <section id="gallery" className="py-24 sm:py-32 bg-[#F3EFEA] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-[#C5A059] text-xs font-mono uppercase tracking-[0.25em] mb-3">
            <span>PHOTOGRAPHIC EXHIBITION</span>
            <span className="w-8 h-[1px] bg-[#C5A059]" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#0B2017] tracking-tight">
            {config?.title || 'Travel Experience Gallery'}
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-[#4A5D53] font-light max-w-xl mx-auto">
            {config?.subtitle ||
              'A curated visual tribute to the Margalla ridges, Faisal Mosque twilight reflections, and ancient Gandhara heritage.'}
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                activeCategory === cat
                  ? 'bg-[#0B2017] text-[#D8B574] shadow-md'
                  : 'bg-white text-slate-700 hover:text-slate-900 border border-[#D5CEC5]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Asymmetric Fine-Art Masonry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item, index) => {
            const isFeaturedHero = index % 5 === 0;

            return (
              <div
                key={item.id}
                onClick={() => onOpenLightbox(filteredItems, index)}
                className={`group relative rounded-3xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500 border border-[#C5A059]/30 bg-[#07140E] ${
                  isFeaturedHero ? 'sm:col-span-2 aspect-[16/9]' : 'aspect-[4/3]'
                }`}
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                />

                {/* Scrim Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />

                {/* Enlarge Eye Icon */}
                <div className="absolute top-4 right-4 p-3 rounded-full bg-black/50 backdrop-blur-md text-[#D8B574] border border-[#C5A059]/40 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-4 h-4" />
                </div>

                {/* Caption Block */}
                <div className="absolute bottom-5 left-5 right-5 text-white transform transition-transform duration-300 group-hover:-translate-y-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#D8B574] bg-[#07140E]/80 px-2 py-0.5 rounded backdrop-blur-md">
                      {item.category}
                    </span>
                  </div>
                  <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#FAF8F5] drop-shadow-md">
                    {item.title}
                  </h3>
                  {item.caption && (
                    <p className="text-xs text-white/80 line-clamp-1 mt-1 font-light">
                      {item.caption}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
