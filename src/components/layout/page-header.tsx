import { Container } from '@/components/ui/container';

export function PageHeader({ eyebrow, title, intro }: { eyebrow?: string; title: string; intro?: string }) {
  return (
    <div className="border-b border-border py-14 sm:py-20">
      <Container>
        {eyebrow && <p className="mb-2 text-sm font-medium text-accent">{eyebrow}</p>}
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">{title}</h1>
        {intro && <p className="mt-4 max-w-2xl text-lg text-muted">{intro}</p>}
      </Container>
    </div>
  );
}
