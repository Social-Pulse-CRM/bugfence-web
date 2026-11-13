'use client';

import { Container } from '@/components/ui/container';
import { Card } from '@/components/ui/card';
import { ButtonLink } from '@/components/ui/button';
import { env, getDemoDashboardUrl } from '@/lib/env';
import {
  Zap,
  ExternalLink,
  Flame,
  CheckCircle2,
  Database,
  Terminal,
  ShieldCheck,
  Cpu,
  Layers,
  Sparkles,
  ArrowRight,
  Info,
  Clock,
  Lock,
  Server,
  Play
} from 'lucide-react';

interface Scenario {
  id: string;
  name: string;
  tag: string;
  tagColor: string;
  description: string;
  telemetry: string;
}

const SCENARIOS: Scenario[] = [
  {
    id: 'checkout504',
    name: 'Checkout Gateway Timeout (504)',
    tag: 'Network / PII',
    tagColor: 'bg-red-500/10 text-red-500 border-red-500/20',
    description: 'Dispatches $2,450 payment with credit card numbers and bearer tokens. Simulated 2500ms upstream settlement timeout.',
    telemetry: 'Client scrubs credit card with Luhn algorithm and masks bearer tokens before telemetry dispatch.'
  },
  {
    id: 'freeze',
    name: 'Thread Freeze & Long Task (650ms)',
    tag: 'Performance',
    tagColor: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
    description: 'Synchronous compute loop blocks the main JavaScript thread, causing the in-page FPS meter to drop.',
    telemetry: 'PerformanceObserver captures LongTask violation breadcrumbs and frames dropped in session replay.'
  },
  {
    id: 'graphql',
    name: 'GraphQL Schema Validation (400)',
    tag: 'GraphQL',
    tagColor: 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20',
    description: 'Malformed mutation query submitted with missing orderId and invalid plan tier enum values.',
    telemetry: 'SDK categorizes response as GraphQL ValidationError and captures mutation variables with scrubbed PII.'
  },
  {
    id: 'typeerror',
    name: 'Deep TypeError Component Crash',
    tag: 'Runtime Exception',
    tagColor: 'bg-rose-500/10 text-rose-500 border-rose-500/20',
    description: 'Throws an unhandled TypeError with a 5-level component call stack in simulated unmounted settings.',
    telemetry: 'Symbolicated stack trace captured with component boundary context for automated issue grouping.'
  },
  {
    id: 'cors',
    name: 'Partner CRM Cross-Origin Block (403)',
    tag: 'Security / CORS',
    tagColor: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
    description: 'Outbound sync dispatch to legacy customer endpoint rejected by strict browser CORS policy.',
    telemetry: 'Network interceptor logs failed preflight OPTIONS request and CORS restriction code.'
  },
  {
    id: 'rageclick',
    name: 'Rage Click Cluster & 30s Replay',
    tag: 'User Friction',
    tagColor: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
    description: 'Rapidly clicking "Export Full Audit Log" triggers UI shake animation and marks high-friction interaction.',
    telemetry: '4+ rapid clicks clustered within 1.2s recorded in 30-second DOM replay timeline.'
  },
  {
    id: 'cls',
    name: 'Cumulative Layout Shift (CLS 0.28)',
    tag: 'Visual Stability',
    tagColor: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    description: 'Dynamic banner insertion suddenly pushes main viewport contents down by 140px without warning.',
    telemetry: 'PerformanceObserver captures LayoutShift entry with high CLS delta and affected DOM elements.'
  },
  {
    id: 'chunkload',
    name: 'Stale CDN ChunkLoadError (404)',
    tag: 'Deployment Drift',
    tagColor: 'bg-teal-500/10 text-teal-500 border-teal-500/20',
    description: 'Dynamically importing invoice module fails after edge CDN invalidates older chunk hashes.',
    telemetry: 'Automated triage tags ChunkLoadError and correlates with active release version.'
  }
];

export function SandboxPortal() {
  const demoAppUrl = env.demoAppUrl || 'http://localhost:3000';
  const demoDashboardUrl = getDemoDashboardUrl();

  return (
    <section id="sandbox" className="py-16 sm:py-24 border-t border-border bg-gradient-to-b from-bg to-surface/30">
      <Container>
        {/* Section Header */}
        <div className="max-w-3xl space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3.5 py-1 text-xs font-semibold text-accent">
            <Zap className="size-3.5" /> Interactive Sandbox
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-fg">
            Explore Both Sides of BugFence Live
          </h2>
          <p className="text-base text-muted leading-relaxed">
            See how non-technical reporters capture visual defects from the web application, and how developers triage them in the engineering console. Open each environment in a new tab to see them work together in real time.
          </p>
        </div>

        {/* The Two Distinct Launch Pathways: Reporter (QA/Product) vs Engineer (Triage) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Pathway 1: Demo Application (Reporter View) */}
          <Card className="flex flex-col justify-between border-accent/40 bg-gradient-to-br from-surface to-accent/5 p-7 sm:p-8 hover:border-accent transition-all shadow-md">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-accent">
                  <Terminal className="size-4" /> Reporter Experience · QA &amp; Users
                </span>
                <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-accent/20 text-accent font-mono">
                  Public demo
                </span>
              </div>
              <h3 className="text-2xl font-bold text-fg">NovaCloud SaaS Demo Application</h3>
              <p className="text-sm text-muted leading-relaxed">
                Test the floating BugFence reporter widget embedded in a realistic SaaS app. Annotate screenshots, record audio/video, and experience client-side Luhn credit card scrubbing before data leaves the browser.
              </p>
              
              <ul className="space-y-2.5 text-xs text-muted pt-3 border-t border-border/60">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="size-3.5 text-accent shrink-0" />
                  <span>Floating in-app widget (no browser extensions needed)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="size-3.5 text-accent shrink-0" />
                  <span>Automatic client-side DOM &amp; credit card sanitization</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="size-3.5 text-accent shrink-0" />
                  <span>Interactive failure triggers to simulate real production bugs</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-5 border-t border-border/60">
              <ButtonLink
                href={demoAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 min-h-11 px-6 text-sm font-bold shadow-md bg-accent text-accent-fg hover:opacity-95"
              >
                Open Demo App (New Window) <ExternalLink className="size-4 ml-1" />
              </ButtonLink>
            </div>
          </Card>

          {/* Pathway 2: Triage Console (Developer View) */}
          <Card className="flex flex-col justify-between border-purple-500/40 bg-gradient-to-br from-surface to-purple-500/5 p-7 sm:p-8 hover:border-purple-500 transition-all shadow-md">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-purple-400">
                  <Cpu className="size-4" /> Triage Experience · Developers &amp; Leads
                </span>
                <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-mono">
                  Shared guest access
                </span>
              </div>
              <h3 className="text-2xl font-bold text-fg">Developer Triage Console</h3>
              <p className="text-sm text-muted leading-relaxed">
                Open the dashboard as a shared, read-only guest. Explore seeded reports, issue grouping, stack traces, and available replay examples without creating an account.
              </p>

              <ul className="space-y-2.5 text-xs text-muted pt-3 border-t border-border/60">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="size-3.5 text-purple-400 shrink-0" />
                  <span>One-click passwordless access to a read-only guest workspace</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="size-3.5 text-purple-400 shrink-0" />
                  <span>30-second session replay player in sandboxed viewer</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="size-3.5 text-purple-400 shrink-0" />
                  <span>Sample reports are shared with other demo visitors</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-5 border-t border-border/60">
              <ButtonLink
                href={demoDashboardUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 min-h-11 px-6 text-sm font-bold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-md"
              >
                Open read-only demo console <ExternalLink className="size-4 ml-1" />
              </ButtonLink>
            </div>
          </Card>
        </div>

        {/* 8 Enterprise Defect Simulation Scenarios */}
        <div className="mb-12">
          <div className="max-w-2xl space-y-2 mb-6">
            <h3 className="text-xl font-bold text-fg flex items-center gap-2">
              <Flame className="size-5 text-amber-500" />
              8 Enterprise Defect Simulation Scenarios
            </h3>
            <p className="text-sm text-muted">
              Click any scenario below to launch it directly in the Demo Application in a new window, or test them inside the app.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SCENARIOS.map((scenario) => {
              return (
                <div
                  key={scenario.id}
                  className="rounded-xl border border-border bg-surface p-4 flex flex-col justify-between gap-4 hover:border-accent/40 transition-colors shadow-sm"
                >
                  <div className="space-y-2">
                    <span className={`inline-block text-[11px] font-bold px-2.5 py-0.5 rounded border ${scenario.tagColor}`}>
                      {scenario.tag}
                    </span>
                    <h4 className="text-sm font-bold text-fg leading-snug">
                      {scenario.name}
                    </h4>
                    <p className="text-xs text-muted leading-relaxed">
                      {scenario.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-border/60 space-y-3">
                    <p className="text-[11px] text-muted/80 leading-normal font-mono bg-elevated/70 p-2 rounded">
                      <strong className="text-fg font-semibold block mb-0.5">Telemetry:</strong>
                      {scenario.telemetry}
                    </p>
                    <a
                      href={`${demoAppUrl.replace(/\/$/, '')}/?scenario=${encodeURIComponent(scenario.id)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full items-center justify-between text-xs font-semibold text-accent hover:underline pt-1"
                    >
                      <span>Launch Scenario in Demo App</span>
                      <ExternalLink className="size-3.5" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Zero-AWS Ephemeral Policy Guardrail Banner */}
        <div className="rounded-2xl border border-border bg-surface p-6 sm:p-7 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div className="flex items-start gap-4">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500 shrink-0 mt-0.5">
                <Database className="size-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-bold text-fg flex items-center gap-2">
                  Ephemeral demo storage
                </h4>
                <p className="text-xs sm:text-sm text-muted max-w-3xl leading-relaxed">
                  Demo report media uses a temporary store with a 50 MB media quota and a 30-report FIFO limit. A 15-minute cleanup sweep removes reports older than 45 minutes. This policy applies to the demo tenant; your deployment’s storage policy is configured separately.
                </p>
              </div>
            </div>
            <ButtonLink
              href={`${demoDashboardUrl}/?demo=true`}
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              className="text-xs font-semibold min-h-10 px-5 whitespace-nowrap shrink-0"
            >
              Open Triage Console <ArrowRight className="size-3.5 ml-1.5" />
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
