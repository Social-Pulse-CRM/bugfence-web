import { Section } from '@/components/ui/section';

export function FaqSection({ items, title = 'Frequently asked questions' }: { items: readonly { q: string; a: string }[]; title?: string }) {
  return (
    <Section title={title}>
      <div className="max-w-3xl divide-y divide-border rounded-card border border-border">
        {items.map((i) => (
          <details key={i.q} className="group p-5">
            <summary className="cursor-pointer font-medium">{i.q}</summary>
            <p className="mt-2 text-sm text-muted">{i.a}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}
