/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { CmsProvider, useCms } from './context/CmsContext';
import { ToastContainer } from './components/common/ToastContainer';

// Layout & Sections
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/home/HeroSection';
import { ServicesSection } from './components/home/ServicesSection';
import { DestinationsSection } from './components/home/DestinationsSection';
import { WhyChooseUsSection } from './components/home/WhyChooseUsSection';
import { GallerySection } from './components/home/GallerySection';
import { TestimonialsSection } from './components/home/TestimonialsSection';
import { PackagesSection } from './components/home/PackagesSection';
import { CtaSection } from './components/home/CtaSection';

// Modals
import { PlanYourTripModal } from './components/modals/PlanYourTripModal';
import { DestinationModal } from './components/modals/DestinationModal';
import { ServiceModal } from './components/modals/ServiceModal';
import { PackageModal } from './components/modals/PackageModal';
import { SearchModal } from './components/modals/SearchModal';
import { LightboxModal } from './components/modals/LightboxModal';

// Admin
import { AdminLayout } from './admin/AdminLayout';
import { AdminLogin } from './admin/AdminLogin';

// Types
import { Destination, Service, TravelPackage, GalleryItem } from './types';

const AppContent: React.FC = () => {
  const { isAuthenticated, seo } = useCms();

  // Mode: Public Frontend vs Admin CMS Portal
  const [isAdminMode, setIsAdminMode] = useState<boolean>(() => {
    return window.location.pathname.startsWith('/admin') || window.location.hash === '#admin';
  });

  // URL Hash & History management
  useEffect(() => {
    const handlePopState = () => {
      setIsAdminMode(window.location.pathname.startsWith('/admin') || window.location.hash === '#admin');
    };
    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  // Sync document title with CMS SEO Settings
  useEffect(() => {
    if (seo?.pageTitle) {
      document.title = seo.pageTitle;
    }
  }, [seo]);

  const handleNavigateToAdmin = () => {
    window.location.hash = '#admin';
    setIsAdminMode(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToWebsite = () => {
    window.location.hash = '';
    setIsAdminMode(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Modals & User Interaction State
  const [showPlanTrip, setShowPlanTrip] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [preselectedPkgId, setPreselectedPkgId] = useState<string | undefined>();
  const [preselectedDestId, setPreselectedDestId] = useState<string | undefined>();

  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<TravelPackage | null>(null);

  const [lightboxItems, setLightboxItems] = useState<GalleryItem[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const [searchFilterDestId, setSearchFilterDestId] = useState<string | undefined>();

  const handleHeroSearchSubmit = (params: { destinationId: string; category: string; date: string }) => {
    if (params.destinationId) {
      setSearchFilterDestId(params.destinationId);
    }
    const destEl = document.getElementById('destinations');
    if (destEl) {
      destEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreDestinationsClick = () => {
    const destEl = document.getElementById('destinations');
    if (destEl) {
      destEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Render Admin CMS if in Admin Mode
  if (isAdminMode) {
    return (
      <>
        {isAuthenticated ? (
          <AdminLayout onBackToWebsite={handleBackToWebsite} />
        ) : (
          <AdminLogin onBackToWebsite={handleBackToWebsite} />
        )}
        <ToastContainer />
      </>
    );
  }

  // Render Public Website
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1E2922] font-sans selection:bg-[#133826] selection:text-[#E9D8A6]">
      {/* Sticky Header Navbar */}
      <Navbar
        onOpenPlanTrip={() => {
          setPreselectedPkgId(undefined);
          setPreselectedDestId(undefined);
          setShowPlanTrip(true);
        }}
        onOpenSearch={() => setShowSearch(true)}
        onNavigateToAdmin={handleNavigateToAdmin}
      />

      <main>
        {/* Hero Section with Slider & Search */}
        <HeroSection
          onPlanTrip={() => {
            setPreselectedPkgId(undefined);
            setPreselectedDestId(undefined);
            setShowPlanTrip(true);
          }}
          onExploreDestinations={handleExploreDestinationsClick}
          onSearchSubmit={handleHeroSearchSubmit}
        />

        {/* Explore Our Services (3-column responsive card grid) */}
        <ServicesSection onSelectService={(s) => setSelectedService(s)} />

        {/* Popular Islamabad Destinations (horizontal slider) */}
        <DestinationsSection
          onSelectDestination={(d) => setSelectedDestination(d)}
          filterDestinationId={searchFilterDestId}
        />

        {/* Why Choose Us (split layout) */}
        <WhyChooseUsSection
          onPlanTrip={() => {
            setPreselectedPkgId(undefined);
            setPreselectedDestId(undefined);
            setShowPlanTrip(true);
          }}
        />

        {/* Travel Experience Gallery (modern masonry grid) */}
        <GallerySection
          onOpenLightbox={(items, index) => {
            setLightboxItems(items);
            setLightboxIndex(index);
          }}
        />

        {/* Testimonials (animated carousel) */}
        <TestimonialsSection />

        {/* Special Travel Packages (PKR cards) */}
        <PackagesSection
          onSelectPackage={(pkg) => setSelectedPackage(pkg)}
          onBookPackage={(pkg) => {
            setPreselectedPkgId(pkg.id);
            setShowPlanTrip(true);
          }}
        />

        {/* Final Call To Action */}
        <CtaSection
          onPlanTrip={() => {
            setPreselectedPkgId(undefined);
            setPreselectedDestId(undefined);
            setShowPlanTrip(true);
          }}
        />
      </main>

      {/* Footer */}
      <Footer
        onNavigateToAdmin={handleNavigateToAdmin}
        onOpenPlanTrip={() => {
          setPreselectedPkgId(undefined);
          setPreselectedDestId(undefined);
          setShowPlanTrip(true);
        }}
      />

      {/* Global Interactive Modals */}
      <PlanYourTripModal
        isOpen={showPlanTrip}
        onClose={() => setShowPlanTrip(false)}
        preselectedPackageId={preselectedPkgId}
        preselectedDestinationId={preselectedDestId}
      />

      <DestinationModal
        destination={selectedDestination}
        onClose={() => setSelectedDestination(null)}
        onBookNow={(dest) => {
          setPreselectedDestId(dest.id);
          setShowPlanTrip(true);
        }}
      />

      <ServiceModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onInquire={(srv) => {
          setShowPlanTrip(true);
        }}
      />

      <PackageModal
        pkg={selectedPackage}
        onClose={() => setSelectedPackage(null)}
        onBookNow={(pkg) => {
          setPreselectedPkgId(pkg.id);
          setShowPlanTrip(true);
        }}
      />

      <SearchModal
        isOpen={showSearch}
        onClose={() => setShowSearch(false)}
        onSelectDestination={(d) => setSelectedDestination(d)}
        onSelectPackage={(p) => setSelectedPackage(p)}
        onSelectService={(s) => setSelectedService(s)}
      />

      <LightboxModal
        items={lightboxItems}
        currentIndex={lightboxIndex}
        isOpen={lightboxItems.length > 0}
        onClose={() => setLightboxItems([])}
        onNext={() => setLightboxIndex((prev) => (prev + 1) % lightboxItems.length)}
        onPrev={() =>
          setLightboxIndex((prev) => (prev === 0 ? lightboxItems.length - 1 : prev - 1))
        }
      />

      {/* Feedback Toast Notification Container */}
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <CmsProvider>
      <AppContent />
    </CmsProvider>
  );
}
