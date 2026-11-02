import type { Metadata, Viewport } from 'next';
import { inter, lora, jetbrainsMono } from '@/lib/fonts';
import { siteConfig, meta } from '@/lib/constants';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from '@/components/ui/Toaster';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';

// ============================================
// Metadata
// ============================================

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#FAFAF9',
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  manifest: '/manifest.json',
  applicationName: siteConfig.name,
  title: {
    default: meta.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: meta.description,
  keywords: meta.keywords,
  authors: [{ name: siteConfig.author.name }],
  creator: siteConfig.author.name,
  publisher: siteConfig.author.name,
  category: 'technology',
  referrer: 'origin-when-cross-origin',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
  appleWebApp: {
    capable: true,
    title: 'Joshua Argent',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: meta.title,
    description: meta.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 800,
        height: 800,
        alt: `${siteConfig.author.name} — full stack developer`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: meta.title,
    description: meta.description,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

// ============================================
// Root Layout
// ============================================

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${lora.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <meta name="theme-color" content="#FAFAF9" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#0C0A09" media="(prefers-color-scheme: dark)" />
        <link
          rel="alternate"
          type="application/rss+xml"
          title={`${siteConfig.name} RSS Feed`}
          href={`${siteConfig.url}/feed.xml`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var storedTheme = localStorage.getItem('theme');
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  var root = document.documentElement;
                  if (storedTheme === 'dark' || (!storedTheme && prefersDark)) {
                    root.classList.add('dark');
                    var themeColorMeta = document.querySelector('meta[name="theme-color"]');
                    if (themeColorMeta) {
                      themeColorMeta.setAttribute('content', '#0C0A09');
                    }
                  } else {
                    var themeColorMeta = document.querySelector('meta[name="theme-color"]');
                    if (themeColorMeta) {
                      themeColorMeta.setAttribute('content', '#FAFAF9');
                    }
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="flex min-h-screen flex-col antialiased">
        <ThemeProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster />
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
