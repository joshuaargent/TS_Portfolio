import { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/constants';

// ============================================
// robots.txt
// ============================================

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/_next/', '/private/'],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
