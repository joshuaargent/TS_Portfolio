import { Metadata } from 'next';
import { PageHeader } from '@/components/layout/PageHeader';
import { ProjectGrid } from '@/components/projects/ProjectGrid';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { getProjects, getFeaturedProjects } from '@/data/projects';

export const metadata: Metadata = {
  title: 'Projects',
  description: "Projects I've built. Clean, maintainable software that solves real problems.",
};

export default async function ProjectsPage() {
  const [allProjects, featuredProjects] = await Promise.all([getProjects(), getFeaturedProjects()]);

  const techStack = [
    'TypeScript',
    'JavaScript',
    'HTML5',
    'CSS3',
    'Next.js',
    'React',
    'Node.js',
    'Nest.js',
    'Express.js',
    'PostgreSQL',
    'YouTube API',
    'GitHub API',
    'Vercel',
    'Render',
    'Git',
    'GitHub',
  ];

  return (
    <>
      <PageHeader
        title="Projects"
        description="I build websites and tools. Here's what I've been working on."
      />

      <section className="pb-12 md:pb-16">
        <div className="container">
          {featuredProjects.length > 0 && (
            <div className="mb-12">
              <SectionHeading title="Featured Projects" subtitle="My most impactful work." />
              <div className="mt-6">
                <ProjectGrid projects={featuredProjects} columns={1} />
              </div>
            </div>
          )}

          <div className="mb-12">
            <SectionHeading
              title="All Projects"
              subtitle="Everything I've built, let me know if you have any requests."
              action={{ label: 'View on GitHub', href: 'https://github.com/joshuaargent' }}
            />
            <div className="mt-6">
              <ProjectGrid projects={allProjects} columns={2} />
            </div>
          </div>

          <div className="mb-12">
            <SectionHeading title="Tech Stack" subtitle="Technologies I work with regularly." />
            <div className="mt-6">
              <Card>
                <div className="flex flex-wrap gap-2">
                  {techStack.map((tech) => (
                    <Badge key={tech} variant="default" size="lg">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </Card>
            </div>
          </div>

          <div>
            <Card>
              <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
                <div>
                  <h3 className="text-text-primary text-xl font-semibold">More Projects</h3>
                  <p className="text-text-secondary mt-2">
                    Check out more of my projects on GitHub.
                  </p>
                </div>
                <Button
                  asChild
                  style={{ backgroundColor: '#0D9488', color: '#ffffff' }}
                  className="hover:opacity-90"
                >
                  <a
                    href="https://github.com/joshuaargent"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg
                        className="mr-1.5 h-3.5 w-3.5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    View GitHub
                  </a>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
