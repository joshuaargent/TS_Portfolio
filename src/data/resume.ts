import { ResumeData } from '@/types';

// ============================================
// Resume Data - Update with your actual resume info
// ============================================

export const resumeData: ResumeData = {
  summary: `Year 13 student full stack developer exploring application security. Skilled in Next.js, TypeScript, and API driven applications.

  Looking for apprenticeships, and opportunities where I can contribute, learn fast, and help people.`,

  projects: [
    {
      id: '1',
      name: 'Personal Portfolio',
      description:
        "This website - I built it to showcase my work and skills. It pulls data from GitHub for maintainability.",
      techStack: [
        'Next.js',
        'React',
        'TypeScript',
        'GitHub API',
        'Vercel',
      ],
      url: 'https://github.com/joshuaargent/portfolio',
      highlights: [
        'Integrated GitHub API for real time data display',
        'Built with Next.js and TypeScript and hosted on Vercel',
      ],
    },
  ],

  skills: [
    { 
      category: 'Languages',
      items: ['TypeScript', 'JavaScript', 'HTML5', 'CSS3'] },
    { 
      category: 'Frontend',
      items: ['Next.js', 'React', 'Tailwind CSS', 'Zustand'] },
    { 
      category: 'Backend',
      items: ['Node.js', 'Nest.js', 'Express.js'] },
    { 
      category: 'Database & Auth',
      items: ['PostgreSQL', 'Supabase', 'JWT'] },
    { 
      category: 'Integrations',
      items: ['YouTube API', 'GitHub API'] },
    { 
      category: 'Deployment',
      items: ['Vercel', 'Render'] },
    { 
      category: 'Tools',
      items: ['Git', 'GitHub'] },  
  ],

  workExperience: [
    {
      id: '1',
      role: 'Lenovo Work Experience',
      company: 'Lenovo',
      location: 'Farnborough, United Kingdom',
      startDate: '2025-11',
      current: false,
      endDate: '2025-11',
      description:
        'Week long work experience shadowing different teams at Lenovo. Gained insight into how a large tech company operates and what to expect in a professional environment.',
      highlights: [
        'Led planning of a hypothetical event which we pitched to the team',
        'Observed professional workplace routines and communication standards',
        'Learned what to expect in a professional and productive environment',
      ],
      techStack: ['Communication', 'Leadership', 'Planning'],
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
      highlights: ['Computer Science', 'Mathematics', 'Geography'],
    },
    {
      id: '3',
      degree: 'GCSEs',
      institution: 'Collingwood College',
      location: 'Surrey, United Kingdom',
      startDate: '2020-09',
      endDate: '2025-07',
      highlights: [
        'Grade 8: Computer Science, Mathematics, Geography, Physics, Psychology',
        'Grade 7: Religious Studies, English Language',
        'Grade 6: Further Mathematics, English Literature, Business, Biology, Chemistry',
        'BTEC: Engineering Manufacture (Distinction D2)',
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
        "Worked at Crowthorne's local newsagents doing customer service and shop floor work. I helped customers find what they needed and kept shelves stocked and tidy.",
      highlights: [
        'Helped customers find what they needed accurately and efficiently',
        'Restocked shelves and kept the shop floor organised',
        "It's built reliability, punctuality, and time management skills",
      ],
      techStack: ['Customer Service', 'Time Management', 'Communication'],
    },
  ],

  additionalSkills: [
    'Reliable and punctual with consistent attendance',
    'Quick learner who adapts well to new tasks and systems',
    'Able to manage tasks independently and stay organised',
    'Clear communicator with customers, colleagues, and supervisors',
    'Logical and analytical approach to problem solving',
  ],

  certifications: [],
};

// ============================================
// Helper Functions
// ============================================

export async function getResumeData(): Promise<ResumeData> {
  return resumeData;
}
