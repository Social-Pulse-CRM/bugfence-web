import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/page-header';
import { Container } from '@/components/ui/container';

export const metadata: Metadata = { title: 'Compare', alternates: { canonical: '/compare' } };

// Qualitative only. No competitor prices are shown until verified from their own pricing pages.
const UNIQUE = [
  'Redacts in the browser before upload',
  'Self-hostable, with an offline-verified licence',
  'No extension needed for reporters',
  'MCP server and CLI for coding agents',
];

const ROWS = [
  { name: 'Sentry', url: 'https://sentry.io/pricing/', note: 'Excellent error monitoring; User Feedback ties reports to errors and replays. BugFence pairs well with it and links Sentry event and replay ids.' },
  { name: 'Jam', url: 'https://jam.dev/pricing', note: 'Very fast capture and sharing, centred on a browser extension and a hosted cloud. BugFence is an embeddable widget you can self-host.' },
  { name: 'Marker.io', url: 'https://marker.io/pricing', note: 'Polished client feedback with two-way sync to project tools. BugFence focuses on privacy controls and developer triage.' },
  { name: 'BugHerd', url: 'https://bugherd.com/pricing', note: 'Intuitive on-page review for agencies. BugFence adds technical diagnostics and grouping.' },
  { name: 'Userback', url: 'https://www.userback.io/pricing/', note: 'A broad product-feedback suite. BugFence is narrower: bug reports and triage.' },
  { name: 'LogRocket and FullStory', url: 'https://logrocket.com/pricing', note: 'Mature session replay and analytics. BugFence collects user-submitted reports, and links to their session URLs.' },
];

export default function ComparePage() {
  return (
    <>
      <PageHeader eyebrow="Compare" title="Where BugFence fits" intro="These are all good tools. Here is how we think about the differences. Check each vendor's site for current features and pricing." />
      <Container className="py-12">
        <div className="mb-10 grid gap-4 sm:grid-cols-2">
          {UNIQUE.map((u) => (
            <p key={u} className="rounded-card border border-border bg-surface p-4 text-sm"><span aria-hidden="true" className="mr-2 text-accent">✓</span>{u}</p>
          ))}
        </div>
        <ul className="divide-y divide-border rounded-card border border-border">
          {ROWS.map((r) => (
            <li key={r.name} className="p-5">
              <h2 className="font-semibold">{r.name}</h2>
              <p className="mt-1 text-sm text-muted">{r.note}</p>
              <a className="mt-2 inline-block text-sm text-accent underline" href={r.url} target="_blank" rel="noopener noreferrer">{r.name} pricing and details</a>
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
}
