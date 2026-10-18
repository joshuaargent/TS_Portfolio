<div align="center">

# Joshua Argent

### Full stack developer exploring application security

Building useful web applications, sharing what I learn, and growing toward a career in cyber
security.

[![Portfolio](https://img.shields.io/badge/Portfolio-joshuaargent.vercel.app-0D9488?style=for-the-badge&logo=vercel&logoColor=white)](https://joshuaargent.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-joshuaargent-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/joshuaargent)

<br />

![Next.js 16](https://img.shields.io/badge/Next.js-16-000000?logo=next.js&logoColor=white)
![React 19](https://img.shields.io/badge/React-19-149ECA?logo=react&logoColor=white)
![TypeScript 5](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS 4](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)

</div>

---

## About this project

This is my personal portfolio: a place to present the things I build, document what I’m learning,
and give people a way to get to know me. I started learning web development during the summer
between Year 11 and Year 12. I now work across the full stack and am beginning to explore
application security as a future career direction.

The site is built with Next.js, React, and TypeScript. It combines project data from GitHub with
blog posts and resume information maintained in the codebase.

## What you’ll find here

- **Projects** - GitHub repositories, project descriptions, technologies, and repository details.
- **Writing** - blog posts with categories, tags, individual post pages, and an archive.
- **About and resume** - background, skills, education, and experience.
- **Interactive terminal** - an alternative way to explore selected resume information from the
  homepage.
- **Contact** - social links and an optional Formspree contact form.
- **Feed and discoverability** - generated sitemap, robots rules, and RSS feed.
- **Responsive design** - a consistent interface with light and dark themes.

## Built with

| Area                   | Technology                          |
| ---------------------- | ----------------------------------- |
| Framework              | Next.js 16 · App Router             |
| UI                     | React 19                            |
| Language               | TypeScript 5                        |
| Styling                | Tailwind CSS 4                      |
| UI icons               | Lucide React                        |
| Interactive navigation | Framer Motion                       |
| Markdown parsing       | Marked                              |
| Date formatting        | date-fns                            |
| Analytics              | Vercel Analytics and Speed Insights |
| Code quality           | ESLint and Prettier                 |

## Run locally

### Requirements

- Node.js 20 or newer
- npm

### Setup

```bash
git clone https://github.com/joshuaargent/TS_Portfolio.git
cd TS_Portfolio
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Configuration

Integrations are optional. Add only the variables you need to `.env.local` in the project root:

| Variable                        | Purpose                                                                                               |
| ------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `GITHUB_USERNAME`               | GitHub account whose repositories are displayed.                                                      |
| `GITHUB_TOKEN`                  | Optional token to increase GitHub API rate limits.                                                    |
| `NEXT_PUBLIC_SITE_URL`          | Canonical site URL used for metadata, sitemap, and RSS links. Defaults to the deployed portfolio URL. |
| `NEXT_PUBLIC_FORMSPREE_FORM_ID` | Optional Formspree form ID to enable contact form submissions.                                        |

Example:

```dotenv
GITHUB_USERNAME=your-github-username
GITHUB_TOKEN=your-github-token
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_FORMSPREE_FORM_ID=your-form-id
```

Never commit secrets or local environment files. `.env` and `.env*.local` are ignored by Git.

## Project scripts

| Command                | Description                       |
| ---------------------- | --------------------------------- |
| `npm run dev`          | Start the development server.     |
| `npm run build`        | Create a production build.        |
| `npm run start`        | Run the production build locally. |
| `npm run lint`         | Check the code with ESLint.       |
| `npm run lint:fix`     | Apply automatic ESLint fixes.     |
| `npm run type-check`   | Check TypeScript types.           |
| `npm run format`       | Format files with Prettier.       |
| `npm run format:check` | Check Prettier formatting.        |

VS Code workspace settings enable Prettier formatting on save when the Prettier extension is
installed.

## Where things live

```text
.
├── public/                 # Static assets and site icons
└── src/
    ├── app/                # Pages, routes, and metadata endpoints
    ├── components/         # Page sections and reusable UI
    ├── data/               # Blog, project, and resume data
    ├── lib/                # GitHub integration and shared utilities
    └── types/              # Shared TypeScript types
```

### Updating content

- Blog posts: `src/data/blog.ts`
- Resume, skills, education, and experience: `src/data/resume.ts`
- Site details and social links: `src/lib/constants.ts`
- Projects: configure `GITHUB_USERNAME`; project cards are populated from the GitHub API.

## Deployment

The site is deployed on [Vercel](https://vercel.com) and can also be hosted on platforms that
support Next.js. Set the relevant environment variables in your deployment settings before building.

## License

This repository does not currently include a license. All rights are reserved unless the author
grants permission; please contact me before reusing or redistributing the code.

---

<div align="center">

Made by [Joshua Argent](https://joshuaargent.vercel.app)

</div>
