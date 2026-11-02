import type { Metadata } from 'next';
import { Hero } from '@/components/home/Hero';
import { LatestProjects } from '@/components/home/LatestProjects';
import { LatestBlogs } from '@/components/home/LatestBlogs';
import { FeaturedProject } from '@/components/home/FeaturedProject';
import { getFeaturedProjects } from '@/data/projects';
import { getResumeData } from '@/data/resume';
import FakeTerminal from '@/components/home/FakeTerminal';
import { siteConfig } from '@/lib/constants';
import { JsonLd } from '@/components/shared/JsonLd';

// ============================================
// Homepage
// ============================================

export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

export default async function HomePage() {
  const [featuredProjects, resume] = await Promise.all([getFeaturedProjects(), getResumeData()]);

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'WebSite',
              '@id': `${siteConfig.url}/#website`,
              url: siteConfig.url,
              name: siteConfig.name,
              description: siteConfig.description,
              inLanguage: 'en-GB',
              publisher: { '@id': `${siteConfig.url}/#person` },
            },
            {
              '@type': 'Person',
              '@id': `${siteConfig.url}/#person`,
              name: siteConfig.author.name,
              url: siteConfig.url,
              image: new URL(siteConfig.author.avatar, siteConfig.url).toString(),
              jobTitle: 'Full Stack Developer',
              address: {
                '@type': 'PostalAddress',
                addressRegion: 'Surrey',
                addressCountry: 'GB',
              },
              sameAs: Object.values(siteConfig.links).filter((link) => link.startsWith('https://')),
              knowsAbout: [
                'Full stack web development',
                'TypeScript',
                'Next.js',
                'Application security',
              ],
            },
          ],
        }}
      />
      <Hero />
      <LatestProjects />
      <LatestBlogs />

      {featuredProjects.length > 0 && (
        <section className="bg-bg-secondary py-8 md:py-12">
          <div className="container">
            <FeaturedProject project={featuredProjects[0]} />
          </div>
        </section>
      )}

      <FakeTerminal resume={resume} />
    </>
  );
}
