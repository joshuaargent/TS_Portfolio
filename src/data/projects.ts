import { Project } from '@/types';
import { getGitHubRepos } from '@/lib/github';

export async function getProjects(): Promise<Project[]> {
  const repos = await getGitHubRepos();

  return repos.map((repo) => ({
    slug: repo.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    name: repo.name.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
    description: repo.description,
    longDescription: `<p>${repo.description}</p>`,
    techStack: repo.topics.length > 0 ? repo.topics : repo.language ? [repo.language] : [],
    liveUrl: repo.homepage || undefined,
    repoUrl: repo.url,
    screenshots: [],
    featured: repo.stars > 10,
    tags: repo.topics,
    stars: repo.stars,
    language: repo.language,
    updatedAt: repo.updatedAt,
    createdAt: repo.createdAt,
  }));
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  const projects = await getProjects();
  return projects.find((p) => p.slug === slug);
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const projects = await getProjects();
  return projects.filter((p) => p.featured);
}
