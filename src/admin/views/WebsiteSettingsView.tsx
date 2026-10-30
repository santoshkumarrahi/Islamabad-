import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { Upload, Trash2, Check, RefreshCw, Phone, Mail, MapPin, MessageSquare, Instagram, Facebook, Youtube, Twitter } from 'lucide-react';

export const WebsiteSettingsView: React.FC = () => {
  const { settings, updateSettings, resetToDefaults, exportBackup, importBackup, addToast } = useCms();

  const [form, setForm] = useState(settings);
  const [backupJson, setBackupJson] = useState('');
  const [showBackupModal, setShowBackupModal] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(form);
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result as string;
      setForm((prev) => ({ ...prev, logoImageUrl: dataUrl }));
      updateSettings({ logoImageUrl: dataUrl });
      addToast('Logo image uploaded successfully');
    };
    reader.readAsDataURL(file);
  };

  const handleDeleteLogo = () => {
    setForm((prev) => ({ ...prev, logoImageUrl: '' }));
    updateSettings({ logoImageUrl: '' });
    addToast('Logo reset to luxury Margalla vector emblem', 'info');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E5DFD7]">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#1B4332] block">
            Brand Identity & Global Config
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#133826]">
            Website Settings & Identity
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage your official logos, brand typography, contact coordinates, and social profiles.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setBackupJson(exportBackup());
              setShowBackupModal(true);
            }}
            className="px-4 py-2 border border-slate-300 hover:bg-slate-100 text-slate-700 rounded-xl text-xs font-semibold transition-colors"
          >
            Backup / Restore CMS
          </button>
          <button
            type="button"
            onClick={resetToDefaults}
            className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded-xl text-xs font-semibold transition-colors"
          >
            Reset Master Defaults
          </button>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Brand & Logo Manager */}
        <div className="bg-white rounded-2xl p-6 border border-[#EBE4DC] shadow-xs space-y-6">
          <h3 className="font-serif font-bold text-lg text-[#133826] border-b pb-3">
            1. Website Logo & Brand Name
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {/* Logo Preview & Uploader */}
            <div className="p-5 bg-[#FAF8F5] rounded-xl border border-[#E0D7CB] space-y-4">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Current Brand Logo
              </label>

              <div className="p-4 bg-white rounded-lg border border-slate-200 flex items-center justify-center min-h-[100px]">
                {form.logoImageUrl ? (
                  <img src={form.logoImageUrl} alt="Logo" className="max-h-16 object-contain" />
                ) : (
                  <div className="flex items-center gap-2 text-slate-600 text-xs">
                    <span className="font-serif font-bold text-lg text-[#133826]">
                      {form.logoText}
                    </span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-sans">
                      (Vector Emblem Active)
                    </span>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <label className="flex-1 cursor-pointer py-2 px-3 bg-[#133826] text-[#D4A373] hover:text-white rounded-xl text-xs font-bold uppercase tracking-wider text-center transition-colors">
                  <Upload className="w-3.5 h-3.5 inline mr-1.5" /> Upload / Replace Logo
                  <input type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
                </label>

                {form.logoImageUrl && (
                  <button
                    type="button"
                    onClick={handleDeleteLogo}
                    className="py-2 px-3 border border-red-200 text-red-700 hover:bg-red-50 rounded-xl text-xs font-semibold"
                  >
                    <Trash2 className="w-3.5 h-3.5 inline mr-1" /> Delete Logo
                  </button>
                )}
              </div>
            </div>

            {/* Brand Text Fields */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Website / Brand Name *
                </label>
                <input
                  type="text"
                  required
                  value={form.websiteName}
                  onChange={(e) => setForm({ ...form, websiteName: e.target.value, logoText: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#D5CEC5] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#133826]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Official Tagline
                </label>
                <input
                  type="text"
                  value={form.tagline}
                  onChange={(e) => setForm({ ...form, tagline: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#D5CEC5] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#133826]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Header Logo Subtitle (Small Kicker)
                </label>
                <input
                  type="text"
                  value={form.logoSubtitle || ''}
                  onChange={(e) => setForm({ ...form, logoSubtitle: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#D5CEC5] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#133826]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Contact Coordinates & WhatsApp */}
        <div className="bg-white rounded-2xl p-6 border border-[#EBE4DC] shadow-xs space-y-6">
          <h3 className="font-serif font-bold text-lg text-[#133826] border-b pb-3">
            2. Contact Coordinates & WhatsApp Integration
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#133826]" /> Official Phone Number
              </label>
              <input
                type="text"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-white border border-[#D5CEC5] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#133826]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#133826]" /> Concierge Email
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-white border border-[#D5CEC5] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#133826]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" /> WhatsApp Contact Number
              </label>
              <input
                type="text"
                value={form.whatsappNumber}
                onChange={(e) => setForm({ ...form, whatsappNumber: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-white border border-[#D5CEC5] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#133826]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#133826]" /> Islamabad Office Address
              </label>
              <input
                type="text"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-white border border-[#D5CEC5] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#133826]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Default WhatsApp Click-to-Chat Message
            </label>
            <input
              type="text"
              value={form.whatsappMessage}
              onChange={(e) => setForm({ ...form, whatsappMessage: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-white border border-[#D5CEC5] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#133826]"
            />
          </div>
        </div>

        {/* Social Links & Footer Info */}
        <div className="bg-white rounded-2xl p-6 border border-[#EBE4DC] shadow-xs space-y-6">
          <h3 className="font-serif font-bold text-lg text-[#133826] border-b pb-3">
            3. Social Media Links & Footer Text
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <Instagram className="w-3.5 h-3.5 text-[#E1306C]" /> Instagram URL
              </label>
              <input
                type="url"
                value={form.socialLinks.instagram}
                onChange={(e) =>
                  setForm({
                    ...form,
                    socialLinks: { ...form.socialLinks, instagram: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2.5 bg-white border border-[#D5CEC5] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#133826]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <Facebook className="w-3.5 h-3.5 text-[#1877F2]" /> Facebook URL
              </label>
              <input
                type="url"
                value={form.socialLinks.facebook}
                onChange={(e) =>
                  setForm({
                    ...form,
                    socialLinks: { ...form.socialLinks, facebook: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2.5 bg-white border border-[#D5CEC5] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#133826]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <Youtube className="w-3.5 h-3.5 text-[#FF0000]" /> YouTube Channel
              </label>
              <input
                type="url"
                value={form.socialLinks.youtube}
                onChange={(e) =>
                  setForm({
                    ...form,
                    socialLinks: { ...form.socialLinks, youtube: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2.5 bg-white border border-[#D5CEC5] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#133826]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <Twitter className="w-3.5 h-3.5 text-[#1DA1F2]" /> Twitter / X Profile
              </label>
              <input
                type="url"
                value={form.socialLinks.twitter}
                onChange={(e) =>
                  setForm({
                    ...form,
                    socialLinks: { ...form.socialLinks, twitter: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2.5 bg-white border border-[#D5CEC5] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#133826]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Footer About Bio
            </label>
            <textarea
              rows={3}
              value={form.footerAbout}
              onChange={(e) => setForm({ ...form, footerAbout: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-white border border-[#D5CEC5] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#133826]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Copyright Notice
            </label>
            <input
              type="text"
              value={form.copyrightText}
              onChange={(e) => setForm({ ...form, copyrightText: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-white border border-[#D5CEC5] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#133826]"
            />
          </div>
        </div>

        {/* Save Bar */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="px-8 py-3 bg-[#133826] text-[#D4A373] hover:text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#1B4332] shadow-lg transition-all"
          >
            Save All Settings
          </button>
        </div>
      </form>

      {/* Backup & Restore Modal */}
      {showBackupModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#FAF8F5] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#D4A373]/40 space-y-4">
            <h3 className="font-serif text-xl font-bold text-[#133826]">
              CMS Backup & Data Restore
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Copy this JSON payload to save a permanent external snapshot of all destinations, packages, and settings, or paste a previously saved JSON payload and click Import.
            </p>

            <textarea
              rows={8}
              value={backupJson}
              onChange={(e) => setBackupJson(e.target.value)}
              className="w-full font-mono text-xs p-3 bg-white border border-slate-300 rounded-xl"
            />

            <div className="flex items-center justify-between gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(backupJson);
                  addToast('Backup JSON copied to clipboard');
                }}
                className="px-4 py-2 border border-slate-300 text-slate-700 text-xs font-semibold rounded-xl"
              >
                Copy JSON
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowBackupModal(false)}
                  className="px-4 py-2 text-slate-600 text-xs rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (importBackup(backupJson)) setShowBackupModal(false);
                  }}
                  className="px-5 py-2 bg-[#133826] text-[#D4A373] text-xs font-bold uppercase rounded-xl"
                >
                  Import & Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
