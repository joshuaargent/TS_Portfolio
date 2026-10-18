import { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/constants';
import { getBlogPosts } from '@/data/blog';
import { getProjects } from '@/data/projects';

function parseLastModified(value?: string): Date | undefined {
  if (!value) return undefined;

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

// ============================================
// Sitemap
// ============================================

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url;

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/resume`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ];

  // Dynamic pages - Blog posts
  const blogPosts = await getBlogPosts();
  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => {
    const lastModified = parseLastModified(post.updatedAt || post.publishedAt);
    return {
      url: `${baseUrl}/blog/${post.slug}`,
      ...(lastModified && { lastModified }),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    };
  });

  // Dynamic pages - Projects
  const projects = await getProjects();
  const projectPages: MetadataRoute.Sitemap = projects.map((project) => {
    const lastModified = parseLastModified(project.updatedAt || project.createdAt);
    return {
      url: `${baseUrl}/projects/${project.slug}`,
      ...(lastModified && { lastModified }),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    };
  });

  return [...staticPages, ...blogPages, ...projectPages];
}
