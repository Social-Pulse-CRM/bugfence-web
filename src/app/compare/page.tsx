import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/page-header';
import { Container } from '@/components/ui/container';
import { ButtonLink } from '@/components/ui/button';
import { Check, Shield, Cpu, Lock, Terminal, ExternalLink, HeartHandshake } from 'lucide-react';

export const metadata: Metadata = {
  title: 'How BugFence Compares to Sentry, Jam, & Marker.io',
  description: 'A transparent, respectful comparison of BugFence with Sentry, Jam, Marker.io, BugHerd, and LogRocket.',
  alternates: { canonical: '/compare/' },
  openGraph: {
    title: 'How BugFence Compares - Sentry, Jam, Marker.io, BugHerd',
    description: 'Respectful technical comparison: in-app widget vs extension, self-hosted VPC vs multi-tenant cloud.',
    url: '/compare/',
  },
};

const PILLARS = [
  {
    icon: Lock,
    title: 'Client-Side Redaction Before Upload',
    description: 'Sensitive card numbers, tokens, and PII are masked directly in the browser via DOMFence before the screenshot or replay payload is assembled.',
  },
  {
    icon: Shield,
    title: '100% Self-Hostable Private VPC',
    description: 'Your user data never enters a third-party multi-tenant cloud. Deploy via Docker with local JSON storage or PostgreSQL in your own environment.',
  },
  {
    icon: Terminal,
    title: 'No Browser Extension Required',
    description: 'Unlike extension-based tools, BugFence is an embedded TypeScript widget. Any customer, beta tester, or client can report bugs with zero installs.',
  },
  {
    icon: Cpu,
    title: 'Native MCP Server for AI Coding Agents',
    description: 'Deep developer context (symbolicated stack traces, failed fetch logs, reproduction steps) is queryable by Claude Code, Cursor, and Copilot via scoped MCP.',
  },
];

const COMPARISONS = [
  {
    name: 'Sentry',
    role: 'Exception Tracking & Observability',
    url: 'https://sentry.io/pricing/',
    strength: 'The gold standard for error monitoring, distributed tracing, and crash analytics across backend and frontend stacks.',
    difference: 'Sentry focuses on machine-captured unhandled exceptions. BugFence provides an in-app visual studio for user-reported UI defects, UX hitches, and logical bugs that do not throw exceptions. BugFence complements Sentry by automatically linking Sentry trace and replay IDs directly to the visual report.',
    relation: 'Complementary: BugFence connects directly with Sentry correlation IDs.',
  },
  {
    name: 'Jam.dev',
    role: 'Instant Bug Recording for Teams',
    url: 'https://jam.dev/pricing',
    strength: 'Exceptional developer UX for internal QA, rapid Chrome extension capture, and instant cloud sharing links.',
    difference: 'Jam requires every reporter to install a browser extension and stores recorded videos and telemetry in Jam\'s multi-tenant cloud. BugFence is a drop-in widget embedded in your app (zero reporter extension required), masks sensitive DOM elements before rasterization, and stores data entirely on your private infrastructure.',
    relation: 'Different deployment model: In-app widget vs. browser extension; self-hosted VPC vs. cloud.',
  },
  {
    name: 'Marker.io & BugHerd',
    role: 'Visual Feedback & Agency Review',
    url: 'https://marker.io/pricing',
    strength: 'Very intuitive on-screen annotation and two-way synchronization with Jira, Trello, and agency project boards.',
    difference: 'These tools are built primarily for agency-client visual design QA, frequently charging per-seat taxes and gating console logs or replay behind higher tiers. BugFence is built for software engineering teams: full technical diagnostics, DOM replay, source map symbolication, and issue grouping are included out of the box in the free Community tier.',
    relation: 'Specialized focus: Developer diagnostics and triage vs. agency visual markups.',
  },
  {
    name: 'LogRocket & FullStory',
    role: 'Full-Session Replay & Product Analytics',
    url: 'https://logrocket.com/pricing',
    strength: 'Enterprise-grade continuous session recording, funnel analysis, and conversion drop-off discovery.',
    difference: 'Full-session recorders passively record 100% of user traffic, which introduces significant data ingestion costs, heavy storage requirements, and privacy exposure. BugFence captures rolling 30-second DOM replay only on demand when a user explicitly initiates a bug report, and can deep-link to your existing LogRocket sessions.',
    relation: 'Complementary: On-demand bug triage vs. continuous full-session analytics.',
  },
];

const MATRIX_ROWS = [
  { feature: 'Primary Reporter Interface', bugfence: 'Drop-in In-App Widget', jam: 'Browser Extension', sentry: 'Error SDK / Mini Form', marker: 'Widget / Extension' },
  { feature: 'Requires Extension for Users?', bugfence: 'No (Zero-Install)', jam: 'Yes (Chrome/Edge)', sentry: 'No', marker: 'Depends on mode' },
  { feature: 'Browser-Side Sensitive Redaction', bugfence: 'Included (DOMFence)', jam: 'Post-upload controls', sentry: 'Data scrubbing', marker: 'Manual blur only' },
  { feature: 'Self-Hosted Private Deployment', bugfence: 'Full (Docker / Postgres)', jam: 'No (Cloud only)', sentry: 'Self-hosted available', marker: 'No (Cloud only)' },
  { feature: 'Offline Verification (No Phone-Home)', bugfence: 'Included (HMAC token)', jam: 'No', sentry: 'No', marker: 'No' },
  { feature: 'AI Coding Agent Access (MCP)', bugfence: 'Native MCP Server', jam: 'Web interface / AI summary', sentry: 'API / Dashboard', marker: 'No' },
  { feature: 'Technical Diagnostics in Free Tier', bugfence: 'Included (Console/Network)', jam: 'Limited volume', sentry: 'Free quota', marker: 'Higher tiers only' },
];

export default function ComparePage() {
  return (
    <>
      <PageHeader
        eyebrow="Comparative Overview"
        title="Where BugFence Fits in Your Toolchain"
        intro="We admire the tools that paved the way for modern web quality. Here is an honest, respectful look at what makes BugFence unique and where it complements your existing stack."
      />

      <Container className="py-14 space-y-20">
        {/* Core Pillars */}
        <section>
          <div className="mb-8 text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl text-fg">
              The Four Architectural Pillars of BugFence
            </h2>
            <p className="mt-2 text-sm text-muted">
              Built specifically for engineering teams with strict compliance, security, and developer triage requirements.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PILLARS.map((p) => {
              const Icon = p.icon;
              return (
                <div key={p.title} className="rounded-card border border-border bg-surface p-6 shadow-sm space-y-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="font-bold text-fg text-base">{p.title}</h3>
                  <p className="text-sm leading-relaxed text-muted">{p.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Detailed Competitor Breakdowns */}
        <section className="space-y-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-accent text-sm font-semibold">
              <HeartHandshake className="size-4" /> Respectful, Fair Perspective
            </div>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl text-fg">
              Tool-by-Tool Comparison
            </h2>
            <p className="mt-2 text-muted">
              Every tool in this ecosystem excels in specific domains. Here is how BugFence relates to each.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {COMPARISONS.map((c) => (
              <div key={c.name} className="flex flex-col justify-between rounded-card border border-border bg-surface p-8 space-y-6">
                <div>
                  <div className="flex items-baseline justify-between border-b border-border pb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-fg">{c.name}</h3>
                      <p className="text-xs font-medium text-accent mt-0.5">{c.role}</p>
                    </div>
                    <a
                      href={c.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-muted hover:text-fg underline decoration-border hover:decoration-fg"
                    >
                      <span>Official Pricing</span>
                      <ExternalLink className="size-3" />
                    </a>
                  </div>

                  <div className="mt-4 space-y-3 text-sm">
                    <div>
                      <p className="font-semibold text-fg/90">Where they excel:</p>
                      <p className="mt-1 text-muted leading-relaxed">{c.strength}</p>
                    </div>

                    <div>
                      <p className="font-semibold text-fg/90">How BugFence differs:</p>
                      <p className="mt-1 text-muted leading-relaxed">{c.difference}</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border border-accent/20 bg-accent/5 p-3 text-xs text-fg/90 font-medium">
                  {c.relation}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Comparison Matrix */}
        <section>
          <div className="mb-8 text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl text-fg">
              Feature & Architecture Matrix
            </h2>
            <p className="mt-2 text-sm text-muted">
              Direct comparison of technical fundamentals. Verified against public documentation.
            </p>
          </div>

          <div className="overflow-x-auto rounded-card border border-border bg-surface">
            <table className="w-full min-w-[700px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-border bg-elevated/70">
                  <th scope="col" className="p-4 font-semibold text-fg">Feature / Architecture</th>
                  <th scope="col" className="p-4 font-semibold text-accent">BugFence</th>
                  <th scope="col" className="p-4 font-semibold text-muted">Jam.dev</th>
                  <th scope="col" className="p-4 font-semibold text-muted">Sentry</th>
                  <th scope="col" className="p-4 font-semibold text-muted">Marker.io</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {MATRIX_ROWS.map((row) => (
                  <tr key={row.feature} className="hover:bg-elevated/20 transition-colors">
                    <td className="p-4 font-medium text-fg">{row.feature}</td>
                    <td className="p-4 font-semibold text-accent">{row.bugfence}</td>
                    <td className="p-4 text-muted">{row.jam}</td>
                    <td className="p-4 text-muted">{row.sentry}</td>
                    <td className="p-4 text-muted">{row.marker}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Bottom CTA */}
        <div className="rounded-card border border-border bg-elevated/50 p-8 text-center space-y-4">
          <h3 className="text-2xl font-bold text-fg">Want to evaluate BugFence on your own servers?</h3>
          <p className="max-w-xl mx-auto text-sm text-muted">
            The Community Edition is 100% free and self-hosted with Docker and PostgreSQL. No credit card required.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <ButtonLink href="/#install">Get Started with Community</ButtonLink>
            <ButtonLink href="/contact/" variant="secondary">Request Enterprise Consultation</ButtonLink>
          </div>
        </div>
      </Container>
    </>
  );
}
