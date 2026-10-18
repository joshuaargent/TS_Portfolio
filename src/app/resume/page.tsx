import { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { getResumeData } from '@/data/resume';
import { formatDate } from '@/lib/utils';
import {
  Download,
  ExternalLink,
  Mail,
  MapPin,
  Calendar,
  Briefcase,
  GraduationCap,
  Code,
  Heart,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Resume',
  description: 'My professional experience, education, and skills.',
};

export default async function ResumePage() {
  const resume = await getResumeData();

  return (
    <>
      <PageHeader
        title="Resume"
        description="My professional experience, education, and skills."
      >
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button
            asChild
            size="lg"
            style={{ backgroundColor: '#0D9488', color: '#ffffff' }}
            className="hover:opacity-90"
          >
            <a href="/Joshua_Argent_CV.pdf" download>
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </a>
          </Button>
          <Button
            asChild
            size="lg"
            className="border-border text-text-primary hover:bg-bg-secondary inline-flex items-center justify-center gap-2 rounded-lg border bg-transparent px-7 text-lg font-medium transition-all duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            <Link href="/contact">
              <Mail className="mr-2 h-4 w-4" />
              Contact Me
            </Link>
          </Button>
        </div>
      </PageHeader>

      <section className="pb-12 md:pb-16">
        <div className="container max-w-4xl">
          <div className="space-y-12">
            <div>
              <h2 className="text-text-primary mb-4 flex items-center gap-2 text-2xl font-bold">
                <Heart className="text-accent h-5 w-5" />
                Summary
              </h2>
              <Card>
                <p className="text-text-secondary leading-relaxed whitespace-pre-line">
                  {resume.summary}
                </p>
              </Card>
            </div>

            <div>
              <h2 className="text-text-primary mb-6 flex items-center gap-2 text-2xl font-bold">
                <Code className="text-accent h-5 w-5" />
                Projects
              </h2>
              <div className="space-y-6">
                {resume.projects &&
                  resume.projects.map((project) => (
                    <Card key={project.id}>
                      <div className="mb-3 flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                        <div>
                          <h3 className="text-text-primary text-xl font-semibold">
                            {project.name}
                          </h3>
                          <p className="text-text-secondary">{project.description}</p>
                        </div>
                        {project.url && (
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-accent hover:text-accent-hover flex items-center gap-1 text-sm"
                          >
                            <ExternalLink className="h-4 w-4" />
                            View Code
                          </a>
                        )}
                      </div>
                      {project.techStack && project.techStack.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {project.techStack.map((tech) => (
                            <Badge key={tech} variant="default" size="sm">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      )}
                      {project.highlights && project.highlights.length > 0 && (
                        <ul className="mt-3 space-y-1">
                          {project.highlights.map((highlight, index) => (
                            <li
                              key={index}
                              className="text-text-secondary flex items-start gap-2 text-sm"
                            >
                              <span className="text-accent mt-1">•</span>
                              {highlight}
                            </li>
                          ))}
                        </ul>
                      )}
                    </Card>
                  ))}
              </div>
            </div>

            <div>
              <h2 className="text-text-primary mb-6 flex items-center gap-2 text-2xl font-bold">
                <Code className="text-accent h-5 w-5" />
                Skills
              </h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {resume.skills.map((skillGroup) => (
                  <Card key={skillGroup.category}>
                    <h3 className="text-text-primary mb-3 font-semibold">{skillGroup.category}</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {skillGroup.items.map((skill) => (
                        <Badge key={skill} variant="default" size="sm">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-text-primary mb-6 flex items-center gap-2 text-2xl font-bold">
                <Briefcase className="text-accent h-5 w-5" />
                Work Experience
              </h2>
              <div className="space-y-6">
                {resume.workExperience.map((exp) => (
                  <Card key={exp.id}>
                    <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                      <div>
                        <h3 className="text-text-primary text-xl font-semibold">{exp.role}</h3>
                        <p className="text-accent font-medium">{exp.company}</p>
                      </div>
                      <div className="text-text-muted text-left text-sm md:text-right">
                        <p className="flex items-center gap-1 md:justify-end">
                          <Calendar className="h-4 w-4" />
                          {formatDate(exp.startDate, 'MMM yyyy')} -{' '}
                          {exp.current ? 'Present' : formatDate(exp.endDate!, 'MMM yyyy')}
                        </p>
                        <p className="flex items-center gap-1 md:justify-end">
                          <MapPin className="h-4 w-4" />
                          {exp.location}
                        </p>
                      </div>
                    </div>

                    <p className="text-text-secondary mb-4">{exp.description}</p>

                    {exp.highlights && exp.highlights.length > 0 && (
                      <>
                        <h4 className="text-text-primary mb-2 text-sm font-semibold tracking-wider uppercase">
                          What I learned
                        </h4>
                        <ul className="space-y-2">
                          {exp.highlights.map((highlight, index) => (
                            <li
                              key={index}
                              className="text-text-secondary flex items-start gap-2 text-sm"
                            >
                              <span className="text-accent mt-1">•</span>
                              {highlight}
                            </li>
                          ))}
                        </ul>
                      </>
                    )}

                    {exp.techStack && exp.techStack.length > 0 && (
                      <div className="border-border mt-4 border-t pt-4">
                        <div className="flex flex-wrap gap-1.5">
                          {exp.techStack.map((tech) => (
                            <Badge key={tech} variant="default" size="sm">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-text-primary mb-6 flex items-center gap-2 text-2xl font-bold">
                <GraduationCap className="text-accent h-5 w-5" />
                Education
              </h2>
              <div className="space-y-6">
                {resume.education.map((edu) => (
                  <Card key={edu.id}>
                    <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                      <div>
                        <h3 className="text-text-primary text-xl font-semibold">{edu.degree}</h3>
                        <p className="text-accent font-medium">{edu.institution}</p>
                      </div>
                      <div className="text-text-muted text-left text-sm md:text-right">
                        <p className="flex items-center gap-1 md:justify-end">
                          <Calendar className="h-4 w-4" />
                          {formatDate(edu.startDate, 'MMM yyyy')} -{' '}
                          {formatDate(edu.endDate, 'MMM yyyy')}
                        </p>
                        <p className="flex items-center gap-1 md:justify-end">
                          <MapPin className="h-4 w-4" />
                          {edu.location}
                        </p>
                        {edu.gpa && <p>GPA: {edu.gpa}</p>}
                      </div>
                    </div>

                    {edu.highlights && (
                      <ul className="space-y-2">
                        {edu.highlights.map((highlight, index) => (
                          <li
                            key={index}
                            className="text-text-secondary flex items-start gap-2 text-sm"
                          >
                            <span className="text-accent mt-1">•</span>
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    )}
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-text-primary mb-6 flex items-center gap-2 text-2xl font-bold">
                <Briefcase className="text-accent h-5 w-5" />
                Employment
              </h2>
              <div className="space-y-6">
                {resume.employment.map((exp) => (
                  <Card key={exp.id}>
                    <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                      <div>
                        <h3 className="text-text-primary text-xl font-semibold">{exp.role}</h3>
                        <p className="text-accent font-medium">{exp.company}</p>
                      </div>
                      <div className="text-text-muted text-left text-sm md:text-right">
                        <p className="flex items-center gap-1 md:justify-end">
                          <Calendar className="h-4 w-4" />
                          {formatDate(exp.startDate, 'MMM yyyy')} -{' '}
                          {exp.current ? 'Present' : formatDate(exp.endDate!, 'MMM yyyy')}
                        </p>
                        <p className="flex items-center gap-1 md:justify-end">
                          <MapPin className="h-4 w-4" />
                          {exp.location}
                        </p>
                      </div>
                    </div>

                    <p className="text-text-secondary mb-4">{exp.description}</p>

                    {exp.highlights && exp.highlights.length > 0 && (
                      <>
                        <h4 className="text-text-primary mb-2 text-sm font-semibold tracking-wider uppercase">
                          What I learned
                        </h4>
                        <ul className="space-y-2">
                          {exp.highlights.map((highlight, index) => (
                            <li
                              key={index}
                              className="text-text-secondary flex items-start gap-2 text-sm"
                            >
                              <span className="text-accent mt-1">•</span>
                              {highlight}
                            </li>
                          ))}
                        </ul>
                      </>
                    )}

                    {exp.techStack && exp.techStack.length > 0 && (
                      <div className="border-border mt-4 border-t pt-4">
                        <div className="flex flex-wrap gap-1.5">
                          {exp.techStack.map((tech) => (
                            <Badge key={tech} variant="default" size="sm">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </div>

            <div className="text-center">
              <Card className="bg-accent-light">
                <h2 className="text-text-primary mb-2 text-2xl font-bold">
                  Interested in working together?
                </h2>
                <p className="text-text-secondary mx-auto mb-6 max-w-md">
                  I'm always open to opportunities and to help where possible.
                </p>
                <Button
                  size="lg"
                  asChild
                  style={{ backgroundColor: '#0D9488', color: '#ffffff' }}
                  className="hover:opacity-90"
                >
                  <Link href="/contact">
                    <Mail className="mr-2 h-4 w-4" />
                    Get in Touch
                  </Link>
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
