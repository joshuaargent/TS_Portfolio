import { Metadata } from 'next';
import { PageHeader } from '@/components/layout/PageHeader';
import { BlogArchiveClient } from '@/components/blog/BlogArchiveClient';
import { getBlogPosts } from '@/data/blog';

// ============================================
// Metadata
// ============================================

export const metadata: Metadata = {
  title: 'Blog Archive',
  description: 'All blog posts.',
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