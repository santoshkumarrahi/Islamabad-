import React, { useEffect } from 'react';
import { GalleryItem } from '../../types';
import { X, ChevronLeft, ChevronRight, Download, Share2 } from 'lucide-react';

interface LightboxModalProps {
  items: GalleryItem[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  items,
  currentIndex,
  isOpen,
  onClose,
  onNext,
  onPrev,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onNext, onPrev]);

  if (!isOpen || items.length === 0) return null;

  const current = items[currentIndex] || items[0];

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 sm:p-8 animate-in fade-in duration-200">
      {/* Top Controls */}
      <div className="absolute top-4 sm:top-6 left-6 right-6 flex items-center justify-between z-30 text-white">
        <div className="text-xs uppercase tracking-widest text-[#D4A373] font-semibold">
          {current.category} · {currentIndex + 1} / {items.length}
        </div>
        <div className="flex items-center gap-3">
          <a
            href={current.imageUrl}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors text-white"
            title="Open Full Image"
          >
            <Download className="w-4 h-4" />
          </a>
          <button
            onClick={onClose}
            className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors text-white"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Prev / Next Chevrons */}
      {items.length > 1 && (
        <>
          <button
            onClick={onPrev}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-30 p-3 bg-black/50 hover:bg-black/80 text-white rounded-full transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={onNext}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-30 p-3 bg-black/50 hover:bg-black/80 text-white rounded-full transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Main Image & Caption */}
      <div className="relative max-w-5xl max-h-[80vh] flex flex-col items-center justify-center">
        <img
          src={current.imageUrl}
          alt={current.title}
          className="max-w-full max-h-[72vh] object-contain rounded-lg shadow-2xl"
        />
        <div className="mt-4 text-center text-white max-w-2xl px-4">
          <h3 className="font-serif text-lg sm:text-xl font-bold">{current.title}</h3>
          {current.caption && (
            <p className="text-xs sm:text-sm text-white/70 mt-1">{current.caption}</p>
          )}
        </div>
      </div>
    </div>
  );
};
