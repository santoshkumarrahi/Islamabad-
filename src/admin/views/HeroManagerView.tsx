import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { HeroSlide } from '../../types';
import { Plus, Trash2, Edit2, Check, ArrowUp, ArrowDown, Upload, Image as ImageIcon, Sparkles } from 'lucide-react';

export const HeroManagerView: React.FC = () => {
  const { heroSlides, addHeroSlide, updateHeroSlide, deleteHeroSlide, reorderHeroSlides, sections, updateSection, mediaFiles, addToast } = useCms();

  const heroSection = sections.find((s) => s.id === 'sec-hero');

  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // New slide form
  const [newSlide, setNewSlide] = useState<Omit<HeroSlide, 'id'>>({
    title: 'Autumn Twilight Over Faisal Mosque',
    subtitle: 'CAPITAL PANORAMA',
    description: 'Witness the golden hour illuminate marble minarets against lush Margalla mountain crests.',
    imageUrl: '/assets/aistudio/Faisal_Mosque_Tours_a6b4199e.jfif',
    ctaText: 'Explore Islamabad',
    ctaLink: '#destinations',
    secondaryCtaText: 'Plan Your Trip',
    secondaryCtaLink: '#plan-trip',
    overlayOpacity: 0.45,
    isActive: true,
    order: heroSlides.length + 1,
  });

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= heroSlides.length) return;
    const copy = [...heroSlides];
    const [moved] = copy.splice(index, 1);
    copy.splice(targetIdx, 0, moved);
    reorderHeroSlides(copy.map((s, i) => ({ ...s, order: i + 1 })));
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSlide) return;
    updateHeroSlide(editingSlide.id, editingSlide);
    setEditingSlide(null);
  };

  const handleCreateSlide = (e: React.FormEvent) => {
    e.preventDefault();
    addHeroSlide(newSlide);
    setShowAddModal(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E5DFD7]">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#1B4332] block">
            Homepage Marquee Controls
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#133826]">
            Hero Section Manager
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Configure full-width animated background sliders, typography, action buttons, and dark overlay intensity.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {heroSection && (
            <button
              onClick={() => updateSection(heroSection.id, { isVisible: !heroSection.isVisible })}
              className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-colors ${
                heroSection.isVisible
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                  : 'bg-slate-100 text-slate-600 border-slate-300'
              }`}
            >
              {heroSection.isVisible ? '✓ Hero Section Enabled' : '✕ Hero Section Hidden'}
            </button>
          )}

          <button
            onClick={() => setShowAddModal(true)}
            className="px-5 py-2.5 bg-[#133826] text-[#D4A373] hover:text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#1B4332] shadow-md transition-all flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Add Hero Slide</span>
          </button>
        </div>
      </div>

      {/* Hero Slides List */}
      <div className="space-y-4">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className="bg-white rounded-2xl p-5 border border-[#EBE4DC] shadow-xs hover:border-[#133826]/30 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-5"
          >
            {/* Image Preview & Order Indicator */}
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-center gap-1">
                <button
                  disabled={index === 0}
                  onClick={() => handleMove(index, 'up')}
                  className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-20"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
                <span className="text-xs font-bold text-slate-500">#{index + 1}</span>
                <button
                  disabled={index === heroSlides.length - 1}
                  onClick={() => handleMove(index, 'down')}
                  className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-20"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="w-32 h-20 rounded-xl overflow-hidden bg-slate-900 shrink-0 relative border border-slate-200">
                <img src={slide.imageUrl} alt="" className="w-full h-full object-cover" />
                <div
                  className="absolute inset-0 bg-black"
                  style={{ opacity: slide.overlayOpacity || 0.4 }}
                />
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4A373] bg-[#133826] px-2 py-0.5 rounded">
                    {slide.subtitle || 'HERO SLIDE'}
                  </span>
                  {slide.isActive ? (
                    <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold">
                      Active
                    </span>
                  ) : (
                    <span className="text-[10px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded font-bold">
                      Disabled
                    </span>
                  )}
                </div>
                <h3 className="font-serif font-bold text-base text-[#133826]">
                  {slide.title}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-1 max-w-lg">
                  {slide.description}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 self-end md:self-auto">
              <button
                onClick={() =>
                  updateHeroSlide(slide.id, { isActive: !slide.isActive })
                }
                className="px-3 py-1.5 border border-slate-300 text-slate-700 hover:bg-slate-100 rounded-lg text-xs font-semibold"
              >
                {slide.isActive ? 'Hide' : 'Show'}
              </button>
              <button
                onClick={() => setEditingSlide(slide)}
                className="px-3 py-1.5 bg-[#FAF8F5] border border-[#D5CEC5] text-[#133826] hover:bg-[#F0EAE1] rounded-lg text-xs font-semibold flex items-center gap-1"
              >
                <Edit2 className="w-3.5 h-3.5" /> Edit
              </button>
              <button
                onClick={() => deleteHeroSlide(slide.id)}
                className="p-1.5 text-slate-400 hover:text-red-600 transition-colors"
                title="Delete Slide"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Slide Modal */}
      {editingSlide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#FAF8F5] rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-[#D4A373]/40 space-y-5 max-h-[90vh] overflow-y-auto">
            <h3 className="font-serif text-2xl font-bold text-[#133826]">
              Edit Hero Slide
            </h3>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Main Headline *
                </label>
                <input
                  type="text"
                  required
                  value={editingSlide.title}
                  onChange={(e) => setEditingSlide({ ...editingSlide, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#D5CEC5] rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Subtitle / Kicker
                </label>
                <input
                  type="text"
                  value={editingSlide.subtitle}
                  onChange={(e) => setEditingSlide({ ...editingSlide, subtitle: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#D5CEC5] rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={editingSlide.description}
                  onChange={(e) => setEditingSlide({ ...editingSlide, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#D5CEC5] rounded-xl text-sm"
                />
              </div>

              {/* Background Image Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Background Image
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={editingSlide.imageUrl}
                    onChange={(e) => setEditingSlide({ ...editingSlide, imageUrl: e.target.value })}
                    className="flex-1 px-3.5 py-2.5 bg-white border border-[#D5CEC5] rounded-xl text-xs font-mono"
                  />
                  <select
                    onChange={(e) => {
                      if (e.target.value) setEditingSlide({ ...editingSlide, imageUrl: e.target.value });
                    }}
                    className="px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-semibold"
                  >
                    <option value="">Pick From Media Library</option>
                    {mediaFiles.map((m) => (
                      <option key={m.id} value={m.url}>
                        {m.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Overlay Opacity Slider */}
              <div>
                <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                  <span>Cinematic Scrim Overlay Darkness</span>
                  <span>{Math.round((editingSlide.overlayOpacity || 0.45) * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="0.85"
                  step="0.05"
                  value={editingSlide.overlayOpacity || 0.45}
                  onChange={(e) => setEditingSlide({ ...editingSlide, overlayOpacity: parseFloat(e.target.value) })}
                  className="w-full accent-[#133826]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Primary Button Label
                  </label>
                  <input
                    type="text"
                    value={editingSlide.ctaText}
                    onChange={(e) => setEditingSlide({ ...editingSlide, ctaText: e.target.value })}
                    className="w-full px-3.5 py-2 bg-white border border-[#D5CEC5] rounded-xl text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Secondary Button Label
                  </label>
                  <input
                    type="text"
                    value={editingSlide.secondaryCtaText}
                    onChange={(e) => setEditingSlide({ ...editingSlide, secondaryCtaText: e.target.value })}
                    className="w-full px-3.5 py-2 bg-white border border-[#D5CEC5] rounded-xl text-xs"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setEditingSlide(null)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded-xl text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#133826] text-[#D4A373] font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-[#1B4332]"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Slide Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#FAF8F5] rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-[#D4A373]/40 space-y-5 max-h-[90vh] overflow-y-auto">
            <h3 className="font-serif text-2xl font-bold text-[#133826]">
              Add New Hero Slide
            </h3>

            <form onSubmit={handleCreateSlide} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Main Headline *
                </label>
                <input
                  type="text"
                  required
                  value={newSlide.title}
                  onChange={(e) => setNewSlide({ ...newSlide, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#D5CEC5] rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Subtitle
                </label>
                <input
                  type="text"
                  value={newSlide.subtitle}
                  onChange={(e) => setNewSlide({ ...newSlide, subtitle: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#D5CEC5] rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={newSlide.description}
                  onChange={(e) => setNewSlide({ ...newSlide, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#D5CEC5] rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Select Background Image
                </label>
                <select
                  value={newSlide.imageUrl}
                  onChange={(e) => setNewSlide({ ...newSlide, imageUrl: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#D5CEC5] rounded-xl text-xs font-semibold"
                >
                  {mediaFiles.map((m) => (
                    <option key={m.id} value={m.url}>
                      {m.name} ({m.type})
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded-xl text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#133826] text-[#D4A373] font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-[#1B4332]"
                >
                  Create Slide
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
