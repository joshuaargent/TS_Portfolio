import { PostCard } from '@/components/blog/PostCard';
import { EmptyState } from '@/components/shared/EmptyState';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { getRecentBlogPosts } from '@/data/blog';

export async function LatestBlogs() {
  const posts = await getRecentBlogPosts(2);

  return (
    <section className="py-8 md:py-12">
      <div className="container">
        <SectionHeading
          title="Latest Blog Posts"
          subtitle="Recent writeups, labs, and notes."
          action={{ label: 'View all posts', href: '/blog' }}
        />
        <div className="mt-6">
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {posts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <EmptyState title="No blog posts yet." />
          )}
        </div>
      </div>
    </section>
  );
}