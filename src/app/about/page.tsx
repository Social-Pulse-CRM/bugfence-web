import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/page-header';
import { Container } from '@/components/ui/container';
import { ButtonLink } from '@/components/ui/button';
import { ShieldCheck, EyeOff, Bot, Server } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About BugFence',
  description: 'The story and engineering philosophy behind BugFence: privacy-first visual bug reporting for B2B SaaS.',
  alternates: { canonical: '/about/' },
  openGraph: {
    title: 'About BugFence - Privacy-First Visual Bug Reporting',
    description: 'The story and engineering philosophy behind BugFence: privacy-first visual bug reporting for B2B SaaS.',
    url: '/about/',
  },
};

export default function AboutPage() {
  const principles = [
    {
      icon: EyeOff,
      title: 'Privacy by Construction',
      desc: 'Bug reports are essential, but unredacted screenshots and full session replay frequently leak JWTs, payment card details, and personal data. We believe privacy must be enforced in the browser before data leaves the user’s device.',
    },
    {
      icon: ShieldCheck,
      title: 'Zero Extension Friction',
      desc: 'Internal QA can install browser extensions, but enterprise customers and external clients cannot. BugFence is a zero-dependency script and React component running inside Shadow DOM with zero styling collisions.',
    },
    {
      icon: Bot,
      title: 'Designed for the AI Agent Era',
      desc: 'Bug fixing is no longer just a manual human chore. BugFence provides Model Context Protocol (MCP) tooling and a CLI so AI coding agents (Claude Code, Cursor, Copilot) can directly inspect symbolicated traces and patch regressions.',
    },
    {
      icon: Server,
      title: 'Data Sovereignty & Self-Hosting',
      desc: 'Regulated engineering teams should never be forced to send core diagnostic dumps to multi-tenant third-party clouds. BugFence is 100% self-hostable with offline cryptographic enterprise licensing.',
    },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Mission & Engineering Philosophy"
        title="Why We Built BugFence"
        intro="Software teams need real diagnostic evidence to fix bugs fast. But traditional tools either leak sensitive user data or demand heavy browser extensions. We built BugFence to eliminate that compromise."
      />

      <Container narrow className="py-14 space-y-12">
        <section className="space-y-4 text-fg/90 leading-relaxed text-base">
          <p>
            Every software developer has received a bug report that reads: <em className="text-muted">&quot;The checkout page is broken.&quot;</em> No screenshot, no console error, no network status code, no reproduction steps.
          </p>
          <p>
            When teams attempt to solve this with screen recording or session replays, they hit a severe compliance and security barrier: modern web applications display authentication tokens, customer credit card digits, and confidential business data. Sending raw screen recordings or unredacted DOM dumps to third-party clouds creates catastrophic compliance risk.
          </p>
          <p>
            BugFence was designed from day one to bridge this gap: an intuitive in-app Reporting Studio with annotated screenshots, recordings, and DOM replay, coupled with strict in-browser DOM fencing that redacts credentials before upload.
          </p>
        </section>

        {/* Core Principles */}
        <section className="space-y-6 pt-4 border-t border-border">
          <h2 className="text-2xl font-bold tracking-tight text-fg">Our Core Engineering Principles</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {principles.map((p) => {
              const Icon = p.icon;
              return (
                <div key={p.title} className="rounded-card border border-border bg-surface p-6 space-y-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="font-bold text-fg">{p.title}</h3>
                  <p className="text-xs leading-relaxed text-muted">{p.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-card border border-border bg-elevated/40 p-8 text-center space-y-4">
          <h3 className="text-xl font-bold text-fg">Explore BugFence Today</h3>
          <p className="text-sm text-muted">
            Test the live redaction demo, explore our self-hosted quickstart, or read our security whitepaper.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <ButtonLink href="/#demo">Try Live Redaction Demo</ButtonLink>
            <ButtonLink href="/pricing/" variant="secondary">View Pricing & Editions</ButtonLink>
          </div>
        </section>
      </Container>
    </>
  );
}
