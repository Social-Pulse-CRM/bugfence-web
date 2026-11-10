import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/page-header';
import { Section } from '@/components/ui/section';
import { Card } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import { ButtonLink } from '@/components/ui/button';
import { SECURITY } from '@/content/security';
import {
  Shield,
  ShieldAlert,
  ShieldCheck,
  Lock,
  Server,
  FileCode,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Terminal,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Security Architecture & Privacy Guarantees',
  description: 'Technical breakdown of BugFence privacy model: browser-side DOMFence masking, offline licensing, self-hosted VPC storage, and honest limitations.',
  alternates: { canonical: '/security' },
};

export default function SecurityPage() {
  const pipeline = [
    {
      step: '01',
      title: 'DOM Masking',
      desc: 'Passwords, credit card forms, and elements with data-bugfence-mask are masked prior to canvas rasterization.',
    },
    {
      step: '02',
      title: 'Pattern Scrubbing',
      desc: 'Regex engine scrubs JWTs, Bearer tokens, API secret keys, emails, SSNs, and Luhn-valid card numbers from URLs and headers.',
    },
    {
      step: '03',
      title: 'Reporter Consent',
      desc: 'The user reviews a live Privacy Check showing replaced values and can toggle console, network, video, and replay on or off.',
    },
    {
      step: '04',
      title: 'VPC Ingestion',
      desc: 'Encrypted transfer directly to your self-hosted API. Replay payloads are re-scrubbed server-side and stored in your database.',
    },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Security Whitepaper & Privacy Architecture"
        title="Honest About What We Protect. And What We Don't."
        intro="BugFence is architected so sensitive data is neutralized before it ever leaves the reporter's browser. Below is our exact security model, cryptography, and transparent technical boundaries."
      />

      <Container className="py-14 space-y-16">
        {/* Architecture Pipeline Visual */}
        <section className="space-y-6">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-accent">Data Ingestion Pipeline</p>
            <h2 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl text-fg">
              How Data Flows From Browser to Your Private VPC
            </h2>
            <p className="mt-2 text-sm text-muted">
              Unlike cloud recording services, raw unmasked DOM snapshots are never transmitted over the wire.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-4">
            {pipeline.map((p) => (
              <div
                key={p.step}
                className="relative rounded-card border border-border bg-surface p-6 shadow-sm space-y-3"
              >
                <span className="font-mono text-xl font-black text-accent">{p.step}</span>
                <h3 className="font-bold text-fg text-base">{p.title}</h3>
                <p className="text-xs leading-relaxed text-muted">{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Protection Columns */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* What a report can contain */}
          <Card className="p-8 space-y-6">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <FileCode className="size-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-fg">Telemetry & Context Collected</h3>
                <p className="text-xs text-muted">Payload elements assembled by the widget</p>
              </div>
            </div>

            <ul className="space-y-3 text-sm text-fg/90">
              {SECURITY.collected.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="size-4 text-accent mt-0.5 shrink-0" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* How it is protected */}
          <Card className="p-8 space-y-6">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <ShieldCheck className="size-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-fg">Technical Controls & Hardening</h3>
                <p className="text-xs text-muted">Defense in depth across browser and server</p>
              </div>
            </div>

            <ul className="space-y-3 text-sm text-fg/90">
              {SECURITY.protections.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Lock className="size-4 text-accent mt-0.5 shrink-0" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* Honest Limitations Callout */}
        <section className="rounded-card border border-danger/30 bg-danger/5 p-8 shadow-sm space-y-6">
          <div className="flex items-center gap-3 text-danger">
            <div className="flex size-10 items-center justify-center rounded-lg bg-danger/10">
              <AlertTriangle className="size-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Documented Limitations & Boundaries</h3>
              <p className="text-xs text-danger/80">We believe in transparent engineering: hear our limitations directly from us.</p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 text-sm text-fg/90">
            {SECURITY.limits.map((limit) => (
              <div key={limit} className="flex items-start gap-3 rounded-lg border border-danger/20 bg-surface/80 p-4">
                <ShieldAlert className="size-4 text-danger mt-0.5 shrink-0" />
                <span className="leading-relaxed text-xs">{limit}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Self-Hosting & Subprocessors */}
        <div className="grid gap-8 lg:grid-cols-2">
          <Card className="p-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-elevated text-fg">
                <Server className="size-5 text-accent" />
              </div>
              <h3 className="text-lg font-bold text-fg">Where Your Data Lives</h3>
            </div>
            <p className="text-sm leading-relaxed text-muted">
              BugFence is deployed entirely within your infrastructure (Docker, Kubernetes, or Node.js). Bug reports, screenshots, and logs remain in your PostgreSQL database or file store.
            </p>
            <p className="text-sm leading-relaxed text-muted">
              Zero central servers. Zero third-party telemetry. We do not operate multi-tenant subprocessors for your bug report data.
            </p>
          </Card>

          <Card className="p-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-elevated text-fg">
                <Terminal className="size-5 text-accent" />
              </div>
              <h3 className="text-lg font-bold text-fg">Coordinated Vulnerability Disclosure</h3>
            </div>
            <p className="text-sm leading-relaxed text-muted">
              We take software security seriously. If you discover a vulnerability in BugFence, please report it responsibly so our team can patch it swiftly.
            </p>
            <p className="text-sm text-muted">
              Read our RFC 9116 security policy at{' '}
              <a href="/.well-known/security.txt" className="text-accent underline font-mono text-xs">
                /.well-known/security.txt
              </a>
            </p>
          </Card>
        </div>

        {/* CTA */}
        <div className="rounded-card border border-border bg-surface p-8 text-center space-y-4">
          <h3 className="text-2xl font-bold text-fg">Need a Security Questionnaire or Architecture Review?</h3>
          <p className="max-w-xl mx-auto text-sm text-muted">
            Our team regularly assists enterprise security, compliance, and DevSecOps teams with VPC deployment architecture.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <ButtonLink href="/contact?topic=security">Request Security Consultation</ButtonLink>
            <ButtonLink href="/dpa" variant="secondary">View Data Processing Addendum</ButtonLink>
          </div>
        </div>
      </Container>
    </>
  );
}
