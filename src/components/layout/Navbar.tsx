import React, { useState, useEffect } from 'react';
import { useCms } from '../../context/CmsContext';
import { Logo } from '../common/Logo';
import { Search, MessageSquare, Menu, X, Shield, Sun, Sparkles, ArrowRight } from 'lucide-react';

interface NavbarProps {
  onOpenPlanTrip: () => void;
  onOpenSearch: () => void;
  onNavigateToAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenPlanTrip,
  onOpenSearch,
  onNavigateToAdmin,
}) => {
  const { settings, navItems, isAuthenticated } = useCms();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const whatsappCleanNumber = settings.whatsappNumber.replace(/[^0-9]/g, '');

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'py-3 bg-[#0B2017]/90 backdrop-blur-xl border-b border-[#C5A059]/30 shadow-2xl shadow-black/30'
          : 'py-5 bg-gradient-to-b from-black/85 via-black/40 to-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6">
          {/* Brand Logo Zone */}
          <a href="#home" className="shrink-0">
            <Logo
              variant="dark"
              size="md"
              showSubtitle={true}
            />
          </a>

          {/* Navigation Links (Editorial Minimalist Single-Line) */}
          <nav className="hidden lg:flex items-center gap-7">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className="text-xs font-medium uppercase tracking-[0.16em] text-white/80 hover:text-[#D8B574] transition-all whitespace-nowrap shrink-0 relative py-1 group"
              >
                <span>{item.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#D8B574] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Action Zone: Weather marker, Search, WhatsApp, Plan Trip & CMS Switcher */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Live Weather / Location Pill */}
            <div className="hidden xl:flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/80 text-[11px] backdrop-blur-md">
              <Sun className="w-3.5 h-3.5 text-[#D8B574]" />
              <span className="font-mono text-[10px] tracking-wider">ISB 24°C</span>
            </div>

            {/* Quick Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="p-2 rounded-full text-white/80 hover:text-[#D8B574] hover:bg-white/10 transition-colors backdrop-blur-sm"
              title="Search Destinations, Packages & Hiking Trails"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* WhatsApp Concierge */}
            <a
              href={`https://wa.me/${whatsappCleanNumber}?text=${encodeURIComponent(settings.whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#25D366] border border-[#25D366]/30 transition-all backdrop-blur-md"
              title="Chat with Concierge on WhatsApp"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span className="text-[11px] font-medium tracking-wide">Concierge</span>
            </a>

            {/* Admin CMS Access Badge */}
            <button
              onClick={onNavigateToAdmin}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-[11px] font-semibold transition-all border ${
                isAuthenticated
                  ? 'bg-[#143D2D] text-[#D8B574] border-[#C5A059]/60 hover:bg-[#0B2017]'
                  : 'bg-white/5 text-white/80 hover:text-white hover:bg-white/15 border-white/15'
              }`}
              title="Enter Admin CMS Dashboard"
            >
              <Shield className="w-3 h-3 text-[#D8B574]" />
              <span className="hidden md:inline">Admin CMS</span>
            </button>

            {/* Primary Gold Action CTA */}
            <button
              onClick={onOpenPlanTrip}
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#C5A059] via-[#D8B574] to-[#C5A059] text-[#07140E] text-xs font-extrabold uppercase tracking-widest hover:brightness-110 hover:shadow-lg hover:shadow-[#D8B574]/20 transition-all whitespace-nowrap shrink-0 shadow-md flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Plan Your Trip</span>
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-white/90 hover:text-white"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#07140E]/95 backdrop-blur-2xl border-b border-[#C5A059]/30 px-6 py-8 space-y-5 animate-in slide-in-from-top duration-300">
          <nav className="flex flex-col gap-3">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-serif uppercase tracking-widest text-[#FAF8F5] hover:text-[#D8B574] py-2 flex items-center justify-between border-b border-white/10"
              >
                <span>{item.label}</span>
                <ArrowRight className="w-4 h-4 text-[#D8B574]" />
              </a>
            ))}
          </nav>

          <div className="pt-2 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPlanTrip();
              }}
              className="w-full py-3 bg-gradient-to-r from-[#C5A059] to-[#D8B574] text-[#07140E] font-bold text-xs uppercase tracking-widest rounded-xl text-center shadow-lg"
            >
              Plan Custom Itinerary
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigateToAdmin();
              }}
              className="w-full py-2.5 bg-white/10 text-white/90 hover:text-white font-medium text-xs rounded-xl flex items-center justify-center gap-2 border border-white/15"
            >
              <Shield className="w-3.5 h-3.5 text-[#D8B574]" /> Open Admin CMS Dashboard
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
