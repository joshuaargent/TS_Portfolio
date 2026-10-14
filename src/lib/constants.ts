import { SiteConfig, NavItem } from '@/types';

// ============================================
// Site Configuration
// ============================================

export const siteConfig: SiteConfig = {
  name: 'Joshua Argent',
  description: 'Web developer exploring application security.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://joshuaargent.vercel.app',
  ogImage: '/og-image.png',
  links: {
    email: 'mailto:argentjackjoshua@gmail.com',
    github: 'https://github.com/joshuaargent',
    linkedin: 'https://linkedin.com/in/joshuaargent',
    youtube: 'https://youtube.com/@joshua_argent',
    instagram: 'https://instagram.com/joshua_argent',
    facebook: 'https://facebook.com/joshua_argent',
    tiktok: 'https://www.tiktok.com/@joshua_argent',
  },
  author: {
    name: 'Joshua Argent',
    bio: 'Web developer exploring application security.',
    avatar: '/images/avatar.jpg',
  },
};

// ============================================
// Navigation
// ============================================

export const mainNav: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Resume', href: '/resume' },
];

export const footerNav = {
  main: [
    { label: 'Home', href: '/' },
    { label: 'Projects', href: '/projects' },
    { label: 'About', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Resume', href: '/resume' },
    { label: 'Contact', href: '/contact' },
  ],
  content: [
    
  ],
  social: [
    { label: 'GitHub', href: 'https://github.com/joshuaargent' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/joshuaargent' },
    { label: 'YouTube', href: 'https://youtube.com/@joshua_argent' },
    { label: 'Instagram', href: 'https://instagram.com/joshua_argent' },
    { label: 'Facebook', href: 'https://facebook.com/joshua_argent' },
    { label: 'TikTok', href: 'https://www.tiktok.com/@joshua_argent' },
  ],
};

// ============================================
// Design Tokens
// ============================================

export const colors = {
  // Primary
  accent: '#0D9488',
  accentHover: '#0F766E',
  accentLight: '#CCFBF1',

  // Backgrounds
  bgPrimary: '#FAFAF9',
  bgSecondary: '#F5F5F4',
  bgCard: '#FFFFFF',

  // Text
  textPrimary: '#1C1917',
  textSecondary: '#57534E',
  textMuted: '#A8A29E',

  // Border
  border: '#E7E5E4',

  // Category Colors
  faith: '#7C3AED',
  psychology: '#2563EB',
  health: '#16A34A',
  performance: '#EA580C',
  code: '#0891B2',
} as const;

export const spacing = {
  section: 'py-16 md:py-24',
  sectionSm: 'py-12 md:py-16',
  container: 'max-w-6xl mx-auto px-4 sm:px-6 lg:px-8',
  containerSm: 'max-w-4xl mx-auto px-4 sm:px-6 lg:px-8',
  containerLg: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
} as const;

export const typography = {
  fontFamily: {
    sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
    serif: ['Lora', 'Georgia', 'serif'],
    mono: ['JetBrains Mono', 'monospace'],
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
  },
} as const;

// ============================================
// Animation
// ============================================

export const transitions = {
  fast: '150ms ease',
  base: '200ms ease',
  slow: '300ms ease',
  slower: '500ms ease',
} as const;

export const animations = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.4 },
  },
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4 },
  },
  slideDown: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4 },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.3 },
  },
} as const;

// ============================================
// External Links
// ============================================

export const externalLinks = {
  email: 'mailto:argentjackjoshua@gmail.com',
  github: 'https://github.com/joshuaargent',
  linkedin: 'https://linkedin.com/in/joshuaargent',
  youtube: 'https://youtube.com/@joshua_argent',
  instagram: 'https://instagram.com/joshua_argent',
  facebook: 'https://facebook.com/joshua_argent',
  tiktok: 'https://www.tiktok.com/@joshua_argent',
} as const;

// ============================================
// Meta
// ============================================

export const meta = {
  title: 'Joshua Argent',
  description: 'Web developer exploring application security.',
  github: 'https://github.com/joshuaargent',
  keywords: [
    'Joshua',
    'Argent',
    'Web Developer',
    'Portfolio',
    'Projects',
    'Blog',
    'Resume',
    'Contact',
    'About',
  ] as string[],
  instagramHandle: '@joshua_argent',
} as const;
