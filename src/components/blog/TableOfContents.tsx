'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

// ============================================
// Types
// ============================================

export interface TOCItem {
  id: string;
  text: string;
  level: number;
}

export interface TableOfContentsProps {
  items: TOCItem[];
  className?: string;
}

// ============================================
// Component
// ============================================

export function TableOfContents({ items, className }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-80px 0px -80% 0px' }
    );

    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav className={cn('space-y-2', className)}>
      <h4 className="text-text-primary mb-4 text-sm font-semibold tracking-wider uppercase">
        Table of Contents
      </h4>
      <ul className="border-border space-y-1 border-l">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={cn(
                'block py-1 text-sm transition-colors',
                item.level === 2 ? 'pl-4' : 'pl-8',
                activeId === item.id
                  ? 'text-accent border-accent -ml-px border-l-2 font-medium'
                  : 'text-text-secondary hover:text-text-primary'
              )}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
