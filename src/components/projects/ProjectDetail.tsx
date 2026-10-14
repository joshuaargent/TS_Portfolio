import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ExternalLink, ArrowLeft, Star, Calendar } from 'lucide-react';
import { Project } from '@/types';
import { formatDate, cn } from '@/lib/utils';

// ============================================
// Types
// ============================================

export interface ProjectDetailProps {
  project: Project;
}

// ============================================
// Component
// ============================================

export function ProjectDetail({ project }: ProjectDetailProps) {
  return (
    <article>
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/code"
          className="text-text-secondary hover:text-accent inline-flex items-center gap-1.5 text-sm transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Projects
        </Link>
      </div>

      {/* Title & Meta */}
      <header className="mb-8">
        <div className="mb-4 flex flex-wrap items-center gap-3">
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
          {project.featured && <Badge variant="accent">Featured</Badge>}
        </div>

        <h1 className="text-text-primary text-3xl font-bold md:text-4xl">{project.name}</h1>

        <p className="text-text-secondary mt-4 max-w-3xl text-lg">{project.description}</p>

        {/* Stats */}
        <div className="text-text-muted mt-6 flex flex-wrap items-center gap-6 text-sm">
          {project.language && (
            <span className="flex items-center gap-2">
              <span className="bg-accent h-3 w-3 rounded-full" />
              {project.language}
            </span>
          )}
          {project.stars !== undefined && (
            <span className="flex items-center gap-1.5">
              <Star className="h-4 w-4" />
              {project.stars} stars
            </span>
          )}
          {project.updatedAt && (
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              Updated {formatDate(project.updatedAt, 'MMM d, yyyy')}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-wrap gap-3">
          {project.liveUrl && (
            <Button size="lg" asChild>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ backgroundColor: '#0D9488', color: '#ffffff' }}
                className="hover:opacity-90 inline-flex items-center"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Live Demo
              </a>
            </Button>
          )}
          {project.repoUrl && (
            <Button variant="outline" size="lg" asChild>
              <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                <svg 
                    className="mr-1.5 h-3.5 w-3.5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                View Source
              </a>
            </Button>
          )}
        </div>
      </header>

      {/* Screenshots */}
      {project.screenshots.length > 0 && (
        <div className="mb-12 space-y-6">
          {project.screenshots.map((screenshot, index) => (
            <div
              key={index}
              className="border-border relative aspect-video overflow-hidden rounded-xl border"
            >
              <Image
                src={screenshot}
                alt={`${project.name} screenshot ${index + 1}`}
                fill
                className="object-cover"
                sizes="100vw"
              />
            </div>
          ))}
        </div>
      )}

      {/* Tech Stack */}
      <div className="mb-12">
        <h2 className="text-text-primary mb-4 text-xl font-semibold">Tech Stack</h2>
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <Badge key={tech} variant="default" size="lg">
              {tech}
            </Badge>
          ))}
        </div>
      </div>

      {/* README - Detailed description from the repo */}
      {project.readme && (
        <div className="mb-12">
          <h2 className="text-text-primary mb-4 text-xl font-semibold">README</h2>
          <article
            className={cn(
              "prose max-w-none rounded-xl border border-border bg-card/50 p-6",
              "prose-headings:font-semibold",
              "prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4",
              "prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3",
              "prose-p:text-text-secondary prose-p:leading-relaxed",
              "prose-a:text-accent prose-a:no-underline hover:prose-a:underline",
              "prose-strong:text-text-primary",
              "prose-code:text-accent prose-code:bg-accent-light prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm",
              "prose-pre:bg-text-primary prose-pre:text-bg-primary prose-pre:rounded-lg",
              "prose-blockquote:border-accent prose-blockquote:text-text-secondary prose-blockquote:pl-4",
              "prose-ul:text-text-secondary prose-li:text-text-secondary",
              "prose-ol:text-text-secondary",
              "prose-img:rounded-xl prose-img:border prose-img:border-border",
              "prose-hr:border-border",
              "prose-table:border prose-table:border-border",
              "prose-thead:bg-accent-light prose-thead:text-text-primary",
              "prose-th:border prose-th:border-border prose-th:px-4 prose-th:py-2 prose-th:text-left",
              "prose-td:border prose-td:border-border prose-td:px-4 prose-td:py-2",
              "prose-tr:border prose-tr:border-border",
              "prose-tr:hover:bg-accent-light/50",
              "dark:prose-invert"
            )}
            dangerouslySetInnerHTML={{ __html: project.readme }}
          />
        </div>
      )}
    </article>
  );
}
