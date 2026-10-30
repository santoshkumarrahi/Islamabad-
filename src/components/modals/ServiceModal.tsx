import React from 'react';
import { Service } from '../../types';
import { X, Check, Compass, Mountain, Hotel, Users, Tent, Car, Utensils, Camera, Sparkles } from 'lucide-react';

interface ServiceModalProps {
  service: Service | null;
  onClose: () => void;
  onInquire: (service: Service) => void;
}

const iconMap: Record<string, React.ElementType> = {
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

export const ServiceModal: React.FC<ServiceModalProps> = ({
  service,
  onClose,
  onInquire,
}) => {
  if (!service) return null;

  const IconComp = iconMap[service.iconName] || Sparkles;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="fixed inset-0 bg-[#0F241B]/80 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-[#FBF9F5] rounded-3xl shadow-2xl border-2 border-[#C5A059]/40 overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 bg-black/60 hover:bg-black/90 text-white p-2.5 rounded-full transition-colors backdrop-blur-md border border-white/20"
        >
          <X className="w-5 h-5 text-[#D8B574]" />
        </button>

        <div className="relative h-60 sm:h-72 w-full overflow-hidden">
          <img
            src={service.imageUrl}
            alt={service.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          <div className="absolute bottom-6 left-6 right-6 text-white">
            <div className="flex items-center gap-2 mb-2">
              <span className="p-1.5 bg-[#D4A373] text-[#133826] rounded-md inline-flex items-center justify-center">
                <IconComp className="w-4 h-4" />
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#D4A373]">
                {service.category}
              </span>
              {service.statusBadge && (
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-white/20 backdrop-blur-sm">
                  {service.statusBadge}
                </span>
              )}
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white drop-shadow">
              {service.title}
            </h2>
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-5">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#133826] mb-2">
              Service Description & Scope
            </h3>
            <p className="text-sm text-[#3E5046] leading-relaxed">
              {service.fullDescription || service.shortDescription}
            </p>
          </div>

          <div className="p-4 bg-[#F2EDE5] rounded-xl border border-[#E0D7CB]">
            <h4 className="text-xs font-bold text-[#133826] uppercase tracking-wider mb-2">
              What Is Included In Every Booking
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#2D6A4F]" /> Certified local escorts
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#2D6A4F]" /> Chilled bottled water & wipes
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#2D6A4F]" /> Clean executive vehicle
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#2D6A4F]" /> WhatsApp 24/7 support line
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 pt-3 border-t border-[#E5DFD7]">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-slate-300 text-slate-700 rounded-xl text-xs font-semibold hover:bg-slate-100 transition-colors"
            >
              Back
            </button>
            <button
              onClick={() => {
                onClose();
                onInquire(service);
              }}
              className="px-6 py-2.5 bg-gradient-to-r from-[#C5A059] to-[#D8B574] text-[#07140E] hover:from-[#D8B574] hover:to-[#E8CF9B] rounded-xl text-xs font-bold shadow-md transition-all"
            >
              Inquire About This Service
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
