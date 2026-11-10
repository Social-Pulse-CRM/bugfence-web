import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/page-header';
import { Container } from '@/components/ui/container';
import { ButtonLink } from '@/components/ui/button';
import { FaqSection } from '@/components/sections/faq-section';
import { PLANS, PRICING_FAQ } from '@/content/pricing';

export const metadata: Metadata = { title: 'Pricing', alternates: { canonical: '/pricing' } };

export default function PricingPage() {
  return (
    <>
      <PageHeader eyebrow="Pricing" title="Simple, transparent plans" intro="Start free on your own infrastructure. Scale with a licence when you need more." />
      <Container className="grid gap-6 py-14 md:grid-cols-2">
        {PLANS.map((p) => (
          <section key={p.id} aria-labelledby={`plan-${p.id}`} className="flex flex-col rounded-card border border-border bg-surface p-7">
            <h2 id={`plan-${p.id}`} className="text-xl font-semibold">{p.name}</h2>
            <p className="mt-3 text-4xl font-semibold tracking-tight">
              {p.price} <span className="text-sm font-normal text-muted">{p.cadence}</span>
            </p>
            <p className="mt-3 text-sm text-muted">{p.blurb}</p>
            <ul className="mt-5 flex-1 space-y-2 text-sm">
              {p.features.map((f) => (
                <li key={f} className="flex gap-2"><span aria-hidden="true" className="text-accent">✓</span>{f}</li>
              ))}
            </ul>
            <ButtonLink href={p.cta.href} variant={p.id === 'community' ? 'primary' : 'secondary'} className="mt-6">{p.cta.label}</ButtonLink>
          </section>
        ))}
      </Container>
      <FaqSection items={PRICING_FAQ} title="Pricing questions" />
    </>
  );
}
