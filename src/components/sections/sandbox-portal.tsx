'use client';

import { Container } from '@/components/ui/container';
import { Card } from '@/components/ui/card';
import { ButtonLink } from '@/components/ui/button';
import { env } from '@/lib/env';
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
  const demoDashboardUrl = env.demoDashboardUrl || 'http://localhost:5000';
  const isLocalhost = demoAppUrl.includes('localhost') || demoAppUrl.includes('127.0.0.1');

  return (
    <section id="sandbox" className="py-16 sm:py-24 border-t border-border bg-gradient-to-b from-bg to-surface/30">
      <Container>
        {/* Section Header */}
        <div className="max-w-3xl space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3.5 py-1 text-xs font-semibold text-accent">
            <Zap className="size-3.5" /> Live Sandbox Environments
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-fg">
            Test Real SaaS Defects in a Connected Sandbox
          </h2>
          <p className="text-base text-muted leading-relaxed">
            Experience BugFence in real time without installation or signup. For the most accurate testing experience, open the environments in a dedicated browser window.
          </p>
        </div>

        {/* Clear Instruction Banner: How to Test the Demo */}
        <div className="mb-10 rounded-2xl border border-accent/20 bg-gradient-to-r from-accent/5 via-surface to-accent/5 p-6 sm:p-7 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="p-2.5 rounded-xl bg-accent/10 text-accent shrink-0 mt-1">
              <Info className="size-5" />
            </div>
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-base font-bold text-fg">
                  How to Test the Interactive Sandbox
                </h3>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-accent/20 text-accent font-semibold">
                  Dedicated Window Experience
                </span>
              </div>
              <p className="text-sm text-muted leading-relaxed">
                Because BugFence is an in-browser SDK that records rolling DOM sessions, captures screenshots, and protects sensitive customer data, it runs natively inside your browser. We provide two interconnected applications:
              </p>
              
              {/* 3 Step Instruction Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="rounded-xl border border-border bg-surface/80 p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-accent bg-accent/10 px-2 py-0.5 rounded">
                      STEP 1
                    </span>
                    <Play className="size-3.5 text-accent" />
                  </div>
                  <h4 className="text-sm font-semibold text-fg">Open Demo App in New Window</h4>
                  <p className="text-xs text-muted leading-relaxed">
                    Loads NovaCloud SaaS with the authentic floating BugFence widget active in the bottom-right corner.
                  </p>
                </div>

                <div className="rounded-xl border border-border bg-surface/80 p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded">
                      STEP 2
                    </span>
                    <Flame className="size-3.5 text-amber-500" />
                  </div>
                  <h4 className="text-sm font-semibold text-fg">Trigger Real Defect Scenarios</h4>
                  <p className="text-xs text-muted leading-relaxed">
                    Click any failure scenario below to trigger real 504 timeouts, thread freezes, or component crashes.
                  </p>
                </div>

                <div className="rounded-xl border border-border bg-surface/80 p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded">
                      STEP 3
                    </span>
                    <Cpu className="size-3.5 text-purple-400" />
                  </div>
                  <h4 className="text-sm font-semibold text-fg">Inspect Triage Console</h4>
                  <p className="text-xs text-muted leading-relaxed">
                    Open the engineering dashboard with 1 click to view deduplicated issues, symbolicated stack traces, and 30s session replays.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* The Two Distinct Launch Pathways */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Pathway 1: Demo Application (Reporter View) */}
          <Card className="flex flex-col justify-between border-accent/40 bg-gradient-to-br from-surface to-accent/5 p-6 sm:p-7 hover:border-accent transition-all shadow-md">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-accent">
                  <Terminal className="size-4" /> Environment 1 &bull; Reporter Experience
                </span>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-accent/20 text-accent font-mono">
                  {isLocalhost ? 'Localhost Port 3000' : 'Live Cloud Sandbox'}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-fg">NovaCloud SaaS Demo Application</h3>
              <p className="text-sm text-muted leading-relaxed">
                Test the client-side reporter widget embedded inside a realistic multi-tenant enterprise application. Experience drawing annotations, screen recording, and client-side Luhn credit card scrubbing.
              </p>
              
              <ul className="space-y-2 text-xs text-muted pt-2 border-t border-border/60">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="size-3.5 text-accent shrink-0" />
                  <span>Floating BugFence reporter widget in the bottom-right corner</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="size-3.5 text-accent shrink-0" />
                  <span>Interactive checkout with live Luhn credit card redaction</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="size-3.5 text-accent shrink-0" />
                  <span>Real-time in-page diagnostic terminal and error simulation bar</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-border/60">
              <ButtonLink
                href={demoAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 min-h-11 px-6 text-sm font-bold shadow-md bg-accent text-accent-fg hover:opacity-95"
              >
                Open Demo App in New Window <ExternalLink className="size-4 ml-1" />
              </ButtonLink>
            </div>
          </Card>

          {/* Pathway 2: Triage Console (Developer View) */}
          <Card className="flex flex-col justify-between border-purple-500/40 bg-gradient-to-br from-surface to-purple-500/5 p-6 sm:p-7 hover:border-purple-500 transition-all shadow-md">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-purple-400">
                  <Cpu className="size-4" /> Environment 2 &bull; Triage Experience
                </span>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-mono">
                  {isLocalhost ? 'Localhost Port 5000' : 'Live Triage Console'}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-fg">Developer Triage Console</h3>
              <p className="text-sm text-muted leading-relaxed">
                Access the engineering dashboard instantly with 1-click passwordless login. Review incoming reports, automated error deduplication, symbolicated stack traces, and 30-second rolling DOM replays.
              </p>

              <ul className="space-y-2 text-xs text-muted pt-2 border-t border-border/60">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="size-3.5 text-purple-400 shrink-0" />
                  <span>Passwordless instant access with preloaded test issues</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="size-3.5 text-purple-400 shrink-0" />
                  <span>30-second session replay player rendered in script-less iframe</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="size-3.5 text-purple-400 shrink-0" />
                  <span>Model Context Protocol (MCP) server for Claude Code and Cursor</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-border/60 flex flex-wrap items-center gap-3">
              <ButtonLink
                href={`${demoDashboardUrl}/?demo=true`}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 min-h-11 px-6 text-sm font-bold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-md"
              >
                Open Triage Console in New Window <ExternalLink className="size-4 ml-1" />
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
                      href={`${demoAppUrl}/?scenario=${scenario.id}`}
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
                  Zero Cloud Storage Inflation & Auto-Rolling Ephemeral Tenant
                </h4>
                <p className="text-xs sm:text-sm text-muted max-w-3xl leading-relaxed">
                  Demo screenshots and session recordings are kept exclusively in isolated ephemeral storage with a 50MB hard quota ceiling and FIFO cap (max 30 reports). An automated 15-minute Janitor service purges demo reports older than 45 minutes, ensuring zero AWS S3/R2 storage costs.
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
