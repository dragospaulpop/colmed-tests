// Site Constants
export const SITE_CONFIG = {
  name: 'Colmed',
  title: 'Colmed: Digitalizarea Completă a Activelor Medicale',
  description:
    'Simplifică operațiunile, optimizează comunicarea și îmbunătățește îngrijirea pacienților',
  url: 'https://colmed.ro',
  company: 'Digital Wizards Inc.',
  year: 2025,
} as const;

// Navigation items
export const NAVIGATION_ITEMS = [
  { id: 'hero', label: 'Acasă', href: '#hero' },
  { id: 'about', label: 'Despre', href: '#about' },
  { id: 'features', label: 'Funcționalități', href: '#features' },
  { id: 'demo', label: 'Demo', href: '#demo' },
  { id: 'tech', label: 'Tehnologie', href: '#tech' },
  { id: 'benefits', label: 'Avantaje', href: '#benefits' },
  { id: 'contact', label: 'Contact', href: '#contact' },
] as const;

// Breakpoints
export const BREAKPOINTS = {
  mobile: '320px',
  tablet: '768px',
  desktop: '1024px',
  wide: '1280px',
} as const;

// Animation durations
export const ANIMATION_DURATION = {
  fast: 200,
  normal: 300,
  slow: 500,
} as const;

// Contact information
export const CONTACT_INFO = {
  email: 'contact@colmed.ro',
  phone: '+40 123 456 789',
  address: 'București, România',
} as const;
