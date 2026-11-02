import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getGitHubReadme } from '@/lib/github';
import { ProjectDetail } from '@/components/projects/ProjectDetail';
import { ProjectGrid } from '@/components/projects/ProjectGrid';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { getProjectBySlug, getProjects } from '@/data/projects';
import { siteConfig } from '@/lib/constants';
import { JsonLd } from '@/components/shared/JsonLd';
import { createBreadcrumbData, createPageMetadata } from '@/lib/seo';

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
      robots: { index: false, follow: false },
    };
  }

  const pageMetadata = createPageMetadata({
    title: project.name,
    description: project.description,
    path: `/projects/${project.slug}`,
    socialTitle: `${project.name} | Projects by Joshua Argent`,
  });

  return {
    title: project.name,
    description: project.description,
    ...pageMetadata,
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
  const projectUrl = new URL(`/projects/${project.slug}`, siteConfig.url).toString();

  return (
    <div className="py-8">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'SoftwareSourceCode',
          name: project.name,
          description: project.description,
          codeRepository: project.repoUrl,
          url: project.liveUrl || projectUrl,
          mainEntityOfPage: projectUrl,
          author: {
            '@type': 'Person',
            name: siteConfig.author.name,
            url: siteConfig.url,
          },
          ...(project.language && project.language !== 'Unknown'
            ? { programmingLanguage: project.language }
            : {}),
          ...(project.createdAt && { dateCreated: project.createdAt }),
          ...(project.updatedAt && { dateModified: project.updatedAt }),
        }}
      />
      <JsonLd
        data={createBreadcrumbData([
          { name: 'Home', path: '/' },
          { name: 'Projects', path: '/projects' },
          { name: project.name, path: `/projects/${project.slug}` },
        ])}
      />
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
