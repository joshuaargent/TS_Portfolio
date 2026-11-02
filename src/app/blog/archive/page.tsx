import { Metadata } from 'next';
import { PageHeader } from '@/components/layout/PageHeader';
import { BlogArchiveClient } from '@/components/blog/BlogArchiveClient';
import { getBlogPosts } from '@/data/blog';
import { createPageMetadata } from '@/lib/seo';

// ============================================
// Metadata
// ============================================

export const metadata: Metadata = {
  title: 'Blog Archive',
  description: 'Browse the complete archive of articles and project writeups by Joshua Argent.',
  ...createPageMetadata({
    title: 'Blog Archive | Joshua Argent',
    description: 'Browse the complete archive of articles and project writeups by Joshua Argent.',
    path: '/blog/archive',
  }),
};

// ============================================
// Blog Archive Page
// ============================================

export default async function BlogArchivePage() {
  const posts = await getBlogPosts();

  return (
    <>
      <PageHeader
        title="Blog Archive"
        description="All my blog posts, past and present."
      />

      <section className="pb-12 md:pb-16">
        <div className="container">
          <BlogArchiveClient posts={posts} />
        </div>
      </section>
    </>
  );
}