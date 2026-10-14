import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ExternalLink, Star, ArrowRight } from 'lucide-react';
import { Project } from '@/types';

// ============================================
// Types
// ============================================

export interface ProjectCardProps {
  project: Project;
  showImage?: boolean;
}

// ============================================
// Component
// ============================================

export function ProjectCard({ project, showImage = true }: ProjectCardProps) {
  return (
    <Card padding="none" hover className="group flex flex-col overflow-hidden">
      {/* Screenshot */}
      {showImage && project.screenshots[0] && (
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={project.screenshots[0]}
            alt={project.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {project.featured && (
            <div className="absolute top-3 left-3">
              <Badge variant="accent">Featured</Badge>
            </div>
          )}
        </div>
      )}

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-text-primary group-hover:text-accent text-xl font-semibold transition-colors">
              {project.name}
            </h3>
            {project.status && (
              <Badge
                variant={
                  project.status === 'active'
                    ? 'health'
                    : project.status === 'completed'
                      ? 'accent'
                      : 'default'
                }
              >
                {project.status}
              </Badge>
            )}
          </div>

          <p className="text-text-secondary mt-3 line-clamp-2">{project.description}</p>

          {/* Tech Stack */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.techStack.slice(0, 4).map((tech) => (
              <Badge key={tech} variant="default" size="sm">
                {tech}
              </Badge>
            ))}
            {project.techStack.length > 4 && (
              <Badge variant="default" size="sm">
                +{project.techStack.length - 4}
              </Badge>
            )}
          </div>
        </div>

        {/* Stats */}
        {(project.stars !== undefined || project.language) && (
          <div className="text-text-muted mt-4 flex items-center gap-4 text-sm">
            {project.language && (
              <span className="flex items-center gap-1.5">
                <span className="bg-accent h-3 w-3 rounded-full" />
                {project.language}
              </span>
            )}
            {project.stars !== undefined && project.stars > 0 && (
              <span className="flex items-center gap-1">
                <Star className="h-4 w-4" />
                {project.stars}
              </span>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="mt-6 flex flex-wrap gap-2">
          {project.liveUrl && (
            <Button size="sm" asChild>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ backgroundColor: '#0D9488', color: '#ffffff' }}
                className="hover:opacity-90 inline-flex items-center"
              >
                <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
                Demo
              </a>
            </Button>
          )}
          {project.repoUrl && (
            <Button variant="outline" size="sm" asChild>
              <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                <svg
                    className="mr-1.5 h-3.5 w-3.5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                Code
              </a>
            </Button>
          )}
          <Button variant="ghost" size="sm" asChild>
            <Link href={`/code/${project.slug}`}>
              Details
              <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
      </div>
    </Card>
  );
}
