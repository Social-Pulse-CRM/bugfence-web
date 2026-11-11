import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { FOOTER, SITE, ENTITY } from '@/content/site';
import { Shield, ShieldCheck, Heart, Server } from 'lucide-react';
import { env } from '@/lib/env';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface/50 py-16 transition-colors">
      <Container>
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-5">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2 font-bold tracking-tight text-fg">
              <div className="flex size-6 items-center justify-center rounded-md bg-accent text-accent-fg">
                <Shield className="size-3.5" />
              </div>
              <span>{SITE.name}</span>
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-muted">
              {SITE.tagline}. An in-browser reporting studio and developer triage platform engineered for privacy-conscious teams.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-muted">
              <span className="inline-flex items-center gap-1 rounded border border-border bg-elevated px-2 py-0.5">
                <Server className="size-3 text-accent" /> 100% Self-Hostable
              </span>
              <span className="inline-flex items-center gap-1 rounded border border-border bg-elevated px-2 py-0.5">
                <ShieldCheck className="size-3 text-accent" /> Zero Tracking Cookies
              </span>
            </div>
          </div>

          {/* Navigation Columns */}
          {Object.entries(FOOTER).map(([group, links]) => (
            <nav key={group} aria-label={group}>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-fg">{group}</p>
              <ul className="space-y-2.5 text-sm text-muted">
                {links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="hover:text-fg transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-xs text-muted sm:flex-row">
          <div className="space-y-1 text-center sm:text-left">
            <p>
              &copy; {currentYear} {ENTITY.legalName}. All rights reserved.
            </p>
            <p className="text-[11px] text-muted/80">
              {ENTITY.operatorStatement} {ENTITY.taxStatement}
            </p>
          </div>
          <p className="flex items-center gap-1.5 text-center sm:text-right">
            Privacy-first engineering for modern software teams.
          </p>
        </div>
      </Container>
    </footer>
  );
}
