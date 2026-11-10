import { Container } from '@/components/ui/container';
import { PageHeader } from './page-header';
import type { LegalDoc } from '@/content/legal';
import { ShieldCheck } from 'lucide-react';

export function LegalLayout({ doc }: { doc: LegalDoc }) {
  return (
    <>
      <PageHeader title={doc.title} intro={`Effective date: ${doc.updated}`} />
      <Container narrow className="py-12">
        <div className="mb-8 flex items-start gap-3 rounded-card border border-border bg-surface p-4 text-sm text-muted">
          <ShieldCheck className="mt-0.5 size-5 shrink-0 text-accent" />
          <p>
            This policy applies to BugFence web services and documentation. For self-hosted instances of BugFence, all bug reports, technical telemetry, and diagnostic media remain under the exclusive control and ownership of your organization.
          </p>
        </div>
        <div className="space-y-6">
          {doc.sections.map((s) => (
            <section key={s.heading ?? s.paragraphs?.[0]}>
              {s.heading && <h2 className="mb-3 mt-8 text-xl font-semibold text-fg">{s.heading}</h2>}
              {s.paragraphs?.map((p) => (
                <p key={p} className="mb-3 text-muted leading-relaxed">{p}</p>
              ))}
              {s.bullets && (
                <ul className="ml-5 list-disc space-y-2 text-muted leading-relaxed">
                  {s.bullets.map((b) => <li key={b}>{b}</li>)}
                </ul>
              )}
            </section>
          ))}
        </div>
      </Container>
    </>
  );
}
