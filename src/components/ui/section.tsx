import { Container } from '@/components/ui/container';
export function Section({ id, eyebrow, title, intro, children }: {
  id?: string; eyebrow?: string; title: string; intro?: string; children: React.ReactNode;
}) {
  return (
    <section id={id} className="py-16 sm:py-24">
      <Container>
        <div className="mb-10 max-w-2xl">
          {eyebrow && <p className="mb-2 text-sm font-medium text-accent">{eyebrow}</p>}
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
          {intro && <p className="mt-3 text-muted">{intro}</p>}
        </div>
        {children}
      </Container>
    </section>
  );
}
