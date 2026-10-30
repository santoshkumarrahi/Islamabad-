import React, { useState, useEffect } from 'react';
import { useCms } from '../../context/CmsContext';
import { Logo } from '../common/Logo';
import { MapPin, Phone, Mail, MessageSquare, Send, Instagram, Facebook, Youtube, Twitter, Shield, Clock, Heart } from 'lucide-react';

interface FooterProps {
  onNavigateToAdmin: () => void;
  onOpenPlanTrip: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateToAdmin, onOpenPlanTrip }) => {
  const { settings, navItems, destinations, addToast } = useCms();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [isbTime, setIsbTime] = useState('');

  // Live Islamabad Local Time Clock (PKT = UTC+5)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format to Asia/Karachi time
      const timeStr = now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Karachi',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });
      setIsbTime(timeStr);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      addToast('Please enter a valid email address', 'error');
      return;
    }
    setSubscribed(true);
    addToast('Thank you for subscribing to Islamabad Escapes Private Dispatch', 'success');
  };

  const whatsappClean = settings.whatsappNumber.replace(/[^0-9]/g, '');

  return (
    <footer className="bg-[#07140E] text-[#FAF8F5] pt-20 sm:pt-28 pb-12 border-t border-[#C5A059]/25 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Info Strip: Local Time & Coordinates */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-12 mb-12 border-b border-white/10 text-xs text-white/70">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
            <span className="font-mono text-white/90">
              ISLAMABAD TIME: <strong>{isbTime || '16:00 PKT'}</strong> (UTC+5)
            </span>
          </div>

          <div className="font-mono text-xs text-[#D8B574] tracking-widest uppercase">
            33° 43' 45" N, 73° 05' 35" E · FEDERAL CAPITAL TERRITORY
          </div>
        </div>

        {/* 5-Column Luxury Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-14 border-b border-white/10">
          {/* Brand & About Column (2 cols) */}
          <div className="lg:col-span-2 space-y-5">
            <Logo variant="admin" size="md" showSubtitle={true} />
            <p className="text-xs sm:text-sm text-white/70 max-w-sm leading-relaxed font-light">
              {settings.footerAbout}
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              {settings.socialLinks.instagram && (
                <a
                  href={settings.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-white/5 hover:bg-[#D8B574] text-white/80 hover:text-[#07140E] transition-all border border-white/10 hover:border-[#D8B574]"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              )}
              {settings.socialLinks.facebook && (
                <a
                  href={settings.socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-white/5 hover:bg-[#D8B574] text-white/80 hover:text-[#07140E] transition-all border border-white/10 hover:border-[#D8B574]"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              )}
              {settings.socialLinks.youtube && (
                <a
                  href={settings.socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-white/5 hover:bg-[#D8B574] text-white/80 hover:text-[#07140E] transition-all border border-white/10 hover:border-[#D8B574]"
                  aria-label="YouTube"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              )}
              {settings.socialLinks.twitter && (
                <a
                  href={settings.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-white/5 hover:bg-[#D8B574] text-white/80 hover:text-[#07140E] transition-all border border-white/10 hover:border-[#D8B574]"
                  aria-label="Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Nav */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#D8B574] mb-5">
              EXPLORATIONS
            </h4>
            <ul className="space-y-2.5 text-xs text-white/75 font-light">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a href={item.href} className="hover:text-[#D8B574] transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <button
                  onClick={onOpenPlanTrip}
                  className="text-[#D8B574] hover:underline transition-all"
                >
                  Plan Custom Itinerary →
                </button>
              </li>
            </ul>
          </div>

          {/* Iconic Landmarks */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#D8B574] mb-5">
              LANDMARKS
            </h4>
            <ul className="space-y-2.5 text-xs text-white/75 font-light">
              {destinations.slice(0, 5).map((dest) => (
                <li key={dest.id}>
                  <a href="#destinations" className="hover:text-[#D8B574] transition-colors truncate block">
                    {dest.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Coordinates & Newsletter */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#D8B574] mb-5">
              CAPITAL CONCIERGE
            </h4>
            <ul className="space-y-3 text-xs text-white/75 font-light">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-3.5 h-3.5 text-[#D8B574] shrink-0 mt-0.5" />
                <span>{settings.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-3.5 h-3.5 text-[#D8B574] shrink-0" />
                <a href={`tel:${settings.phone}`} className="hover:text-white">
                  {settings.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-3.5 h-3.5 text-[#D8B574] shrink-0" />
                <a href={`mailto:${settings.email}`} className="hover:text-white truncate">
                  {settings.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MessageSquare className="w-3.5 h-3.5 text-[#25D366] shrink-0" />
                <a
                  href={`https://wa.me/${whatsappClean}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  {settings.whatsappNumber}
                </a>
              </li>
            </ul>

            {/* Newsletter Input */}
            <div className="mt-6 pt-4 border-t border-white/10">
              <span className="text-[11px] text-[#D8B574] block mb-2 font-mono uppercase tracking-wider">
                Private Seasonal Dispatch
              </span>
              {subscribed ? (
                <div className="text-xs text-[#25D366] font-semibold py-1">
                  ✓ Welcome to the private circle.
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex items-center gap-1.5">
                  <input
                    type="email"
                    placeholder="Enter email address"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="w-full px-3.5 py-2 bg-white/5 border border-white/15 rounded-xl text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-[#D8B574]"
                  />
                  <button
                    type="submit"
                    className="p-2.5 rounded-xl bg-gradient-to-r from-[#C5A059] to-[#D8B574] text-[#07140E] hover:brightness-110 transition-all shrink-0"
                    title="Subscribe"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <div>{settings.copyrightText}</div>

          <div className="flex items-center gap-6">
            <button
              onClick={onNavigateToAdmin}
              className="flex items-center gap-1.5 text-white/70 hover:text-[#D8B574] transition-colors"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Admin CMS Portal</span>
            </button>
            <span className="text-white/20">|</span>
            <span className="flex items-center gap-1">
              Curated with <Heart className="w-3 h-3 text-[#D8B574] fill-current" /> in Islamabad, Pakistan
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
