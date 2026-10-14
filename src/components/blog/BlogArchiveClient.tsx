'use client';

import { useState } from 'react';
import { PostCard } from '@/components/blog/PostCard';
import { Pagination } from '@/components/shared/Pagination';
import { BlogPost } from '@/types';

// ============================================
// Types
// ============================================

interface BlogArchiveClientProps {
  posts: BlogPost[];
}

// ============================================
// Component
// ============================================

const ITEMS_PER_PAGE = 12;

export function BlogArchiveClient({ posts }: BlogArchiveClientProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(posts.length / ITEMS_PER_PAGE);
  
  const paginatedPosts = posts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {paginatedPosts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
      
      {totalPages > 1 && (
        <div className="mt-8">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
}