import { GitHubRepo } from '@/types';
import { parseMarkdown } from './markdown';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_USERNAME = process.env.GITHUB_USERNAME;
const BASE_URL = 'https://api.github.com';

export async function getGitHubRepos(): Promise<GitHubRepo[]> {
  if (!GITHUB_USERNAME) {
    return [];
  }

  try {
    const headers: HeadersInit = {
      Accept: 'application/vnd.github.v3+json',
    };

    if (GITHUB_TOKEN) {
      headers.Authorization = `token ${GITHUB_TOKEN}`;
    }

    const repos: any[] = [];
    let page = 1;
    let hasNextPage = true;

    // Paginate through all pages (GitHub returns max 100 per page)
    while (hasNextPage) {
      const response = await fetch(
        `${BASE_URL}/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100&page=${page}&type=owner`,
        {
          headers,
          next: { revalidate: 3600 },
        }
      );

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }

      const data = await response.json();
      
      if (!data.length || data.length === 0) {
        hasNextPage = false;
      } else {
        repos.push(...data);
        page++;
        // Safety limit to prevent infinite loops
        if (page > 10) {
          hasNextPage = false;
        }
      }
    }

    return repos
      .filter((repo: any) => !repo.fork)
      .map((repo: any) => ({
        id: repo.id,
        name: repo.name,
        fullName: repo.full_name,
        description: repo.description || repo.name,
        url: repo.html_url,
        homepage: repo.homepage || undefined,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        language: repo.language || undefined,
        topics: repo.topics || [],
        createdAt: repo.created_at,
        updatedAt: repo.updated_at,
        isFork: repo.fork,
      }));
  } catch (error) {
    // Fail silently - return empty array for graceful degradation
    return [];
  }
}

export async function getGitHubProfile() {
  if (!GITHUB_USERNAME) return null;

  try {
    const headers: HeadersInit = {
      Accept: 'application/vnd.github.v3+json',
    };

    if (GITHUB_TOKEN) {
      headers.Authorization = `token ${GITHUB_TOKEN}`;
    }

    const response = await fetch(`${BASE_URL}/users/${GITHUB_USERNAME}`, {
      headers,
      next: { revalidate: 86400 },
    });

    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);

    return await response.json();
  } catch (error) {
    // Fail silently
    return null;
  }
}

export async function getGitHubReadme(owner: string, repo: string): Promise<string | null> {
  const headers: HeadersInit = {
    Accept: 'application/vnd.github.v3+json',
  };

  if (GITHUB_TOKEN) {
    headers.Authorization = `token ${GITHUB_TOKEN}`;
  }

  try {
    const response = await fetch(`${BASE_URL}/repos/${owner}/${repo}/readme`, {
      headers,
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      return null;
    }

    // Get the response text first to check if it's actually HTML
    const responseText = await response.text();
    
    // Check if we got HTML instead of JSON (rate limiting or error pages)
    if (responseText.trim().startsWith('<')) {
      return null;
    }

    // Parse as JSON
    let data: { content?: string; encoding?: string };
    try {
      data = JSON.parse(responseText);
    } catch {
      return null;
    }

    if (!data.content) {
      return null;
    }

    // GitHub API returns content in base64 encoding, need to decode it
    let readmeContent = data.content;
    if (data.encoding === 'base64') {
      readmeContent = Buffer.from(readmeContent, 'base64').toString('utf-8');
    }
    
    // Convert markdown to HTML for display
    const readmeHtml = parseMarkdown(readmeContent);
    
    return readmeHtml;
  } catch (error) {
    // Fail silently
    return null;
  }
}
