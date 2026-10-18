import { Hero } from '@/components/home/Hero';
import { LatestProjects } from '@/components/home/LatestProjects';
import { LatestBlogs } from '@/components/home/LatestBlogs';
import { FeaturedProject } from '@/components/home/FeaturedProject';
import { getFeaturedProjects } from '@/data/projects';
import { getResumeData } from '@/data/resume';
import FakeTerminal from '@/components/home/FakeTerminal';

// ============================================
// Homepage
// ============================================

export default async function HomePage() {
  const [featuredProjects, resume] = await Promise.all([getFeaturedProjects(), getResumeData()]);

  return (
    <>
      <Hero />
      <LatestProjects />
      <LatestBlogs />

      {featuredProjects.length > 0 && (
        <section className="bg-bg-secondary py-8 md:py-12">
          <div className="container">
            <FeaturedProject project={featuredProjects[0]} />
          </div>
        </section>
      )}

      <FakeTerminal resume={resume} />
    </>
  );
}
