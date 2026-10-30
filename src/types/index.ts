export interface WebsiteSettings {
  websiteName: string;
  tagline: string;
  logoText: string;
  logoSubtitle?: string;
  logoImageUrl?: string;
  faviconUrl?: string;
  primaryColor: string;
  accentColor: string;
  phone: string;
  email: string;
  address: string;
  whatsappNumber: string;
  whatsappMessage: string;
  socialLinks: {
    instagram: string;
    facebook: string;
    youtube: string;
    twitter: string;
  };
  footerAbout: string;
  copyrightText: string;
}

export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  ctaText: string;
  ctaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  overlayOpacity: number; // e.g. 0.45
  isActive: boolean;
  order: number;
}

export interface SectionConfig {
  id: string;
  name: string;
  title: string;
  subtitle: string;
  isVisible: boolean;
  order: number;
  bgTone?: 'light' | 'ivory' | 'forest' | 'white';
  ctaText?: string;
  ctaLink?: string;
}

export interface Destination {
  id: string;
  name: string;
  slug: string;
  category: 'Nature & Trails' | 'Heritage & Architecture' | 'Viewpoints & Dining' | 'Cultural Museums';
  location: string;
  shortDescription: string;
  fullDescription: string;
  featuredImage: string;
  galleryImages: string[];
  highlights: string[];
  bestTimeToVisit: string;
  entryFee: string;
  typicalDuration: string;
  rating: number;
  isFeatured: boolean;
  isPublished: boolean;
  order: number;
}

export interface Service {
  id: string;
  title: string;
  category: string;
  iconName: string; // lucide icon identifier
  shortDescription: string;
  fullDescription: string;
  imageUrl: string;
  statusBadge?: string; // "Popular", "Customizable", "VIP Escort", etc.
  isEnabled: boolean;
  order: number;
}

export interface TravelPackage {
  id: string;
  title: string;
  slug: string;
  duration: string;
  pricePkr: number;
  originalPricePkr?: number;
  featuredImage: string;
  description: string;
  category: string;
  inclusions: string[];
  exclusions: string[];
  itinerary: { day: number; title: string; desc: string }[];
  isAvailable: boolean;
  isPublished: boolean;
  order: number;
}

export interface MediaFile {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'video' | 'logo' | 'banner';
  size: string;
  uploadedAt: string;
  dimensions?: string;
  isUsedIn?: string[];
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Monuments' | 'Margalla Trails' | 'Culture & Food' | 'Scenic Vistas';
  imageUrl: string;
  caption: string;
  order: number;
}

export interface Testimonial {
  id: string;
  customerName: string;
  location: string;
  photoUrl: string;
  rating: number;
  review: string;
  experience: string;
  date: string;
  isApproved: boolean;
  order: number;
}

export interface Inquiry {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  packageId?: string;
  packageName?: string;
  destinationId?: string;
  destinationName?: string;
  travelDate: string;
  guestsCount: number;
  budgetPkr?: string;
  message?: string;
  status: 'New' | 'Contacted' | 'Confirmed' | 'Cancelled';
  internalNotes?: string;
  createdAt: string;
}

export interface SeoSettings {
  pageTitle: string;
  metaDescription: string;
  keywords: string;
  ogImage: string;
  canonicalUrl: string;
  altTextDefault: string;
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'Super Admin' | 'Content Editor' | 'Booking Manager';
  lastLogin: string;
}

export interface NavItem {
  id: string;
  label: string;
  href: string;
  isExternal?: boolean;
  order: number;
}
