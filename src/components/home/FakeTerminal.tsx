'use client';

import { useCallback, useEffect, useMemo, useRef, useState, type KeyboardEvent } from 'react';
import { RotateCcw } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { SectionHeading } from '@/components/shared/SectionHeading';
import type { ResumeData } from '@/types';

interface TerminalLine {
  type: 'input' | 'output' | 'error';
  text: string;
}

interface CommandResult {
  lines: TerminalLine[];
  clear?: boolean;
  exit?: boolean;
}

const COMMANDS = [
  'help',
  'whoami',
  'about',
  'skills',
  'experience',
  'education',
  'projects',
  'contact',
  'ls',
  'cat',
  'pwd',
  'date',
  'echo',
  'clear',
  'exit',
];

function buildFiles(resume: ResumeData): Record<string, string[]> {
  const files: Record<string, string[]> = {
    'README.md': [
      '# Joshua Argent | Developer',
      '',
      'Type "help" to explore this interactive portfolio.',
    ],
    'about.txt': resume.summary.split('\n').map((line) => line.trim()).filter(Boolean),
    'skills.txt': resume.skills.flatMap((group) => [
      `${group.category}:`,
      `  ${group.items.join(', ')}`,
      '',
    ]),
    'experience.txt': [...resume.workExperience, ...resume.employment].flatMap((job) => [
      `${job.role} — ${job.company}`,
      `${job.startDate} to ${job.current ? 'Present' : job.endDate ?? 'Earlier'} | ${job.location}`,
      job.description,
      ...job.highlights.map((highlight) => `  • ${highlight}`),
      '',
    ]),
    'education.txt': resume.education.flatMap((item) => [
      `${item.degree} — ${item.institution}`,
      `${item.startDate} to ${item.endDate} | ${item.location}`,
      ...(item.highlights ?? []).map((highlight) => `  • ${highlight}`),
      '',
    ]),
    'projects.txt': (resume.projects ?? []).flatMap((project) => [
      `${project.name}`,
      project.description,
      `Stack: ${project.techStack.join(', ')}`,
      ...project.highlights.map((highlight) => `  • ${highlight}`),
      ...(project.url ? [`Code: ${project.url}`] : []),
      '',
    ]),
  };

  return files;
}

function outputLines(text: string | string[]): TerminalLine[] {
  return (Array.isArray(text) ? text : text.split('\n')).map((line) => ({
    type: 'output',
    text: line,
  }));
}

function runCommand(raw: string, resume: ResumeData, files: Record<string, string[]>): CommandResult {
  const [command, ...args] = raw.trim().split(/\s+/);
  const argument = args.join(' ');

  switch (command.toLowerCase()) {
    case 'help':
      return {
        lines: outputLines([
          'Explore Joshua’s portfolio:',
          '  whoami       who is behind this portfolio',
          '  about        developer summary',
          '  skills       languages, frameworks, and tools',
          '  experience   work experience and employment',
          '  education    current and past study',
          '  projects     selected project details',
          '  contact      how to get in touch',
          '  ls           list portfolio files',
          '  cat <file>   read a portfolio file',
          '  echo <text>  print a message',
          '  date         show the current date',
          '  clear        clear the screen',
          '  exit         end this session',
          '',
          'Tip: use ↑ and ↓ for command history, or Tab to complete commands.',
        ]),
      };
    case 'whoami':
      return {
        lines: outputLines(`Joshua Argent — ${resume.summary.split('\n')[0].trim()}`),
      };
    case 'about':
      return { lines: outputLines(files['about.txt']) };
    case 'skills':
      return { lines: outputLines(files['skills.txt']) };
    case 'experience':
      return { lines: outputLines(files['experience.txt']) };
    case 'education':
      return { lines: outputLines(files['education.txt']) };
    case 'projects':
      return {
        lines: resume.projects?.length
          ? outputLines(files['projects.txt'])
          : outputLines('No projects are listed in the profile yet.'),
      };
    case 'contact':
      return {
        lines: outputLines([
          'Open /contact to get in touch.',
        ]),
      };
    case 'ls':
      return { lines: outputLines(Object.keys(files).join('  ')) };
    case 'cat': {
      if (!args[0]) {
        return { lines: [{ type: 'error', text: 'usage: cat <file>' }] };
      }
      const contents = files[args[0]];
      return contents
        ? { lines: outputLines(contents) }
        : { lines: [{ type: 'error', text: `cat: ${args[0]}: No such file` }] };
    }
    case 'pwd':
      return { lines: outputLines('/home/joshua/portfolio') };
    case 'date':
      return { lines: outputLines(new Date().toLocaleString()) };
    case 'echo':
      return { lines: outputLines(argument) };
    case 'clear':
      return { lines: [], clear: true };
    case 'exit':
      return { lines: outputLines('Session ended. Use the restart button to explore again.'), exit: true };
    default:
      return {
        lines: [{ type: 'error', text: `command not found: ${command}. Type "help" to see available commands.` }],
      };
  }
}

export default function FakeTerminal({ resume }: { resume: ResumeData }) {
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: 'output', text: 'Welcome to Joshua’s portfolio terminal.' },
    { type: 'output', text: 'Type "help" to explore skills, projects, and experience.' },
  ]);
  const [input, setInput] = useState('');
  const [exited, setExited] = useState(false);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const historyRef = useRef<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalBodyRef = useRef<HTMLDivElement>(null);
  const hasMountedRef = useRef(false);
  const files = useMemo(() => buildFiles(resume), [resume]);

  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }

    const terminalBody = terminalBodyRef.current;
    if (terminalBody) {
      terminalBody.scrollTop = terminalBody.scrollHeight;
    }
  }, [lines]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.ctrlKey && event.key.toLowerCase() === 'c') {
        event.preventDefault();
        setInput('');
        return;
      }
      if (event.ctrlKey && event.key.toLowerCase() === 'l') {
        event.preventDefault();
        setLines([]);
        return;
      }

      if (event.key === 'Tab') {
        event.preventDefault();
        const tokens = input.split(/\s+/);
        const partial = tokens.at(-1) ?? '';
        const candidates =
          tokens[0] === 'cat' && tokens.length > 1
            ? Object.keys(files)
            : tokens.length === 1
              ? COMMANDS
              : [];
        const matches = candidates.filter((candidate) => candidate.startsWith(partial));

        if (matches.length === 1) {
          tokens[tokens.length - 1] = matches[0];
          setInput(tokens.join(' '));
        } else if (matches.length > 1) {
          setLines((current) => [
            ...current,
            ...outputLines(matches.join('  ')),
          ]);
        }
        return;
      }

      if (event.key === 'ArrowUp') {
        event.preventDefault();
        if (historyRef.current.length === 0) return;
        const nextIndex = Math.min(historyIndex + 1, historyRef.current.length - 1);
        setHistoryIndex(nextIndex);
        setInput(historyRef.current[historyRef.current.length - 1 - nextIndex]);
        return;
      }
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        if (historyIndex <= 0) {
          setHistoryIndex(-1);
          setInput('');
          return;
        }
        const nextIndex = historyIndex - 1;
        setHistoryIndex(nextIndex);
        setInput(historyRef.current[historyRef.current.length - 1 - nextIndex]);
        return;
      }

      if (event.key !== 'Enter') return;
      const raw = input.trim();
      if (!raw) return;

      historyRef.current = [...historyRef.current, raw].slice(-50);
      const result = runCommand(raw, resume, files);
      if (result.clear) {
        setLines([]);
      } else {
        setLines((current) => [...current, { type: 'input', text: raw }, ...result.lines]);
      }
      setExited(Boolean(result.exit));
      setInput('');
      setHistoryIndex(-1);
    },
    [files, historyIndex, input, resume]
  );

  const restart = () => {
    setLines([
      { type: 'output', text: 'Welcome to Joshua’s portfolio terminal.' },
      { type: 'output', text: 'Type "help" to explore skills, projects, and experience.' },
    ]);
    setInput('');
    setExited(false);
    setHistoryIndex(-1);
    historyRef.current = [];
    requestAnimationFrame(() => inputRef.current?.focus());
  };

  return (
    <section className="py-8 md:py-12">
      <div className="container">
        <SectionHeading
          title="Explore in the terminal"
          subtitle="A hands-on way to explore my background. Try commands like skills, projects, or experience."
        />

        <Card padding="none" className="mt-6 w-full overflow-hidden font-mono text-sm leading-relaxed">
          <div className="flex items-center gap-2 border-b border-border bg-bg-secondary px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400" aria-hidden="true" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400" aria-hidden="true" />
            <span className="h-2.5 w-2.5 rounded-full bg-accent" aria-hidden="true" />
            <span className="ml-2 text-xs text-text-muted">joshua@portfolio: ~</span>
            <span className="ml-auto rounded-full bg-accent-light px-2 py-0.5 text-xs font-medium text-accent">
              interactive
            </span>
          </div>

          <div
            ref={terminalBodyRef}
            className="h-80 cursor-text overflow-y-auto bg-bg-card p-4 text-text-secondary sm:p-5"
            onClick={() => !exited && inputRef.current?.focus()}
            role="log"
            aria-label="Interactive portfolio terminal"
            aria-live="polite"
          >
            {lines.map((line, index) => (
              <div
                key={`${index}-${line.text}`}
                className={`whitespace-pre-wrap break-words ${
                  line.type === 'error'
                    ? 'text-red-600 dark:text-red-400'
                    : line.type === 'input'
                      ? 'text-text-primary'
                      : 'text-text-secondary'
                }`}
              >
                {line.type === 'input' ? (
                  <>
                    <span className="font-semibold text-accent">joshua@portfolio</span>
                    <span className="text-text-muted">:~$ </span>
                    {line.text}
                  </>
                ) : (
                  line.text
                )}
              </div>
            ))}

            {!exited && (
              <div className="flex items-center">
                <label htmlFor="portfolio-terminal-input" className="shrink-0">
                  <span className="font-semibold text-accent">joshua@portfolio</span>
                  <span className="text-text-muted">:~$ </span>
                </label>
                <input
                  id="portfolio-terminal-input"
                  ref={inputRef}
                  value={input}
                  onChange={(event) => {
                    setInput(event.target.value);
                    setHistoryIndex(-1);
                  }}
                  onKeyDown={handleKeyDown}
                  autoComplete="off"
                  autoCapitalize="off"
                  spellCheck={false}
                  aria-label="Enter a terminal command"
                  className="min-w-0 flex-1 bg-transparent text-text-primary caret-accent outline-none ring-0 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
                  style={{ outline: 'none', boxShadow: 'none' }}
                />
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border bg-bg-secondary px-4 py-3 text-xs text-text-muted">
            <span>
              {exited ? 'Session closed' : '↑/↓ history · Tab autocomplete · Ctrl+L clear'}
            </span>
            {exited && (
              <button
                type="button"
                onClick={restart}
                className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 font-medium text-accent transition-colors hover:bg-bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                Restart session
              </button>
            )}
          </div>
        </Card>
      </div>
    </section>
  );
}
