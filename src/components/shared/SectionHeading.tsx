import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

// ============================================
// Types
// ============================================

export interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  action?: {
    label: string;
    href: string;
  };
  align?: 'left' | 'center';
  className?: string;
}

// ============================================
// Component
// ============================================

export function SectionHeading({
  title,
  subtitle,
  action,
  align = 'left',
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-2',
        align === 'center' && 'items-center text-center',
        className
      )}
    >
      <div
        className={cn(
          'flex items-end justify-between',
          align === 'center' && 'flex-col items-center gap-2'
        )}
      >
        <div>
          <h2 className="text-text-primary text-2xl font-bold tracking-tight md:text-3xl">
            {title}
          </h2>
          {subtitle && <p className="text-text-secondary mt-2 max-w-2xl">{subtitle}</p>}
        </div>
        {action && (
          <Link
            href={action.href}
            className="text-accent hover:text-accent-hover inline-flex shrink-0 items-center gap-1.5 text-sm font-medium transition-colors"
          >
            {action.label}
            <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </div>
    </div>
  );
}
