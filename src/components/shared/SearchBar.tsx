import { cn } from '@/lib/utils';
import { Search, X } from 'lucide-react';

export interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  defaultValue?: string;
  className?: string;
}

export function SearchBar({
  onSearch,
  placeholder = 'Search...',
  defaultValue = '',
  className,
}: SearchBarProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const query = formData.get('search') as string;
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className={cn('relative', className)}>
      <div className="relative">
        <Search className="text-text-muted absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
        <input
          type="text"
          name="search"
          defaultValue={defaultValue}
          placeholder={placeholder}
          className={cn(
            'border-border bg-bg-card h-11 w-full rounded-lg border pr-10 pl-10',
            'placeholder:text-text-muted text-base',
            'focus:ring-accent focus:ring-2 focus:ring-offset-2 focus:outline-none',
            'transition-all duration-200'
          )}
        />
        {defaultValue && (
          <button
            type="button"
            className="hover:bg-bg-secondary absolute top-1/2 right-1 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full"
            onClick={() => onSearch('')}
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </form>
  );
}
