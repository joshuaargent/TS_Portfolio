// ============================================
// Core Types for Joshua's Portfolio
// ============================================

// ----- Site Configuration -----
export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    email: string;
    github: string;
    linkedin: string;
    youtube: string;
    instagram: string;
    facebook: string;
    tiktok: string;
  };
  author: {
    name: string;
    bio: string;
    avatar: string;
  };
}

// ----- Navigation -----
export interface NavItem {
  label: string;
  href: string;
  icon?: string;
  children?: NavItem[];
}

// ----- Content Types -----
export type ContentCategory = 'writeups' | 'labs' | 'notes';
export type ProjectStatus = 'active' | 'completed' | 'archived';

// ----- Project -----
export interface Project {
  slug: string;
  name: string;
  description: string;
  longDescription: string;
  techStack: string[];
  liveUrl?: string;
  repoUrl?: string;
  screenshots: string[];
  status?: ProjectStatus;
  featured: boolean;
  tags: string[];
  stars?: number;
  language?: string;
  updatedAt?: string;
  createdAt: string;
  readme?: string;
}

// ----- Blog Post -----
export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  updatedAt?: string;
  tags: string[];
  category: ContentCategory[];
  readingTime: string;
  featured: boolean;
  coverImage?: string;
  relatedBooks?: string[];
  relatedContent?: string[];
}

// ----- CV / Experience -----
export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  highlights: string[];
  techStack?: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  highlights?: string[];
}

export interface Skill {
  category: string;
  items: string[];
}

export interface ProjectEntry {
  id: string;
  name: string;
  description: string;
  techStack: string[];
  url?: string;
  highlights: string[];
}

export interface CVData {
  summary: string;
  education: Education[];
  skills: Skill[];
  workExperience: Experience[];
  employment: Experience[];
  projects?: ProjectEntry[];
  additionalSkills?: string[];
  certifications: Certification[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  url?: string;
}

// ----- GitHub Types -----
export interface GitHubRepo {
  id: number;
  name: string;
  fullName: string;
  description: string;
  url: string;
  homepage?: string;
  stars: number;
  forks: number;
  language: string;
  topics: string[];
  createdAt: string;
  updatedAt: string;
  isFork: boolean;
}

// ----- Component Props -----
export interface BaseProps {
  className?: string;
  children?: React.ReactNode;
}

export interface SectionProps extends BaseProps {
  id?: string;
  title?: string;
  subtitle?: string;
  action?: {
    label: string;
    href: string;
  };
}

// ----- Form Types -----
export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// ----- API Response Types -----
export interface ApiResponse<T> {
  data: T;
  error?: string;
  status: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
