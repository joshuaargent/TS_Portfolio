import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import { PostContent } from '@/components/blog/PostContent';
import { TagList } from '@/components/blog/TagList';
import { getBlogPostBySlug, getBlogPosts } from '@/data/blog';
import { formatDate } from '@/lib/utils';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { siteConfig } from '@/lib/constants';
import { JsonLd } from '@/components/shared/JsonLd';

// ============================================
// Types
// ============================================

interface PageProps {
  params: Promise<{ slug: string }>;
}

// ============================================
// Generate Static Params
// ============================================

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// ============================================
// Generate Metadata
// ============================================

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
      robots: { index: false, follow: false },
    };
  }

  const image = post.coverImage || siteConfig.ogImage;

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt,
      url: `/blog/${post.slug}`,
      images: [image],
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [image],
    },
  };
}

// ============================================
// Blog Post Page
// ============================================

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const [post, allPosts] = await Promise.all([getBlogPostBySlug(slug), getBlogPosts()]);

  if (!post) {
    notFound();
  }

  // Get related posts (same tags, excluding current)
  const relatedPosts = allPosts
    .filter((p) => p.slug !== slug && p.tags.some((t) => post.tags.includes(t)))
    .slice(0, 2);
  const postUrl = new URL(`/blog/${post.slug}`, siteConfig.url).toString();

  const categoryColors = {
    writeups: 'writeups',
    labs: 'labs',
    notes: 'notes',
  } as const;

  return (
    <div className="py-12 md:py-16">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: post.title,
          description: post.excerpt,
          datePublished: post.publishedAt,
          ...(post.updatedAt && { dateModified: post.updatedAt }),
          mainEntityOfPage: postUrl,
          url: postUrl,
          inLanguage: 'en-GB',
          author: {
            '@type': 'Person',
            name: siteConfig.author.name,
            url: siteConfig.url,
          },
          publisher: {
            '@type': 'Person',
            name: siteConfig.author.name,
            url: siteConfig.url,
          },
          image: post.coverImage
            ? new URL(post.coverImage, siteConfig.url).toString()
            : new URL(siteConfig.ogImage, siteConfig.url).toString(),
          articleSection: post.category,
          keywords: post.tags,
        }}
      />
      <div className="container max-w-4xl">
        {/* Back Link */}
        <Link
          href="/blog"
          className="text-text-secondary hover:text-accent mb-8 inline-flex items-center gap-1.5 text-sm transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Blog
        </Link>

        {/* Header */}
        <header className="mb-8">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            {post.category.map((cat) => (
              <Badge key={cat} variant={categoryColors[cat]}>
                {cat}
              </Badge>
            ))}
          </div>

          <h1 className="text-text-primary text-3xl font-bold md:text-4xl lg:text-5xl">
            {post.title}
          </h1>

          <p className="text-text-secondary mt-4 text-lg">{post.excerpt}</p>

          <div className="text-text-muted mt-6 flex flex-wrap items-center gap-4 text-sm">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {formatDate(post.publishedAt, 'MMMM d, yyyy')}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {post.readingTime}
            </span>
            {post.updatedAt && post.updatedAt !== post.publishedAt && (
              <span>Updated {formatDate(post.updatedAt, 'MMMM d, yyyy')}</span>
            )}
          </div>
        </header>

        {/* Cover Image */}
        {post.coverImage && (
          <div className="relative mb-8 aspect-video overflow-hidden rounded-xl">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          </div>
        )}

        {/* Content */}
        <PostContent content={post.content} />

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="border-border mt-8 border-t pt-8">
            <TagList tags={post.tags} />
          </div>
        )}

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="border-border mt-12 border-t pt-8">
            <h2 className="text-text-primary mb-6 text-2xl font-bold">Related Posts</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.slug}
                  href={`/blog/${relatedPost.slug}`}
                  className="group bg-bg-card border-border hover:border-accent/50 block rounded-xl border p-4 transition-colors"
                >
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    {relatedPost.category.slice(0, 2).map((cat) => (
                      <Badge key={cat} variant={categoryColors[cat]} size="sm">
                        {cat}
                      </Badge>
                    ))}
                  </div>
                  <h3 className="text-text-primary group-hover:text-accent text-lg font-semibold transition-colors">
                    {relatedPost.title}
                  </h3>
                  <p className="text-text-secondary mt-2 line-clamp-2 text-sm">
                    {relatedPost.excerpt}
                  </p>
                  <div className="text-text-muted mt-3 text-xs">
                    {formatDate(relatedPost.publishedAt, 'MMM d, yyyy')} · {relatedPost.readingTime}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
