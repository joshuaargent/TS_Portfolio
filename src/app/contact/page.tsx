import { Metadata } from 'next';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { siteConfig } from '@/lib/constants';
import { Mail, MapPin, Send } from 'lucide-react';

const personalInfo = {
  email: siteConfig.links.email,
  location: 'Surrey, United Kingdom',
};

const socialLinks = {
  youtube: siteConfig.links.youtube,
  github: siteConfig.links.github,
  instagram: siteConfig.links.instagram,
  facebook: siteConfig.links.facebook,
  linkedin: siteConfig.links.linkedin,
  tiktok: siteConfig.links.tiktok,
};

const FORMSPREE_FORM_ID = process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID;

export const metadata: Metadata = {
  title: 'Contact',
  description: "Get in touch. I'd love to hear from you.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Contact"
        description="I'd love to hear from you. Whether it's a question, collaboration idea, or just to say hi."
      />

      <section className="pb-12 md:pb-16">
        <div className="container max-w-4xl">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Card>
                <h2 className="text-text-primary mb-6 text-xl font-semibold">Send a Message</h2>
                {FORMSPREE_FORM_ID ? (
                  <form
                    action={`https://formspree.io/f/${FORMSPREE_FORM_ID}`}
                    method="POST"
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <Input
                        label="Name"
                        name="name"
                        type="text"
                        placeholder="Your name"
                        required
                      />
                      <Input
                        label="Email"
                        name="email"
                        type="email"
                        placeholder="your@email.com"
                        required
                      />
                    </div>

                    <Input
                      label="Subject"
                      name="subject"
                      type="text"
                      placeholder="What's this about?"
                      required
                    />

                    <Textarea
                      label="Message"
                      name="message"
                      placeholder="Your message..."
                      rows={6}
                      required
                    />

                    <Button type="submit" size="lg" className="w-full" style={{ color: '#ffffff' }}>
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </Button>
                  </form>
                ) : (
                  <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-yellow-800">
                    <p className="font-medium">Contact form not configured</p>
                    <p className="mt-1 text-sm">
                      To enable the contact form, add your Formspree form ID to the environment
                      variable{' '}
                      <code className="rounded bg-yellow-100 px-1 py-0.5">
                        NEXT_PUBLIC_FORMSPREE_FORM_ID
                      </code>
                      .<br />
                      Create a form at{' '}
                      <a
                        href="https://formspree.io"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline"
                      >
                        formspree.io
                      </a>
                    </p>
                    <div className="mt-4">
                      <a
                        href={`mailto:${personalInfo.email}`}
                        className="text-accent hover:text-accent-hover inline-flex items-center gap-2"
                      >
                        <Mail className="h-4 w-4" />
                        {personalInfo.email}
                      </a>
                    </div>
                  </div>
                )}
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <h3 className="text-text-primary mb-4 font-semibold">Email</h3>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="text-text-secondary hover:text-accent flex items-center gap-3 transition-colors"
                >
                  <Mail className="h-5 w-5" />
                  {personalInfo.email}
                </a>
              </Card>

              <Card>
                <h3 className="text-text-primary mb-4 font-semibold">Location</h3>
                <div className="text-text-secondary flex items-center gap-3">
                  <MapPin className="h-5 w-5" />
                  {personalInfo.location}
                </div>
              </Card>

              <Card>
                <h3 className="text-text-primary mb-4 font-semibold">Connect</h3>
                <div className="space-y-3">
      
                  <a
                    href={socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:bg-bg-secondary flex items-center gap-3 rounded-lg p-2 transition-colors"
                  >
                    <svg className="text-text-primary h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        fill="currentColor"
                        d="M12 .9a11.1 11.1 0 0 0-3.5 21.6c.5.1.7-.2.7-.5v-1.9c-2.9.6-3.5-1.2-3.5-1.2-.5-1.2-1.2-1.6-1.2-1.6-.9-.6.1-.6.1-.6 1 .1 1.6 1.1 1.6 1.1.9 1.5 2.4 1.1 3 .9.1-.7.4-1.1.7-1.3-2.2-.3-4.6-1.2-4.6-5.5 0-1.2.4-2.2 1.1-3-.1-.3-.5-1.4.1-2.9 0 0 .9-.3 3 1.1a10.6 10.6 0 0 1 5.6 0c2.1-1.4 3-1.1 3-1.1.6 1.5.2 2.6.1 2.9.7.8 1.1 1.8 1.1 3 0 4.3-2.4 5.2-4.7 5.5.4.3.7.9.7 1.8v2.6c0 .3.2.6.7.5A11.1 11.1 0 0 0 12 .9Z"
                      />
                    </svg>
                    <div>
                      <p className="text-text-primary text-sm font-medium">GitHub</p>
                      <p className="text-text-muted text-xs">@joshuaargent</p>
                    </div>
                  </a>

                  <a
                    href={socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:bg-bg-secondary flex items-center gap-3 rounded-lg p-2 transition-colors"
                  >
                    <svg className="text-text-primary h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.3V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                    </svg>
                    <div>
                      <p className="text-text-primary text-sm font-medium">LinkedIn</p>
                      <p className="text-text-muted text-xs">Joshua Argent</p>
                    </div>
                  </a>

                  <a
                    href={socialLinks.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:bg-bg-secondary flex items-center gap-3 rounded-lg p-2 transition-colors"
                  >
                    <svg className="h-5 w-5 text-red-500" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        fill="currentColor"
                        d="M21.6 7.2a2.8 2.8 0 0 0-2-2C17.9 4.8 12 4.8 12 4.8s-5.9 0-7.6.4a2.8 2.8 0 0 0-2 2A29.7 29.7 0 0 0 2 12a29.7 29.7 0 0 0 .4 4.8 2.8 2.8 0 0 0 2 2c1.7.4 7.6.4 7.6.4s5.9 0 7.6-.4a2.8 2.8 0 0 0 2-2A29.7 29.7 0 0 0 22 12a29.7 29.7 0 0 0-.4-4.8ZM10 15.5v-7l6 3.5-6 3.5Z"
                      />
                    </svg>
                    <div>
                      <p className="text-text-primary text-sm font-medium">YouTube</p>
                      <p className="text-text-muted text-xs">@joshua_argent</p>
                    </div>
                  </a>

                  <a
                    href={socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:bg-bg-secondary flex items-center gap-3 rounded-lg p-2 transition-colors"
                  >
                    <svg className="h-5 w-5 text-pink-500" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        fill="currentColor"
                        d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3.2A4.8 4.8 0 1 1 7.2 12 4.8 4.8 0 0 1 12 7.2Zm0 2A2.8 2.8 0 1 0 14.8 12 2.8 2.8 0 0 0 12 9.2Zm5.2-3.4a1.1 1.1 0 1 1-1.1 1.1 1.1 1.1 0 0 1 1.1-1.1Z"
                      />
                    </svg>
                    <div>
                      <p className="text-text-primary text-sm font-medium">Instagram</p>
                      <p className="text-text-muted text-xs">@joshua_argent</p>
                    </div>
                  </a>

                  <a
                    href={socialLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:bg-bg-secondary flex items-center gap-3 rounded-lg p-2 transition-colors"
                  >
                    <svg className="h-5 w-5 text-blue-600" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        fill="currentColor"
                        d="M13.5 22v-8h2.8l.4-3.2h-3.2V7.3c0-.9.3-1.6 1.6-1.6H17V2.7c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.4v2.8H8v3.2h2.3v8h3.2Z"
                      />
                    </svg>
                    <div>
                      <p className="text-text-primary text-sm font-medium">Facebook</p>
                      <p className="text-text-muted text-xs">@joshua_argent</p>
                    </div>
                  </a>

                  <a
                    href={socialLinks.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:bg-bg-secondary flex items-center gap-3 rounded-lg p-2 transition-colors"
                  >
                    <svg className="text-text-primary h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.234V2h-3.12v13.761c0 1.648-1.372 2.99-3.058 2.99-1.685 0-3.057-1.342-3.057-2.99 0-1.647 1.372-2.989 3.057-2.989.311 0 .611.045.895.128V9.727a6.177 6.177 0 0 0-.895-.066C6.53 9.661 4 12.136 4 15.18c0 3.045 2.53 5.52 5.641 5.52 3.111 0 5.641-2.475 5.641-5.52V8.237a7.936 7.936 0 0 0 4.718 1.537V6.686h-.411z" />
                    </svg>
                    <div>
                      <p className="text-text-primary text-sm font-medium">TikTok</p>
                      <p className="text-text-muted text-xs">@joshua_argent</p>
                    </div>
                  </a>

                </div>
              </Card>

              <Card className="bg-accent-light">
                <h3 className="text-text-primary mb-2 font-semibold">Response Time</h3>
                <p className="text-text-secondary text-sm">
                  I typically respond within 24-48 hours. For urgent matters, reach out via
                  Instagram DM.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
