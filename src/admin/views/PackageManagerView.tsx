import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { TravelPackage } from '../../types';
import { Plus, Edit2, Trash2, Clock, Check, X, Eye, EyeOff } from 'lucide-react';

export const PackageManagerView: React.FC = () => {
  const { packages, addPackage, updatePackage, deletePackage, mediaFiles } = useCms();

  const [editingPkg, setEditingPkg] = useState<TravelPackage | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // New package form state
  const [newPkg, setNewPkg] = useState<Omit<TravelPackage, 'id'>>({
    title: '',
    slug: '',
    duration: '2 Days / 1 Night',
    pricePkr: 42000,
    originalPricePkr: 48000,
    featuredImage: mediaFiles[0]?.url || '/assets/aistudio/Faisal_Mosque_Tours_a6b4199e.jfif',
    description: '',
    category: 'Cultural & City',
    inclusions: [
      'Executive Chauffeur-driven Transport',
      'All Monument entry tickets',
      'Certified English/Urdu Guide',
      'Authentic Local Dinner',
    ],
    exclusions: ['Personal Shopping', 'Airfare'],
    itinerary: [
      { day: 1, title: 'Day 1 Arrival & Sightseeing', desc: 'Faisal Mosque and Daman-e-Koh viewpoint sunset.' },
    ],
    isAvailable: true,
    isPublished: true,
    order: packages.length + 1,
  });

  const [inclusionInput, setInclusionInput] = useState('');
  const [exclusionInput, setExclusionInput] = useState('');

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPkg) return;
    updatePackage(editingPkg.id, editingPkg);
    setEditingPkg(null);
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPkg.title) return;
    addPackage({
      ...newPkg,
      slug: newPkg.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    });
    setShowAddModal(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E5DFD7]">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#1B4332] block">
            Commercial Offerings & Itineraries
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#133826]">
            Travel Package Manager
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage all-inclusive travel packages, prices in Pakistani Rupees (PKR), durations, and inclusions.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-5 py-2.5 bg-[#133826] text-[#D4A373] hover:text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#1B4332] shadow-md transition-all flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Package</span>
        </button>
      </div>

      {/* Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className={`bg-white rounded-2xl overflow-hidden border shadow-xs flex flex-col justify-between transition-all ${
              pkg.isPublished ? 'border-[#E5DFD7]' : 'border-slate-300 opacity-60'
            }`}
          >
            <div className="relative h-48 bg-slate-900 overflow-hidden">
              <img src={pkg.featuredImage} alt={pkg.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

              <div className="absolute top-3 left-3">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#133826]/80 text-[#D4A373]">
                  {pkg.category}
                </span>
              </div>

              <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 text-slate-900 text-[11px] font-bold px-2 py-0.5 rounded">
                <Clock className="w-3 h-3 text-[#133826]" /> {pkg.duration}
              </div>

              <div className="absolute bottom-3 left-3 right-3 text-white">
                <h3 className="font-serif font-bold text-lg text-white truncate">{pkg.title}</h3>
                <div className="text-sm font-bold text-[#D4A373] mt-0.5">
                  PKR {pkg.pricePkr.toLocaleString()}
                  {pkg.originalPricePkr && (
                    <span className="text-xs text-white/50 line-through font-normal ml-1.5">
                      PKR {pkg.originalPricePkr.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="p-4 flex flex-col flex-1 justify-between">
              <div>
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {pkg.description}
                </p>

                <div className="mt-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Key Inclusions ({pkg.inclusions.length})
                  </span>
                  <ul className="text-xs text-slate-700 space-y-1">
                    {pkg.inclusions.slice(0, 2).map((inc, i) => (
                      <li key={i} className="flex items-center gap-1.5 truncate">
                        <Check className="w-3 h-3 text-[#2D6A4F] shrink-0" />
                        <span className="truncate">{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#F0EAE1] flex items-center justify-between">
                <button
                  onClick={() => updatePackage(pkg.id, { isPublished: !pkg.isPublished })}
                  className="p-1.5 text-slate-500 hover:text-[#133826]"
                  title={pkg.isPublished ? 'Live on Website' : 'Draft Mode'}
                >
                  {pkg.isPublished ? (
                    <Eye className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <EyeOff className="w-4 h-4 text-slate-400" />
                  )}
                </button>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setEditingPkg(pkg)}
                    className="px-2.5 py-1 bg-[#FAF8F5] border border-[#D5CEC5] text-[#133826] hover:bg-[#F0EAE1] rounded-lg text-xs font-semibold flex items-center gap-1"
                  >
                    <Edit2 className="w-3 h-3" /> Edit
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Delete package "${pkg.title}"?`)) deletePackage(pkg.id);
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

      {/* Edit Package Modal */}
      {editingPkg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#FAF8F5] rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-[#D4A373]/40 space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="font-serif text-2xl font-bold text-[#133826]">
              Edit Package: {editingPkg.title}
            </h3>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Package Title *
                </label>
                <input
                  type="text"
                  required
                  value={editingPkg.title}
                  onChange={(e) => setEditingPkg({ ...editingPkg, title: e.target.value })}
                  className="w-full px-3.5 py-2 bg-white border border-[#D5CEC5] rounded-xl text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Price in PKR *
                  </label>
                  <input
                    type="number"
                    required
                    value={editingPkg.pricePkr}
                    onChange={(e) => setEditingPkg({ ...editingPkg, pricePkr: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-1.5 bg-white border rounded-lg text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Original Price (Optional)
                  </label>
                  <input
                    type="number"
                    value={editingPkg.originalPricePkr || ''}
                    onChange={(e) =>
                      setEditingPkg({
                        ...editingPkg,
                        originalPricePkr: parseInt(e.target.value) || undefined,
                      })
                    }
                    className="w-full px-3 py-1.5 bg-white border rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Duration *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingPkg.duration}
                    onChange={(e) => setEditingPkg({ ...editingPkg, duration: e.target.value })}
                    className="w-full px-3 py-1.5 bg-white border rounded-lg text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={editingPkg.description}
                  onChange={(e) => setEditingPkg({ ...editingPkg, description: e.target.value })}
                  className="w-full px-3 py-2 bg-white border rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Featured Photography
                </label>
                <select
                  value={editingPkg.featuredImage}
                  onChange={(e) => setEditingPkg({ ...editingPkg, featuredImage: e.target.value })}
                  className="w-full px-3 py-2 bg-white border rounded-xl text-xs font-semibold"
                >
                  {mediaFiles.map((m) => (
                    <option key={m.id} value={m.url}>
                      {m.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Inclusions List Management */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Inclusions (Add/Remove)
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Add an included item..."
                    value={inclusionInput}
                    onChange={(e) => setInclusionInput(e.target.value)}
                    className="flex-1 px-3 py-1.5 text-xs bg-white border rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (!inclusionInput.trim()) return;
                      setEditingPkg({
                        ...editingPkg,
                        inclusions: [...editingPkg.inclusions, inclusionInput.trim()],
                      });
                      setInclusionInput('');
                    }}
                    className="px-3 py-1 bg-[#133826] text-[#D4A373] text-xs font-bold rounded-lg"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {editingPkg.inclusions.map((inc, i) => (
                    <span key={i} className="px-2 py-0.5 bg-emerald-50 text-emerald-800 text-[11px] rounded flex items-center gap-1 border border-emerald-200">
                      <span>✓ {inc}</span>
                      <button
                        type="button"
                        onClick={() =>
                          setEditingPkg({
                            ...editingPkg,
                            inclusions: editingPkg.inclusions.filter((_, idx) => idx !== i),
                          })
                        }
                        className="text-red-500 hover:text-red-700"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingPkg.isAvailable}
                    onChange={(e) => setEditingPkg({ ...editingPkg, isAvailable: e.target.checked })}
                    className="accent-[#133826]"
                  />
                  <span>Available For Booking</span>
                </label>

                <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingPkg.isPublished}
                    onChange={(e) => setEditingPkg({ ...editingPkg, isPublished: e.target.checked })}
                    className="accent-[#133826]"
                  />
                  <span>Published Live</span>
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setEditingPkg(null)}
                  className="px-4 py-2 border text-slate-700 rounded-xl text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#133826] text-[#D4A373] font-bold text-xs uppercase rounded-xl hover:bg-[#1B4332]"
                >
                  Save Package
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Package Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#FAF8F5] rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-[#D4A373]/40 space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="font-serif text-2xl font-bold text-[#133826]">
              Add New Travel Package
            </h3>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Package Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Islamabad Cultural & Food Tasting Trail"
                  value={newPkg.title}
                  onChange={(e) => setNewPkg({ ...newPkg, title: e.target.value })}
                  className="w-full px-3.5 py-2 bg-white border rounded-xl text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Price in PKR *
                  </label>
                  <input
                    type="number"
                    required
                    value={newPkg.pricePkr}
                    onChange={(e) => setNewPkg({ ...newPkg, pricePkr: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-1.5 bg-white border rounded-lg text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Duration *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 2 Days / 1 Night"
                    value={newPkg.duration}
                    onChange={(e) => setNewPkg({ ...newPkg, duration: e.target.value })}
                    className="w-full px-3 py-1.5 bg-white border rounded-lg text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Short Description
                </label>
                <textarea
                  rows={2}
                  placeholder="Overview of the itinerary..."
                  value={newPkg.description}
                  onChange={(e) => setNewPkg({ ...newPkg, description: e.target.value })}
                  className="w-full px-3 py-2 bg-white border rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Photography
                </label>
                <select
                  value={newPkg.featuredImage}
                  onChange={(e) => setNewPkg({ ...newPkg, featuredImage: e.target.value })}
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
                  Create Package
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
