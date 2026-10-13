import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

// ============================================
// Types
// ============================================

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?:
    | 'default'
    | 'accent'
    | 'faith'
    | 'psychology'
    | 'health'
    | 'performance'
    | 'code'
    | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

// ============================================
// Component
// ============================================

const variantStyles: Record<string, string> = {
  default: 'bg-bg-secondary text-text-secondary border border-border',
  accent: 'bg-accent-light text-accent',
  faith: 'bg-violet-100 text-violet-700',
  psychology: 'bg-blue-100 text-blue-700',
  health: 'bg-green-100 text-green-700',
  performance: 'bg-orange-100 text-orange-700',
  code: 'bg-cyan-100 text-cyan-700',
  outline: 'border border-border text-text-secondary',
};

const sizeStyles: Record<string, string> = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-0.5 text-xs',
  lg: 'px-3 py-1 text-sm',
};

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', size = 'md', ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center rounded-full font-medium transition-colors',
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      />
    );
  }
);

Badge.displayName = 'Badge';
