import { marked } from 'marked';

// Configure marked for GitHub-flavored markdown
marked.setOptions({
  gfm: true,
  breaks: true,
});

/**
 * Parse markdown string to HTML
 */
export function parseMarkdown(markdown: string): string {
  return marked.parse(markdown) as string;
}