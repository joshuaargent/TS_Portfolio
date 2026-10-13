import { Inter, Lora, JetBrains_Mono } from "next/font/google";

// ============================================
// Font Configuration
// ============================================

/**
 * Inter - Primary sans-serif font for UI and body text
 * Supports: Latin, Latin Extended, Cyrillic, Greek, Vietnamese
 */
export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
});

/**
 * Lora - Serif font for long-form reading content
 * Supports: Latin, Latin Extended, Cyrillic, Vietnamese
 */
export const lora = Lora({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-lora",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

/**
 * JetBrains Mono - Monospace font for code blocks
 * Supports: Latin, Latin Extended, Cyrillic, Greek, Vietnamese
 */
export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
  weight: ["400", "500", "600", "700"],
});
