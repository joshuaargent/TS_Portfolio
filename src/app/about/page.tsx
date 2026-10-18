import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  BookOpen,
  Code2,
  GraduationCap,
  ShieldCheck,
} from 'lucide-react';
import { PageHeader } from '@/components/layout/PageHeader';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { getResumeData } from '@/data/resume';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Meet Joshua Argent, a full stack developer building software and learning application security.',
};

const learningTopics = ['OWASP Top 10', 'PortSwigger Web Security Academy'];

export default async function AboutPage() {
  const resume = await getResumeData();
  const aLevels = resume.education.find((education) => education.degree === 'A Levels');
  const technicalSkills = resume.skills.filter((skill) =>
    ['Languages', 'Frontend', 'Backend', 'Database & Auth', 'Integrations', 'Deployment', 'Tools'].includes(
      skill.category
    )
  );

  return (
    <>
      <PageHeader
        title="About me"
        description="I build full stack web applications and I’m learning how to make them more secure."
        size="large"
      />

      <section className="pb-12 md:pb-16">
        <div className="container max-w-5xl space-y-16">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
            <div>
              <SectionHeading title="My path into development" />
              <div className="text-text-secondary mt-5 space-y-4 text-lg leading-relaxed">
                <p>
                  I got into web development during the summer holiday between Year 11 and Year 12.
                  This started as me being curious and quickly became something I  wanted to learn a
                  lot more about.
                </p>
                <p>
                  Since then, I’ve developed a foundation across the full stack, working with
                  TypeScript, React, Next.js, Node.js, and APIs. I enjoy turning an idea into
                  a useful product and understanding how its different parts fit together.
                </p>
                <p>
                  I’m currently in Year 13, studying{' '}
                  {aLevels?.highlights?.join(', ') ?? 'my A-levels'}, and building toward a career
                  in cyber security.
                </p>
              </div>
            </div>

            <Card className="bg-bg-secondary">
              <div className="flex items-center gap-3">
                <div className="bg-accent-light rounded-lg p-2.5">
                  <GraduationCap className="text-accent h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-text-muted text-sm">Currently</p>
                  <h2 className="text-text-primary font-semibold">Year 13 student</h2>
                </div>
              </div>
              <p className="text-text-secondary mt-4">
                {aLevels?.institution ?? 'Collingwood College'}
                {aLevels?.location ? ` · ${aLevels.location}` : ''}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {(aLevels?.highlights ?? []).map((subject) => (
                  <Badge key={subject} variant="default">
                    {subject}
                  </Badge>
                ))}
              </div>
              <p className="text-text-secondary mt-5 border-t border-border pt-4">
                After my A-levels, I’m aiming for a cyber security apprenticeship where I can keep
                learning and contribute to real teams.
              </p>
            </Card>
          </div>

          <div>
            <SectionHeading
              title="What I’m building"
              subtitle="My main development project right now is my school Computer Science project."
            />
            <Card className="mt-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <Code2 className="text-accent h-6 w-6" aria-hidden="true" />
                    <h3 className="text-text-primary text-xl font-semibold">
                      Social Media Scheduling Tool
                    </h3>
                  </div>
                  <p className="text-text-secondary mt-3 max-w-3xl leading-relaxed">
                    I’m actively developing a desktop social media scheduling tool using Electron
                    and Next.js. I want people to be able to use their own API keys, with the goal
                    of keeping the project free and open source.
                  </p>
                </div>
                <Badge variant="accent" className="w-fit shrink-0">
                  In progress
                </Badge>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {['Electron', 'Next.js', 'Social media APIs'].map((technology) => (
                  <Badge key={technology} variant="default">
                    {technology}
                  </Badge>
                ))}
              </div>
              <p className="text-text-muted mt-5 border-t border-border pt-4 text-sm">
                I’ll add more details as the project develops.
              </p>
            </Card>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <div className="flex items-center gap-3">
                <div className="bg-accent-light rounded-lg p-2.5">
                  <ShieldCheck className="text-accent h-5 w-5" aria-hidden="true" />
                </div>
                <h2 className="text-text-primary text-xl font-semibold">
                  Learning application security
                </h2>
              </div>
              <p className="text-text-secondary mt-4 leading-relaxed">
                I’m at the start of my AppSec journey. I’m learning about common web
                vulnerabilities and how to build software with security in mind. I’m also planning
                to work through PortSwigger Web Security Academy to put that learning into practice.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {learningTopics.map((topic) => (
                  <Badge key={topic} variant="accent">
                    {topic}
                  </Badge>
                ))}
              </div>
            </Card>

            <Card>
              <div className="flex items-center gap-3">
                <div className="bg-accent-light rounded-lg p-2.5">
                  <BookOpen className="text-accent h-5 w-5" aria-hidden="true" />
                </div>
                <h2 className="text-text-primary text-xl font-semibold">Away from the keyboard</h2>
              </div>
              <p className="text-text-secondary mt-4 leading-relaxed">
                I love reading and learning theology. Theology interests me deeply and give me something
                challenging to think about outside coding.
              </p>
            </Card>
          </div>

          <div>
            <SectionHeading
              title="The tools I use"
              subtitle="A selection of technologies from my full-stack development toolkit."
            />
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {technicalSkills.map((group) => (
                <Card key={group.category} padding="sm">
                  <h3 className="text-text-primary mb-3 font-semibold">{group.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((skill) => (
                      <Badge key={skill} variant="default">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {resume.workExperience.length > 0 && (
            <div>
              <SectionHeading
                title="Learning in the workplace"
                subtitle="Experiences that have helped me grow beyond writing code."
              />
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {resume.workExperience.map((experience) => (
                  <Card key={experience.id}>
                    <h3 className="text-text-primary font-semibold">
                      {experience.role} · {experience.company}
                    </h3>
                    <p className="text-text-secondary mt-2 leading-relaxed">
                      {experience.description}
                    </p>
                    {experience.highlights.length > 0 && (
                      <p className="text-text-muted mt-3 text-sm">
                        {experience.highlights[0]}
                      </p>
                    )}
                  </Card>
                ))}
              </div>
            </div>
          )}

          <Card className="bg-bg-secondary">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-text-primary text-2xl font-bold">
                  Let’s build something useful.
                </h2>
                <p className="text-text-secondary mt-2">
                  Take a look at what I’m working on or get in touch.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button asChild>
                  <Link href="/projects">
                    View projects
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/contact">Get in touch</Link>
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </>
  );
}
