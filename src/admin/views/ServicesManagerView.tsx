import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { Service } from '../../types';
import { Plus, Edit2, Trash2, Check, Compass, Mountain, Hotel, Users, Tent, Car, Utensils, Camera, Sparkles } from 'lucide-react';

const iconsList = [
  'Compass',
  'Mountain',
  'Hotel',
  'Users',
  'Tent',
  'Car',
  'Utensils',
  'Camera',
  'Sparkles',
];

export const ServicesManagerView: React.FC = () => {
  const { services, addService, updateService, deleteService, mediaFiles } = useCms();

  const [editingService, setEditingService] = useState<Service | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const [newService, setNewService] = useState<Omit<Service, 'id'>>({
    title: '',
    category: 'Sightseeing',
    iconName: 'Compass',
    shortDescription: '',
    fullDescription: '',
    imageUrl: mediaFiles[0]?.url || '/assets/aistudio/Faisal_Mosque_Tours_a6b4199e.jfif',
    statusBadge: 'New',
    isEnabled: true,
    order: services.length + 1,
  });

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;
    updateService(editingService.id, editingService);
    setEditingService(null);
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newService.title) return;
    addService(newService);
    setShowAddModal(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E5DFD7]">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#1B4332] block">
            Offerings & Hospitality Cards
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#133826]">
            Services & Experiences Manager
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage the 9 core Islamabad service cards, icons, status badges, and descriptions.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-5 py-2.5 bg-[#133826] text-[#D4A373] hover:text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#1B4332] shadow-md transition-all flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Service</span>
        </button>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((srv) => (
          <div
            key={srv.id}
            className={`bg-white rounded-2xl overflow-hidden border shadow-xs flex flex-col justify-between transition-all ${
              srv.isEnabled ? 'border-[#E5DFD7]' : 'border-slate-300 opacity-60'
            }`}
          >
            <div className="relative h-44 bg-slate-900 overflow-hidden">
              <img src={srv.imageUrl} alt={srv.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

              <div className="absolute top-3 left-3 flex items-center gap-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#133826]/80 text-[#D4A373]">
                  {srv.category}
                </span>
                {srv.statusBadge && (
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white/20 text-white backdrop-blur-sm">
                    {srv.statusBadge}
                  </span>
                )}
              </div>

              <div className="absolute bottom-3 left-3 right-3 text-white">
                <h3 className="font-serif font-bold text-lg text-white truncate">{srv.title}</h3>
                <span className="text-[11px] text-white/70">Icon: {srv.iconName}</span>
              </div>
            </div>

            <div className="p-4 flex flex-col flex-1 justify-between">
              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                {srv.shortDescription}
              </p>

              <div className="mt-4 pt-3 border-t border-[#F0EAE1] flex items-center justify-between">
                <button
                  onClick={() => updateService(srv.id, { isEnabled: !srv.isEnabled })}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                    srv.isEnabled
                      ? 'bg-emerald-50 text-emerald-800'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {srv.isEnabled ? 'Active' : 'Disabled'}
                </button>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setEditingService(srv)}
                    className="px-2.5 py-1 bg-[#FAF8F5] border border-[#D5CEC5] text-[#133826] hover:bg-[#F0EAE1] rounded-lg text-xs font-semibold flex items-center gap-1"
                  >
                    <Edit2 className="w-3 h-3" /> Edit
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Delete service "${srv.title}"?`)) deleteService(srv.id);
                    }}
                    className="p-1.5 text-slate-400 hover:text-red-600"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Service Modal */}
      {editingService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#FAF8F5] rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-[#D4A373]/40 space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="font-serif text-2xl font-bold text-[#133826]">
              Edit Service: {editingService.title}
            </h3>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Service Title *
                </label>
                <input
                  type="text"
                  required
                  value={editingService.title}
                  onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                  className="w-full px-3.5 py-2 bg-white border border-[#D5CEC5] rounded-xl text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    value={editingService.category}
                    onChange={(e) => setEditingService({ ...editingService, category: e.target.value })}
                    className="w-full px-3 py-1.5 bg-white border rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Status Badge
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Popular, Signature"
                    value={editingService.statusBadge || ''}
                    onChange={(e) => setEditingService({ ...editingService, statusBadge: e.target.value })}
                    className="w-full px-3 py-1.5 bg-white border rounded-lg text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Icon Identifier
                </label>
                <select
                  value={editingService.iconName}
                  onChange={(e) => setEditingService({ ...editingService, iconName: e.target.value })}
                  className="w-full px-3 py-2 bg-white border rounded-xl text-xs font-semibold"
                >
                  {iconsList.map((ic) => (
                    <option key={ic} value={ic}>
                      {ic}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Short Description
                </label>
                <textarea
                  rows={2}
                  value={editingService.shortDescription}
                  onChange={(e) => setEditingService({ ...editingService, shortDescription: e.target.value })}
                  className="w-full px-3 py-2 bg-white border rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Service Image URL
                </label>
                <select
                  value={editingService.imageUrl}
                  onChange={(e) => setEditingService({ ...editingService, imageUrl: e.target.value })}
                  className="w-full px-3 py-2 bg-white border rounded-xl text-xs font-semibold"
                >
                  {mediaFiles.map((m) => (
                    <option key={m.id} value={m.url}>
                      {m.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setEditingService(null)}
                  className="px-4 py-2 border text-slate-700 rounded-xl text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#133826] text-[#D4A373] font-bold text-xs uppercase rounded-xl hover:bg-[#1B4332]"
                >
                  Save Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Service Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#FAF8F5] rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-[#D4A373]/40 space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="font-serif text-2xl font-bold text-[#133826]">
              Add New Service
            </h3>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Service Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. VIP Airport Escort & Prado Transfer"
                  value={newService.title}
                  onChange={(e) => setNewService({ ...newService, title: e.target.value })}
                  className="w-full px-3.5 py-2 bg-white border rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Short Description
                </label>
                <textarea
                  rows={2}
                  placeholder="Summary for 3-column card..."
                  value={newService.shortDescription}
                  onChange={(e) => setNewService({ ...newService, shortDescription: e.target.value })}
                  className="w-full px-3 py-2 bg-white border rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Select Card Image
                </label>
                <select
                  value={newService.imageUrl}
                  onChange={(e) => setNewService({ ...newService, imageUrl: e.target.value })}
                  className="w-full px-3 py-2 bg-white border rounded-xl text-xs font-semibold"
                >
                  {mediaFiles.map((m) => (
                    <option key={m.id} value={m.url}>
                      {m.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border text-slate-700 rounded-xl text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#133826] text-[#D4A373] font-bold text-xs uppercase rounded-xl hover:bg-[#1B4332]"
                >
                  Create Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
