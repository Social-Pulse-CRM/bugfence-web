import { Container } from '@/components/ui/container';
import { ButtonLink } from '@/components/ui/button';
import { env } from '@/lib/env';
import {
  Terminal,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  Lock,
  Sparkles,
  Server,
  ShieldCheck,
  EyeOff,
  Cpu,
  Layers,
  ArrowDown
} from 'lucide-react';

export function Hero() {
  const demoAppUrl = env.demoAppUrl || 'http://localhost:3000';

  return (
    <section className="relative overflow-hidden pb-16 pt-12 sm:pb-24 sm:pt-20">
      {/* Subtle radial ambient background glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 -z-10 -translate-x-1/2 h-[550px] w-full max-w-7xl opacity-25 blur-3xl"
        style={{
          background: 'radial-gradient(circle at 50% 0%, var(--accent) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <Container>
        {/* Centered Top Value Proposition */}
        <div className="mx-auto max-w-4xl text-center space-y-6">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-semibold text-accent shadow-sm">
            <Sparkles className="size-3.5" />
            <span>Zero-Dependency TypeScript SDK · ~15 KB Lazy Core · Self-Hosted or Cloud</span>
          </div>

          {/* Main H1 */}
          <h1 className="text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-6xl text-fg">
            Visual bug reports with developer diagnostics.{' '}
            <span className="text-accent underline decoration-accent/30 underline-offset-8">
              Redact before upload.
            </span>
          </h1>

          {/* Subheading */}
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted">
            BugFence adds an in-app reporting studio for annotated screenshots, recordings, and optional rolling 30-second DOM replay. Sensitive fields can be masked in the browser before report data is sent to your BugFence server.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <ButtonLink
              href="#sandbox"
              className="text-base font-semibold px-6 py-3 shadow-lg shadow-accent/20 bg-accent text-accent-fg hover:opacity-95"
            >
              Try Connected Sandbox <ArrowDown className="size-4 ml-1" />
            </ButtonLink>
            <ButtonLink
              href="#install"
              variant="secondary"
              className="text-base font-semibold px-6 py-3"
            >
              Install the SDK <Terminal className="size-4 ml-1" />
            </ButtonLink>
            <ButtonLink
              href="/pricing/"
              variant="secondary"
              className="text-base font-semibold px-5 py-3 text-muted hover:text-fg"
            >
              Pricing & Plans <ArrowRight className="size-4 ml-1" />
            </ButtonLink>
          </div>

          {/* Value Highlights Pill Bar */}
          <div className="pt-4">
            <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium text-muted">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-accent shrink-0" />
                <span>Zero extension wall: nothing for reporters to install</span>
              </li>
              <li className="flex items-center gap-2">
                <Server className="size-4 text-accent shrink-0" />
                <span>100% Self-hostable in your private VPC</span>
              </li>
              <li className="flex items-center gap-2">
                <Lock className="size-4 text-accent shrink-0" />
                <span>Browser DOMFence redaction before upload</span>
              </li>
              <li className="flex items-center gap-2">
                <Sparkles className="size-4 text-accent shrink-0" />
                <span>MCP server for AI coding agents</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Clean Architecture & Workflow Showcase Card */}
        <div className="relative mt-14 w-full max-w-5xl mx-auto">
          <div className="overflow-hidden rounded-2xl border border-border bg-surface/90 shadow-2xl backdrop-blur-sm p-6 sm:p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-border/70 pb-6 mb-8">
              <div>
                <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-accent">
                  Privacy-By-Construction Flow
                </span>
                <h2 className="text-xl font-bold text-fg mt-1">
                  How Diagnostic Evidence Travels Safely to Your VPC
                </h2>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted font-mono bg-elevated px-3 py-1.5 rounded-lg border border-border">
                <Lock className="size-3.5 text-emerald-500" />
                <span>Client-Side Sanitization &bull; TLS 1.3 Transport</span>
              </div>
            </div>

            {/* 3-Step Architectural Flow */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
              {/* Step 1: In-Browser Redaction */}
              <div className="rounded-xl border border-border/80 bg-elevated/60 p-5 space-y-3 relative group hover:border-accent/50 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-accent px-2 py-0.5 rounded bg-accent/10 border border-accent/20">
                    STEP 01
                  </span>
                  <EyeOff className="size-4 text-accent" />
                </div>
                <h3 className="font-bold text-base text-fg">In-Browser DOM Fencing</h3>
                <p className="text-xs text-muted leading-relaxed">
                  Passwords, payment card numbers (validated via Luhn algorithm), and elements with <code className="text-accent font-mono text-[11px]">data-bugfence-mask</code> are obscured locally before canvas rasterization or replay serialization.
                </p>
                <div className="pt-2 border-t border-border/40 text-[11px] font-mono text-muted flex items-center gap-1.5">
                  <CheckCircle2 className="size-3 text-emerald-500" />
                  <span>Zero unredacted pixels leave device</span>
                </div>
              </div>

              {/* Step 2: Private Ingestion */}
              <div className="rounded-xl border border-border/80 bg-elevated/60 p-5 space-y-3 relative group hover:border-indigo-500/50 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-indigo-400 px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20">
                    STEP 02
                  </span>
                  <Server className="size-4 text-indigo-400" />
                </div>
                <h3 className="font-bold text-base text-fg">Direct VPC Ingestion</h3>
                <p className="text-xs text-muted leading-relaxed">
                  Sanitized reports travel directly to your self-hosted API. Ingestion re-scrubs incoming payloads, validates release metadata, and stores records in your private PostgreSQL database or encrypted volume.
                </p>
                <div className="pt-2 border-t border-border/40 text-[11px] font-mono text-muted flex items-center gap-1.5">
                  <CheckCircle2 className="size-3 text-emerald-500" />
                  <span>100% data sovereignty &bull; Zero central cloud</span>
                </div>
              </div>

              {/* Step 3: Developer & Agent Triage */}
              <div className="rounded-xl border border-border/80 bg-elevated/60 p-5 space-y-3 relative group hover:border-purple-500/50 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-purple-400 px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/20">
                    STEP 03
                  </span>
                  <Cpu className="size-4 text-purple-400" />
                </div>
                <h3 className="font-bold text-base text-fg">Triage & Agent Dispatch</h3>
                <p className="text-xs text-muted leading-relaxed">
                  Engineers review symbolicated traces and 30s session replays rendered in a script-less sandboxed iframe. AI coding agents inspect reports via the built-in MCP server to patch regressions fast.
                </p>
                <div className="pt-2 border-t border-border/40 text-[11px] font-mono text-muted flex items-center gap-1.5">
                  <CheckCircle2 className="size-3 text-emerald-500" />
                  <span>MCP Server for Claude Code, Cursor & Copilot</span>
                </div>
              </div>
            </div>

            {/* Bottom Quick Test Banner */}
            <div className="mt-8 pt-6 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2.5 text-xs text-muted text-center sm:text-left">
                <ShieldCheck className="size-4 text-accent shrink-0" />
                <span>Want to test this in action? Experience real defect triggers and client-side masking in our sandbox.</span>
              </div>
              <ButtonLink
                href="#sandbox"
                variant="secondary"
                className="text-xs font-semibold px-4 py-2 whitespace-nowrap"
              >
                View Sandbox Guide & Scenarios <ArrowDown className="size-3.5 ml-1.5" />
              </ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
