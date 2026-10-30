import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { GalleryItem } from '../../types';
import { Plus, Trash2, Edit2, Image as ImageIcon } from 'lucide-react';

export const GalleryManagerView: React.FC = () => {
  const { gallery, addGalleryItem, updateGalleryItem, deleteGalleryItem, mediaFiles } = useCms();

  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const [newItem, setNewItem] = useState<Omit<GalleryItem, 'id'>>({
    title: '',
    category: 'Monuments',
    imageUrl: mediaFiles[0]?.url || '/assets/aistudio/Faisal_Mosque_Tours_a6b4199e.jfif',
    caption: '',
    order: gallery.length + 1,
  });

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    updateGalleryItem(editingItem.id, editingItem);
    setEditingItem(null);
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.title) return;
    addGalleryItem(newItem);
    setShowAddModal(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E5DFD7]">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#1B4332] block">
            Visual Experience Showcase
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#133826]">
            Gallery Manager
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Curate photography items, categories, and captions in the masonry gallery and lightbox.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-5 py-2.5 bg-[#133826] text-[#D4A373] hover:text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#1B4332] shadow-md transition-all flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Photo to Gallery</span>
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
        {gallery.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl overflow-hidden border border-[#E5DFD7] shadow-xs flex flex-col justify-between"
          >
            <div className="relative aspect-[4/3] bg-slate-900 overflow-hidden">
              <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
              <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#133826]/80 text-[#D4A373] text-[9px] font-bold uppercase">
                {item.category}
              </div>
            </div>

            <div className="p-3 flex flex-col flex-1 justify-between">
              <div>
                <h4 className="text-xs font-bold text-[#133826] truncate">{item.title}</h4>
                <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{item.caption}</p>
              </div>

              <div className="mt-3 pt-2 border-t border-[#F0EAE1] flex items-center justify-end gap-1">
                <button
                  onClick={() => setEditingItem(item)}
                  className="p-1 text-slate-500 hover:text-[#133826]"
                  title="Edit"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => {
                    if (confirm(`Remove "${item.title}" from gallery?`)) deleteGalleryItem(item.id);
                  }}
                  className="p-1 text-slate-400 hover:text-red-600"
                  title="Delete"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#FAF8F5] rounded-3xl max-w-md w-full p-6 shadow-2xl border border-[#D4A373]/40 space-y-4">
            <h3 className="font-serif text-xl font-bold text-[#133826]">
              Edit Gallery Item
            </h3>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Title *</label>
                <input
                  type="text"
                  required
                  value={editingItem.title}
                  onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-white border rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                <select
                  value={editingItem.category}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      category: e.target.value as GalleryItem['category'],
                    })
                  }
                  className="w-full px-3 py-2 text-xs bg-white border rounded-xl"
                >
                  <option value="Monuments">Monuments</option>
                  <option value="Margalla Trails">Margalla Trails</option>
                  <option value="Scenic Vistas">Scenic Vistas</option>
                  <option value="Culture & Food">Culture & Food</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Caption</label>
                <textarea
                  rows={2}
                  value={editingItem.caption}
                  onChange={(e) => setEditingItem({ ...editingItem, caption: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-white border rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Image URL</label>
                <select
                  value={editingItem.imageUrl}
                  onChange={(e) => setEditingItem({ ...editingItem, imageUrl: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-white border rounded-xl"
                >
                  {mediaFiles.map((m) => (
                    <option key={m.id} value={m.url}>
                      {m.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 border text-slate-700 rounded-xl text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#133826] text-[#D4A373] text-xs font-bold uppercase rounded-xl"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#FAF8F5] rounded-3xl max-w-md w-full p-6 shadow-2xl border border-[#D4A373]/40 space-y-4">
            <h3 className="font-serif text-xl font-bold text-[#133826]">
              Add Photo to Gallery
            </h3>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sunset Clouds over Margalla"
                  value={newItem.title}
                  onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-white border rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                <select
                  value={newItem.category}
                  onChange={(e) =>
                    setNewItem({
                      ...newItem,
                      category: e.target.value as GalleryItem['category'],
                    })
                  }
                  className="w-full px-3 py-2 text-xs bg-white border rounded-xl"
                >
                  <option value="Monuments">Monuments</option>
                  <option value="Margalla Trails">Margalla Trails</option>
                  <option value="Scenic Vistas">Scenic Vistas</option>
                  <option value="Culture & Food">Culture & Food</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Caption</label>
                <textarea
                  rows={2}
                  placeholder="Optional visual notes..."
                  value={newItem.caption}
                  onChange={(e) => setNewItem({ ...newItem, caption: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-white border rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Select Photography</label>
                <select
                  value={newItem.imageUrl}
                  onChange={(e) => setNewItem({ ...newItem, imageUrl: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-white border rounded-xl"
                >
                  {mediaFiles.map((m) => (
                    <option key={m.id} value={m.url}>
                      {m.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border text-slate-700 rounded-xl text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#133826] text-[#D4A373] text-xs font-bold uppercase rounded-xl"
                >
                  Add Photo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
