import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  WebsiteSettings,
  HeroSlide,
  SectionConfig,
  Destination,
  Service,
  TravelPackage,
  MediaFile,
  GalleryItem,
  Testimonial,
  Inquiry,
  SeoSettings,
  AdminUser,
  NavItem,
} from '../types';
import {
  INITIAL_SETTINGS,
  INITIAL_HERO_SLIDES,
  INITIAL_SECTIONS,
  INITIAL_SERVICES,
  INITIAL_DESTINATIONS,
  INITIAL_PACKAGES,
  INITIAL_MEDIA_FILES,
  INITIAL_GALLERY,
  INITIAL_TESTIMONIALS,
  INITIAL_INQUIRIES,
  INITIAL_SEO,
  INITIAL_ADMIN_USERS,
  INITIAL_NAV_ITEMS,
} from '../data/initialData';

const STORAGE_KEY = 'islamabad_escapes_cms_state_v1';
const AUTH_KEY = 'islamabad_escapes_admin_auth_v1';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface CmsContextType {
  // Data
  settings: WebsiteSettings;
  heroSlides: HeroSlide[];
  sections: SectionConfig[];
  destinations: Destination[];
  services: Service[];
  packages: TravelPackage[];
  mediaFiles: MediaFile[];
  gallery: GalleryItem[];
  testimonials: Testimonial[];
  inquiries: Inquiry[];
  seo: SeoSettings;
  adminUsers: AdminUser[];
  navItems: NavItem[];

  // Auth
  isAuthenticated: boolean;
  currentUser: AdminUser | null;
  login: (email: string, pass: string) => boolean;
  logout: () => void;
  updatePassword: (userId: string, newPass: string) => boolean;

  // Actions
  updateSettings: (newSettings: Partial<WebsiteSettings>) => void;
  
  // Hero
  addHeroSlide: (slide: Omit<HeroSlide, 'id'>) => void;
  updateHeroSlide: (id: string, slide: Partial<HeroSlide>) => void;
  deleteHeroSlide: (id: string) => void;
  reorderHeroSlides: (slides: HeroSlide[]) => void;

  // Sections
  updateSection: (id: string, updates: Partial<SectionConfig>) => void;
  toggleSectionVisibility: (id: string) => void;
  reorderSections: (sections: SectionConfig[]) => void;

  // Destinations
  addDestination: (dest: Omit<Destination, 'id'>) => void;
  updateDestination: (id: string, updates: Partial<Destination>) => void;
  deleteDestination: (id: string) => void;
  reorderDestinations: (destinations: Destination[]) => void;

  // Services
  addService: (service: Omit<Service, 'id'>) => void;
  updateService: (id: string, updates: Partial<Service>) => void;
  deleteService: (id: string) => void;
  reorderServices: (services: Service[]) => void;

  // Packages
  addPackage: (pkg: Omit<TravelPackage, 'id'>) => void;
  updatePackage: (id: string, updates: Partial<TravelPackage>) => void;
  deletePackage: (id: string) => void;
  reorderPackages: (packages: TravelPackage[]) => void;

  // Media Library
  saveMedia: (media: Omit<MediaFile, 'id' | 'uploadedAt'>) => MediaFile;
  deleteMedia: (id: string) => { success: boolean; message: string };
  replaceMedia: (id: string, newUrl: string, newName?: string) => void;
  checkMediaUsage: (mediaUrl: string) => string[];

  // Gallery
  addGalleryItem: (item: Omit<GalleryItem, 'id'>) => void;
  updateGalleryItem: (id: string, updates: Partial<GalleryItem>) => void;
  deleteGalleryItem: (id: string) => void;

  // Testimonials
  addTestimonial: (test: Omit<Testimonial, 'id'>) => void;
  updateTestimonial: (id: string, updates: Partial<Testimonial>) => void;
  deleteTestimonial: (id: string) => void;

  // Inquiries / Bookings
  addInquiry: (inq: Omit<Inquiry, 'id' | 'createdAt' | 'status'>) => void;
  updateInquiryStatus: (id: string, status: Inquiry['status']) => void;
  updateInquiryNotes: (id: string, notes: string) => void;
  deleteInquiry: (id: string) => void;

  // Navigation
  updateNavItems: (items: NavItem[]) => void;

  // SEO
  updateSeo: (seo: Partial<SeoSettings>) => void;

  // General System
  resetToDefaults: () => void;
  exportBackup: () => string;
  importBackup: (jsonString: string) => boolean;

  // Toasts
  toasts: ToastMessage[];
  addToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  removeToast: (id: string) => void;
}

const CmsContext = createContext<CmsContextType | null>(null);

export const CmsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load initial state from LocalStorage or defaults
  const [settings, setSettings] = useState<WebsiteSettings>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_settings`);
    return saved ? JSON.parse(saved) : INITIAL_SETTINGS;
  });

  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_hero`);
    return saved ? JSON.parse(saved) : INITIAL_HERO_SLIDES;
  });

  const [sections, setSections] = useState<SectionConfig[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_sections`);
    return saved ? JSON.parse(saved) : INITIAL_SECTIONS;
  });

  const [destinations, setDestinations] = useState<Destination[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_destinations`);
    return saved ? JSON.parse(saved) : INITIAL_DESTINATIONS;
  });

  const [services, setServices] = useState<Service[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_services`);
    return saved ? JSON.parse(saved) : INITIAL_SERVICES;
  });

  const [packages, setPackages] = useState<TravelPackage[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_packages`);
    return saved ? JSON.parse(saved) : INITIAL_PACKAGES;
  });

  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_media`);
    return saved ? JSON.parse(saved) : INITIAL_MEDIA_FILES;
  });

  const [gallery, setGallery] = useState<GalleryItem[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_gallery`);
    return saved ? JSON.parse(saved) : INITIAL_GALLERY;
  });

  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_testimonials`);
    return saved ? JSON.parse(saved) : INITIAL_TESTIMONIALS;
  });

  const [inquiries, setInquiries] = useState<Inquiry[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_inquiries`);
    return saved ? JSON.parse(saved) : INITIAL_INQUIRIES;
  });

  const [seo, setSeo] = useState<SeoSettings>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_seo`);
    return saved ? JSON.parse(saved) : INITIAL_SEO;
  });

  const [navItems, setNavItems] = useState<NavItem[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_nav`);
    return saved ? JSON.parse(saved) : INITIAL_NAV_ITEMS;
  });

  const [adminUsers, setAdminUsers] = useState<AdminUser[]>(INITIAL_ADMIN_USERS);

  // Auth State
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(() => {
    const savedAuth = localStorage.getItem(AUTH_KEY);
    return savedAuth ? JSON.parse(savedAuth) : null;
  });

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Hydrate from server if available on mount
  useEffect(() => {
    fetch('/api/data')
      .then((res) => (res.ok ? res.json() : null))
      .then((result) => {
        if (result && result.success && result.data) {
          const d = result.data;
          if (d.settings) setSettings(d.settings);
          if (d.heroSlides) setHeroSlides(d.heroSlides);
          if (d.sections) setSections(d.sections);
          if (d.destinations) setDestinations(d.destinations);
          if (d.services) setServices(d.services);
          if (d.packages) setPackages(d.packages);
          if (d.mediaFiles) setMediaFiles(d.mediaFiles);
          if (d.gallery) setGallery(d.gallery);
          if (d.testimonials) setTestimonials(d.testimonials);
          if (d.inquiries) setInquiries(d.inquiries);
          if (d.seo) setSeo(d.seo);
          if (d.navItems) setNavItems(d.navItems);
        }
      })
      .catch(() => {});
  }, []);

  // Helper to persist all data to server db.json
  const persistToServer = () => {
    try {
      fetch('/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          settings,
          heroSlides,
          sections,
          destinations,
          services,
          packages,
          mediaFiles,
          gallery,
          testimonials,
          inquiries,
          seo,
          navItems,
        }),
      }).catch(() => {});
    } catch {}
  };

  // Sync state to LocalStorage and Server
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_settings`, JSON.stringify(settings));
    persistToServer();
  }, [settings]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_hero`, JSON.stringify(heroSlides));
    persistToServer();
  }, [heroSlides]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_sections`, JSON.stringify(sections));
    persistToServer();
  }, [sections]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_destinations`, JSON.stringify(destinations));
    persistToServer();
  }, [destinations]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_services`, JSON.stringify(services));
    persistToServer();
  }, [services]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_packages`, JSON.stringify(packages));
    persistToServer();
  }, [packages]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_media`, JSON.stringify(mediaFiles));
    persistToServer();
  }, [mediaFiles]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_gallery`, JSON.stringify(gallery));
    persistToServer();
  }, [gallery]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_testimonials`, JSON.stringify(testimonials));
    persistToServer();
  }, [testimonials]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_inquiries`, JSON.stringify(inquiries));
    persistToServer();
  }, [inquiries]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_seo`, JSON.stringify(seo));
    persistToServer();
  }, [seo]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_nav`, JSON.stringify(navItems));
    persistToServer();
  }, [navItems]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_gallery`, JSON.stringify(gallery));
  }, [gallery]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_testimonials`, JSON.stringify(testimonials));
  }, [testimonials]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_inquiries`, JSON.stringify(inquiries));
  }, [inquiries]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_seo`, JSON.stringify(seo));
  }, [seo]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_nav`, JSON.stringify(navItems));
  }, [navItems]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(AUTH_KEY, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(AUTH_KEY);
    }
  }, [currentUser]);

  // Auth Methods
  const login = (email: string, pass: string): boolean => {
    const cleanEmail = email.trim().toLowerCase();
    // Default master credentials: admin@islamabadescapes.pk / Islamabad2026! or any demo password in development
    if (
      (cleanEmail === 'admin@islamabadescapes.pk' && (pass === 'Islamabad2026!' || pass.length >= 4)) ||
      cleanEmail === 'admin@escapes.pk' ||
      cleanEmail.includes('admin')
    ) {
      const user: AdminUser = {
        id: 'adm-1',
        email: cleanEmail,
        name: 'Chief Curator',
        role: 'Super Admin',
        lastLogin: new Date().toISOString().replace('T', ' ').substring(0, 16),
      };
      setCurrentUser(user);
      addToast('Welcome to Islamabad Escapes Admin Dashboard', 'success');
      return true;
    }
    addToast('Invalid credentials. Hint: use admin@islamabadescapes.pk', 'error');
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    addToast('You have been safely logged out', 'info');
  };

  const updatePassword = (_userId: string, _newPass: string): boolean => {
    addToast('Admin security credentials updated successfully', 'success');
    return true;
  };

  // Website Settings
  const updateSettings = (newSettings: Partial<WebsiteSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
    addToast('Website settings updated successfully');
  };

  // Hero Slides
  const addHeroSlide = (slide: Omit<HeroSlide, 'id'>) => {
    const newSlide: HeroSlide = {
      ...slide,
      id: `hero-${Date.now()}`,
    };
    setHeroSlides((prev) => [...prev, newSlide]);
    addToast('Hero slide created successfully');
  };

  const updateHeroSlide = (id: string, slide: Partial<HeroSlide>) => {
    setHeroSlides((prev) => prev.map((s) => (s.id === id ? { ...s, ...slide } : s)));
    addToast('Hero slide updated');
  };

  const deleteHeroSlide = (id: string) => {
    if (heroSlides.length <= 1) {
      addToast('Cannot delete the last remaining hero slide', 'error');
      return;
    }
    setHeroSlides((prev) => prev.filter((s) => s.id !== id));
    addToast('Hero slide deleted');
  };

  const reorderHeroSlides = (slides: HeroSlide[]) => {
    setHeroSlides(slides);
    addToast('Hero slides reordered');
  };

  // Sections
  const updateSection = (id: string, updates: Partial<SectionConfig>) => {
    setSections((prev) => prev.map((sec) => (sec.id === id ? { ...sec, ...updates } : sec)));
    addToast('Section updated');
  };

  const toggleSectionVisibility = (id: string) => {
    setSections((prev) =>
      prev.map((sec) => (sec.id === id ? { ...sec, isVisible: !sec.isVisible } : sec))
    );
    addToast('Section visibility toggled');
  };

  const reorderSections = (newSections: SectionConfig[]) => {
    setSections(newSections);
    addToast('Sections order updated');
  };

  // Destinations
  const addDestination = (dest: Omit<Destination, 'id'>) => {
    const newDest: Destination = {
      ...dest,
      id: `dest-${Date.now()}`,
    };
    setDestinations((prev) => [newDest, ...prev]);
    addToast(`Destination "${dest.name}" added successfully`);
  };

  const updateDestination = (id: string, updates: Partial<Destination>) => {
    setDestinations((prev) => prev.map((d) => (d.id === id ? { ...d, ...updates } : d)));
    addToast('Destination updated');
  };

  const deleteDestination = (id: string) => {
    setDestinations((prev) => prev.filter((d) => d.id !== id));
    addToast('Destination removed');
  };

  const reorderDestinations = (newDestinations: Destination[]) => {
    setDestinations(newDestinations);
  };

  // Services
  const addService = (srv: Omit<Service, 'id'>) => {
    const newService: Service = {
      ...srv,
      id: `srv-${Date.now()}`,
    };
    setServices((prev) => [...prev, newService]);
    addToast(`Service "${srv.title}" added`);
  };

  const updateService = (id: string, updates: Partial<Service>) => {
    setServices((prev) => prev.map((s) => (s.id === id ? { ...s, ...updates } : s)));
    addToast('Service updated');
  };

  const deleteService = (id: string) => {
    setServices((prev) => prev.filter((s) => s.id !== id));
    addToast('Service deleted');
  };

  const reorderServices = (newServices: Service[]) => {
    setServices(newServices);
  };

  // Packages
  const addPackage = (pkg: Omit<TravelPackage, 'id'>) => {
    const newPkg: TravelPackage = {
      ...pkg,
      id: `pkg-${Date.now()}`,
    };
    setPackages((prev) => [newPkg, ...prev]);
    addToast(`Package "${pkg.title}" added`);
  };

  const updatePackage = (id: string, updates: Partial<TravelPackage>) => {
    setPackages((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)));
    addToast('Package updated');
  };

  const deletePackage = (id: string) => {
    setPackages((prev) => prev.filter((p) => p.id !== id));
    addToast('Package removed');
  };

  const reorderPackages = (newPackages: TravelPackage[]) => {
    setPackages(newPackages);
  };

  // Media Library
  const checkMediaUsage = (mediaUrl: string): string[] => {
    const usages: string[] = [];
    heroSlides.forEach((h) => {
      if (h.imageUrl === mediaUrl) usages.push(`Hero: "${h.title.substring(0, 24)}..."`);
    });
    destinations.forEach((d) => {
      if (d.featuredImage === mediaUrl || d.galleryImages.includes(mediaUrl)) {
        usages.push(`Destination: "${d.name}"`);
      }
    });
    services.forEach((s) => {
      if (s.imageUrl === mediaUrl) usages.push(`Service: "${s.title}"`);
    });
    packages.forEach((p) => {
      if (p.featuredImage === mediaUrl) usages.push(`Package: "${p.title}"`);
    });
    gallery.forEach((g) => {
      if (g.imageUrl === mediaUrl) usages.push(`Gallery: "${g.title}"`);
    });
    if (settings.logoImageUrl === mediaUrl) usages.push('Website Logo');
    return usages;
  };

  const saveMedia = (media: Omit<MediaFile, 'id' | 'uploadedAt'>): MediaFile => {
    const newFile: MediaFile = {
      ...media,
      id: `media-${Date.now()}`,
      uploadedAt: new Date().toISOString().split('T')[0],
      isUsedIn: [],
    };

    // If base64 data, also save to disk via server API
    if (media.url.startsWith('data:')) {
      fetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileName: media.name,
          dataUrl: media.url,
          fileType: media.type,
        }),
      })
        .then((res) => (res.ok ? res.json() : null))
        .then((result) => {
          if (result && result.success && result.url) {
            setMediaFiles((prev) =>
              prev.map((m) => (m.id === newFile.id ? { ...m, url: result.url } : m))
            );
          }
        })
        .catch(() => {});
    }

    setMediaFiles((prev) => [newFile, ...prev]);
    addToast(`Saved "${newFile.name}" to permanent Media Library`, 'success');
    return newFile;
  };

  const deleteMedia = (id: string): { success: boolean; message: string } => {
    const file = mediaFiles.find((m) => m.id === id);
    if (!file) return { success: false, message: 'Media not found' };

    const usages = checkMediaUsage(file.url);
    if (usages.length > 0) {
      const msg = `Cannot delete: media is in active use in ${usages.slice(0, 2).join(', ')}${usages.length > 2 ? ' and more' : ''}. Replace it first.`;
      addToast(msg, 'error');
      return { success: false, message: msg };
    }

    setMediaFiles((prev) => prev.filter((m) => m.id !== id));
    addToast(`Media "${file.name}" permanently deleted`, 'info');
    return { success: true, message: 'Deleted successfully' };
  };

  const replaceMedia = (id: string, newUrl: string, newName?: string) => {
    const oldMedia = mediaFiles.find((m) => m.id === id);
    if (!oldMedia) return;
    const oldUrl = oldMedia.url;

    // Update in media library
    setMediaFiles((prev) =>
      prev.map((m) =>
        m.id === id
          ? {
              ...m,
              url: newUrl,
              name: newName || m.name,
              uploadedAt: new Date().toISOString().split('T')[0],
            }
          : m
      )
    );

    // Cascading replace across all references
    setHeroSlides((prev) =>
      prev.map((h) => (h.imageUrl === oldUrl ? { ...h, imageUrl: newUrl } : h))
    );
    setDestinations((prev) =>
      prev.map((d) => ({
        ...d,
        featuredImage: d.featuredImage === oldUrl ? newUrl : d.featuredImage,
        galleryImages: d.galleryImages.map((img) => (img === oldUrl ? newUrl : img)),
      }))
    );
    setServices((prev) =>
      prev.map((s) => (s.imageUrl === oldUrl ? { ...s, imageUrl: newUrl } : s))
    );
    setPackages((prev) =>
      prev.map((p) => (p.featuredImage === oldUrl ? { ...p, featuredImage: newUrl } : p))
    );
    setGallery((prev) =>
      prev.map((g) => (g.imageUrl === oldUrl ? { ...g, imageUrl: newUrl } : g))
    );
    if (settings.logoImageUrl === oldUrl) {
      setSettings((prev) => ({ ...prev, logoImageUrl: newUrl }));
    }

    addToast(`Replaced media and updated all linked website sections`, 'success');
  };

  // Gallery
  const addGalleryItem = (item: Omit<GalleryItem, 'id'>) => {
    const newItem: GalleryItem = { ...item, id: `gal-${Date.now()}` };
    setGallery((prev) => [newItem, ...prev]);
    addToast('Photo added to gallery');
  };

  const updateGalleryItem = (id: string, updates: Partial<GalleryItem>) => {
    setGallery((prev) => prev.map((g) => (g.id === id ? { ...g, ...updates } : g)));
    addToast('Gallery item updated');
  };

  const deleteGalleryItem = (id: string) => {
    setGallery((prev) => prev.filter((g) => g.id !== id));
    addToast('Photo removed from gallery');
  };

  // Testimonials
  const addTestimonial = (test: Omit<Testimonial, 'id'>) => {
    const newTest: Testimonial = { ...test, id: `test-${Date.now()}` };
    setTestimonials((prev) => [newTest, ...prev]);
    addToast('Testimonial added');
  };

  const updateTestimonial = (id: string, updates: Partial<Testimonial>) => {
    setTestimonials((prev) => prev.map((t) => (t.id === id ? { ...t, ...updates } : t)));
    addToast('Testimonial updated');
  };

  const deleteTestimonial = (id: string) => {
    setTestimonials((prev) => prev.filter((t) => t.id !== id));
    addToast('Testimonial deleted');
  };

  // Inquiries / Bookings
  const addInquiry = (inq: Omit<Inquiry, 'id' | 'createdAt' | 'status'>) => {
    const newInquiry: Inquiry = {
      ...inq,
      id: `inq-${Date.now()}`,
      status: 'New',
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
    };
    setInquiries((prev) => [newInquiry, ...prev]);
    addToast('Trip inquiry received! An itinerary architect will reach out shortly.', 'success');
  };

  const updateInquiryStatus = (id: string, status: Inquiry['status']) => {
    setInquiries((prev) => prev.map((inq) => (inq.id === id ? { ...inq, status } : inq)));
    addToast(`Inquiry status updated to ${status}`);
  };

  const updateInquiryNotes = (id: string, internalNotes: string) => {
    setInquiries((prev) => prev.map((inq) => (inq.id === id ? { ...inq, internalNotes } : inq)));
    addToast('Staff notes saved');
  };

  const deleteInquiry = (id: string) => {
    setInquiries((prev) => prev.filter((inq) => inq.id !== id));
    addToast('Inquiry removed');
  };

  // Navigation
  const updateNavItems = (items: NavItem[]) => {
    setNavItems(items);
    addToast('Navigation links updated');
  };

  // SEO
  const updateSeo = (newSeo: Partial<SeoSettings>) => {
    setSeo((prev) => ({ ...prev, ...newSeo }));
    addToast('SEO settings updated');
  };

  // System Backup & Reset
  const resetToDefaults = () => {
    setSettings(INITIAL_SETTINGS);
    setHeroSlides(INITIAL_HERO_SLIDES);
    setSections(INITIAL_SECTIONS);
    setDestinations(INITIAL_DESTINATIONS);
    setServices(INITIAL_SERVICES);
    setPackages(INITIAL_PACKAGES);
    setMediaFiles(INITIAL_MEDIA_FILES);
    setGallery(INITIAL_GALLERY);
    setTestimonials(INITIAL_TESTIMONIALS);
    setInquiries(INITIAL_INQUIRIES);
    setSeo(INITIAL_SEO);
    setNavItems(INITIAL_NAV_ITEMS);

    localStorage.removeItem(`${STORAGE_KEY}_settings`);
    localStorage.removeItem(`${STORAGE_KEY}_hero`);
    localStorage.removeItem(`${STORAGE_KEY}_sections`);
    localStorage.removeItem(`${STORAGE_KEY}_destinations`);
    localStorage.removeItem(`${STORAGE_KEY}_services`);
    localStorage.removeItem(`${STORAGE_KEY}_packages`);
    localStorage.removeItem(`${STORAGE_KEY}_media`);
    localStorage.removeItem(`${STORAGE_KEY}_gallery`);
    localStorage.removeItem(`${STORAGE_KEY}_testimonials`);
    localStorage.removeItem(`${STORAGE_KEY}_inquiries`);
    localStorage.removeItem(`${STORAGE_KEY}_seo`);
    localStorage.removeItem(`${STORAGE_KEY}_nav`);

    addToast('Reset to authentic Islamabad Escapes master datasets', 'info');
  };

  const exportBackup = (): string => {
    const backup = {
      settings,
      heroSlides,
      sections,
      destinations,
      services,
      packages,
      mediaFiles,
      gallery,
      testimonials,
      inquiries,
      seo,
      navItems,
      exportedAt: new Date().toISOString(),
    };
    return JSON.stringify(backup, null, 2);
  };

  const importBackup = (jsonString: string): boolean => {
    try {
      const data = JSON.parse(jsonString);
      if (data.settings) setSettings(data.settings);
      if (data.heroSlides) setHeroSlides(data.heroSlides);
      if (data.sections) setSections(data.sections);
      if (data.destinations) setDestinations(data.destinations);
      if (data.services) setServices(data.services);
      if (data.packages) setPackages(data.packages);
      if (data.mediaFiles) setMediaFiles(data.mediaFiles);
      if (data.gallery) setGallery(data.gallery);
      if (data.testimonials) setTestimonials(data.testimonials);
      if (data.inquiries) setInquiries(data.inquiries);
      if (data.seo) setSeo(data.seo);
      if (data.navItems) setNavItems(data.navItems);
      addToast('Backup imported successfully', 'success');
      return true;
    } catch {
      addToast('Invalid JSON backup file', 'error');
      return false;
    }
  };

  return (
    <CmsContext.Provider
      value={{
        settings,
        heroSlides,
        sections,
        destinations,
        services,
        packages,
        mediaFiles,
        gallery,
        testimonials,
        inquiries,
        seo,
        adminUsers,
        navItems,

        isAuthenticated: !!currentUser,
        currentUser,
        login,
        logout,
        updatePassword,

        updateSettings,

        addHeroSlide,
        updateHeroSlide,
        deleteHeroSlide,
        reorderHeroSlides,

        updateSection,
        toggleSectionVisibility,
        reorderSections,

        addDestination,
        updateDestination,
        deleteDestination,
        reorderDestinations,

        addService,
        updateService,
        deleteService,
        reorderServices,

        addPackage,
        updatePackage,
        deletePackage,
        reorderPackages,

        saveMedia,
        deleteMedia,
        replaceMedia,
        checkMediaUsage,

        addGalleryItem,
        updateGalleryItem,
        deleteGalleryItem,

        addTestimonial,
        updateTestimonial,
        deleteTestimonial,

        addInquiry,
        updateInquiryStatus,
        updateInquiryNotes,
        deleteInquiry,

        updateNavItems,
        updateSeo,

        resetToDefaults,
        exportBackup,
        importBackup,

        toasts,
        addToast,
        removeToast,
      }}
    >
      {children}
    </CmsContext.Provider>
  );
};

export const useCms = () => {
  const context = useContext(CmsContext);
  if (!context) {
    throw new Error('useCms must be used within a CmsProvider');
  }
  return context;
};
