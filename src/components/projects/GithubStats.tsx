import { Star, GitFork, Eye } from 'lucide-react';

// ============================================
// Types
// ============================================

export interface GitHubStatsProps {
  stars: number;
  forks: number;
  watchers?: number;
  className?: string;
}

// ============================================
// Component
// ============================================

export function GitHubStats({ stars, forks, watchers, className }: GitHubStatsProps) {
  return (
    <div className={`text-text-muted flex items-center gap-4 text-sm ${className}`}>
      <span className="flex items-center gap-1.5">
        <Star className="h-4 w-4" />
        {stars.toLocaleString()}
      </span>
      <span className="flex items-center gap-1.5">
        <GitFork className="h-4 w-4" />
        {forks.toLocaleString()}
      </span>
      {watchers !== undefined && (
        <span className="flex items-center gap-1.5">
          <Eye className="h-4 w-4" />
          {watchers.toLocaleString()}
        </span>
      )}
    </div>
  );
}
