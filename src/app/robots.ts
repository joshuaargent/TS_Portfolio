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
      disallow: ['/api/'],
    },
    host: siteConfig.url,
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
