import Link from 'next/link';
import { ArrowRight, Play } from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';

// ============================================
// Hero Component
// ============================================

export function Hero() {
  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="container">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-16">
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-text-primary text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              Hi, I&apos;m <span className="text-accent">Joshua Argent</span>
            </h1>
            <p className="text-text-secondary mx-auto mt-6 max-w-xl text-lg md:text-xl lg:mx-0">
              Web developer exploring application security
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
              <Link
                href="/projects"
                style={{ backgroundColor: '#0D9488', color: '#ffffff' }}
                className="focus-visible:ring-accent inline-flex h-14 items-center justify-center gap-2 rounded-lg px-7 text-lg font-medium shadow-sm transition-all duration-200 hover:opacity-90 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                View my projects
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/blog"
                className="focus-visible:ring-accent border-border text-text-primary hover:bg-bg-secondary inline-flex h-14 items-center justify-center gap-2 rounded-lg border bg-transparent px-7 text-lg font-medium transition-all duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                <Play className="mr-2 h-4 w-4" />
                Read my blog
              </Link>
            </div>
          </div>

          {/* Avatar */}
          <div className="flex-shrink-0">
            <div className="relative">
              <div className="bg-accent/20 absolute inset-0 rounded-full blur-3xl" />
              <Avatar
                src="/images/avatar.jpg"
                alt="Joshua"
                size="xl"
                className="border-bg-card relative border-4 shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
