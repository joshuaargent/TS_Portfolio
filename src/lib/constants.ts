import { SiteConfig, NavItem } from '@/types';

// ============================================
// Site Configuration
// ============================================

export const siteConfig: SiteConfig = {
  name: 'Joshua Argent',
  description:
    'Joshua Argent is a Surrey based full stack developer building TypeScript and Next.js applications, including CathoScroll, and learning application security.',
  url: (process.env.NEXT_PUBLIC_SITE_URL || 'https://joshuaargent.vercel.app').replace(/\/+$/, ''),
  ogImage: '/images/avatar.jpg',
  links: {
    email: 'argentjackjoshua@gmail.com',
    github: 'https://github.com/joshuaargent',
    linkedin: 'https://linkedin.com/in/joshuaargent',
    youtube: 'https://youtube.com/@joshua_argent',
    instagram: 'https://instagram.com/joshua_argent',
    facebook: 'https://facebook.com/joshua_argent',
    tiktok: 'https://www.tiktok.com/@joshua_argent',
  },
  author: {
    name: 'Joshua Argent',
    bio: 'Full Stack Developer | Building CathoScroll | Exploring AppSec',
    avatar: '/images/avatar.jpg',
    tagline: 'Full Stack Developer | Building CathoScroll | Exploring AppSec',
    location: 'Surrey, United Kingdom',
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
  { label: 'Contact', href: '/contact' },
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
  featured: [
    { label: 'CathoScroll', href: '/projects/ts-cathoscroll' },
    { label: 'Portfolio', href: '/projects/ts-portfolio' },
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
// Meta
// ============================================

export const meta = {
  title: 'Joshua Argent | Full Stack Developer',
  description: siteConfig.description,
  github: 'https://github.com/joshuaargent',
  keywords: [
    'Joshua Argent',
    'full stack developer',
    'TypeScript developer',
    'Next.js developer',
    'web development portfolio',
    'CathoScroll',
    'application security',
    'Surrey',
    'United Kingdom',
  ] as string[],
} as const;
