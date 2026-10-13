import { BlogPost } from "@/types";

// ============================================
// Blog Posts Data - Add your blog posts here
// ============================================

export const blogPosts: BlogPost[] = [
  // ============================================
  // EXAMPLE - Copy this template to add a new blog post:
  // ============================================
  // {
  //   slug: "your-post-slug",
  //   title: "Your Post Title",
  //   excerpt: "A short summary of your post (1-2 sentences).",
  //   content: `
  //     <p>Write your introduction here in HTML.</p>
  //     <h2>Section Heading</h2>
  //     <p>Your content goes here.</p>
  //     <ul>
  //       <li>List item 1</li>
  //       <li>List item 2</li>
  //     </ul>
  //   `,
  //   publishedAt: "2025-01-01",  // Format: YYYY-MM-DD
  //   tags: ["tag1", "tag2"],
  //   category: ["category1", "category2"],
  //   readingTime: "5 min read",
  //   featured: false,
  //   coverImage: "/images/blog/your-image.jpg",
  // },
];

// ============================================
// Helper Functions
// ============================================

export async function getBlogPosts(): Promise<BlogPost[]> {
  return blogPosts.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

export async function getBlogPostBySlug(
  slug: string,
): Promise<BlogPost | undefined> {
  return blogPosts.find((p) => p.slug === slug);
}

export async function getFeaturedBlogPosts(): Promise<BlogPost[]> {
  return blogPosts
    .filter((p) => p.featured)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
}

export async function getBlogPostsByTag(tag: string): Promise<BlogPost[]> {
  return blogPosts
    .filter((p) => p.tags.includes(tag))
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
}

export async function getBlogPostsByCategory(
  category: string,
): Promise<BlogPost[]> {
  return blogPosts
    .filter((p) => p.category.includes(category as any))
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
}

export async function getRecentBlogPosts(
  limit: number = 5,
): Promise<BlogPost[]> {
  return blogPosts
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    )
    .slice(0, limit);
}
