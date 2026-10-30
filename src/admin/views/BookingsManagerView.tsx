import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { Inquiry } from '../../types';
import { Search, Download, Trash2, Mail, Phone, Calendar, MessageSquare, CheckCircle, Clock, XCircle, AlertCircle, Save } from 'lucide-react';

export const BookingsManagerView: React.FC = () => {
  const { inquiries, updateInquiryStatus, updateInquiryNotes, deleteInquiry, addToast } = useCms();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [notesInput, setNotesInput] = useState('');

  const filteredInquiries = inquiries.filter((inq) => {
    const matchesQuery =
      inq.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.phone.includes(searchQuery) ||
      (inq.packageName && inq.packageName.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = statusFilter === 'All' || inq.status === statusFilter;
    return matchesQuery && matchesStatus;
  });

  const handleSelectInquiry = (inq: Inquiry) => {
    setSelectedInquiry(inq);
    setNotesInput(inq.internalNotes || '');
  };

  const handleSaveNotes = () => {
    if (!selectedInquiry) return;
    updateInquiryNotes(selectedInquiry.id, notesInput);
    setSelectedInquiry({ ...selectedInquiry, internalNotes: notesInput });
  };

  const handleExportCsv = () => {
    const headers = 'ID,Customer Name,Email,Phone,Package,Travel Date,Guests,Budget,Status,Created At\n';
    const rows = inquiries
      .map(
        (i) =>
          `"${i.id}","${i.customerName}","${i.email}","${i.phone}","${i.packageName || 'Custom'}","${i.travelDate}","${i.guestsCount}","${i.budgetPkr || ''}","${i.status}","${i.createdAt}"`
      )
      .join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `islamabad_escapes_inquiries_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addToast('Inquiries CSV exported successfully');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E5DFD7]">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#1B4332] block">
            Lead Management & Guest Requests
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#133826]">
            Bookings & Inquiries Manager
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Track inquiries, update reservation status (New, Contacted, Confirmed, Cancelled), and record internal notes.
          </p>
        </div>

        <button
          onClick={handleExportCsv}
          className="px-4 py-2.5 bg-[#FAF8F5] border border-[#D5CEC5] text-[#133826] hover:bg-[#F0EAE1] rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Download className="w-4 h-4 text-[#2D6A4F]" />
          <span>Export Inquiries CSV</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, email, phone, or package..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-[#D5CEC5] rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#133826]"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1">
          {['All', 'New', 'Contacted', 'Confirmed', 'Cancelled'].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                statusFilter === s
                  ? 'bg-[#133826] text-[#D4A373]'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-[#E5DFD7]'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Inquiries Table + Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Table View (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-[#EBE4DC] shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#FAF8F5] border-b border-[#E5DFD7] text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                  <th className="py-3 px-4">Client</th>
                  <th className="py-3 px-4">Package / Destination</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredInquiries.map((inq) => {
                  const isSelected = selectedInquiry?.id === inq.id;

                  return (
                    <tr
                      key={inq.id}
                      onClick={() => handleSelectInquiry(inq)}
                      className={`cursor-pointer transition-colors ${
                        isSelected ? 'bg-[#E8F0EA]/70 font-medium' : 'hover:bg-slate-50'
                      }`}
                    >
                      <td className="py-3 px-4">
                        <div className="font-bold text-slate-900">{inq.customerName}</div>
                        <div className="text-[11px] text-slate-500">{inq.phone}</div>
                      </td>

                      <td className="py-3 px-4">
                        <div className="font-medium text-[#133826] truncate max-w-[180px]">
                          {inq.packageName || inq.destinationName || 'Custom Escapes Tour'}
                        </div>
                        <div className="text-[11px] text-slate-500">{inq.guestsCount} Travelers</div>
                      </td>

                      <td className="py-3 px-4 text-slate-700 whitespace-nowrap">
                        {inq.travelDate}
                      </td>

                      <td className="py-3 px-4">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                            inq.status === 'Confirmed'
                              ? 'bg-emerald-100 text-emerald-800'
                              : inq.status === 'Contacted'
                              ? 'bg-blue-100 text-blue-800'
                              : inq.status === 'Cancelled'
                              ? 'bg-rose-100 text-rose-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {inq.status}
                        </span>
                      </td>

                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (confirm(`Delete inquiry from "${inq.customerName}"?`)) {
                              deleteInquiry(inq.id);
                              if (selectedInquiry?.id === inq.id) setSelectedInquiry(null);
                            }
                          }}
                          className="p-1 text-slate-400 hover:text-red-600 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {filteredInquiries.length === 0 && (
              <div className="py-12 text-center text-slate-400 text-xs">
                No inquiries matching criteria.
              </div>
            )}
          </div>
        </div>

        {/* Selected Inquiry Inspector (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-[#EBE4DC] shadow-xs flex flex-col justify-between">
          {selectedInquiry ? (
            <div className="space-y-5">
              <div className="flex items-start justify-between border-b pb-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Inquiry #{selectedInquiry.id.substring(4)}
                  </span>
                  <h3 className="font-serif font-bold text-xl text-[#133826]">
                    {selectedInquiry.customerName}
                  </h3>
                  <div className="text-xs text-slate-500 mt-0.5">
                    Received: {selectedInquiry.createdAt}
                  </div>
                </div>

                {/* Status Switcher Dropdown */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Update Status
                  </label>
                  <select
                    value={selectedInquiry.status}
                    onChange={(e) => {
                      const newStatus = e.target.value as Inquiry['status'];
                      updateInquiryStatus(selectedInquiry.id, newStatus);
                      setSelectedInquiry({ ...selectedInquiry, status: newStatus });
                    }}
                    className="px-2.5 py-1 text-xs font-bold rounded-lg border border-slate-300 bg-white"
                  >
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              {/* Guest Details List */}
              <div className="space-y-2.5 text-xs">
                <div className="flex items-center gap-2 text-slate-700">
                  <Phone className="w-3.5 h-3.5 text-[#133826]" />
                  <a href={`tel:${selectedInquiry.phone}`} className="hover:underline font-semibold">
                    {selectedInquiry.phone}
                  </a>
                  <a
                    href={`https://wa.me/${selectedInquiry.phone.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-auto text-[11px] font-bold text-[#25D366] hover:underline flex items-center gap-1"
                  >
                    <MessageSquare className="w-3 h-3" /> WhatsApp
                  </a>
                </div>

                {selectedInquiry.email && (
                  <div className="flex items-center gap-2 text-slate-700">
                    <Mail className="w-3.5 h-3.5 text-[#133826]" />
                    <a href={`mailto:${selectedInquiry.email}`} className="hover:underline">
                      {selectedInquiry.email}
                    </a>
                  </div>
                )}

                <div className="flex items-center gap-2 text-slate-700">
                  <Calendar className="w-3.5 h-3.5 text-[#133826]" />
                  <span>Travel Date: <strong>{selectedInquiry.travelDate}</strong></span>
                </div>

                <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#EAE3DA]">
                  <div className="text-[11px] font-bold text-slate-500 uppercase">Package / Route:</div>
                  <div className="font-serif font-bold text-sm text-[#133826] mt-0.5">
                    {selectedInquiry.packageName || selectedInquiry.destinationName || 'Bespoke Private Itinerary'}
                  </div>
                  {selectedInquiry.budgetPkr && (
                    <div className="text-xs text-[#2D6A4F] font-semibold mt-1">
                      Budget Range: {selectedInquiry.budgetPkr}
                    </div>
                  )}
                  {selectedInquiry.message && (
                    <div className="text-xs text-slate-600 mt-2 italic bg-white p-2 rounded border border-slate-200">
                      "{selectedInquiry.message}"
                    </div>
                  )}
                </div>
              </div>

              {/* Internal Staff Notes */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center justify-between">
                  <span>Internal Staff Notes & Log</span>
                  <span className="text-[10px] text-slate-400 font-normal">Private to Admin</span>
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. Spoke with client via phone, sent PDF quote, requested VIP driver Asad Khan..."
                  value={notesInput}
                  onChange={(e) => setNotesInput(e.target.value)}
                  className="w-full p-2.5 bg-white border border-[#D5CEC5] rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-[#133826]"
                />
                <button
                  type="button"
                  onClick={handleSaveNotes}
                  className="mt-2 w-full py-2 bg-[#133826] text-[#D4A373] hover:text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Internal Notes</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="py-20 text-center text-slate-400 text-xs">
              Select an inquiry from the list to review contact details, update status, and take staff notes.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
