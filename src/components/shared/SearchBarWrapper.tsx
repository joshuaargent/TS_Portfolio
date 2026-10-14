'use client';

import { useState, useMemo } from 'react';
import { SearchBar } from './SearchBar';
import { BlogPost } from '@/types';
import { PostCard } from '@/components/blog/PostCard';
import { EmptyState } from '@/components/shared/EmptyState';
import { Search } from 'lucide-react';

interface SearchBarWrapperProps {
  placeholder?: string;
  posts: BlogPost[];
}

export function SearchBarWrapper({ placeholder = 'Search...', posts }: SearchBarWrapperProps) {
  const [query, setQuery] = useState('');

  const filteredPosts = useMemo(() => {
    if (!query.trim()) return [];

    const lowerQuery = query.toLowerCase();
    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(lowerQuery) ||
        post.excerpt.toLowerCase().includes(lowerQuery) ||
        post.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
    );
  }, [posts, query]);

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
  };

  return (
    <>
      <SearchBar onSearch={handleSearch} placeholder={placeholder} defaultValue={query} />

      {query && (
        <div className="mt-8">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-text-secondary">
              {filteredPosts.length} result{filteredPosts.length !== 1 ? 's' : ''} for &quot;{query}
              &quot;
            </p>
            <button
              onClick={() => setQuery('')}
              className="text-accent hover:text-accent-hover text-sm"
            >
              Clear search
            </button>
          </div>

          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={<Search className="h-8 w-8" />}
              title="No posts found"
              description={`No posts matching "${query}". Try a different search term.`}
              action={{
                label: 'Clear search',
                onClick: () => setQuery(''),
              }}
            />
          )}
        </div>
      )}
    </>
  );
}
