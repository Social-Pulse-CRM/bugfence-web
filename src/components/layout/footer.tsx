import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { FOOTER, SITE } from '@/content/site';

export function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <Container>
        <div className="grid gap-8 sm:grid-cols-4">
          <div>
            <p className="font-semibold">{SITE.name}</p>
            <p className="mt-2 text-sm text-muted">{SITE.tagline}.</p>
          </div>
          {Object.entries(FOOTER).map(([group, links]) => (
            <nav key={group} aria-label={group}>
              <p className="mb-3 text-sm font-medium">{group}</p>
              <ul className="space-y-2 text-sm text-muted">
                {links.map((l) => (
                  <li key={l.href}><Link href={l.href} className="hover:text-fg">{l.label}</Link></li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <p className="mt-10 text-xs text-muted">© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
      </Container>
    </footer>
  );
}
