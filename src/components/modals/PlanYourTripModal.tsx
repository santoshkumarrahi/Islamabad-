import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { X, Calendar, Users, MapPin, Sparkles, Check, MessageSquare, Phone, Mail, User } from 'lucide-react';

interface PlanYourTripModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedPackageId?: string;
  preselectedDestinationId?: string;
}

export const PlanYourTripModal: React.FC<PlanYourTripModalProps> = ({
  isOpen,
  onClose,
  preselectedPackageId,
  preselectedDestinationId,
}) => {
  const { packages, destinations, addInquiry, settings } = useCms();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    phone: '',
    packageId: preselectedPackageId || '',
    destinationId: preselectedDestinationId || '',
    travelDate: new Date(Date.now() + 86400000 * 7).toISOString().split('T')[0],
    guestsCount: 2,
    budgetPkr: '50,000 - 150,000 PKR',
    interests: ['Heritage & Architecture', 'Mountain Hikes'],
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleInterestToggle = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.customerName || !formData.phone) return;

    const matchedPkg = packages.find((p) => p.id === formData.packageId);
    const matchedDest = destinations.find((d) => d.id === formData.destinationId);

    addInquiry({
      customerName: formData.customerName,
      email: formData.email,
      phone: formData.phone,
      packageId: formData.packageId,
      packageName: matchedPkg ? matchedPkg.title : undefined,
      destinationId: formData.destinationId,
      destinationName: matchedDest ? matchedDest.name : undefined,
      travelDate: formData.travelDate,
      guestsCount: Number(formData.guestsCount) || 1,
      budgetPkr: formData.budgetPkr,
      message: `${formData.message ? formData.message + ' | ' : ''}Interests: ${formData.interests.join(', ')}`,
    });

    setSubmitted(true);
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setStep(1);
    onClose();
  };

  const interestOptions = [
    'Faisal Mosque & Heritage',
    'Margalla Ridge Treks',
    'Luxury Stays & Spas',
    'Culinary & Street Food',
    'Photography Golden Hour',
    'Family Scenic Boating',
    'Private Chauffeur Tour',
    'Diplomatic / VIP Service',
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#0F241B]/80 backdrop-blur-sm transition-opacity"
        onClick={handleResetAndClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-2xl bg-[#FBF9F5] rounded-3xl shadow-2xl border-2 border-[#C5A059]/40 overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-br from-[#07140E] via-[#0B2017] to-[#143D2D] text-[#FAF8F5] p-6 sm:p-8 relative border-b border-[#C5A059]/30">
          <button
            onClick={handleResetAndClose}
            className="absolute top-6 right-6 text-white/70 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5 text-[#D8B574]" />
          </button>

          <span className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-[#D8B574] block mb-1">
            Bespoke Capital Concierge
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
            Plan Your Islamabad Escape
          </h2>
          <p className="text-xs sm:text-sm text-white/80 mt-1 max-w-lg font-light leading-relaxed">
            Let our local destination architects curate an unforgettable itinerary tailored to your rhythm and taste.
          </p>

          {/* Stepper (if not submitted) */}
          {!submitted && (
            <div className="flex items-center gap-2 mt-6">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex-1 flex items-center gap-2">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-all ${
                      step === s
                        ? 'bg-gradient-to-r from-[#C5A059] to-[#D8B574] text-[#07140E] shadow-md font-bold'
                        : step > s
                        ? 'bg-[#143D2D] text-[#D8B574] border border-[#C5A059]/50'
                        : 'bg-white/10 text-white/60'
                    }`}
                  >
                    {step > s ? <Check className="w-3.5 h-3.5" /> : s}
                  </div>
                  <div
                    className={`h-1 flex-1 rounded-full transition-colors ${
                      step >= s ? 'bg-[#C5A059]' : 'bg-white/10'
                    }`}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8">
          {submitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-[#133826] text-[#D4A373] rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <Check className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-[#133826]">
                Itinerary Request Received!
              </h3>
              <p className="text-sm text-[#4A5D53] mt-2 max-w-md mx-auto leading-relaxed">
                Thank you, <strong className="text-[#133826]">{formData.customerName}</strong>. Our senior itinerary architect has received your details and will contact you via WhatsApp or phone within a few hours.
              </p>

              <div className="mt-6 p-4 bg-[#F0EAE1] rounded-xl text-left max-w-md mx-auto text-xs space-y-2 border border-[#D4A373]/30">
                <div className="flex justify-between">
                  <span className="text-slate-600">Travel Date:</span>
                  <span className="font-semibold text-slate-900">{formData.travelDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Travelers:</span>
                  <span className="font-semibold text-slate-900">{formData.guestsCount} Guests</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Estimated Budget:</span>
                  <span className="font-semibold text-slate-900">{formData.budgetPkr}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
                <a
                  href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                    `Salam! I just submitted an inquiry for ${formData.guestsCount} guests on ${formData.travelDate}. My name is ${formData.customerName}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-[#25D366] text-white rounded-xl font-medium text-sm hover:bg-[#20ba59] transition-colors flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" /> Direct WhatsApp Chat
                </a>
                <button
                  onClick={handleResetAndClose}
                  className="px-6 py-3 bg-[#133826] text-[#FAF8F5] rounded-xl font-medium text-sm hover:bg-[#1B4332] transition-colors"
                >
                  Return to Website
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {/* Step 1: Preferences & Dates */}
              {step === 1 && (
                <div className="space-y-5 animate-in fade-in duration-150">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-[#133826]">
                    Step 1: Your Travel Dates & Desired Experiences
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#133826]" /> Expected Travel Date
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.travelDate}
                        onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-white border border-[#D5CEC5] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#133826]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-[#133826]" /> Number of Guests
                      </label>
                      <select
                        value={formData.guestsCount}
                        onChange={(e) => setFormData({ ...formData, guestsCount: Number(e.target.value) })}
                        className="w-full px-3.5 py-2.5 bg-white border border-[#D5CEC5] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#133826]"
                      >
                        {[1, 2, 3, 4, 5, 6, 8, 10, '12+ (Delegation)'].map((num) => (
                          <option key={num} value={typeof num === 'number' ? num : 12}>
                            {num} {typeof num === 'number' && (num === 1 ? 'Guest (Solo)' : 'Guests')}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-2 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#133826]" /> Select Experiences of Interest
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-2 gap-2">
                      {interestOptions.map((opt) => {
                        const isSelected = formData.interests.includes(opt);
                        return (
                          <button
                            type="button"
                            key={opt}
                            onClick={() => handleInterestToggle(opt)}
                            className={`p-2.5 text-xs rounded-xl text-left border transition-all ${
                              isSelected
                                ? 'bg-[#133826] text-white border-[#133826] font-medium shadow-sm'
                                : 'bg-white text-slate-700 border-[#E5DFD7] hover:border-[#133826]'
                            }`}
                          >
                            <span className="block truncate">{opt}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-6 py-2.5 bg-[#133826] text-[#FAF8F5] rounded-xl text-sm font-semibold hover:bg-[#1B4332] transition-colors"
                    >
                      Next: Choose Itinerary & Budget →
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Package / Destination & Budget */}
              {step === 2 && (
                <div className="space-y-5 animate-in fade-in duration-150">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-[#133826]">
                    Step 2: Specific Package & Estimated Budget
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Select a Curated Package (Optional)
                      </label>
                      <select
                        value={formData.packageId}
                        onChange={(e) => setFormData({ ...formData, packageId: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-white border border-[#D5CEC5] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#133826]"
                      >
                        <option value="">Custom Tailored Itinerary</option>
                        {packages.map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.title} (PKR {p.pricePkr.toLocaleString()})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Priority Highlight Destination
                      </label>
                      <select
                        value={formData.destinationId}
                        onChange={(e) => setFormData({ ...formData, destinationId: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-white border border-[#D5CEC5] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#133826]"
                      >
                        <option value="">Explore All Key Spots</option>
                        {destinations.map((d) => (
                          <option key={d.id} value={d.id}>
                            {d.name} ({d.category})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Estimated Budget Range (PKR)
                    </label>
                    <select
                      value={formData.budgetPkr}
                      onChange={(e) => setFormData({ ...formData, budgetPkr: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-[#D5CEC5] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#133826]"
                    >
                      <option value="Under 35,000 PKR">Under 35,000 PKR (Day Trips)</option>
                      <option value="35,000 - 80,000 PKR">35,000 - 80,000 PKR (Standard Weekend Escapes)</option>
                      <option value="80,000 - 150,000 PKR">80,000 - 150,000 PKR (Premium Guided Retreats)</option>
                      <option value="150,000 - 300,000+ PKR">150,000 - 300,000+ PKR (VIP 5-Star Serena Luxury)</option>
                    </select>
                  </div>

                  <div className="flex justify-between pt-4">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-5 py-2.5 border border-slate-300 text-slate-700 rounded-xl text-sm hover:bg-slate-100 transition-colors"
                    >
                      ← Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="px-6 py-2.5 bg-[#133826] text-[#FAF8F5] rounded-xl text-sm font-semibold hover:bg-[#1B4332] transition-colors"
                    >
                      Next: Contact Information →
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Contact & Special Requests */}
              {step === 3 && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-[#133826]">
                    Step 3: Where Should We Send Your Itinerary?
                  </h4>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-[#133826]" /> Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Tariq Abbasi or Sarah Jenkins"
                      value={formData.customerName}
                      onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-[#D5CEC5] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#133826]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-[#133826]" /> WhatsApp / Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+92 300 1234567"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-white border border-[#D5CEC5] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#133826]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-[#133826]" /> Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="you@domain.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-white border border-[#D5CEC5] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#133826]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Special Requests, Dietary Needs or Flight Details
                    </label>
                    <textarea
                      rows={3}
                      placeholder="e.g. Vegetarian dining requested, wheelchair access, photography permits, airport pickup from ISB..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-[#D5CEC5] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#133826]"
                    />
                  </div>

                  <div className="flex justify-between pt-4">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-5 py-2.5 border border-[#D5CEC5] text-[#0B2017] rounded-xl text-sm font-medium hover:bg-slate-100 transition-colors"
                    >
                      ← Back
                    </button>
                    <button
                      type="submit"
                      className="px-7 py-2.5 bg-gradient-to-r from-[#C5A059] to-[#D8B574] text-[#07140E] hover:from-[#D8B574] hover:to-[#E8CF9B] rounded-xl text-sm font-bold shadow-lg transition-all"
                    >
                      Submit Booking Inquiry ✓
                    </button>
                  </div>
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
