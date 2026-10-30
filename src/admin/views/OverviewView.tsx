import React from 'react';
import { useCms } from '../../context/CmsContext';
import { MapPin, Compass, Package, Image as ImageIcon, BookOpen, MessageSquare, ArrowUpRight, TrendingUp, Users, DollarSign, Plus, Eye, Sparkles } from 'lucide-react';

interface OverviewViewProps {
  onNavigateTab: (tab: string) => void;
  onOpenLiveSite: () => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({ onNavigateTab, onOpenLiveSite }) => {
  const { destinations, services, packages, mediaFiles, inquiries, testimonials, heroSlides } = useCms();

  const totalDestinations = destinations.length;
  const totalServices = services.length;
  const totalPackages = packages.length;
  const totalMedia = mediaFiles.length;
  const totalInquiries = inquiries.length;
  const confirmedBookings = inquiries.filter((i) => i.status === 'Confirmed').length;
  const newInquiries = inquiries.filter((i) => i.status === 'New').length;

  // Approximate PKR pipeline calculation
  const totalRevenuePipelinePkr = inquiries
    .filter((i) => i.status === 'Confirmed')
    .reduce((acc, curr) => {
      const pkg = packages.find((p) => p.id === curr.packageId);
      return acc + (pkg ? pkg.pricePkr * curr.guestsCount : 50000 * curr.guestsCount);
    }, 0);

  const stats = [
    {
      title: 'Active Destinations',
      value: totalDestinations,
      icon: MapPin,
      change: '+2 this month',
      tab: 'destinations',
      color: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    },
    {
      title: 'Curated Services',
      value: totalServices,
      icon: Compass,
      change: '9 Active in Grid',
      tab: 'services',
      color: 'bg-blue-50 text-blue-800 border-blue-200',
    },
    {
      title: 'Travel Packages',
      value: totalPackages,
      icon: Package,
      change: 'PKR Pricing Live',
      tab: 'packages',
      color: 'bg-amber-50 text-amber-800 border-amber-200',
    },
    {
      title: 'Uploaded Media Assets',
      value: totalMedia,
      icon: ImageIcon,
      change: 'Faisal & Margalla Assets',
      tab: 'media',
      color: 'bg-purple-50 text-purple-800 border-purple-200',
    },
    {
      title: 'Confirmed Bookings',
      value: confirmedBookings,
      icon: BookOpen,
      change: `${newInquiries} Pending Inquiries`,
      tab: 'bookings',
      color: 'bg-teal-50 text-teal-800 border-teal-200',
    },
    {
      title: 'Confirmed Pipeline',
      value: `PKR ${(totalRevenuePipelinePkr / 1000).toFixed(0)}k`,
      icon: DollarSign,
      change: 'Tourism Revenue',
      tab: 'bookings',
      color: 'bg-[#F2EDE5] text-[#133826] border-[#D4A373]',
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Top Banner with Quick Actions */}
      <div className="bg-gradient-to-br from-[#07140E] via-[#0B2017] to-[#143D2D] text-[#FAF8F5] rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#C5A059]/30 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#C5A059]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D8B574] animate-pulse" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-[#D8B574]">
              Executive Command & CMS Control Center
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
            Welcome back, Chief Curator
          </h2>
          <p className="text-xs sm:text-sm text-white/80 mt-2 font-light leading-relaxed">
            All CMS modifications immediately update the live public website and are stored in server-side disk persistence. Manage hero slides, upload high-res imagery, configure PKR travel packages, and process guest inquiries.
          </p>
        </div>

        <div className="relative z-10 flex flex-wrap items-center gap-3 shrink-0">
          <button
            onClick={onOpenLiveSite}
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold backdrop-blur-sm border border-white/20 transition-all flex items-center gap-1.5 hover:border-[#C5A059]/50"
          >
            <Eye className="w-4 h-4 text-[#D8B574]" />
            <span>View Live Website</span>
          </button>
          <button
            onClick={() => onNavigateTab('media')}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#C5A059] to-[#D8B574] text-[#07140E] hover:from-[#D8B574] hover:to-[#E8CF9B] text-xs font-bold uppercase tracking-wider transition-all shadow-lg flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Upload New Media</span>
          </button>
        </div>
      </div>

      {/* Statistics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {stats.map((st, i) => {
          const Icon = st.icon;
          return (
            <div
              key={i}
              onClick={() => onNavigateTab(st.tab)}
              className="bg-white rounded-2xl p-5 border border-[#E5DFD7] shadow-sm hover:shadow-xl hover:border-[#C5A059]/50 transition-all cursor-pointer flex items-center justify-between group"
            >
              <div>
                <div className="text-[11px] font-mono font-bold text-slate-500 uppercase tracking-wider">
                  {st.title}
                </div>
                <div className="text-2xl sm:text-3xl font-serif font-bold text-[#0B2017] mt-1 group-hover:text-[#8A6D3B] transition-colors">
                  {st.value}
                </div>
                <div className="text-[11px] font-medium text-[#1B4332] mt-1.5 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-[#C5A059]" /> {st.change}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#0B2017]/5 border border-[#C5A059]/20 text-[#0B2017] group-hover:bg-[#0B2017] group-hover:text-[#D8B574] group-hover:scale-105 transition-all">
                <Icon className="w-6 h-6" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Visual Analytics & Recent Inquiries Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Interactive Booking Trends & Distribution Chart (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-[#EBE4DC] shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif font-bold text-lg text-[#133826]">
                Monthly Inquiry & Revenue Velocity
              </h3>
              <p className="text-xs text-slate-500">
                Seasonal booking demand in Islamabad (PKR in Thousands)
              </p>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 bg-emerald-50 text-emerald-800 rounded-md">
              High Season
            </span>
          </div>

          {/* Bar Chart Representation */}
          <div className="pt-4 space-y-3">
            {[
              { month: 'Jul 2026', volume: 45, pkr: 'PKR 450,000' },
              { month: 'Aug 2026', volume: 60, pkr: 'PKR 680,000' },
              { month: 'Sep 2026', volume: 80, pkr: 'PKR 920,000' },
              { month: 'Oct 2026 (Peak)', volume: 95, pkr: 'PKR 1,450,000' },
              { month: 'Nov 2026 (Forecast)', volume: 85, pkr: 'PKR 1,200,000' },
            ].map((bar, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs text-slate-700 font-medium">
                  <span>{bar.month}</span>
                  <span className="font-bold text-[#133826]">{bar.pkr}</span>
                </div>
                <div className="h-3 w-full bg-[#FAF8F5] rounded-full overflow-hidden border border-slate-200">
                  <div
                    className="h-full bg-gradient-to-r from-[#1B4332] to-[#D4A373] rounded-full transition-all duration-1000"
                    style={{ width: `${bar.volume}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-[#F0EAE1] flex items-center justify-between text-xs text-slate-500">
            <span>Autumn & Spring are peak trekking months in Margalla Hills.</span>
            <button
              onClick={() => onNavigateTab('bookings')}
              className="text-[#133826] font-bold hover:underline flex items-center gap-1"
            >
              <span>Manage Bookings</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right: Recent Inquiries & Activity (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-[#EBE4DC] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif font-bold text-lg text-[#133826]">
                Recent Inquiries
              </h3>
              <button
                onClick={() => onNavigateTab('bookings')}
                className="text-xs font-semibold text-[#2D6A4F] hover:underline"
              >
                View All ({inquiries.length})
              </button>
            </div>

            <div className="space-y-3">
              {inquiries.slice(0, 4).map((inq) => (
                <div
                  key={inq.id}
                  onClick={() => onNavigateTab('bookings')}
                  className="p-3 rounded-xl bg-[#FAF8F5] hover:bg-[#F4F0E8] border border-[#EAE3DA] transition-colors cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#133826]">
                      {inq.customerName}
                    </span>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                        inq.status === 'Confirmed'
                          ? 'bg-emerald-100 text-emerald-800'
                          : inq.status === 'Contacted'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {inq.status}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-600 truncate mt-0.5">
                    {inq.packageName || inq.destinationName || 'Custom Islamabad Escapes Tour'}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1 flex justify-between">
                    <span>Date: {inq.travelDate}</span>
                    <span>{inq.guestsCount} Guests</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-[#F0EAE1] mt-4">
            <button
              onClick={() => onNavigateTab('bookings')}
              className="w-full py-2.5 bg-[#FAF8F5] hover:bg-[#F0EAE1] text-[#133826] border border-[#D5CEC5] rounded-xl text-xs font-semibold transition-colors text-center"
            >
              Open Inquiry Management Portal
            </button>
          </div>
        </div>
      </div>

      {/* Recent Uploads Strip */}
      <div className="bg-white rounded-2xl p-6 border border-[#EBE4DC] shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-serif font-bold text-lg text-[#133826]">
              Recent Media Assets
            </h3>
            <p className="text-xs text-slate-500">
              Live photography loaded in the permanent Islamabad Escapes media archive
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('media')}
            className="text-xs font-bold text-[#133826] hover:underline"
          >
            Manage Media Library →
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {mediaFiles.slice(0, 7).map((file) => (
            <div
              key={file.id}
              onClick={() => onNavigateTab('media')}
              className="group relative rounded-xl overflow-hidden border border-slate-200 aspect-[4/3] bg-slate-900 cursor-pointer shadow-xs hover:shadow-md transition-all"
            >
              <img
                src={file.url}
                alt={file.name}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-[10px] font-bold text-white bg-black/60 px-2 py-1 rounded">
                  Manage
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
