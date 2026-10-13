'use client';

import {
  forwardRef,
  type ButtonHTMLAttributes,
  type ReactNode,
  type ReactElement,
  cloneElement,
  isValidElement,
} from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

// ============================================
// Types
// ============================================

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  asChild?: boolean;
}

// ============================================
// Component
// ============================================

const sizeStyles: Record<string, string> = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-11 px-5 text-base',
  lg: 'h-14 px-7 text-lg',
  icon: 'h-10 w-10',
};

const buttonBaseStyles =
  'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      disabled,
      children,
      asChild = false,
      ...props
    },
    ref
  ) => {
    // Build variant styles with explicit text colors
    let variantStyles = '';

    switch (variant) {
      case 'primary':
        variantStyles = 'bg-accent text-white hover:bg-accent-hover shadow-sm';
        break;
      case 'secondary':
        variantStyles = 'bg-bg-secondary text-text-primary hover:bg-border border border-border';
        break;
      case 'outline':
        variantStyles = 'border border-border bg-transparent text-text-primary hover:bg-bg-secondary';
        break;
      case 'ghost':
        variantStyles = 'text-text-primary hover:bg-bg-secondary';
        break;
      case 'link':
        variantStyles = 'text-accent hover:text-accent-hover underline-offset-4 hover:underline';
        break;
      case 'danger':
        variantStyles = 'bg-red-600 text-white hover:bg-red-700';
        break;
      default:
        variantStyles = 'bg-accent text-white hover:bg-accent-hover';
    }

    const buttonStyles = cn(buttonBaseStyles, variantStyles, sizeStyles[size], className);

    if (asChild && isValidElement(children)) {
      const child = children as ReactElement<{ className?: string; [key: string]: unknown }>;
      const childClassName = child.props.className;
      const mergedClassName = cn(buttonStyles, childClassName);

      return cloneElement(child, {
        className: mergedClassName,
        ref,
        ...props,
      } as any);
    }

    return (
      <button ref={ref} className={buttonStyles} disabled={disabled || isLoading} {...props}>
        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : leftIcon}
        {children}
        {!isLoading && rightIcon}
      </button>
    );
  }
);

Button.displayName = 'Button';
