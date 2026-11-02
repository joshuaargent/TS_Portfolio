import { ResumeData } from '@/types';

// ============================================
// Resume Data - Update with your actual resume info
// ============================================

export const resumeData: ResumeData = {
  summary: `Year 13 student and full stack developer with experience building modern web applications using Next.js, React, TypeScript, and Supabase.

I'm particularly interested in application security and enjoy taking projects from idea to deployment. Currently seeking a cyber security apprenticeship where I can continue learning while contributing to real-world projects.`,

  projects: [
    {
      id: '1',
      name: 'CathoScroll',
      description:
        'A Catholic learning platform featuring educational topics, community discussion, public profiles, bookmarks, progress tracking, categories, and search.',
      techStack: [
        'TypeScript',
        'Next.js',
        'React',
        'Tailwind CSS',
        'Supabase',
        'PostgreSQL',
        'Vercel',
      ],
      url: 'https://github.com/joshuaargent/TS_CathoScroll',
      highlights: [
        'Designed and developed a full stack educational platform from scratch',
        'Implemented authentication, user profiles, comments, replies, likes, and bookmarks',
        'Built search, categories, progress tracking, and public profile functionality',
        'Implemented SEO features including metadata, sitemap generation, robots.txt, and structured content pages',
      ],
    },

    {
      id: '2',
      name: 'Personal Portfolio',
      description: 'My personal website for showcasing projects, writing, and technical interests.',
      techStack: ['TypeScript', 'Next.js', 'React', 'Tailwind CSS', 'GitHub API', 'Vercel'],
      url: 'https://github.com/joshuaargent/TS_Portfolio',
      highlights: [
        'Integrated GitHub API for repository information',
        'Built blog, resume, project showcase, and contact pages',
        'Implemented sitemap, RSS feed, metadata, and responsive design',
      ],
    },

    {
      id: '3',
      name: 'Social Media Scheduling Tool',
      description:
        'Desktop application being developed for my Computer Science project, designed to help users schedule content across multiple platforms using their own API keys.',
      techStack: ['Electron', 'Next.js', 'TypeScript'],
      highlights: [
        'Designed as a desktop application using Electron',
        'Focused on providing a free and accessible scheduling solution',
        'Currently under active development',
      ],
    },
  ],

  skills: [
    {
      category: 'Languages',
      items: ['TypeScript', 'JavaScript', 'HTML5', 'CSS3'],
    },
    {
      category: 'Frontend',
      items: ['Next.js', 'React', 'Tailwind CSS'],
    },
    {
      category: 'Backend',
      items: ['Node.js', 'Server Actions', 'API Routes'],
    },
    {
      category: 'Database & Auth',
      items: ['PostgreSQL', 'Supabase', 'Authentication'],
    },
    {
      category: 'Integrations',
      items: ['GitHub API', 'Supabase'],
    },
    {
      category: 'Deployment',
      items: ['Vercel'],
    },
    {
      category: 'Tools',
      items: ['Git', 'GitHub', 'VS Code'],
    },
  ],

  workExperience: [
    {
      id: '1',
      role: 'Work Experience Student',
      company: 'Lenovo',
      location: 'Farnborough, United Kingdom',
      startDate: '2025-11',
      current: false,
      endDate: '2025-11',
      description:
        'Completed a week of work experience across multiple teams at Lenovo, gaining insight into how a large technology company operates and delivers products and services.',
      highlights: [
        'Worked with students to plan and pitch a hypothetical event to Lenovo staff',
        'Observed how different business and technical teams collaborate',
        'Developed communication, teamwork, and presentation skills',
      ],
      techStack: ['Communication', 'Teamwork', 'Presentation'],
    },
  ],

  education: [
    {
      id: '1',
      degree: 'A Levels',
      institution: 'Collingwood College',
      location: 'Surrey, United Kingdom',
      startDate: '2025-09',
      endDate: '2027-07',
      highlights: [
        'Computer Science: A (Predicted)',
        'Mathematics: C (Predicted)',
        'Geography: A (Predicted)',
      ],
    },

    {
      id: '2',
      degree: 'GCSEs',
      institution: 'Collingwood College',
      location: 'Surrey, United Kingdom',
      startDate: '2020-09',
      endDate: '2025-07',
      highlights: [
        'Grade 8: Computer Science, Mathematics, Geography, Physics, Psychology',
        'Grade 7: Religious Studies, English Language',
        'Grade 6: Further Mathematics, English Literature, Business, Biology, Chemistry',
        'BTEC Engineering Manufacture: Distinction (D2)',
      ],
    },
  ],

  employment: [
    {
      id: '1',
      role: 'Shelf Stocker / Store Assistant',
      company: 'Local Newsagents',
      location: 'Crowthorne, United Kingdom',
      startDate: '2022-09',
      endDate: '2023-09',
      current: false,
      description:
        'Provided customer service and maintained stock levels in a busy local newsagents.',
      highlights: [
        'Assisted customers and answered queries',
        'Restocked shelves and maintained shop presentation',
        'Developed communication and time management skills',
      ],
      techStack: ['Customer Service', 'Communication', 'Time Management'],
    },
  ],

  certifications: [],
};

// ============================================
// Helper Functions
// ============================================

export async function getResumeData(): Promise<ResumeData> {
  return resumeData;
}
