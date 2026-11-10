import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { ButtonLink } from '@/components/ui/button';
import { ThemeToggle } from './theme-toggle';
import { NAV, SITE } from '@/content/site';
import { env } from '@/lib/env';

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/85 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span aria-hidden="true" className="inline-block size-5 rounded-md bg-accent" />
          {SITE.name}
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="rounded-lg px-3 py-2 text-sm text-muted hover:text-fg">{n.label}</Link>
          ))}
        </nav>
        <div className="flex items-center gap-1">
          <ThemeToggle />
          {env.loginUrl && <ButtonLink href={env.loginUrl} variant="ghost" className="hidden sm:inline-flex">Log in</ButtonLink>}
          <ButtonLink href="/contact" className="hidden sm:inline-flex">Get started</ButtonLink>
        </div>
      </Container>
      {/* Mobile nav: no-JS disclosure, keyboard accessible */}
      <details className="border-t border-border md:hidden">
        <summary className="cursor-pointer px-5 py-3 text-sm text-muted">Menu</summary>
        <nav aria-label="Mobile" className="flex flex-col px-5 pb-4">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="py-2 text-sm">{n.label}</Link>
          ))}
          <Link href="/contact" className="py-2 text-sm font-medium text-accent">Get started</Link>
        </nav>
      </details>
    </header>
  );
}
