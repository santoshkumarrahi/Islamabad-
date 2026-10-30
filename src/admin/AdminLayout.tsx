import React, { useState } from 'react';
import { useCms } from '../context/CmsContext';
import { Logo } from '../components/common/Logo';
import {
  LayoutDashboard,
  Settings,
  Sliders,
  Layout,
  MapPin,
  Compass,
  Package,
  Image as ImageIcon,
  Images,
  MessageSquare,
  BookOpen,
  Menu as MenuIcon,
  Globe,
  Users,
  LogOut,
  ExternalLink,
  X,
  ChevronRight,
  Shield,
  Sparkles,
  DollarSign,
} from 'lucide-react';

// Subviews
import { OverviewView } from './views/OverviewView';
import { WebsiteSettingsView } from './views/WebsiteSettingsView';
import { HeroManagerView } from './views/HeroManagerView';
import { SectionManagerView } from './views/SectionManagerView';
import { DestinationManagerView } from './views/DestinationManagerView';
import { ServicesManagerView } from './views/ServicesManagerView';
import { PackageManagerView } from './views/PackageManagerView';
import { MediaLibraryView } from './views/MediaLibraryView';
import { GalleryManagerView } from './views/GalleryManagerView';
import { TestimonialsManagerView } from './views/TestimonialsManagerView';
import { BookingsManagerView } from './views/BookingsManagerView';
import { HeaderFooterView } from './views/HeaderFooterView';
import { SeoManagerView } from './views/SeoManagerView';
import { AdminUsersView } from './views/AdminUsersView';

interface AdminLayoutProps {
  onBackToWebsite: () => void;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ onBackToWebsite }) => {
  const { logout, currentUser, inquiries, mediaFiles } = useCms();
  const [activeTab, setActiveTab] = useState('overview');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const pendingInquiriesCount = inquiries.filter((i) => i.status === 'New').length;

  const navMenuItems = [
    { id: 'overview', label: 'Command Overview', icon: LayoutDashboard },
    { id: 'settings', label: 'Website Identity', icon: Settings },
    { id: 'hero', label: 'Hero Slides & Scrim', icon: Sliders },
    { id: 'sections', label: 'Section Architect', icon: Layout },
    { id: 'destinations', label: 'Destinations CRUD', icon: MapPin },
    { id: 'services', label: 'Services (9 Cards)', icon: Compass },
    { id: 'packages', label: 'Travel Packages (PKR)', icon: Package },
    { id: 'media', label: 'Media Library', icon: ImageIcon, badge: `${mediaFiles.length}` },
    { id: 'gallery', label: 'Photo Gallery', icon: Images },
    { id: 'testimonials', label: 'Testimonials', icon: MessageSquare },
    {
      id: 'bookings',
      label: 'Bookings & Inquiries',
      icon: BookOpen,
      badge: pendingInquiriesCount > 0 ? `${pendingInquiriesCount} New` : undefined,
      badgeColor: 'bg-[#D8B574] text-[#07140E]',
    },
    { id: 'header-footer', label: 'Header & Footer', icon: MenuIcon },
    { id: 'seo', label: 'SEO & OpenGraph', icon: Globe },
    { id: 'users', label: 'Access Control', icon: Users },
  ];

  const renderActiveView = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewView onNavigateTab={(t) => setActiveTab(t)} onOpenLiveSite={onBackToWebsite} />;
      case 'settings':
        return <WebsiteSettingsView />;
      case 'hero':
        return <HeroManagerView />;
      case 'sections':
        return <SectionManagerView />;
      case 'destinations':
        return <DestinationManagerView />;
      case 'services':
        return <ServicesManagerView />;
      case 'packages':
        return <PackageManagerView />;
      case 'media':
        return <MediaLibraryView />;
      case 'gallery':
        return <GalleryManagerView />;
      case 'testimonials':
        return <TestimonialsManagerView />;
      case 'bookings':
        return <BookingsManagerView />;
      case 'header-footer':
        return <HeaderFooterView />;
      case 'seo':
        return <SeoManagerView />;
      case 'users':
        return <AdminUsersView />;
      default:
        return <OverviewView onNavigateTab={(t) => setActiveTab(t)} onOpenLiveSite={onBackToWebsite} />;
    }
  };

  const currentLabel = navMenuItems.find((m) => m.id === activeTab)?.label || 'Command Overview';

  return (
    <div className="min-h-screen bg-[#F3EFEA] flex flex-col lg:flex-row text-[#14231C]">
      {/* Mobile Top App Bar */}
      <div className="lg:hidden bg-[#07140E] text-white p-4 flex items-center justify-between border-b border-[#C5A059]/30 sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <Logo variant="admin" size="sm" showSubtitle={false} />
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#D8B574] bg-white/5 px-2 py-0.5 rounded border border-white/10">
            CONSOLE
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onBackToWebsite}
            className="p-2 text-xs bg-white/10 rounded-xl text-white/80 hover:text-white"
            title="View Live Site"
          >
            <ExternalLink className="w-4 h-4" />
          </button>
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="p-2 text-white/90 hover:text-white"
            aria-label="Toggle navigation"
          >
            {mobileSidebarOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Obsidian & Emerald Luxury Sidebar (`#07140E`) */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-72 bg-[#07140E] text-[#FAF8F5] flex flex-col justify-between p-5 z-50 transition-transform duration-300 border-r border-[#C5A059]/20 shadow-2xl ${
          mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full overflow-hidden">
          {/* Logo Header */}
          <div className="pb-5 border-b border-white/10 flex items-center justify-between">
            <Logo variant="admin" size="md" showSubtitle={true} />
            <button
              onClick={() => setMobileSidebarOpen(false)}
              className="lg:hidden text-white/60 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User Badge */}
          <div className="py-3 px-3.5 mt-3 rounded-2xl bg-[#0B2017] border border-[#C5A059]/30 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#C5A059] to-[#D8B574] text-[#07140E] flex items-center justify-center font-bold text-xs shrink-0 shadow-md">
              {currentUser?.name?.substring(0, 2).toUpperCase() || 'AD'}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold text-white truncate">{currentUser?.name || 'Chief Curator'}</div>
              <div className="text-[10px] text-[#D8B574] truncate font-mono uppercase">{currentUser?.role || 'Super Admin'}</div>
            </div>
          </div>

          {/* Navigation Links List */}
          <nav className="flex-1 overflow-y-auto py-4 space-y-1 pr-1 my-2 no-scrollbar">
            {navMenuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-[#C5A059] to-[#D8B574] text-[#07140E] shadow-md font-bold'
                      : 'text-white/75 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#07140E]' : 'text-[#D8B574]'}`} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase font-mono ${
                        item.badgeColor || 'bg-white/15 text-white'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Bottom Footer Shortcuts */}
          <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
            <button
              onClick={onBackToWebsite}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/15 text-white text-xs font-semibold transition-colors border border-white/10"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#D8B574]" />
              <span>View Public Website</span>
            </button>

            <button
              onClick={logout}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl hover:bg-red-950/40 text-red-300 hover:text-red-200 text-xs font-semibold transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Viewport */}
      <main className="flex-1 p-4 sm:p-8 lg:p-10 max-w-7xl mx-auto w-full min-h-screen">
        {/* Top Breadcrumb Bar */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5DFD7]">
          <div className="flex items-center gap-2 text-xs font-mono text-[#8A6D3B] uppercase tracking-wider">
            <span>ISLAMABAD ESCAPES CMS</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="font-bold text-[#0B2017]">{currentLabel}</span>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-500">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Database Synced · Server Active</span>
          </div>
        </div>

        {renderActiveView()}
      </main>
    </div>
  );
};
