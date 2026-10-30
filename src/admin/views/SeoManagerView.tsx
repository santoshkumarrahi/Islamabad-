import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { Globe, Share2, Tag, Search } from 'lucide-react';

export const SeoManagerView: React.FC = () => {
  const { seo, updateSeo, mediaFiles } = useCms();
  const [form, setForm] = useState(seo);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSeo(form);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E5DFD7]">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#1B4332] block">
            Search Engine & Social Metadata
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#133826]">
            SEO & Open Graph Settings
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Optimize search engine ranking for Islamabad tourism, Faisal Mosque, and Margalla trekking.
          </p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="bg-white rounded-2xl p-6 border border-[#EBE4DC] shadow-xs space-y-5">
          <h3 className="font-serif font-bold text-lg text-[#133826] border-b pb-3">
            Search Engine Appearance
          </h3>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Global Page Title *
            </label>
            <input
              type="text"
              required
              value={form.pageTitle}
              onChange={(e) => setForm({ ...form, pageTitle: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-white border border-[#D5CEC5] rounded-xl text-sm"
            />
            <span className="text-[11px] text-slate-400 mt-1 block">
              Characters: {form.pageTitle.length} / Recommended: 50–65
            </span>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Meta Description *
            </label>
            <textarea
              rows={3}
              required
              value={form.metaDescription}
              onChange={(e) => setForm({ ...form, metaDescription: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-white border border-[#D5CEC5] rounded-xl text-sm leading-relaxed"
            />
            <span className="text-[11px] text-slate-400 mt-1 block">
              Characters: {form.metaDescription.length} / Recommended: 120–160
            </span>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              SEO Focus Keywords
            </label>
            <input
              type="text"
              value={form.keywords}
              onChange={(e) => setForm({ ...form, keywords: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-white border border-[#D5CEC5] rounded-xl text-sm"
            />
            <span className="text-[11px] text-slate-400 mt-1 block">
              Comma-separated search phrases (e.g. Islamabad tours, Faisal Mosque, Margalla hiking).
            </span>
          </div>
        </div>

        {/* OpenGraph Social Card Preview */}
        <div className="bg-white rounded-2xl p-6 border border-[#EBE4DC] shadow-xs space-y-4">
          <h3 className="font-serif font-bold text-lg text-[#133826] border-b pb-3">
            Social Share & OpenGraph Image
          </h3>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Open Graph Image URL
            </label>
            <select
              value={form.ogImage}
              onChange={(e) => setForm({ ...form, ogImage: e.target.value })}
              className="w-full px-3.5 py-2 bg-white border rounded-xl text-xs font-semibold"
            >
              {mediaFiles.map((m) => (
                <option key={m.id} value={m.url}>
                  {m.name}
                </option>
              ))}
            </select>
          </div>

          {/* Social Card Mockup */}
          <div className="mt-4 p-4 bg-[#FAF8F5] rounded-2xl border border-slate-200 max-w-md">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
              Google / WhatsApp / Social Share Preview
            </span>
            <div className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm">
              <img src={form.ogImage} alt="" className="w-full h-40 object-cover" />
              <div className="p-3">
                <span className="text-[10px] text-slate-400 uppercase font-mono">islamabadescapes.pk</span>
                <div className="font-bold text-xs text-slate-900 truncate mt-0.5">{form.pageTitle}</div>
                <div className="text-[11px] text-slate-500 line-clamp-2 mt-1">{form.metaDescription}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="px-8 py-3 bg-[#133826] text-[#D4A373] hover:text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#1B4332] shadow-md transition-all"
          >
            Save SEO Metadata
          </button>
        </div>
      </form>
    </div>
  );
};
