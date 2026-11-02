import { BlogPost } from '@/types';

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

  {
    slug: 'building-cathoscroll',
    title: 'Building CathoScroll',
    excerpt:
      'How an idea I had one evening grew into a Catholic learning platform with profiles, comments, bookmarks, and progress tracking.',
    content: `
    <p>
      CathoScroll started with a pretty simple idea.
    </p>

    <p>
      I spend a lot of time reading about Catholic theology, Church history,
      apologetics, and Scripture. One thing I noticed was that there wasn't
      really a modern platform focused on helping people discover and learn
      about the faith in a simple way.
    </p>

    <p>
      Most Catholic resources are either websites packed with information,
      YouTube channels, podcasts, or books. Those resources are great, but I
      wondered what would happen if learning about Catholicism felt more like
      using a modern app than browsing a traditional website.
    </p>

    <h2>The First Version</h2>

    <p>
      The original version of CathoScroll was much smaller than what exists
      today. It was really just a feed of topics that users could swipe
      through.
    </p>

    <p>
      The goal was to make discovering content feel effortless. Instead of
      searching for something specific, users could open the app and start
      learning immediately.
    </p>

    <p>
      Looking back, that simple feed ended up becoming the foundation for
      everything else.
    </p>

    <h2>Adding Community Features</h2>

    <p>
      Once the feed was working, I started thinking about what would make the
      platform more useful.
    </p>

    <p>
      People don't just learn by reading. They ask questions, discuss ideas,
      and share perspectives.
    </p>

    <p>
      That led to features like comments, replies, likes, user profiles, and
      public activity. Users can now have conversations around topics rather
      than simply reading them.
    </p>

    <h2>Learning More About Full Stack Development</h2>

    <p>
      One of the things I've enjoyed most about CathoScroll is how many
      different areas of development it's touched.
    </p>

    <p>
      I've worked with authentication, databases, user profiles, permissions,
      comments, search, SEO, metadata, analytics, and various other features
      that you don't really encounter when building smaller projects.
    </p>

    <p>
      The project is built with Next.js, React, TypeScript, Supabase, and
      Tailwind CSS. It's definitely the most ambitious application I've built
      so far.
    </p>

    <h2>What Comes Next?</h2>

    <p>
      Right now my priority isn't building lots of premium features.
    </p>

    <p>
      The focus is simply making CathoScroll better.
    </p>

    <p>
      That means improving existing features, adding more topics, and growing
      the amount of educational content available on the platform.
    </p>

    <p>
      Longer term, I'd like to introduce audio versions of topics, structured
      learning paths, and quizzes to help people learn more effectively.
    </p>

    <p>
      But before any of that, I want to make sure the core experience is as
      good as it can be.
    </p>

    <h2>Final Thoughts</h2>

    <p>
      <a href="/projects/ts-cathoscroll">CathoScroll</a> combines several things I'm interested in: software
      development, product design, education, and theology.
    </p>

    <p>
      It's also been one of the most rewarding projects I've worked on because
      every new feature feels like it can genuinely help somebody learn
      something new.
    </p>

    <p>
      There's still plenty left to build, but it's already come a long way from
      the original idea.
    </p>
  `,
    publishedAt: '2026-11-02',
    tags: ['nextjs', 'typescript', 'supabase'],
    category: ['writeups'],
    readingTime: '4 min read',
    featured: true,
    coverImage: '/images/blog/cathoscroll.png',
  },
];

// ============================================
// Helper Functions
// ============================================

export async function getBlogPosts(): Promise<BlogPost[]> {
  return blogPosts.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  return blogPosts.find((p) => p.slug === slug);
}

export async function getFeaturedBlogPosts(): Promise<BlogPost[]> {
  return blogPosts
    .filter((p) => p.featured)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export async function getBlogPostsByTag(tag: string): Promise<BlogPost[]> {
  return blogPosts
    .filter((p) => p.tags.includes(tag))
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export async function getBlogPostsByCategory(category: string): Promise<BlogPost[]> {
  return blogPosts
    .filter((p) => p.category.includes(category as any))
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export async function getRecentBlogPosts(limit: number = 5): Promise<BlogPost[]> {
  return blogPosts
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit);
}
