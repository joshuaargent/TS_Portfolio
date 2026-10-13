import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

// ============================================
// Types
// ============================================

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'default' | 'lg' | 'full';
}

// ============================================
// Component
// ============================================

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size = 'default', children, ...props }, ref) => {
    const sizeClasses = {
      sm: 'max-w-3xl',
      default: 'max-w-6xl',
      lg: 'max-w-7xl',
      full: 'max-w-full',
    };

    return (
      <div
        ref={ref}
        className={cn('mx-auto px-4 sm:px-6 lg:px-8', sizeClasses[size], className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Container.displayName = 'Container';
