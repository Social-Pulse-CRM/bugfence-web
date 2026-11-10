import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { ButtonLink } from '@/components/ui/button';
import { ThemeToggle } from './theme-toggle';
import { NAV, SITE } from '@/content/site';
import { env } from '@/lib/env';
import { Shield, ExternalLink, Code2, LogIn } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/85 backdrop-blur-md transition-colors">
      <Container className="flex h-16 items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 font-bold tracking-tight text-fg group">
          <div className="flex size-7 items-center justify-center rounded-lg bg-accent text-accent-fg shadow-sm transition-transform group-hover:scale-105">
            <Shield className="size-4" />
          </div>
          <span className="text-lg font-bold">{SITE.name}</span>
        </Link>

        {/* Primary Desktop Nav */}
        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="rounded-lg px-3 py-1.5 text-sm font-medium text-muted hover:text-fg hover:bg-surface transition-colors"
            >
              {n.label}
            </Link>
          ))}
          {env.docsUrl && (
            <a
              href={env.docsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-medium text-muted hover:text-fg hover:bg-surface transition-colors"
            >
              <span>Docs</span>
              <ExternalLink className="size-3 text-muted" />
            </a>
          )}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {env.npmUrl && (
            <a
              href={env.npmUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-2.5 py-1 text-xs font-mono font-medium text-muted hover:text-fg"
              title="View Public NPM Package"
            >
              <Code2 className="size-3 text-accent" />
              <span>npm</span>
            </a>
          )}

          <ThemeToggle />

          {env.loginUrl && (
            <ButtonLink href={env.loginUrl} variant="ghost" className="hidden sm:inline-flex text-xs font-semibold">
              <LogIn className="size-3.5" /> Log In
            </ButtonLink>
          )}

          <ButtonLink href="/contact" className="hidden sm:inline-flex text-xs font-semibold shadow-sm">
            Get Started
          </ButtonLink>
        </div>
      </Container>

      {/* Accessible Mobile Nav Menu */}
      <details className="border-t border-border bg-surface/90 md:hidden group">
        <summary className="cursor-pointer px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-muted hover:text-fg select-none">
          Menu Navigation
        </summary>
        <nav aria-label="Mobile" className="flex flex-col px-5 pb-4 pt-1 space-y-1">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="rounded py-2 text-sm text-fg font-medium">
              {n.label}
            </Link>
          ))}
          {env.docsUrl && (
            <a href={env.docsUrl} target="_blank" rel="noopener noreferrer" className="py-2 text-sm text-muted">
              Documentation ↗
            </a>
          )}
          {env.npmUrl && (
            <a href={env.npmUrl} target="_blank" rel="noopener noreferrer" className="py-2 text-sm text-muted">
              NPM Package ↗
            </a>
          )}
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-flex w-full items-center justify-center rounded-lg bg-accent py-2.5 text-center text-sm font-semibold text-accent-fg"
            >
              Get Started
            </Link>
          </div>
        </nav>
      </details>
    </header>
  );
}
