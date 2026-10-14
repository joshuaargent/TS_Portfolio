import { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader } from '@/components/layout/PageHeader';
import { PostCard } from '@/components/blog/PostCard';
import { BlogSearchSection } from '@/components/blog/BlogSearchSection';
import { getBlogPosts, getFeaturedBlogPosts } from '@/data/blog';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Blog',
  description: "Thoughts, essays, and notes on things I'm learning.",
};

export default async function BlogPage() {
  const [posts, featuredPosts] = await Promise.all([getBlogPosts(), getFeaturedBlogPosts()]);

  return (
    <>
      <PageHeader
        title="Blog"
        description="Thoughts, essays, and notes on things I'm learning about faith, psychology, health, and performance."
      />

      <section className="pb-12 md:pb-16">
        <div className="container">
          <BlogSearchSection posts={posts} />

          {featuredPosts.length > 0 && (
            <div className="mb-12">
              <PostCard post={featuredPosts[0]} featured />
            </div>
          )}

          <div>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-text-primary text-2xl font-bold">Recent Posts</h2>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.slice(0, 6).map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </div>

          {posts.length > 6 && (
            <div className="mt-8 text-center">
              <Link
                href="/blog/archive"
                className="text-accent hover:text-accent-hover inline-flex items-center gap-1.5 transition-colors"
              >
                View all posts
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
