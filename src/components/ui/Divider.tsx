import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

// ============================================
// Types
// ============================================

export interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
  label?: string;
  variant?: 'solid' | 'dashed' | 'dotted';
}

// ============================================
// Component
// ============================================

const variantClassesMap: Record<string, string> = {
  solid: 'border-solid',
  dashed: 'border-dashed',
  dotted: 'border-dotted',
};

export const Divider = forwardRef<HTMLDivElement, DividerProps>(
  ({ className, orientation = 'horizontal', label, variant = 'solid', ...props }, ref) => {
    if (orientation === 'vertical') {
      return (
        <div
          ref={ref}
          className={cn(
            'border-border h-full w-px border-l',
            variantClassesMap[variant],
            className
          )}
          {...props}
        />
      );
    }

    if (label) {
      return (
        <div ref={ref} className={cn('relative flex items-center', className)} {...props}>
          <div className="border-border flex-grow border-t" />
          <span className="text-text-muted mx-4 flex-shrink text-sm">{label}</span>
          <div className="border-border flex-grow border-t" />
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn('border-border my-6 border-t', variantClassesMap[variant], className)}
        {...props}
      />
    );
  }
);

Divider.displayName = 'Divider';
