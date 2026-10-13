import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

// ============================================
// Types
// ============================================

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'accent' | 'faith' | 'psychology' | 'health' | 'performance' | 'code';
  removable?: boolean;
  onRemove?: () => void;
}

// ============================================
// Component
// ============================================

export const Tag = forwardRef<HTMLSpanElement, TagProps>(
  ({ className, variant = 'default', removable = false, onRemove, children, ...props }, ref) => {
    const variantClasses = {
      default: 'bg-bg-secondary text-text-secondary border-border',
      accent: 'bg-accent-light text-accent border-accent/20',
      faith: 'bg-violet-100 text-violet-700 border-violet-200',
      psychology: 'bg-blue-100 text-blue-700 border-blue-200',
      health: 'bg-green-100 text-green-700 border-green-200',
      performance: 'bg-orange-100 text-orange-700 border-orange-200',
      code: 'bg-cyan-100 text-cyan-700 border-cyan-200',
    };

    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium',
          variantClasses[variant],
          className
        )}
        {...props}
      >
        {children}
        {removable && (
          <button
            type="button"
            onClick={onRemove}
            className="ml-0.5 rounded-full p-0.5 transition-colors hover:bg-black/10"
            aria-label={`Remove ${children}`}
          >
            <X className="h-3 w-3" />
          </button>
        )}
      </span>
    );
  }
);

Tag.displayName = 'Tag';
