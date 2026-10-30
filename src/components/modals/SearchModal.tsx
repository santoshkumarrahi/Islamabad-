import React, { useState, useMemo } from 'react';
import { useCms } from '../../context/CmsContext';
import { Destination, Service, TravelPackage } from '../../types';
import { Search, X, MapPin, Package, Compass, ArrowRight } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectDestination: (d: Destination) => void;
  onSelectPackage: (p: TravelPackage) => void;
  onSelectService: (s: Service) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectDestination,
  onSelectPackage,
  onSelectService,
}) => {
  const { destinations, packages, services } = useCms();
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    if (!query.trim()) {
      return {
        destinations: destinations.slice(0, 3),
        packages: packages.slice(0, 2),
        services: services.slice(0, 2),
      };
    }
    const q = query.toLowerCase();
    return {
      destinations: destinations.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.category.toLowerCase().includes(q) ||
          d.location.toLowerCase().includes(q)
      ),
      packages: packages.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      ),
      services: services.filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.category.toLowerCase().includes(q) ||
          s.shortDescription.toLowerCase().includes(q)
      ),
    };
  }, [query, destinations, packages, services]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-16 sm:pt-24 p-4 overflow-y-auto">
      <div className="fixed inset-0 bg-[#0F241B]/80 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-[#FBF9F5] rounded-3xl shadow-2xl border-2 border-[#C5A059]/40 overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-150">
        {/* Search Header */}
        <div className="p-4 border-b border-[#E5DFD7] flex items-center gap-3 bg-white">
          <Search className="w-5 h-5 text-[#8A6D3B]" />
          <input
            type="text"
            autoFocus
            placeholder="Search Islamabad destinations, hiking trails, hotels, or packages..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm sm:text-base text-slate-900 placeholder:text-slate-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-slate-400 hover:text-slate-600 text-xs px-2 py-1 rounded"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Destinations */}
          {results.destinations.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#133826] mb-2.5">
                <MapPin className="w-3.5 h-3.5 text-[#2D6A4F]" /> Destinations
              </div>
              <div className="space-y-2">
                {results.destinations.map((d) => (
                  <div
                    key={d.id}
                    onClick={() => {
                      onClose();
                      onSelectDestination(d);
                    }}
                    className="flex items-center gap-3 p-2.5 rounded-xl bg-white border border-[#EBE4DC] hover:border-[#133826] hover:shadow-sm cursor-pointer transition-all group"
                  >
                    <img
                      src={d.featuredImage}
                      alt={d.name}
                      className="w-12 h-12 rounded-lg object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-[#133826] group-hover:text-[#2D6A4F] truncate">
                        {d.name}
                      </div>
                      <div className="text-xs text-slate-500 truncate">{d.location}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-[#133826] shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Packages */}
          {results.packages.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#133826] mb-2.5">
                <Package className="w-3.5 h-3.5 text-[#2D6A4F]" /> Travel Packages
              </div>
              <div className="space-y-2">
                {results.packages.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => {
                      onClose();
                      onSelectPackage(p);
                    }}
                    className="flex items-center gap-3 p-2.5 rounded-xl bg-white border border-[#EBE4DC] hover:border-[#133826] hover:shadow-sm cursor-pointer transition-all group"
                  >
                    <img
                      src={p.featuredImage}
                      alt={p.title}
                      className="w-12 h-12 rounded-lg object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-[#133826] group-hover:text-[#2D6A4F] truncate">
                        {p.title}
                      </div>
                      <div className="text-xs text-[#2D6A4F] font-bold">
                        PKR {p.pricePkr.toLocaleString()} · {p.duration}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-[#133826] shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Services */}
          {results.services.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#133826] mb-2.5">
                <Compass className="w-3.5 h-3.5 text-[#2D6A4F]" /> Services & Experiences
              </div>
              <div className="space-y-2">
                {results.services.map((s) => (
                  <div
                    key={s.id}
                    onClick={() => {
                      onClose();
                      onSelectService(s);
                    }}
                    className="flex items-center gap-3 p-2.5 rounded-xl bg-white border border-[#EBE4DC] hover:border-[#133826] hover:shadow-sm cursor-pointer transition-all group"
                  >
                    <img
                      src={s.imageUrl}
                      alt={s.title}
                      className="w-12 h-12 rounded-lg object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-[#133826] group-hover:text-[#2D6A4F] truncate">
                        {s.title}
                      </div>
                      <div className="text-xs text-slate-500 truncate">{s.category}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-[#133826] shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {results.destinations.length === 0 &&
            results.packages.length === 0 &&
            results.services.length === 0 && (
              <div className="text-center py-10 text-slate-400 text-sm">
                No matching results found for "{query}". Try "Faisal Mosque", "Hiking", or "Serena".
              </div>
            )}
        </div>
      </div>
    </div>
  );
};
