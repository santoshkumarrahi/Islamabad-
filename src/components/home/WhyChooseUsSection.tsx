import React from 'react';
import { useCms } from '../../context/CmsContext';
import { ShieldCheck, Compass, Wallet, Headphones, CheckCircle2, Award, Sparkles } from 'lucide-react';

interface WhyChooseUsSectionProps {
  onPlanTrip: () => void;
}

export const WhyChooseUsSection: React.FC<WhyChooseUsSectionProps> = ({ onPlanTrip }) => {
  const { sections } = useCms();
  const config = sections.find((s) => s.id === 'sec-why-us');

  if (config && !config.isVisible) return null;

  const pillars = [
    {
      title: 'Certified Native Historians & Trail Guides',
      desc: 'Accompanied by verified local scholars and mountain escorts fluent in English, Urdu, and diplomatic etiquette.',
      icon: Compass,
    },
    {
      title: 'Transparent Luxury Pricing in PKR',
      desc: 'All-inclusive guaranteed rates in Pakistani Rupees with zero concealed fees. VIP access to monuments and dining reservations.',
      icon: Wallet,
    },
    {
      title: 'Diplomatic & Family Safety Standards',
      desc: 'GPS-tracked executive fleet (Toyota Prado, Land Cruiser, Grand Cabin) and security-vetted drivers for peace of mind.',
      icon: ShieldCheck,
    },
    {
      title: '24/7 Dedicated Capital Concierge',
      desc: 'Direct WhatsApp communication with your personal travel architect from initial inquiry through post-trip farewell.',
      icon: Headphones,
    },
    {
      title: 'Seamless Instant Booking & Confirmation',
      desc: 'Rapid reservations, flexible itinerary adjustments, and customized payment arrangements.',
      icon: CheckCircle2,
    },
  ];

  return (
    <section id="why-us" className="py-24 sm:py-32 bg-[#FBF9F5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Asymmetric Luxury Photo Frame */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-[#C5A059]/40 aspect-[4/5] bg-[#07140E]">
              <img
                src="/assets/aistudio/Islamabad_1_dce94780.jfif"
                alt="Islamabad Capital Elegance"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07140E]/80 via-transparent to-transparent" />
            </div>

            {/* Floating Gold Award Plaque */}
            <div className="absolute -bottom-6 -right-4 sm:-bottom-8 sm:right-6 bg-[#0B2017] text-[#FAF8F5] p-6 rounded-3xl shadow-2xl border border-[#C5A059]/60 max-w-[270px]">
              <div className="flex items-center gap-2 text-[#D8B574] text-xs font-bold uppercase tracking-widest mb-1">
                <Award className="w-4 h-4" /> Capital Excellence
              </div>
              <div className="font-serif text-3xl font-bold text-[#FAF8F5]">4.95 / 5.0</div>
              <p className="text-xs text-white/70 mt-1 font-light leading-relaxed">
                Rated #1 Boutique Travel Curator in Islamabad by international and domestic delegations.
              </p>
            </div>
          </div>

          {/* Right Column: Narrative & Pillars */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <div className="flex items-center gap-2 text-[#C5A059] text-xs font-mono uppercase tracking-[0.25em] mb-3">
                <span>OUR DISTINCTION</span>
                <span className="w-8 h-[1px] bg-[#C5A059]" />
              </div>
              <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#0B2017] tracking-tight">
                {config?.title || 'The Gold Standard in Capital Hospitality'}
              </h2>
              <p className="mt-4 text-xs sm:text-sm text-[#4A5D53] leading-relaxed font-light">
                {config?.subtitle ||
                  'Islamabad is a symphony of modern geometry and untamed Himalayan foothills. We open doors to private courtyards, secluded pine ridges, and refined experiences that casual tourists never witness.'}
              </p>
            </div>

            {/* 5 Pillars */}
            <div className="space-y-3.5">
              {pillars.map((pillar, idx) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={idx}
                    className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-[#EBE4DC] hover:border-[#C5A059] shadow-xs hover:shadow-md transition-all group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#FAF8F5] text-[#0B2017] group-hover:bg-[#0B2017] group-hover:text-[#D8B574] transition-colors flex items-center justify-center shrink-0 border border-[#E0D7CB]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-[#0B2017] group-hover:text-[#C5A059] transition-colors">
                        {pillar.title}
                      </h3>
                      <p className="text-xs text-[#52645B] mt-1 leading-relaxed font-light">
                        {pillar.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom KPI Strip */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-[#E5DFD7]">
              <div>
                <div className="text-2xl sm:text-4xl font-serif font-bold text-[#0B2017]">12,500+</div>
                <div className="text-xs text-slate-500 mt-1 uppercase font-mono tracking-wider">Distinguished Guests</div>
              </div>
              <div>
                <div className="text-2xl sm:text-4xl font-serif font-bold text-[#0B2017]">100%</div>
                <div className="text-xs text-slate-500 mt-1 uppercase font-mono tracking-wider">Licensed Historians</div>
              </div>
              <div>
                <div className="text-2xl sm:text-4xl font-serif font-bold text-[#0B2017]">24 / 7</div>
                <div className="text-xs text-slate-500 mt-1 uppercase font-mono tracking-wider">Dedicated Concierge</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
