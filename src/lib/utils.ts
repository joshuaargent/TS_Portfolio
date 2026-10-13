import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, formatDistanceToNow, parseISO } from "date-fns";

// ============================================
// Class Name Utilities
// ============================================

/**
 * Combines class names with Tailwind CSS merge support
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ============================================
// Date Utilities
// ============================================

/**
 * Formats a date string to a readable format
 */
export function formatDate(
  date: string | Date,
  formatStr: string = "MMMM d, yyyy",
): string {
  const dateObj = typeof date === "string" ? parseISO(date) : date;
  return format(dateObj, formatStr);
}

/**
 * Formats a date to a relative time string (e.g., "2 days ago")
 */
export function formatRelativeTime(date: string | Date): string {
  const dateObj = typeof date === "string" ? parseISO(date) : date;
  return formatDistanceToNow(dateObj, { addSuffix: true });
}

/**
 * Formats a date to a short format (e.g., "Jan 15")
 */
export function formatShortDate(date: string | Date): string {
  return formatDate(date, "MMM d");
}

/**
 * Formats a date to ISO format for datetime attributes
 */
export function formatISODate(date: string | Date): string {
  const dateObj = typeof date === "string" ? parseISO(date) : date;
  return dateObj.toISOString();
}

// ============================================
// Number Utilities
// ============================================

/**
 * Formats a number with commas (e.g., 1000 → "1,000")
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat("en-US").format(num);
}

/**
 * Formats a number to a compact format (e.g., 1500 → "1.5K")
 */
export function formatCompactNumber(num: number): string {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(num);
}

/**
 * Formats seconds to a duration string (e.g., 3661 → "1:01:01")
 */
export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }
  return `${minutes}:${secs.toString().padStart(2, "0")}`;
}

/**
 * Formats pace (e.g., "5:30" min/km)
 */
export function formatPace(secondsPerKm: number): string {
  const minutes = Math.floor(secondsPerKm / 60);
  const seconds = Math.round(secondsPerKm % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

// ============================================
// String Utilities
// ============================================

/**
 * Truncates a string to a specified length
 */
export function truncate(
  str: string,
  length: number,
  suffix: string = "...",
): string {
  if (str.length <= length) return str;
  return str.slice(0, length - suffix.length) + suffix;
}

/**
 * Converts a string to a URL-friendly slug
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Capitalizes the first letter of a string
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Decodes HTML entities in a string (e.g., &amp; → &, &#39; → ')
 */
export function decodeHtmlEntities(str: string): string {
  const entities: Record<string, string> = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
    '&#x27;': "'",
    '&#x2F;': '/',
    '&nbsp;': ' ',
    '&apos;': "'",
    '&#8217;': "'",
    '&#8216;': "'",
  };

  return str.replace(/&[#\w]+;/g, (match) => entities[match] || match);
}

// ============================================
// URL Utilities
// ============================================

/**
 * Gets the YouTube thumbnail URL for a video ID
 */
export function getYouTubeThumbnail(
  videoId: string,
  quality: "default" | "medium" | "high" | "maxres" = "high",
): string {
  const qualityMap = {
    default: "default",
    medium: "mqdefault",
    high: "hqdefault",
    maxres: "maxresdefault",
  };
  return `https://i.ytimg.com/vi/${videoId}/${qualityMap[quality]}.jpg`;
}

/**
 * Gets the YouTube embed URL for a video ID
 */
export function getYouTubeEmbedUrl(videoId: string): string {
  return `https://www.youtube.com/embed/${videoId}`;
}

/**
 * Extracts YouTube video ID from various URL formats
 */
export function extractYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /^([a-zA-Z0-9_-]{11})$/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

// ============================================
// Array Utilities
// ============================================

/**
 * Groups an array of objects by a key
 */
export function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce(
    (groups, item) => {
      const group = String(item[key]);
      return {
        ...groups,
        [group]: [...(groups[group] || []), item],
      };
    },
    {} as Record<string, T[]>,
  );
}

/**
 * Sorts an array of objects by a date field
 */
export function sortByDate<T>(
  array: T[],
  dateKey: keyof T,
  direction: "asc" | "desc" = "desc",
): T[] {
  return [...array].sort((a, b) => {
    const dateA = new Date(a[dateKey] as string).getTime();
    const dateB = new Date(b[dateKey] as string).getTime();
    return direction === "asc" ? dateA - dateB : dateB - dateA;
  });
}

/**
 * Filters an array by a search term across multiple fields
 */
export function filterBySearch<T>(
  array: T[],
  searchTerm: string,
  fields: (keyof T)[],
): T[] {
  if (!searchTerm.trim()) return array;

  const term = searchTerm.toLowerCase();
  return array.filter((item) =>
    fields.some((field) => {
      const value = item[field];
      if (typeof value === "string") {
        return value.toLowerCase().includes(term);
      }
      if (Array.isArray(value)) {
        return value.some((v) => String(v).toLowerCase().includes(term));
      }
      return false;
    }),
  );
}

// ============================================
// Validation Utilities
// ============================================

/**
 * Validates an email address
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validates a URL
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

// ============================================
// Misc Utilities
// ============================================

/**
 * Delays execution for a specified time
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Generates a unique ID
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 11);
}

/**
 * Gets a random item from an array
 */
export function randomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * Shuffles an array (Fisher-Yates algorithm)
 */
export function shuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Debounces a function
 */
export function debounce<T extends (...args: Parameters<T>) => void>(
  func: T,
  wait: number,
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout | null = null;

  return (...args: Parameters<T>) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), wait);
  };
}

/**
 * Throttles a function
 */
export function throttle<T extends (...args: Parameters<T>) => void>(
  func: T,
  limit: number,
): (...args: Parameters<T>) => void {
  let inThrottle = false;

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}
