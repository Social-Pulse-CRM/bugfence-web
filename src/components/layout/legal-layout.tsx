import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { PageHeader } from './page-header';
import { ButtonLink } from '@/components/ui/button';
import type { LegalDoc } from '@/content/legal';
import { ShieldCheck, Mail, ArrowRight, FileText, CheckCircle2 } from 'lucide-react';

const LEGAL_NAV = [
  { href: '/privacy/', label: 'Privacy Policy', slug: 'privacy' },
  { href: '/terms/', label: 'Terms of Service', slug: 'terms' },
  { href: '/cookies/', label: 'Cookie Policy', slug: 'cookies' },
  { href: '/dpa/', label: 'Data Processing (DPA)', slug: 'dpa' },
  { href: '/accessibility/', label: 'Accessibility', slug: 'accessibility' },
  { href: '/security/', label: 'Security Architecture', slug: 'security' },
];

export function LegalLayout({ doc }: { doc: LegalDoc }) {
  return (
    <>
      <PageHeader
        eyebrow="Compliance & Legal Center"
        title={doc.title}
        intro={`Effective date: ${doc.updated} • BugFence & SocialPulse CRM`}
      />

      {/* Legal Sub-Navigation Bar */}
      <div className="border-b border-border bg-surface/50 backdrop-blur-sm sticky top-16 z-20">
        <Container>
          <nav className="flex items-center gap-2 overflow-x-auto sm:flex-wrap py-2.5 text-xs no-scrollbar" aria-label="Legal documents">
            {LEGAL_NAV.map((item) => {
              const isActive = item.slug === doc.slug;
              return (
                <Link
                  key={item.slug}
                  href={item.href}
                  className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-1.5 font-medium transition-colors ${
                    isActive
                      ? 'bg-accent text-accent-fg font-semibold shadow-xs'
                      : 'text-muted hover:bg-elevated hover:text-fg'
                  }`}
                >
                  <FileText className="size-3.5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </Container>
      </div>

      <Container narrow className="py-12 space-y-10">
        {/* Document Summary / Self-Hosted Privacy Notice */}
        <div className="rounded-card border border-accent/20 bg-accent/5 p-5 sm:p-6 space-y-3">
          <div className="flex items-center gap-2 text-accent text-sm font-semibold">
            <ShieldCheck className="size-5 shrink-0" />
            <span>Architecture & Privacy Boundary</span>
          </div>
          <p className="text-sm leading-relaxed text-muted">
            {doc.summary ||
              'This policy applies to BugFence web services and documentation. For self-hosted instances of BugFence, all bug reports, technical telemetry, and diagnostic media remain under the exclusive control and ownership of your organization.'}
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted/80 border-t border-border/50">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="size-3.5 text-emerald-500" /> Client-Side Redaction
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="size-3.5 text-emerald-500" /> Air-Gapped Offline Licensing
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="size-3.5 text-emerald-500" /> Zero Advertising Cookies
            </span>
          </div>
        </div>

        {/* Legal Document Sections */}
        <div className="space-y-8 divide-y divide-border/40">
          {doc.sections.map((s, idx) => {
            const sectionId = s.id || `section-${idx + 1}`;
            return (
              <section key={sectionId} id={sectionId} className={idx > 0 ? 'pt-8' : ''}>
                {s.heading && (
                  <h2 className="mb-4 text-xl font-bold tracking-tight text-fg group flex items-center justify-between">
                    <a href={`#${sectionId}`} className="hover:text-accent transition-colors">
                      {s.heading}
                    </a>
                  </h2>
                )}
                {s.paragraphs?.map((p, pIdx) => (
                  <p key={pIdx} className="mb-3.5 text-sm sm:text-base text-muted leading-relaxed">
                    {p}
                  </p>
                ))}
                {s.bullets && (
                  <ul className="my-4 ml-6 list-disc space-y-2.5 text-sm sm:text-base text-muted leading-relaxed">
                    {s.bullets.map((b, bIdx) => (
                      <li key={bIdx} className="pl-1">
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            );
          })}
        </div>

        {/* Footer Contact & Custom Agreement Callout */}
        <div className="mt-14 rounded-card border border-border bg-surface p-6 sm:p-8 space-y-4 text-center sm:text-left sm:flex sm:items-center sm:justify-between sm:space-y-0">
          <div className="space-y-1 max-w-xl">
            <h3 className="text-base font-bold text-fg flex items-center justify-center sm:justify-start gap-2">
              <Mail className="size-4 text-accent" /> Need a Signed DPA or Enterprise Procurement Terms?
            </h3>
            <p className="text-xs sm:text-sm text-muted">
              We execute mutual DPAs with Standard Contractual Clauses (SCCs), custom Master Services Agreements (MSAs), and Indian 18% GST tax invoices.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 sm:pt-0">
            <ButtonLink href="/contact/?topic=legal" className="text-xs min-h-9 px-4">
              Contact Legal Desk <ArrowRight className="size-3.5" />
            </ButtonLink>
          </div>
        </div>
      </Container>
    </>
  );
}
