'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { ButtonLink } from '@/components/ui/button';
import { ThemeToggle } from './theme-toggle';
import { NAV, SITE } from '@/content/site';
import { env } from '@/lib/env';
import { Shield, Code2, LogIn, Menu, X, ExternalLink } from 'lucide-react';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/85 backdrop-blur-md transition-colors">
      <Container className="flex h-16 items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 font-bold tracking-tight text-fg group shrink-0"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div className="flex size-7 items-center justify-center rounded-lg bg-accent text-accent-fg shadow-sm transition-transform group-hover:scale-105">
            <Shield className="size-4" />
          </div>
          <span className="text-lg font-bold">{SITE.name}</span>
        </Link>

        {/* Primary Desktop Nav */}
        <nav aria-label="Primary" className="hidden items-center gap-1 xl:gap-2 lg:flex">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="rounded-lg px-3 py-1.5 text-sm font-medium text-muted hover:text-fg hover:bg-surface transition-colors whitespace-nowrap shrink-0"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2 shrink-0">
          {env.npmUrl && (
            <a
              href={env.npmUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden xl:inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-2.5 py-1 text-xs font-mono font-medium text-muted hover:text-fg shrink-0"
              title="View Public NPM Package"
            >
              <Code2 className="size-3 text-accent" />
              <span>npm</span>
            </a>
          )}

          <ThemeToggle />

          {env.loginUrl && (
            <ButtonLink
              href={env.loginUrl}
              variant="ghost"
              className="hidden sm:inline-flex text-xs font-semibold shrink-0"
            >
              <LogIn className="size-3.5" /> Log In
            </ButtonLink>
          )}

          <ButtonLink
            href="/pricing"
            className="hidden sm:inline-flex text-xs font-semibold shadow-sm shrink-0"
          >
            Get Started
          </ButtonLink>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            className="inline-flex size-9 items-center justify-center rounded-lg border border-border bg-surface text-muted hover:text-fg hover:bg-elevated transition-colors lg:hidden shrink-0"
          >
            {mobileMenuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </Container>

      {/* Accessible Mobile Nav Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-border bg-surface/95 backdrop-blur-md lg:hidden animate-in fade-in slide-in-from-top-2 duration-150">
          <nav aria-label="Mobile" className="flex flex-col px-5 py-4 space-y-1">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-fg hover:bg-elevated transition-colors"
              >
                {n.label}
              </Link>
            ))}

            <div className="my-2 border-t border-border pt-2 space-y-1">
              {env.docsUrl && (
                <a
                  href={env.docsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-muted hover:text-fg hover:bg-elevated transition-colors"
                >
                  <span>Documentation</span>
                  <ExternalLink className="size-3.5 text-muted/70" />
                </a>
              )}
              {env.npmUrl && (
                <a
                  href={env.npmUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-muted hover:text-fg hover:bg-elevated transition-colors"
                >
                  <span>NPM Package</span>
                  <ExternalLink className="size-3.5 text-muted/70" />
                </a>
              )}
              {env.loginUrl && (
                <a
                  href={env.loginUrl}
                  className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-muted hover:text-fg hover:bg-elevated transition-colors sm:hidden"
                >
                  <span>Log In</span>
                  <LogIn className="size-3.5 text-muted/70" />
                </a>
              )}
            </div>

            <div className="pt-2">
              <Link
                href="/pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex w-full items-center justify-center rounded-lg bg-accent py-2.5 text-center text-sm font-semibold text-accent-fg shadow-sm"
              >
                Get Started
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
