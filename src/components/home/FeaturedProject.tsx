import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { Project } from '@/types';

// ============================================
// Types
// ============================================

export interface FeaturedProjectProps {
  project: Project;
}

// ============================================
// Component
// ============================================

export function FeaturedProject({ project }: FeaturedProjectProps) {
  return (
    <section className="py-12 md:py-16">
      <div className="container">
        <Card padding="none" className="overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Image */}
            <div className="relative aspect-video lg:aspect-auto">
              <Image
                src={project.screenshots[0] || '/images/placeholder.png'}
                alt={project.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Content */}
            <div className="flex flex-col justify-center p-6 md:p-8 lg:p-10">
              <div className="mb-4 flex items-center gap-2">
                <Badge variant="accent">Featured Project</Badge>
                <Badge variant="default">{project.status}</Badge>
              </div>

              <h3 className="text-text-primary text-2xl font-bold md:text-3xl">{project.name}</h3>

              <p className="text-text-secondary mt-4">{project.description}</p>

              <div className="mt-6 flex flex-wrap gap-2">
                {project.techStack.slice(0, 5).map((tech) => (
                  <Badge key={tech} variant="default">
                    {tech}
                  </Badge>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                {project.liveUrl && (
                  <Button
                    asChild
                    style={{ backgroundColor: '#0D9488', color: '#ffffff' }}
                    className="hover:opacity-90"
                  >
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Live Demo
                    </a>
                  </Button>
                )}
                {project.repoUrl && (
                  <Button variant="outline" asChild>
                    <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                      <svg
                        className="h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                      Source Code
                    </a>
                  </Button>
                )}
                <Button variant="ghost" asChild>
                  <Link href={`/code/${project.slug}`}>
                    View Details
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
