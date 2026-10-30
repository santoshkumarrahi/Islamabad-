import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { NavItem } from '../../types';
import { Plus, Trash2, Edit2, ArrowUp, ArrowDown } from 'lucide-react';

export const HeaderFooterView: React.FC = () => {
  const { navItems, updateNavItems, settings, updateSettings } = useCms();

  const [items, setItems] = useState<NavItem[]>(navItems);
  const [newLabel, setNewLabel] = useState('');
  const [newHref, setNewHref] = useState('#');

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const target = direction === 'up' ? index - 1 : index + 1;
    if (target < 0 || target >= items.length) return;
    const copy = [...items];
    const [moved] = copy.splice(index, 1);
    copy.splice(target, 0, moved);
    const updated = copy.map((it, i) => ({ ...it, order: i + 1 }));
    setItems(updated);
    updateNavItems(updated);
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLabel.trim()) return;
    const newItem: NavItem = {
      id: `nav-${Date.now()}`,
      label: newLabel.trim(),
      href: newHref.trim() || '#',
      order: items.length + 1,
    };
    const updated = [...items, newItem];
    setItems(updated);
    updateNavItems(updated);
    setNewLabel('');
    setNewHref('#');
  };

  const handleDeleteItem = (id: string) => {
    const updated = items.filter((i) => i.id !== id);
    setItems(updated);
    updateNavItems(updated);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E5DFD7]">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#1B4332] block">
            Navigation Architecture
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#133826]">
            Header & Footer Manager
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Reorder top navigation links, add custom menus, and configure footer credentials.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Navigation Items (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-[#EBE4DC] shadow-xs space-y-5">
          <h3 className="font-serif font-bold text-lg text-[#133826] border-b pb-3">
            Top Bar Navigation Links
          </h3>

          <div className="space-y-2.5">
            {items.map((item, index) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3 rounded-xl bg-[#FAF8F5] border border-slate-200"
              >
                <div className="flex items-center gap-3">
                  <div className="flex flex-col items-center">
                    <button
                      disabled={index === 0}
                      onClick={() => handleMove(index, 'up')}
                      className="p-0.5 text-slate-400 hover:text-slate-800 disabled:opacity-20"
                    >
                      <ArrowUp className="w-3 h-3" />
                    </button>
                    <span className="text-[10px] font-bold text-slate-400">#{index + 1}</span>
                    <button
                      disabled={index === items.length - 1}
                      onClick={() => handleMove(index, 'down')}
                      className="p-0.5 text-slate-400 hover:text-slate-800 disabled:opacity-20"
                    >
                      <ArrowDown className="w-3 h-3" />
                    </button>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-800">{item.label}</div>
                    <div className="text-[10px] text-slate-400 font-mono">{item.href}</div>
                  </div>
                </div>

                <button
                  onClick={() => handleDeleteItem(item.id)}
                  className="p-1.5 text-slate-400 hover:text-red-600 transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Add Nav Item */}
          <form onSubmit={handleAddItem} className="pt-4 border-t border-[#F0EAE1] flex gap-2">
            <input
              type="text"
              required
              placeholder="Menu Label (e.g. Hiking)"
              value={newLabel}
              onChange={(e) => setNewLabel(e.target.value)}
              className="flex-1 px-3 py-1.5 text-xs bg-white border border-[#D5CEC5] rounded-xl"
            />
            <input
              type="text"
              placeholder="#anchor or url"
              value={newHref}
              onChange={(e) => setNewHref(e.target.value)}
              className="w-32 px-3 py-1.5 text-xs bg-white border border-[#D5CEC5] rounded-xl font-mono"
            />
            <button
              type="submit"
              className="px-4 py-1.5 bg-[#133826] text-[#D4A373] text-xs font-bold rounded-xl"
            >
              Add Link
            </button>
          </form>
        </div>

        {/* Footer Text & Coordinates (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-[#EBE4DC] shadow-xs space-y-4">
          <h3 className="font-serif font-bold text-lg text-[#133826] border-b pb-3">
            Footer Configuration
          </h3>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Footer About Bio
            </label>
            <textarea
              rows={4}
              value={settings.footerAbout}
              onChange={(e) => updateSettings({ footerAbout: e.target.value })}
              className="w-full p-2.5 text-xs bg-white border border-[#D5CEC5] rounded-xl leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Copyright Notice
            </label>
            <input
              type="text"
              value={settings.copyrightText}
              onChange={(e) => updateSettings({ copyrightText: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-white border border-[#D5CEC5] rounded-xl"
            />
          </div>

          <div className="pt-2 text-xs text-slate-500">
            Changes save automatically to the live website.
          </div>
        </div>
      </div>
    </div>
  );
};
