import { getProjects } from '@/data/projects';
import { ProjectGrid } from '@/components/projects/ProjectGrid';
import { SectionHeading } from '@/components/shared/SectionHeading';

export async function LatestProjects() {
  const projects = await getProjects();
  const latestProjects = projects
    .sort(
      (a, b) =>
        new Date(b.updatedAt || b.createdAt).getTime() -
        new Date(a.updatedAt || a.createdAt).getTime()
    )
    .slice(0, 2);

  return (
    <section className="py-8 md:py-12">
      <div className="container">
        <SectionHeading
          title="Latest Projects"
          subtitle="A look at what I've been working on recently."
          action={{ label: 'View all projects', href: '/projects' }}
        />
        <div className="mt-6">
          <ProjectGrid projects={latestProjects} columns={2} />
        </div>
      </div>
    </section>
  );
}
