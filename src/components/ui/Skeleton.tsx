import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

// ============================================
// Types
// ============================================

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
}

// ============================================
// Component
// ============================================

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant = 'text', width, height, ...props }, ref) => {
    const variantClasses = {
      text: 'rounded-md h-4',
      circular: 'rounded-full',
      rectangular: 'rounded-lg',
    };

    return (
      <div
        ref={ref}
        className={cn('skeleton', variantClasses[variant], className)}
        style={{ width, height }}
        {...props}
      />
    );
  }
);

Skeleton.displayName = 'Skeleton';

// ============================================
// Skeleton Presets
// ============================================

export const SkeletonText = forwardRef<HTMLDivElement, { lines?: number }>(({ lines = 3 }, ref) => (
  <div ref={ref} className="space-y-2">
    {Array.from({ length: lines }).map((_, i) => (
      <Skeleton key={i} className={i === lines - 1 ? 'w-3/4' : 'w-full'} />
    ))}
  </div>
));

SkeletonText.displayName = 'SkeletonText';

export const SkeletonCard = forwardRef<HTMLDivElement>((_, ref) => (
  <div ref={ref} className="bg-bg-card border-border space-y-4 rounded-xl border p-6">
    <Skeleton className="h-48 w-full" variant="rectangular" />
    <Skeleton className="h-6 w-3/4" />
    <SkeletonText lines={2} />
  </div>
));

SkeletonCard.displayName = 'SkeletonCard';

export const SkeletonVideoCard = forwardRef<HTMLDivElement>((_, ref) => (
  <div ref={ref} className="space-y-3">
    <Skeleton className="aspect-video w-full" variant="rectangular" />
    <Skeleton className="h-5 w-full" />
    <Skeleton className="h-4 w-1/2" />
  </div>
));

SkeletonVideoCard.displayName = 'SkeletonVideoCard';

export const SkeletonBookCard = forwardRef<HTMLDivElement>((_, ref) => (
  <div ref={ref} className="space-y-3">
    <Skeleton className="aspect-[2/3] w-full" variant="rectangular" />
    <Skeleton className="h-5 w-3/4" />
    <Skeleton className="h-4 w-1/2" />
  </div>
));

SkeletonBookCard.displayName = 'SkeletonBookCard';

export const SkeletonProjectCard = forwardRef<HTMLDivElement>((_, ref) => (
  <div ref={ref} className="bg-bg-card border-border space-y-4 rounded-xl border p-6">
    <Skeleton className="h-40 w-full" variant="rectangular" />
    <Skeleton className="h-6 w-2/3" />
    <SkeletonText lines={2} />
    <div className="flex gap-2">
      <Skeleton className="h-6 w-16" variant="rectangular" />
      <Skeleton className="h-6 w-16" variant="rectangular" />
      <Skeleton className="h-6 w-16" variant="rectangular" />
    </div>
  </div>
));

SkeletonProjectCard.displayName = 'SkeletonProjectCard';
