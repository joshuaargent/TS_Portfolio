import { cn } from "@/lib/utils";

// ============================================
// Types
// ============================================

export interface PostContentProps {
  content: string;
  className?: string;
}

// ============================================
// Component
// ============================================

export function PostContent({ content, className }: PostContentProps) {
  return (
    <article
      className={cn(
        "prose max-w-none",
        "prose-headings:font-semibold",
        "prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4",
        "prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3",
        "prose-p:text-text-secondary prose-p:leading-relaxed",
        "prose-a:text-accent prose-a:no-underline hover:prose-a:underline",
        "prose-strong:text-text-primary",
        "prose-code:text-accent prose-code:bg-accent-light prose-code:px-1 prose-code:py-0.5 prose-code:rounded",
        "prose-pre:bg-text-primary prose-pre:text-bg-primary",
        "prose-blockquote:border-accent prose-blockquote:text-text-secondary",
        "prose-img:rounded-xl prose-img:border prose-img:border-border",
        className,
      )}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
