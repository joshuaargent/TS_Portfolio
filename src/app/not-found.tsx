import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Home, ArrowLeft } from 'lucide-react';

// ============================================
// 404 Page
// ============================================

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="text-center">
        <h1 className="text-text-primary text-6xl font-bold md:text-8xl">404</h1>
        <h2 className="text-text-primary mt-4 text-2xl font-semibold">Page not found</h2>
        <p className="text-text-secondary mx-auto mt-2 max-w-md">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button
            asChild
            style={{ backgroundColor: '#0D9488', color: '#ffffff' }}
            className="hover:opacity-90"
          >
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Go Home
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="javascript:history.back()">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
