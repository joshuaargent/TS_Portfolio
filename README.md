# Joshua Argent | Portfolio

A personal portfolio showcasing my full stack development work, projects, writing, and current
learning. Built with Next.js, React, and TypeScript.

## About the project

The site brings together:

- **Homepage** — introduction, recently updated GitHub projects, latest blog posts, a featured
  project, and an interactive terminal that explores information from my CV.
- **Projects** — GitHub repositories, project details, technology tags, and repository statistics.
- **Blog** — posts, categories, tags, and an archive.
- **About and resume** — my background, skills, education, experience, and career interests.
- **Contact** — contact details and an optional Formspree powered form.
- **Site metadata** — sitemap, robots rules, and an RSS feed.

Project listings are retrieved from the GitHub API. Blog posts and resume information are maintained
in the source data files.

## Technology

| Area                           | Tools                                 |
| ------------------------------ | ------------------------------------- |
| Framework                      | Next.js 16 with the App Router        |
| Language                       | TypeScript                            |
| UI                             | React 19                              |
| Styling                        | Tailwind CSS 4                        |
| Icons                          | Lucide React                          |
| Markdown and code highlighting | Marked, MDX Remote, Shiki, Rehype     |
| Analytics                      | Vercel Analytics and Speed Insights   |
| Testing                        | Vitest, Testing Library, and jsdom    |
| Formatting                     | Prettier with the Tailwind CSS plugin |
| Linting                        | ESLint                                |

## Getting started

### Requirements

- Node.js 20 or later
- npm

### Install

```bash
git clone https://github.com/joshuaargent/TS_Portfolio.git
cd TS_Portfolio
npm install
```

Create a `.env.local` file in the project root for any integrations you want to enable (see
[Environment variables](#environment-variables)).

### Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

All integrations are optional for local development. Set the following variables in `.env.local` as
needed:

| Variable                        | Purpose                                                                                                 |
| ------------------------------- | ------------------------------------------------------------------------------------------------------- |
| `GITHUB_USERNAME`               | GitHub account used to load repositories. Without it, the project list is empty.                        |
| `GITHUB_TOKEN`                  | Optional GitHub personal access token for higher API rate limits.                                       |
| `NEXT_PUBLIC_SITE_URL`          | Canonical site URL used in metadata, the sitemap, and RSS feed. Defaults to the deployed portfolio URL. |
| `NEXT_PUBLIC_FORMSPREE_FORM_ID` | Optional Formspree form ID that enables contact form submissions.                                       |

Example:

```dotenv
GITHUB_USERNAME=your-github-username
GITHUB_TOKEN=your-github-token
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_FORMSPREE_FORM_ID=your-form-id
```

Do not commit `.env.local` or private tokens. The repository's `.gitignore` excludes local
environment files.

## Useful commands

| Command                | Description                                         |
| ---------------------- | --------------------------------------------------- |
| `npm run dev`          | Start the development server.                       |
| `npm run build`        | Create a production build.                          |
| `npm run start`        | Serve the production build.                         |
| `npm run lint`         | Run ESLint.                                         |
| `npm run lint:fix`     | Automatically fix supported lint issues.            |
| `npm run type-check`   | Run the TypeScript compiler without emitting files. |
| `npm run format`       | Format project files with Prettier.                 |
| `npm run format:check` | Check formatting without changing files.            |
| `npm run test`         | Run Vitest in watch mode.                           |
| `npm run test:run`     | Run Vitest once.                                    |

VS Code workspace settings enable format-on-save with the Prettier extension.

## Project structure

```text
.
├── public/                 # Static assets and site icons
└── src/
    ├── app/                # Next.js routes and metadata endpoints
    │   ├── about/
    │   ├── blog/
    │   ├── contact/
    │   ├── projects/
    │   └── resume/
    ├── components/         # Page, layout, and reusable UI components
    │   ├── blog/
    │   ├── home/
    │   ├── layout/
    │   ├── projects/
    │   ├── shared/
    │   └── ui/
    ├── data/               # Blog, project, and resume data access
    ├── lib/                # GitHub integration, formatting, and utilities
    └── types/              # Shared TypeScript types
```

### Updating site content

- Add or edit blog entries in `src/data/blog.ts`.
- Edit resume, skills, education, and experience in `src/data/resume.ts`.
- Project cards are populated from the configured GitHub account. Project detail pages are available
  for the repositories returned by the GitHub integration.
- Update site details, social links, and the default canonical URL in `src/lib/constants.ts`.

## Deployment

The site can be deployed to Vercel or another platform that supports Next.js. Configure the
environment variables required for your chosen integrations in the deployment environment before
building.

## License

No license is currently specified for this repository. Contact the author before reusing or
redistributing its code.
