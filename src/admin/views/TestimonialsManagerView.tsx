import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { Testimonial } from '../../types';
import { Plus, Trash2, Edit2, Star, CheckCircle, Eye, EyeOff } from 'lucide-react';

export const TestimonialsManagerView: React.FC = () => {
  const { testimonials, addTestimonial, updateTestimonial, deleteTestimonial } = useCms();

  const [editingTest, setEditingTest] = useState<Testimonial | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const [newTest, setNewTest] = useState<Omit<Testimonial, 'id'>>({
    customerName: '',
    location: 'Islamabad, Pakistan',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    review: '',
    experience: 'Classic Islamabad Heritage Tour',
    date: 'October 2026',
    isApproved: true,
    order: testimonials.length + 1,
  });

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTest) return;
    updateTestimonial(editingTest.id, editingTest);
    setEditingTest(null);
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTest.customerName || !newTest.review) return;
    addTestimonial(newTest);
    setShowAddModal(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E5DFD7]">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#1B4332] block">
            Traveler Feedback & Social Proof
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#133826]">
            Testimonial & Reviews Manager
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Approve, moderate, edit, and feature verified traveler reviews on the public site.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-5 py-2.5 bg-[#133826] text-[#D4A373] hover:text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#1B4332] shadow-md transition-all flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Review</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map((test) => (
          <div
            key={test.id}
            className={`p-5 rounded-2xl bg-white border shadow-xs flex flex-col justify-between transition-all ${
              test.isApproved ? 'border-[#E5DFD7]' : 'border-slate-300 opacity-60'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <img
                    src={test.photoUrl}
                    alt={test.customerName}
                    className="w-10 h-10 rounded-full object-cover border border-[#D4A373]"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-[#133826]">{test.customerName}</h4>
                    <span className="text-[11px] text-slate-500">{test.location}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-[#C59B27]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < test.rating ? 'fill-current' : 'text-slate-200'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <p className="text-xs text-slate-700 italic leading-relaxed">
                "{test.review}"
              </p>

              <div className="mt-3 text-[11px] text-[#2D6A4F] font-semibold">
                Exp: {test.experience} ({test.date})
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#F0EAE1] flex items-center justify-between">
              <button
                onClick={() => updateTestimonial(test.id, { isApproved: !test.isApproved })}
                className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 ${
                  test.isApproved
                    ? 'bg-emerald-50 text-emerald-800'
                    : 'bg-slate-100 text-slate-500'
                }`}
              >
                {test.isApproved ? <CheckCircle className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                <span>{test.isApproved ? 'Approved Live' : 'Hidden'}</span>
              </button>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setEditingTest(test)}
                  className="px-2.5 py-1 bg-[#FAF8F5] border border-[#D5CEC5] text-[#133826] rounded-lg text-xs font-semibold flex items-center gap-1"
                >
                  <Edit2 className="w-3 h-3" /> Edit
                </button>
                <button
                  onClick={() => {
                    if (confirm(`Delete review from "${test.customerName}"?`)) deleteTestimonial(test.id);
                  }}
                  className="p-1.5 text-slate-400 hover:text-red-600"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Review Modal */}
      {editingTest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#FAF8F5] rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-[#D4A373]/40 space-y-4">
            <h3 className="font-serif text-xl font-bold text-[#133826]">
              Edit Testimonial
            </h3>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Customer Name *</label>
                <input
                  type="text"
                  required
                  value={editingTest.customerName}
                  onChange={(e) => setEditingTest({ ...editingTest, customerName: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-white border rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={editingTest.location}
                    onChange={(e) => setEditingTest({ ...editingTest, location: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs bg-white border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Rating (1-5)</label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={editingTest.rating}
                    onChange={(e) => setEditingTest({ ...editingTest, rating: parseInt(e.target.value) || 5 })}
                    className="w-full px-3 py-1.5 text-xs bg-white border rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Review Statement *</label>
                <textarea
                  rows={3}
                  required
                  value={editingTest.review}
                  onChange={(e) => setEditingTest({ ...editingTest, review: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-white border rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Experience Type</label>
                <input
                  type="text"
                  value={editingTest.experience}
                  onChange={(e) => setEditingTest({ ...editingTest, experience: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs bg-white border rounded-xl"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t">
                <button
                  type="button"
                  onClick={() => setEditingTest(null)}
                  className="px-4 py-2 border text-slate-700 rounded-xl text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#133826] text-[#D4A373] text-xs font-bold uppercase rounded-xl"
                >
                  Save Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Review Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#FAF8F5] rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-[#D4A373]/40 space-y-4">
            <h3 className="font-serif text-xl font-bold text-[#133826]">
              Add New Review
            </h3>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Customer Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Captain Ronald Sterling"
                  value={newTest.customerName}
                  onChange={(e) => setNewTest({ ...newTest, customerName: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-white border rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Review *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Customer experience quote..."
                  value={newTest.review}
                  onChange={(e) => setNewTest({ ...newTest, review: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-white border rounded-xl"
                />
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
                  Add Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
