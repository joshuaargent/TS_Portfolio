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
    slug: 'building-offline-first-native-apps',
    title: 'Building Offline First Native Apps: Bringing CathoScroll Beyond the Browser',
    excerpt:
      'Taking CathoScroll beyond the browser meant solving a different engineering problem: making content and user activity available offline, then synchronising changes reliably when connectivity returns. Here is how I approached local storage, incremental updates, and native data synchronisation.',
    content: `
    <p>
      Most applications are built around the assumption that an internet
      connection is available. Data is requested from a server, displayed
      to the user, and updated when another request is made. This works
      perfectly well until the connection disappears.
    </p>

    <p>
      As I started developing native versions of <a
      href="/projects/ts-cathoscroll">CathoScroll</a>, I wanted the experience
      to be more resilient. Users should be able to open the app, browse
      published content, search the catalogue, and access previously stored
      personal data without needing to make a network request every time.
    </p>

    <p>
      That meant moving beyond simply wrapping the existing website in a
      native application. I needed a local data layer, a reliable way to
      update it, and a synchronisation system that could handle interrupted
      connections without losing user activity.
    </p>

    <p>
      The result is an offline capable architecture shared by the Android
      and Electron desktop applications, with Supabase remaining the online
      source of truth.
    </p>

    <h2>Moving beyond the browser</h2>

    <p>
      The website and native applications have different requirements.
      The website remains server rendered and relies on Supabase for its
      content and account operations. Native applications, however, can
      maintain local databases and use them as the primary source for
      supported offline features.
    </p>

    <p>
      I used Capacitor for the native application layer, with Android and
      Electron as the initial targets. Both applications use the same
      exported content catalogue and account synchronisation approach.
    </p>

    <p>
      The important architectural decision was to separate public content
      from private account data. They have different security requirements,
      update patterns, and failure cases, so treating them as one database
      would have made the system harder to maintain.
    </p>

    <h2>Building a local catalogue</h2>

    <p>
      The first part was making the published content available locally.
      Instead of depending on a remote request for every feed or topic
      screen, the native applications bundle a local SQLite catalogue.
      This allows users to browse topics, categories, and the feed without
      an active connection.
    </p>

    <p>
      I also added local substring search across the saved catalogue.
      When connected, the application can use the website's ranked
      Supabase search. When offline, it can still search the content
      already stored on the device. The two approaches are deliberately
      different: local search provides availability, while online search
      provides the more sophisticated ranking.
    </p>

    <p>
      Getting the initial catalogue onto a device safely was just as
      important as reading it. The native build process exports the
      published content using the public Supabase configuration. Before
      accepting the export, it checks the server side counts and revision.
      The resulting database is also checked using its checksum and
      SQLite integrity validation.
    </p>

    <p>
      This prevents an incomplete or inconsistent export from silently
      becoming the catalogue packaged into a native build.
    </p>

    <h2>Keeping the catalogue up to date</h2>

    <p>
      Bundling a catalogue solves the initial offline problem, but it
      introduces another one: how do you keep local content up to date
      without repeatedly downloading everything?
    </p>

    <p>
      I implemented incremental catalogue updates. Rather than replacing
      the entire database whenever content changes, the application can
      retrieve the changes since its previous update and apply them
      locally.
    </p>

    <p>
      These updates are staged before being published to the active
      catalogue. This matters because an interrupted update should not
      leave the application with half of the old catalogue and half of
      the new one. If the update history has expired, or a reset is
      required, the application can fall back to a checked full snapshot.
    </p>

    <p>
      The previous catalogue remains available until the replacement
      has been prepared successfully. This makes catalogue updates
      considerably safer when connections are unreliable.
    </p>

    <h2>Separating and protecting user data</h2>

    <p>
      Public content is only one part of the application. Users also
      have personal data such as bookmarks, completed topics, notes,
      and other activity that needs to remain available across sessions.
    </p>

    <p>
      I implemented a separate encrypted account activity database for
      this information. This keeps private user data separate from the
      public content catalogue and gives it its own synchronisation
      lifecycle.
    </p>

    <p>
      Native authentication also needed to account for platform security.
      Android uses secure storage backed by Android Keystore, while the
      Electron application uses operating system secure storage. Encryption
      keys are device specific and are not included in Android backups.
    </p>

    <p>
      This is an important distinction: storing data locally is not enough.
      Private data needs appropriate protection, and the application must
      account for what happens when a device is upgraded, restored, or
      replaced.
    </p>

    <h2>Synchronising activity reliably</h2>

    <p>
      The more difficult problem was synchronisation. A user might complete
      a topic while offline, close the application, reopen it later, and
      expect that activity to appear in their account once they reconnect.
      Simply sending a request whenever an action happens is not reliable
      enough.
    </p>

    <p>
      Instead, activity is stored locally and synchronised when a
      connection is available. The system supports bootstrapping account
      activity, transferring pending changes, and processing server
      acknowledgements.
    </p>

    <p>
      Receipts and device sequence acknowledgements are particularly
      important. They allow the client to identify which changes the
      server has accepted and safely discard older acknowledged work.
      Without this, a client could repeatedly send already-processed
      activity or lose track of which changes still need to be uploaded.
    </p>

    <p>
      I also had to account for rejected changes. For example, a topic
      might no longer be available when an offline action is eventually
      synchronised. That rejection is retained and reported rather than
      being allowed to block every subsequent activity update.
    </p>

    <p>
      Network timeouts and interrupted requests are another part of the
      problem. The client needs to be able to retry later without treating
      an uncertain network response as proof that an operation failed
      permanently.
    </p>

    <h2>Offline does not mean every feature works offline</h2>

    <p>
      One important part of building this properly was being explicit
      about the boundaries. Offline support is not a single switch that
      makes every feature available without a connection.
    </p>

    <p>
      The published catalogue, feed browsing, category browsing, and
      local search are available offline. Previously fetched discussions
      and comment counts can also be read, although that information may
      be incomplete or stale.
    </p>

    <p>
      Account operations have different requirements. Signing in,
      signing up, and changing profile details require connectivity.
      Comment creation and other comment writes remain online only.
      Notes can be read offline after being cached, but editing them
      requires the latest note to have been loaded online.
    </p>

    <p>
      Notifications have their own local behaviour too. The latest
      notifications and unread count are stored locally, and read state
      changes made offline can be queued for synchronisation later.
    </p>

    <p>
      Being clear about these limitations is important. A reliable
      offline application should communicate what is available, what
      is waiting to synchronise, and what still requires a connection.
    </p>

    <h2>Building for reliability, not just connectivity</h2>

    <p>
      A lot of the work was not in making the happy path function. It
      was in handling the situations where something goes wrong:
      incomplete catalogue exports, expired update history, interrupted
      synchronisation, rejected activity, database initialisation
      failures, and existing data that must survive an application
      upgrade.
    </p>

    <p>
      I expanded the automated tests around database initialisation,
      migrations, catalogue handling, and synchronisation behaviour.
      These are particularly important areas because a bug in local
      persistence can be much more damaging than a normal failed
      network request.
    </p>

    <p>
      I also updated the native build and packaging workflows so that
      Android and Electron receive a fresh catalogue when required.
      This is an important distinction from the website deployment:
      publishing a new website version does not automatically update
      the interface and bundled data inside an already installed
      native application.
    </p>

    <h2>What comes next?</h2>

    <p>
      This work has given CathoScroll a much stronger foundation for
      native applications. The goal is no longer simply to make the
      website accessible through Android and desktop packaging. The
      native applications now have their own local data layer and
      synchronisation behaviour.
    </p>

    <p>
      There is still more to verify, particularly around real device
      upgrades, reconnection behaviour, and packaged desktop releases
      across different operating systems. Offline systems need to be
      tested in the conditions they are designed to handle, not just
      in a development environment with a reliable connection.
    </p>

    <p>
      The biggest lesson from this work is that offline capability is
      fundamentally a data consistency problem. Caching content is
      relatively straightforward. Making local data trustworthy,
      protecting private information, and reconciling changes safely
      when connectivity returns is where most of the engineering
      complexity lies.
    </p>

    <p>
      <a href="/projects/ts-cathoscroll">CathoScroll</a> is continuing
      to evolve, and this offline architecture is an important step
      towards making its native applications more reliable and
      independent of a constant internet connection.
    </p>

    <p>
      The project is available on
      <a href="https://github.com/joshuaargent/TS_CathoScroll"
      target="_blank" rel="noopener noreferrer">GitHub</a>.
    </p>
  `,
    publishedAt: '2026-11-14',
    tags: [
      'typescript',
      'react',
      'capacitor',
      'sqlite',
      'supabase',
      'offline-first',
      'electron',
      'android',
    ],
    category: ['writeups'],
    readingTime: '8 min read',
    featured: true,
    coverImage: '/images/blog/cathoscroll-offline-architecture.png',
  },
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
