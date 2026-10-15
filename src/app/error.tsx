'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';

// ============================================
// Error Page
// ============================================

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="max-w-md px-4 text-center">
        <div className="mb-6 inline-flex rounded-full bg-red-100 p-4 text-red-600">
          <AlertCircle className="h-8 w-8" />
        </div>
        <h1 className="text-text-primary text-3xl font-bold">Something went wrong</h1>
        <p className="text-text-secondary mt-4">
          Sorry, an unexpected error occurred. Please try again or go back to the homepage.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button
            onClick={reset}
            style={{ backgroundColor: '#0D9488', color: '#ffffff' }}
            className="hover:opacity-90"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
          <Link
            href="/"
            className="focus-visible:ring-accent inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-[#E7E5E4] bg-transparent px-5 text-base font-medium text-[#1C1917] transition-all duration-200 hover:bg-[#F5F5F4] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            <Home className="mr-2 h-4 w-4" />
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
