import Link from 'next/link';
import Image from 'next/image';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { formatDate } from '@/lib/utils';
import { Clock, ArrowRight } from 'lucide-react';
import { BlogPost } from '@/types';

// ============================================
// Types
// ============================================

export interface PostCardProps {
  post: BlogPost;
  featured?: boolean;
}

// ============================================
// Component
// ============================================

export function PostCard({ post, featured = false }: PostCardProps) {
  const categoryColors = {
    writeups: 'writeups',
    labs: 'labs',
    notes: 'notes',
  } as const;

  if (featured) {
    return (
      <Card padding="none" hover className="group overflow-hidden">
        <Link href={`/blog/${post.slug}`} className="block">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Cover Image */}
            {post.coverImage && (
              <div className="relative aspect-video md:aspect-auto">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            )}

            {/* Content */}
            <div className="flex flex-col justify-center p-6 md:p-8">
              <div className="mb-3 flex items-center gap-2">
                {post.category.slice(0, 2).map((cat) => (
                  <Badge key={cat} variant={categoryColors[cat]} size="sm">
                    {cat}
                  </Badge>
                ))}
              </div>

              <h2 className="text-text-primary group-hover:text-accent text-2xl font-bold transition-colors">
                {post.title}
              </h2>

              <p className="text-text-secondary mt-3 line-clamp-3">{post.excerpt}</p>

              <div className="text-text-muted mt-4 flex items-center gap-4 text-sm">
                <span>{formatDate(post.publishedAt, 'MMMM d, yyyy')}</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {post.readingTime}
                </span>
              </div>
            </div>
          </div>
        </Link>
      </Card>
    );
  }

  return (
    <Card padding="none" hover className="group overflow-hidden">
      <Link href={`/blog/${post.slug}`} className="block">
        {/* Cover Image */}
        {post.coverImage && (
          <div className="relative aspect-video overflow-hidden">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}

        {/* Content */}
        <div className="p-5">
          <div className="mb-2 flex items-center gap-2">
            {post.category.slice(0, 2).map((cat) => (
              <Badge key={cat} variant={categoryColors[cat]} size="sm">
                {cat}
              </Badge>
            ))}
          </div>

          <h3 className="text-text-primary group-hover:text-accent text-lg font-semibold transition-colors">
            {post.title}
          </h3>

          <p className="text-text-secondary mt-2 line-clamp-2 text-sm">{post.excerpt}</p>

          <div className="text-text-muted mt-4 flex items-center justify-between text-xs">
            <div className="flex items-center gap-3">
              <span>{formatDate(post.publishedAt, 'MMM d, yyyy')}</span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {post.readingTime}
              </span>
            </div>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </Link>
    </Card>
  );
}
