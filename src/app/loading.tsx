import { Skeleton } from '@/components/ui/Skeleton';

// ============================================
// Loading State
// ============================================

export default function Loading() {
  return (
    <div className="py-12 md:py-16">
      <div className="container">
        {/* Header */}
        <div className="mb-12 text-center">
          <Skeleton className="mx-auto h-12 w-64" />
          <Skeleton className="mx-auto mt-4 h-6 w-96" />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-64 w-full" variant="rectangular" />
          ))}
        </div>
      </div>
    </div>
  );
}
