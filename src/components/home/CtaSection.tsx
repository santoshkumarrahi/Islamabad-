import React from 'react';
import { useCms } from '../../context/CmsContext';
import { MessageSquare, ArrowRight, Sparkles } from 'lucide-react';

interface CtaSectionProps {
  onPlanTrip: () => void;
}

export const CtaSection: React.FC<CtaSectionProps> = ({ onPlanTrip }) => {
  const { sections, settings } = useCms();
  const config = sections.find((s) => s.id === 'sec-cta');

  if (config && !config.isVisible) return null;

  const whatsappClean = settings.whatsappNumber.replace(/[^0-9]/g, '');

  return (
    <section id="cta" className="relative py-28 sm:py-36 overflow-hidden bg-[#07140E]">
      {/* Background Image: Faisal Mosque Sunset Reflections */}
      <div className="absolute inset-0">
        <img
          src="/assets/aistudio/Faisal_Mosque_Tours_a6b4199e.jfif"
          alt="Cinematic Sunset over Islamabad"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07140E]/95 via-[#07140E]/80 to-[#07140E]/95" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-[#C5A059]/40 text-[#D8B574] text-xs font-mono uppercase tracking-[0.25em]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>YOUR CAPITAL RETREAT AWAITS</span>
        </div>

        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold text-[#FAF8F5] tracking-tight leading-[1.1]">
          {config?.title || 'Ready to Explore Islamabad?'}
        </h2>

        <p className="text-base sm:text-xl text-white/85 max-w-2xl mx-auto font-light leading-relaxed">
          {config?.subtitle ||
            'Let us help you discover unforgettable experiences in Pakistan’s beautiful capital.'}
        </p>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onPlanTrip}
            className="px-9 py-4 rounded-full bg-gradient-to-r from-[#C5A059] via-[#D8B574] to-[#C5A059] text-[#07140E] font-extrabold text-xs uppercase tracking-widest hover:brightness-110 hover:scale-102 transition-all shadow-2xl shadow-black/60 flex items-center gap-2"
          >
            <span>Plan Your Custom Trip</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <a
            href={`https://wa.me/${whatsappClean}?text=${encodeURIComponent(settings.whatsappMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-[#FAF8F5] font-semibold text-xs uppercase tracking-widest backdrop-blur-md border border-white/20 hover:border-[#D8B574] transition-all flex items-center gap-2 shadow-lg"
          >
            <MessageSquare className="w-4 h-4 text-[#25D366]" />
            <span>Consult Itinerary Specialist</span>
          </a>
        </div>
      </div>
    </section>
  );
};
