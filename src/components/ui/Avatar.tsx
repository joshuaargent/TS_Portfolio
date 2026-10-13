import { forwardRef, type HTMLAttributes } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { User } from 'lucide-react';

// ============================================
// Types
// ============================================

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fallback?: React.ReactNode;
}

// ============================================
// Component
// ============================================

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, src, alt, size = 'md', fallback, ...props }, ref) => {
    const sizeClasses = {
      sm: 'h-8 w-8',
      md: 'h-10 w-10',
      lg: 'h-16 w-16',
      xl: 'h-24 w-24',
    };

    const iconSizes = {
      sm: 16,
      md: 20,
      lg: 32,
      xl: 48,
    };

    return (
      <div
        ref={ref}
        className={cn(
          'bg-bg-secondary relative flex items-center justify-center overflow-hidden rounded-full',
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {src ? (
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 300px"
          />
        ) : (
          fallback || <User className="text-text-muted" size={iconSizes[size]} />
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';
