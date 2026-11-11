'use client';

import { useState, useRef, useEffect } from 'react';
import { Container } from '@/components/ui/container';
import { Card } from '@/components/ui/card';
import { ButtonLink } from '@/components/ui/button';
import {
  ShieldAlert,
  Zap,
  Terminal,
  ExternalLink,
  Layers,
  Flame,
  Bug,
  Activity,
  Maximize2,
  Minimize2,
  RefreshCw,
  Lock,
  Database,
  CheckCircle2,
  Clock
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
    description: 'Synchronous compute loop blocks the main JavaScript thread, causing the in-page FPS meter to plummet.',
    telemetry: 'PerformanceObserver captures LongTask violation breadcrumbs and frames dropped in session replay.'
  },
  {
    id: 'graphql',
    name: 'GraphQL Schema Validation (400)',
    tag: 'GraphQL',
    tagColor: 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20',
    description: 'Malformed mutation query submitted with missing orderId and invalid plan tier enum values.',
    telemetry: 'SDK categorizes response as GraphQL ValidationError and captures mutation variables.'
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
  const [activeScenario, setActiveScenario] = useState<string>('checkout504');
  const [lastAction, setLastAction] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isIframeLoaded, setIsIframeLoaded] = useState<boolean>(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Send typed postMessage to the running demo application iframe
  const triggerScenario = (scenarioId: string) => {
    setActiveScenario(scenarioId);
    setLastAction(`Triggering ${scenarioId}...`);
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        { type: 'BUGFENCE_DEMO_TRIGGER', scenario: scenarioId },
        '*'
      );
    }
  };

  // Listen for acknowledgement or report submission events from the sandbox iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (!event.data || typeof event.data !== 'object') return;
      if (event.data.type === 'BUGFENCE_DEMO_ACK') {
        setLastAction(`✅ Scenario "${event.data.scenario}" executed inside sandbox.`);
      } else if (event.data.type === 'BUGFENCE_DEMO_REPORT_SUBMITTED') {
        setLastAction(`🎉 Bug report submitted! ID: ${event.data.reportId}. Available in Live Console.`);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const reloadIframe = () => {
    setIsIframeLoaded(false);
    if (iframeRef.current) {
      iframeRef.current.src = 'http://localhost:3000/?embed=true';
      setLastAction('Iframe reloaded.');
    }
  };

  return (
    <section id="sandbox" className="py-16 sm:py-24 border-t border-border bg-gradient-to-b from-bg to-surface/30">
      <Container>
        {/* Section Header */}
        <div className="mb-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3.5 py-1 text-xs font-semibold text-accent mb-3">
            <Zap className="size-3.5" /> Live Interactive Sandbox
          </div>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl text-fg">
            Test Real SaaS Defects in a Connected Sandbox
          </h2>
          <p className="mt-3 text-muted text-base">
            No static mockups. Experience BugFence directly through two connected environments: the client-side reporter sandbox on port 3000 and the engineering triage console on port 5000.
          </p>
        </div>

        {/* Dual Launch Pathways */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
          {/* Path A: In-Browser Widget Sandbox */}
          <Card className="flex flex-col justify-between border-accent/30 bg-gradient-to-br from-surface to-accent/5 p-6 hover:border-accent transition-all">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-accent">
                  <Terminal className="size-4" /> Pathway 1 &bull; Reporter Experience
                </span>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-accent/20 text-accent font-mono">
                  Port 3000
                </span>
              </div>
              <h3 className="text-xl font-semibold text-fg">In-Browser Widget Sandbox</h3>
              <p className="text-sm text-muted">
                Trigger real client-side errors, witness automatic credit card masking, and test the floating BugFence reporter widget in our simulated NovaCloud SaaS application.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => {
                  const element = document.getElementById('sandbox-iframe-container');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-accent px-4 text-xs font-semibold text-accent-fg hover:opacity-90 transition-opacity"
              >
                <Layers className="size-4" /> Scroll to Embedded Frame
              </button>
              <ButtonLink
                href="http://localhost:3000/?embed=false"
                variant="secondary"
                className="text-xs min-h-10 px-4"
              >
                Open in New Window <ExternalLink className="size-3.5" />
              </ButtonLink>
            </div>
          </Card>

          {/* Path B: Live Engineering Console Quick Connect */}
          <Card className="flex flex-col justify-between border-purple-500/30 bg-gradient-to-br from-surface to-purple-500/5 p-6 hover:border-purple-500 transition-all">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-purple-400">
                  <Zap className="size-4" /> Pathway 2 &bull; Triage Experience
                </span>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-mono">
                  Port 5000 (1-Click Login)
                </span>
              </div>
              <h3 className="text-xl font-semibold text-fg">Live Engineering Dashboard</h3>
              <p className="text-sm text-muted">
                Jump directly into the developer triage console with zero credentials. Review automated issue clustering, symbolicated stack traces, and 30-second rrweb session replays.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <ButtonLink
                href="http://localhost:5000/?demo=true"
                variant="primary"
                className="text-xs min-h-10 px-5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold shadow-md"
              >
                ⚡ 1-Click Instant Demo Access <ExternalLink className="size-3.5" />
              </ButtonLink>
              <span className="inline-flex items-center text-xs text-muted font-medium">
                Passwordless &bull; Read-Only Guardrails Active
              </span>
            </div>
          </Card>
        </div>

        {/* 8 Scenario Selector Cards */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-fg flex items-center gap-2">
              <Flame className="size-5 text-amber-500" /> Select a Scenario to Dispatch Remotely
            </h3>
            {lastAction && (
              <span className="text-xs text-accent font-medium animate-pulse">
                {lastAction}
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {SCENARIOS.map((scenario) => {
              const isSelected = activeScenario === scenario.id;
              return (
                <button
                  key={scenario.id}
                  type="button"
                  onClick={() => triggerScenario(scenario.id)}
                  className={`text-left rounded-lg p-3.5 border transition-all flex flex-col justify-between gap-3 ${
                    isSelected
                      ? 'border-accent bg-accent/10 shadow-sm'
                      : 'border-border bg-surface hover:border-accent/40'
                  }`}
                >
                  <div className="space-y-1.5">
                    <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded border ${scenario.tagColor}`}>
                      {scenario.tag}
                    </span>
                    <h4 className="text-xs font-semibold text-fg leading-tight">
                      {scenario.name}
                    </h4>
                    <p className="text-[11px] text-muted line-clamp-2">
                      {scenario.description}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-border/50 flex items-center justify-between text-[11px] font-semibold text-accent">
                    <span>Dispatch Fault &rarr;</span>
                    {isSelected && <span className="size-2 rounded-full bg-accent animate-ping" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Embedded Live Sandbox Iframe Viewport */}
        <div
          id="sandbox-iframe-container"
          className={`rounded-xl border border-border bg-surface overflow-hidden shadow-2xl transition-all ${
            isExpanded ? 'fixed inset-4 z-50 flex flex-col bg-bg' : 'relative h-[620px] mb-8'
          }`}
        >
          {/* Mock Browser Header Chrome */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-surface border-b border-border text-xs text-muted">
            <div className="flex items-center gap-2">
              <span className="size-3 rounded-full bg-red-500/80 inline-block" />
              <span className="size-3 rounded-full bg-yellow-500/80 inline-block" />
              <span className="size-3 rounded-full bg-green-500/80 inline-block" />
              <span className="ml-2 font-mono text-[11px] text-fg/80 bg-elevated px-2.5 py-0.5 rounded border border-border flex items-center gap-1.5">
                <Lock className="size-3 text-emerald-500" />
                http://localhost:3000/?embed=true
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-500">
                <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                {isIframeLoaded ? 'Live Sandbox Connected' : 'Connecting to localhost:3000...'}
              </span>
              <button
                type="button"
                onClick={reloadIframe}
                title="Reload Sandbox Frame"
                className="p-1 rounded hover:bg-elevated text-muted hover:text-fg transition-colors"
              >
                <RefreshCw className="size-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                title={isExpanded ? 'Collapse Frame' : 'Expand Frame'}
                className="p-1 rounded hover:bg-elevated text-muted hover:text-fg transition-colors"
              >
                {isExpanded ? <Minimize2 className="size-3.5" /> : <Maximize2 className="size-3.5" />}
              </button>
            </div>
          </div>

          {/* Iframe */}
          <iframe
            ref={iframeRef}
            src="http://localhost:3000/?embed=true"
            title="BugFence Interactive Sandbox"
            onLoad={() => setIsIframeLoaded(true)}
            className="w-full flex-1 border-0 h-full bg-white dark:bg-slate-950"
            sandbox="allow-scripts allow-same-origin allow-forms allow-modals"
          />
        </div>

        {/* Zero-AWS Ephemeral Policy Guardrail Banner */}
        <Card className="border-border bg-gradient-to-r from-surface to-elevated p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500 mt-0.5">
              <Database className="size-5" />
            </div>
            <div className="space-y-0.5">
              <h4 className="text-sm font-semibold text-fg flex items-center gap-2">
                Zero Cloud Storage Inflation & Auto-Rolling Ephemeral Tenant
              </h4>
              <p className="text-xs text-muted max-w-2xl">
                Demo screenshots and session recordings are kept exclusively in isolated ephemeral storage with a 50MB hard quota ceiling and FIFO cap (max 30 reports). An automated 15-minute Janitor purges demo reports older than 45 minutes, ensuring zero AWS S3/R2 storage costs.
              </p>
            </div>
          </div>
          <ButtonLink
            href="http://localhost:5000/?demo=true"
            variant="secondary"
            className="text-xs min-h-9 px-4 whitespace-nowrap"
          >
            Review Issues in Dashboard &rarr;
          </ButtonLink>
        </Card>
      </Container>
    </section>
  );
}
