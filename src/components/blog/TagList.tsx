import Link from 'next/link';
import { Tag } from '@/components/ui/Tag';
import { cn } from '@/lib/utils';

// ============================================
// Types
// ============================================

export interface TagListProps {
  tags: string[];
  variant?: 'default' | 'accent' | 'faith' | 'psychology' | 'health' | 'performance' | 'code';
  className?: string;
}

// ============================================
// Component
// ============================================

export function TagList({ tags, variant = 'default', className }: TagListProps) {
  if (tags.length === 0) return null;

  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {tags.map((tag) => (
        <Link key={tag} href={`/blog?tag=${encodeURIComponent(tag)}`}>
          <Tag variant={variant}>#{tag}</Tag>
        </Link>
      ))}
    </div>
  );
}
