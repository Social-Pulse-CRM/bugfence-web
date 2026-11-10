import { Container } from '@/components/ui/container';
import { ButtonLink } from '@/components/ui/button';
import { WidgetMock } from '@/features/widget-mock/widget-mock';
import { Shield, Terminal, ArrowRight, CheckCircle2, Lock, Sparkles, Server } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-20 pt-12 sm:pb-28 sm:pt-20">
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
              Zero data leaks.
            </span>
          </h1>

          {/* Subheading */}
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted">
            BugFence is an in-app reporting studio with annotated screenshots, recordings, and rolling 30-second DOM replay with full network & console logs. Sensitive credentials and PII are redacted directly in the browser before upload.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <ButtonLink href="#install" className="text-base font-semibold px-6 py-3 shadow-lg shadow-accent/20">
              <Terminal className="size-4" /> Install Widget
            </ButtonLink>
            <ButtonLink href="/pricing/" variant="secondary" className="text-base font-semibold px-6 py-3">
              View Plans & Pricing <ArrowRight className="size-4" />
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

        {/* Proper Full-Width Interactive Studio Showcase */}
        <div className="relative mt-12 w-full max-w-6xl mx-auto">
          {/* Subtle Outer Glow */}
          <div className="pointer-events-none absolute -inset-4 -z-10 rounded-3xl bg-radial from-accent/20 via-secondary/10 to-transparent blur-2xl opacity-50" />

          {/* Browser Window Chrome Wrapper */}
          <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl">
            {/* Window Titlebar */}
            <div className="flex items-center justify-between border-b border-border bg-elevated/80 px-4 py-2.5 text-xs">
              {/* Traffic light window dots */}
              <div className="flex items-center gap-2">
                <span className="size-3 rounded-full bg-[#ff5f56] border border-black/10 inline-block" />
                <span className="size-3 rounded-full bg-[#ffbd2e] border border-black/10 inline-block" />
                <span className="size-3 rounded-full bg-[#27c93f] border border-black/10 inline-block" />
              </div>

              {/* URL address pill */}
              <div className="flex items-center gap-2 rounded-full border border-border/80 bg-surface px-4 py-1 text-[11px] font-mono text-muted shadow-inner">
                <Lock className="size-3 text-accent" />
                <span className="text-fg font-medium">https://app.yourcompany.com/billing/checkout</span>
              </div>

              {/* Live Sandbox Indicator */}
              <div className="flex items-center gap-1.5 text-[11px] font-medium text-muted">
                <span className="size-2 rounded-full bg-accent animate-pulse" />
                <span className="hidden sm:inline">Interactive Studio Sandbox</span>
              </div>
            </div>

            {/* Embedded Reporting Studio with Proper Spacious Width */}
            <WidgetMock />
          </div>

          {/* Interactive Hint */}
          <div className="mt-3 flex items-center justify-center gap-2 text-xs text-muted">
            <Sparkles className="size-3.5 text-accent" />
            <span>Interactive Demo: Click tools, switch between Screenshot / Video / Session Replay, or toggle USD / INR.</span>
          </div>
        </div>
      </Container>
    </section>
  );
}
