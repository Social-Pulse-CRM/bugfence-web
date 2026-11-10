import { Container } from '@/components/ui/container';
import { ButtonLink } from '@/components/ui/button';
import { WidgetMock } from '@/features/widget-mock/widget-mock';
import { Shield, Terminal, ArrowRight, CheckCircle2, Lock, Sparkles } from 'lucide-react';
import { env } from '@/lib/env';

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-16 pt-12 sm:pb-24 sm:pt-20">
      {/* Subtle background glow effect */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 -z-10 -translate-x-1/2 h-[500px] w-full max-w-7xl opacity-20 blur-3xl"
        style={{
          background: 'radial-gradient(circle at 50% 0%, var(--accent) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <Container className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
        <div className="space-y-6">
          {/* Release Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3.5 py-1 text-xs font-semibold text-accent shadow-sm">
            <Sparkles className="size-3.5" />
            <span>Zero-Dependency TypeScript SDK • ~15 KB Lazy Core</span>
          </div>

          {/* Main H1 */}
          <h1 className="text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-6xl text-fg">
            Visual bug reports with developer diagnostics.{' '}
            <span className="text-accent underline decoration-accent/30 underline-offset-8">
              Zero data leaks.
            </span>
          </h1>

          {/* Subheading */}
          <p className="max-w-xl text-lg leading-relaxed text-muted">
            BugFence is a drop-in reporting studio with annotated screenshots, recordings, and DOM replay with full network & console logs. Sensitive credentials and PII are redacted in the browser before upload.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <ButtonLink href="#install" className="text-base font-semibold shadow-lg shadow-accent/20">
              <Terminal className="size-4" /> Install Widget
            </ButtonLink>
            <ButtonLink href="#demo" variant="secondary" className="text-base font-semibold">
              Interactive Demo <ArrowRight className="size-4" />
            </ButtonLink>
          </div>

          {/* Value Highlights */}
          <div className="pt-4 border-t border-border/80">
            <ul className="grid gap-2 sm:grid-cols-2 text-xs font-medium text-muted">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-accent shrink-0" />
                <span>Zero extension wall: nothing for reporters to install</span>
              </li>
              <li className="flex items-center gap-2">
                <Shield className="size-4 text-accent shrink-0" />
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

        {/* Studio Simulation Mockup */}
        <div className="relative">
          <WidgetMock />
        </div>
      </Container>
    </section>
  );
}
