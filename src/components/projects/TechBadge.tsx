import { cn } from '@/lib/utils';

// ============================================
// Types
// ============================================

export interface TechBadgeProps {
  name: string;
  color?: string;
  className?: string;
}

// ============================================
// Component
// ============================================

const techColors: Record<string, string> = {
  'Next.js': 'bg-black text-white',
  React: 'bg-sky-500 text-white',
  TypeScript: 'bg-blue-600 text-white',
  JavaScript: 'bg-yellow-400 text-black',
  'Node.js': 'bg-green-600 text-white',
  Python: 'bg-blue-500 text-white',
  'Tailwind CSS': 'bg-cyan-500 text-white',
  PostgreSQL: 'bg-blue-700 text-white',
  MongoDB: 'bg-green-500 text-white',
  Redis: 'bg-red-500 text-white',
  Docker: 'bg-blue-400 text-white',
  AWS: 'bg-orange-500 text-white',
  Vercel: 'bg-black text-white',
  Git: 'bg-orange-600 text-white',
  GraphQL: 'bg-pink-500 text-white',
  Prisma: 'bg-indigo-600 text-white',
  tRPC: 'bg-blue-500 text-white',
  Zustand: 'bg-amber-600 text-white',
  'Framer Motion': 'bg-purple-500 text-white',
};

export function TechBadge({ name, className }: TechBadgeProps) {
  const colorClass = techColors[name] || 'bg-bg-secondary text-text-secondary';

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium',
        colorClass,
        className
      )}
    >
      {name}
    </span>
  );
}
