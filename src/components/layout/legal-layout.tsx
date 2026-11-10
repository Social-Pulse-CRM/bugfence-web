import { Container } from '@/components/ui/container';
import { PageHeader } from './page-header';
import type { LegalDoc } from '@/content/legal';

/** Shared prose layout for legal pages. Content is template text pending counsel review. */
export function LegalLayout({ doc }: { doc: LegalDoc }) {
  return (
    <>
      <PageHeader title={doc.title} intro={`Last updated: ${doc.updated}`} />
      <Container narrow className="py-12">
        <div role="note" className="mb-8 rounded-card border border-border bg-surface p-4 text-sm text-muted">
          Draft template. This text has not yet been reviewed by legal counsel and will be finalised before launch.
        </div>
        <div className="space-y-4">
          {doc.sections.map((s) => (
            <section key={s.heading ?? s.paragraphs?.[0]}>
              {s.heading && <h2 className="mb-2 mt-6 text-xl font-semibold">{s.heading}</h2>}
              {s.paragraphs?.map((p) => <p key={p} className="mb-3 text-muted">{p}</p>)}
              {s.bullets && <ul className="ml-5 list-disc space-y-1 text-muted">{s.bullets.map((b) => <li key={b}>{b}</li>)}</ul>}
            </section>
          ))}
        </div>
      </Container>
    </>
  );
}
