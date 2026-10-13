import { ProjectCard } from './ProjectCard';
import { Project } from '@/types';

// ============================================
// Types
// ============================================

export interface ProjectGridProps {
  projects: Project[];
  columns?: 1 | 2 | 3;
  showImage?: boolean;
  emptyMessage?: string;
}

// ============================================
// Component
// ============================================

export function ProjectGrid({
  projects,
  columns = 2,
  showImage = true,
  emptyMessage = 'No projects found.',
}: ProjectGridProps) {
  const columnClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  };

  if (projects.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-text-muted">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className={`grid ${columnClasses[columns]} gap-6`}>
      {projects.map((project) => (
        <ProjectCard key={project.slug} project={project} showImage={showImage} />
      ))}
    </div>
  );
}
