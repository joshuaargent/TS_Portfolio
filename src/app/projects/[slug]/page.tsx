import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getGitHubReadme } from '@/lib/github';
import { ProjectDetail } from '@/components/projects/ProjectDetail';
import { ProjectGrid } from '@/components/projects/ProjectGrid';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { getProjectBySlug, getProjects } from '@/data/projects';

// ============================================
// Types
// ============================================

interface PageProps {
  params: Promise<{ slug: string }>;
}

// ============================================
// Generate Static Params
// ============================================

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

// ============================================
// Generate Metadata
// ============================================

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: project.name,
    description: project.description,
  };
}

// ============================================
// Project Detail Page
// ============================================

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const [project, allProjects] = await Promise.all([getProjectBySlug(slug), getProjects()]);

  if (!project) {
    notFound();
  }

  // Fetch README if project has a repo URL
  let readme: string | null = null;
  
  if (project.repoUrl && project.repoUrl.includes('github.com')) {
    // Extract owner and repo from URL
    // URL format: https://github.com/owner/repo
    const urlParts = project.repoUrl.replace('https://github.com/', '').split('/');
    
    if (urlParts.length >= 2) {
      const owner = urlParts[0];
      const repo = urlParts[1];
      readme = await getGitHubReadme(owner, repo);
    }
  }

  // Attach README to project (creates a new object to avoid mutating cached project)
  const projectWithReadme = { ...project, readme: readme || undefined };

  // Get related projects (same tags, excluding current)
  const relatedProjects = allProjects
    .filter((p) => p.slug !== slug && p.tags.some((t) => project.tags.includes(t)))
    .slice(0, 2);

  return (
    <div className="py-8">
      <div className="container">
        <ProjectDetail project={projectWithReadme} />

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <div className="mt-16">
            <SectionHeading
              title="Related Projects"
              subtitle="Similar projects you might be interested in."
            />
            <div className="mt-6">
              <ProjectGrid projects={relatedProjects} columns={2} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
