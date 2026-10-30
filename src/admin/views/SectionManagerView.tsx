import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { SectionConfig } from '../../types';
import { Eye, EyeOff, ArrowUp, ArrowDown, Edit2, Plus, Trash2, Check, Layout } from 'lucide-react';

export const SectionManagerView: React.FC = () => {
  const { sections, updateSection, toggleSectionVisibility, reorderSections, addToast } = useCms();

  const [editingSec, setEditingSec] = useState<SectionConfig | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newSec, setNewSec] = useState<SectionConfig>({
    id: `sec-${Date.now()}`,
    name: 'Custom Feature Highlight',
    title: 'Experience The Margalla Sanctuary',
    subtitle: 'PRIVATE NATURE EXCURSIONS',
    isVisible: true,
    order: sections.length + 1,
    bgTone: 'ivory',
    ctaText: 'Learn More',
    ctaLink: '#',
  });

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= sections.length) return;
    const copy = [...sections];
    const [moved] = copy.splice(index, 1);
    copy.splice(targetIdx, 0, moved);
    reorderSections(copy.map((s, i) => ({ ...s, order: i + 1 })));
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSec) return;
    updateSection(editingSec.id, editingSec);
    setEditingSec(null);
  };

  const handleCreateSection = (e: React.FormEvent) => {
    e.preventDefault();
    reorderSections([...sections, { ...newSec, id: `sec-${Date.now()}`, order: sections.length + 1 }]);
    setShowAddModal(false);
    addToast('Custom section created');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E5DFD7]">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#1B4332] block">
            Layout Architecture
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#133826]">
            Homepage Section Manager
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Toggle visibility, reorder flow, edit section headers, and adjust theme background tones.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-5 py-2.5 bg-[#133826] text-[#D4A373] hover:text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#1B4332] shadow-md transition-all flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Custom Section</span>
        </button>
      </div>

      {/* Sections Table / Cards */}
      <div className="space-y-3">
        {sections.map((sec, index) => (
          <div
            key={sec.id}
            className={`p-4 sm:p-5 rounded-2xl border transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
              sec.isVisible
                ? 'bg-white border-[#EBE4DC] shadow-xs'
                : 'bg-slate-50 border-slate-200 opacity-60'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-center">
                <button
                  disabled={index === 0}
                  onClick={() => handleMove(index, 'up')}
                  className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-20"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
                <span className="text-xs font-bold text-slate-500">#{index + 1}</span>
                <button
                  disabled={index === sections.length - 1}
                  onClick={() => handleMove(index, 'down')}
                  className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-20"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="w-10 h-10 rounded-xl bg-[#FAF8F5] text-[#133826] flex items-center justify-center shrink-0 border border-[#E0D7CB]">
                <Layout className="w-5 h-5 text-[#133826]" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-[#133826]">{sec.name}</span>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                    ID: {sec.id}
                  </span>
                </div>
                <div className="text-xs text-slate-600 mt-0.5 font-serif font-medium">
                  Heading: "{sec.title}"
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end md:self-auto">
              <button
                onClick={() => toggleSectionVisibility(sec.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                  sec.isVisible
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'bg-slate-200 text-slate-600'
                }`}
              >
                {sec.isVisible ? (
                  <>
                    <Eye className="w-3.5 h-3.5" /> Visible
                  </>
                ) : (
                  <>
                    <EyeOff className="w-3.5 h-3.5" /> Hidden
                  </>
                )}
              </button>

              <button
                onClick={() => setEditingSec(sec)}
                className="px-3 py-1.5 bg-[#FAF8F5] border border-[#D5CEC5] text-[#133826] hover:bg-[#F0EAE1] rounded-lg text-xs font-semibold flex items-center gap-1"
              >
                <Edit2 className="w-3.5 h-3.5" /> Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Section Modal */}
      {editingSec && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#FAF8F5] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#D4A373]/40 space-y-4">
            <h3 className="font-serif text-xl font-bold text-[#133826]">
              Edit Section: {editingSec.name}
            </h3>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Section Heading *
                </label>
                <input
                  type="text"
                  required
                  value={editingSec.title}
                  onChange={(e) => setEditingSec({ ...editingSec, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#D5CEC5] rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Subtitle / Tagline
                </label>
                <input
                  type="text"
                  value={editingSec.subtitle}
                  onChange={(e) => setEditingSec({ ...editingSec, subtitle: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#D5CEC5] rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Background Color Tone
                </label>
                <select
                  value={editingSec.bgTone || 'ivory'}
                  onChange={(e) =>
                    setEditingSec({
                      ...editingSec,
                      bgTone: e.target.value as 'light' | 'ivory' | 'forest' | 'white',
                    })
                  }
                  className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-xl text-xs font-semibold"
                >
                  <option value="ivory">Warm Ivory (#FAF8F5)</option>
                  <option value="light">Subtle Mountain Sand (#F4F0E8)</option>
                  <option value="white">Pure White (#FFFFFF)</option>
                  <option value="forest">Forest Green (#0F241B)</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setEditingSec(null)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded-xl text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#133826] text-[#D4A373] font-bold text-xs uppercase rounded-xl hover:bg-[#1B4332]"
                >
                  Save Section
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Custom Section Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#FAF8F5] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#D4A373]/40 space-y-4">
            <h3 className="font-serif text-xl font-bold text-[#133826]">
              Add New Section
            </h3>

            <form onSubmit={handleCreateSection} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Section Internal Name *
                </label>
                <input
                  type="text"
                  required
                  value={newSec.name}
                  onChange={(e) => setNewSec({ ...newSec, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#D5CEC5] rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Public Title *
                </label>
                <input
                  type="text"
                  required
                  value={newSec.title}
                  onChange={(e) => setNewSec({ ...newSec, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#D5CEC5] rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Subtitle
                </label>
                <input
                  type="text"
                  value={newSec.subtitle}
                  onChange={(e) => setNewSec({ ...newSec, subtitle: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#D5CEC5] rounded-xl text-sm"
                />
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
                  className="px-6 py-2 bg-[#133826] text-[#D4A373] font-bold text-xs uppercase rounded-xl hover:bg-[#1B4332]"
                >
                  Create Section
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
