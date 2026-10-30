import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { Destination } from '../../types';
import { Plus, Edit2, Trash2, MapPin, Star, ArrowUp, ArrowDown, Check, Eye, EyeOff, Image as ImageIcon } from 'lucide-react';

export const DestinationManagerView: React.FC = () => {
  const { destinations, addDestination, updateDestination, deleteDestination, reorderDestinations, mediaFiles, addToast } = useCms();

  const [editingDest, setEditingDest] = useState<Destination | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const [newDest, setNewDest] = useState<Omit<Destination, 'id'>>({
    name: '',
    slug: '',
    category: 'Heritage & Architecture',
    location: 'Islamabad, Pakistan',
    shortDescription: '',
    fullDescription: '',
    featuredImage: mediaFiles[0]?.url || '/assets/aistudio/Faisal_Mosque_Tours_a6b4199e.jfif',
    galleryImages: [mediaFiles[0]?.url || '/assets/aistudio/Faisal_Mosque_Tours_a6b4199e.jfif'],
    highlights: ['Scenic photography point', 'Historical heritage context', 'Guided walking paths'],
    bestTimeToVisit: 'Morning & Twilight',
    entryFee: 'Free',
    typicalDuration: '2 Hours',
    rating: 4.8,
    isFeatured: false,
    isPublished: true,
    order: destinations.length + 1,
  });

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= destinations.length) return;
    const copy = [...destinations];
    const [moved] = copy.splice(index, 1);
    copy.splice(targetIdx, 0, moved);
    reorderDestinations(copy.map((d, i) => ({ ...d, order: i + 1 })));
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDest) return;
    updateDestination(editingDest.id, editingDest);
    setEditingDest(null);
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDest.name) return;
    addDestination({
      ...newDest,
      slug: newDest.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    });
    setShowAddModal(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E5DFD7]">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#1B4332] block">
            Capital Exploration Database
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#133826]">
            Destination Manager
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Add unlimited Islamabad monuments, hiking trails, viewpoints, and museums with full media galleries.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-5 py-2.5 bg-[#133826] text-[#D4A373] hover:text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#1B4332] shadow-md transition-all flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Destination</span>
        </button>
      </div>

      {/* Destination Cards / Table */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {destinations.map((dest, index) => (
          <div
            key={dest.id}
            className={`bg-white rounded-2xl overflow-hidden border shadow-xs hover:shadow-md transition-all flex flex-col justify-between ${
              dest.isPublished ? 'border-[#E5DFD7]' : 'border-slate-300 opacity-60'
            }`}
          >
            {/* Image Preview & Badges */}
            <div className="relative h-48 bg-slate-900 overflow-hidden">
              <img src={dest.featuredImage} alt={dest.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

              <div className="absolute top-3 left-3 flex items-center gap-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#133826]/80 text-[#D4A373]">
                  {dest.category}
                </span>
                {dest.isFeatured && (
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#D4A373] text-[#133826]">
                    Featured
                  </span>
                )}
              </div>

              <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/50 text-[#E9D8A6] text-xs font-bold px-2 py-0.5 rounded">
                <Star className="w-3 h-3 fill-current" /> {dest.rating}
              </div>

              <div className="absolute bottom-3 left-3 right-3 text-white">
                <h3 className="font-serif font-bold text-lg text-white truncate">{dest.name}</h3>
                <div className="flex items-center gap-1 text-[11px] text-white/80">
                  <MapPin className="w-3 h-3 text-[#D4A373]" />
                  <span className="truncate">{dest.location}</span>
                </div>
              </div>
            </div>

            {/* Content & Actions */}
            <div className="p-4 flex flex-col flex-1 justify-between">
              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                {dest.shortDescription}
              </p>

              <div className="mt-4 pt-3 border-t border-[#F0EAE1] flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <button
                    disabled={index === 0}
                    onClick={() => handleMove(index, 'up')}
                    className="p-1 text-slate-400 hover:text-slate-800 disabled:opacity-20"
                    title="Move Up"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    disabled={index === destinations.length - 1}
                    onClick={() => handleMove(index, 'down')}
                    className="p-1 text-slate-400 hover:text-slate-800 disabled:opacity-20"
                    title="Move Down"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-[11px] text-slate-400 ml-1">#{dest.order}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => updateDestination(dest.id, { isPublished: !dest.isPublished })}
                    className="p-1.5 text-slate-500 hover:text-[#133826]"
                    title={dest.isPublished ? 'Unpublish to Draft' : 'Publish Live'}
                  >
                    {dest.isPublished ? <Eye className="w-4 h-4 text-emerald-600" /> : <EyeOff className="w-4 h-4 text-slate-400" />}
                  </button>

                  <button
                    onClick={() => setEditingDest(dest)}
                    className="px-2.5 py-1 bg-[#FAF8F5] border border-[#D5CEC5] text-[#133826] hover:bg-[#F0EAE1] rounded-lg text-xs font-semibold flex items-center gap-1"
                  >
                    <Edit2 className="w-3 h-3" /> Edit
                  </button>

                  <button
                    onClick={() => {
                      if (confirm(`Delete destination "${dest.name}"?`)) deleteDestination(dest.id);
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

      {/* Edit Destination Modal */}
      {editingDest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#FAF8F5] rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-[#D4A373]/40 space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="font-serif text-2xl font-bold text-[#133826]">
              Edit Destination: {editingDest.name}
            </h3>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Destination Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingDest.name}
                    onChange={(e) => setEditingDest({ ...editingDest, name: e.target.value })}
                    className="w-full px-3.5 py-2 bg-white border border-[#D5CEC5] rounded-xl text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Category
                  </label>
                  <select
                    value={editingDest.category}
                    onChange={(e) =>
                      setEditingDest({
                        ...editingDest,
                        category: e.target.value as Destination['category'],
                      })
                    }
                    className="w-full px-3.5 py-2 bg-white border border-[#D5CEC5] rounded-xl text-xs font-semibold"
                  >
                    <option value="Heritage & Architecture">Heritage & Architecture</option>
                    <option value="Nature & Trails">Nature & Trails</option>
                    <option value="Viewpoints & Dining">Viewpoints & Dining</option>
                    <option value="Cultural Museums">Cultural Museums</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Location Coordinates / Area *
                </label>
                <input
                  type="text"
                  required
                  value={editingDest.location}
                  onChange={(e) => setEditingDest({ ...editingDest, location: e.target.value })}
                  className="w-full px-3.5 py-2 bg-white border border-[#D5CEC5] rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Short Description
                </label>
                <textarea
                  rows={2}
                  value={editingDest.shortDescription}
                  onChange={(e) => setEditingDest({ ...editingDest, shortDescription: e.target.value })}
                  className="w-full px-3.5 py-2 bg-white border border-[#D5CEC5] rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Detailed Overview
                </label>
                <textarea
                  rows={4}
                  value={editingDest.fullDescription}
                  onChange={(e) => setEditingDest({ ...editingDest, fullDescription: e.target.value })}
                  className="w-full px-3.5 py-2 bg-white border border-[#D5CEC5] rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Featured Image URL
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={editingDest.featuredImage}
                    onChange={(e) => setEditingDest({ ...editingDest, featuredImage: e.target.value })}
                    className="flex-1 px-3.5 py-2 bg-white border border-[#D5CEC5] rounded-xl text-xs font-mono"
                  />
                  <select
                    onChange={(e) => {
                      if (e.target.value) setEditingDest({ ...editingDest, featuredImage: e.target.value });
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

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Entry Fee
                  </label>
                  <input
                    type="text"
                    value={editingDest.entryFee}
                    onChange={(e) => setEditingDest({ ...editingDest, entryFee: e.target.value })}
                    className="w-full px-3 py-1.5 bg-white border rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Duration
                  </label>
                  <input
                    type="text"
                    value={editingDest.typicalDuration}
                    onChange={(e) => setEditingDest({ ...editingDest, typicalDuration: e.target.value })}
                    className="w-full px-3 py-1.5 bg-white border rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Rating (1-5)
                  </label>
                  <input
                    type="number"
                    step="0.05"
                    min="1"
                    max="5"
                    value={editingDest.rating}
                    onChange={(e) => setEditingDest({ ...editingDest, rating: parseFloat(e.target.value) })}
                    className="w-full px-3 py-1.5 bg-white border rounded-lg text-xs"
                  />
                </div>
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingDest.isFeatured}
                    onChange={(e) => setEditingDest({ ...editingDest, isFeatured: e.target.checked })}
                    className="accent-[#133826]"
                  />
                  <span>Mark as Featured Destination</span>
                </label>

                <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingDest.isPublished}
                    onChange={(e) => setEditingDest({ ...editingDest, isPublished: e.target.checked })}
                    className="accent-[#133826]"
                  />
                  <span>Published Live</span>
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setEditingDest(null)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded-xl text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#133826] text-[#D4A373] font-bold text-xs uppercase rounded-xl hover:bg-[#1B4332]"
                >
                  Save Destination
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Destination Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#FAF8F5] rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-[#D4A373]/40 space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="font-serif text-2xl font-bold text-[#133826]">
              Add New Destination
            </h3>

            <form onSubmit={handleCreate} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Destination Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Shakarparian Pine Park"
                    value={newDest.name}
                    onChange={(e) => setNewDest({ ...newDest, name: e.target.value })}
                    className="w-full px-3.5 py-2 bg-white border border-[#D5CEC5] rounded-xl text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Category
                  </label>
                  <select
                    value={newDest.category}
                    onChange={(e) =>
                      setNewDest({
                        ...newDest,
                        category: e.target.value as Destination['category'],
                      })
                    }
                    className="w-full px-3.5 py-2 bg-white border border-[#D5CEC5] rounded-xl text-xs font-semibold"
                  >
                    <option value="Heritage & Architecture">Heritage & Architecture</option>
                    <option value="Nature & Trails">Nature & Trails</option>
                    <option value="Viewpoints & Dining">Viewpoints & Dining</option>
                    <option value="Cultural Museums">Cultural Museums</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Location Coordinates / Area *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Shakarparian Hills, Islamabad"
                  value={newDest.location}
                  onChange={(e) => setNewDest({ ...newDest, location: e.target.value })}
                  className="w-full px-3.5 py-2 bg-white border border-[#D5CEC5] rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Short Description
                </label>
                <textarea
                  rows={2}
                  placeholder="Crisp 1-2 sentence overview..."
                  value={newDest.shortDescription}
                  onChange={(e) => setNewDest({ ...newDest, shortDescription: e.target.value })}
                  className="w-full px-3.5 py-2 bg-white border border-[#D5CEC5] rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Select Featured Photography
                </label>
                <select
                  value={newDest.featuredImage}
                  onChange={(e) => setNewDest({ ...newDest, featuredImage: e.target.value })}
                  className="w-full px-3.5 py-2 bg-white border border-[#D5CEC5] rounded-xl text-xs font-semibold"
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
                  className="px-6 py-2 bg-[#133826] text-[#D4A373] font-bold text-xs uppercase rounded-xl hover:bg-[#1B4332]"
                >
                  Create Destination
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
