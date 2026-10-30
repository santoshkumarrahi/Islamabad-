import React from 'react';
import { useCms } from '../../context/CmsContext';

interface LogoProps {
  variant?: 'light' | 'dark' | 'header' | 'admin';
  showSubtitle?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'header',
  showSubtitle = true,
  className = '',
  size = 'md',
}) => {
  const { settings } = useCms();

  const isDarkBg = variant === 'dark' || variant === 'admin';

  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
  };

  const titleSizes = {
    sm: 'text-sm font-semibold tracking-wider',
    md: 'text-base sm:text-lg font-bold tracking-wider',
    lg: 'text-xl sm:text-2xl font-bold tracking-widest',
  };

  const subtitleSizes = {
    sm: 'text-[8px] tracking-[0.25em]',
    md: 'text-[9px] tracking-[0.25em]',
    lg: 'text-[11px] tracking-[0.3em]',
  };

  return (
    <div className={`flex items-center gap-3 select-none group cursor-pointer ${className}`}>
      {settings.logoImageUrl ? (
        <img
          src={settings.logoImageUrl}
          alt={settings.websiteName}
          className={`${iconSizes[size]} object-contain rounded-lg shadow-sm`}
        />
      ) : (
        /* Bespoke Pakistani Heritage & Margalla Gold Seal */
        <div
          className={`${iconSizes[size]} rounded-full flex items-center justify-center shrink-0 border transition-all duration-500 group-hover:scale-105 ${
            isDarkBg
              ? 'bg-gradient-to-br from-[#143D2D] via-[#0B2017] to-[#07140E] border-[#C5A059]/60 text-[#D8B574] shadow-lg shadow-black/40'
              : 'bg-gradient-to-br from-[#0B2017] to-[#143D2D] border-[#C5A059]/50 text-[#F3DEB0] shadow-md'
          }`}
        >
          <svg
            viewBox="0 0 44 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-3/4 h-3/4 transform transition-transform group-hover:rotate-6 duration-500"
          >
            {/* Concentric subtle crest border */}
            <circle cx="22" cy="22" r="19" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 2" strokeOpacity="0.6" />
            
            {/* Margalla Peaks Geometric Silhouette */}
            <path
              d="M7 32L17 17L27 32H7Z"
              fill="currentColor"
              fillOpacity="0.35"
            />
            <path
              d="M17 32L27 12L37 32H17Z"
              fill="currentColor"
              fillOpacity="0.85"
            />
            
            {/* National Crescent & Star Horizon Motif */}
            <path
              d="M27.5 13.5C27 12.2 25.8 11.2 24.3 11.1C22.2 10.9 20.3 12.5 20.1 14.6C19.9 16.7 21.5 18.6 23.6 18.8C25.1 18.9 26.5 18.2 27.3 17C26.1 17.5 24.6 17.2 23.7 16.2C22.7 15.1 22.8 13.5 23.9 12.6C24.8 11.8 26.2 11.9 27.5 13.5Z"
              fill="#FAF8F5"
            />
            <circle cx="27.8" cy="11.8" r="1.1" fill="#FAF8F5" />
            
            {/* Vertical Monument Pillar */}
            <line x1="22" y1="23" x2="22" y2="32" stroke="#FAF8F5" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </div>
      )}

      <div className="flex flex-col">
        <span
          className={`font-serif uppercase ${titleSizes[size]} leading-none ${
            isDarkBg ? 'text-[#FAF8F5]' : 'text-[#0B2017]'
          }`}
        >
          {settings.logoText || settings.websiteName || 'Islamabad Escapes'}
        </span>
        {showSubtitle && (
          <span
            className={`uppercase font-medium mt-1 leading-none ${subtitleSizes[size]} ${
              isDarkBg ? 'text-[#D8B574]' : 'text-[#8A6D3B]'
            }`}
          >
            {settings.logoSubtitle || settings.tagline || 'Curated Capital Expeditions'}
          </span>
        )}
      </div>
    </div>
  );
};
