import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/page-header';
import { Container } from '@/components/ui/container';
import { ButtonLink } from '@/components/ui/button';
import { FaqSection } from '@/components/sections/faq-section';
import { PLANS, FEATURE_MATRIX, PRICING_FAQ } from '@/content/pricing';
import { JsonLd } from '@/components/seo/json-ld';
import { getPricingFaqSchema } from '@/lib/schema';
import { Check, ShieldCheck, Sparkles, Server } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Pricing & Licensing',
  description: 'Transparent pricing for BugFence. Start free with the self-hosted Community Edition or scale with Enterprise offline licensing.',
  alternates: { canonical: '/pricing/' },
};

export default function PricingPage() {
  return (
    <>
      <JsonLd schema={getPricingFaqSchema()} />

      <PageHeader
        eyebrow="Licensing & Tiers"
        title="Privacy-First Triage. Transparent Pricing."
        intro="Start 100% free on your own infrastructure. Scale with offline cryptographically-verified Enterprise licences when you need custom VPC scale."
      />

      {/* Main Tier Cards */}
      <Container className="py-14">
        <div className="grid gap-8 lg:grid-cols-2">
          {PLANS.map((p) => (
            <section
              key={p.id}
              aria-labelledby={`plan-${p.id}`}
              className={`relative flex flex-col rounded-card border bg-surface p-8 transition-all ${
                p.highlight
                  ? 'border-accent shadow-[0_0_50px_-15px_var(--accent)] ring-1 ring-accent/30'
                  : 'border-border'
              }`}
            >
              {p.highlight && (
                <span className="absolute -top-3.5 right-6 inline-flex items-center gap-1.5 rounded-full bg-accent px-3.5 py-0.5 text-xs font-semibold text-accent-fg shadow-sm">
                  <Sparkles className="size-3" /> {p.badge}
                </span>
              )}
              {!p.highlight && (
                <span className="absolute -top-3.5 right-6 inline-flex items-center gap-1.5 rounded-full border border-border bg-elevated px-3 py-0.5 text-xs font-medium text-muted">
                  <Server className="size-3 text-accent" /> {p.badge}
                </span>
              )}

              <div>
                <h2 id={`plan-${p.id}`} className="text-2xl font-bold tracking-tight">
                  {p.name}
                </h2>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-5xl font-extrabold tracking-tight">{p.price}</span>
                  <span className="text-sm font-medium text-muted">{p.cadence}</span>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted">{p.blurb}</p>
              </div>

              <div className="my-8 h-px bg-border" />

              <div className="flex-1">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted">Included Capabilities</p>
                <ul className="mt-4 space-y-3 text-sm">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <Check className="mt-0.5 size-4 shrink-0 text-accent" />
                      <span className="text-fg/90">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-4">
                <ButtonLink
                  href={p.cta.href}
                  variant={p.highlight ? 'primary' : 'secondary'}
                  className="w-full text-base font-semibold"
                >
                  {p.cta.label}
                </ButtonLink>
              </div>
            </section>
          ))}
        </div>

        {/* Feature Matrix */}
        <div className="mt-24">
          <div className="mb-10 text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-accent">Feature Comparison</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Compare Editions Side by Side</h2>
            <p className="mt-3 text-muted">Zero paywalled diagnostics. Technical context is included in every edition.</p>
          </div>

          <div className="overflow-x-auto rounded-card border border-border bg-surface">
            <table className="w-full min-w-[640px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-border bg-elevated/70">
                  <th scope="col" className="p-4 font-semibold text-fg">Capabilities</th>
                  <th scope="col" className="w-1/4 p-4 font-semibold text-fg">Community (Free)</th>
                  <th scope="col" className="w-1/4 p-4 font-semibold text-accent">Enterprise (VPC)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {FEATURE_MATRIX.map((group) => (
                  <tr key={group.category} className="contents">
                    <td colSpan={3} className="border-b border-t border-border bg-elevated/40 px-4 py-3 font-semibold text-fg">
                      {group.category}
                    </td>
                    {group.items.map((item) => (
                      <tr key={item.name} className="hover:bg-elevated/20 transition-colors">
                        <td className="p-4 text-muted">{item.name}</td>
                        <td className="p-4 font-medium text-fg">{item.community}</td>
                        <td className="p-4 font-semibold text-accent">{item.enterprise}</td>
                      </tr>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Trust Guarantee Note */}
        <div className="mt-12 rounded-card border border-border bg-elevated/40 p-6 sm:flex sm:items-center sm:justify-between sm:gap-6">
          <div className="flex items-center gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent">
              <ShieldCheck className="size-6" />
            </div>
            <div>
              <p className="font-semibold text-fg">Zero Third-Party Data Transmission Guarantee</p>
              <p className="text-sm text-muted">
                BugFence runs within your security perimeter. We never see your users&apos; sessions, error dumps, or credentials.
              </p>
            </div>
          </div>
          <div className="mt-4 sm:mt-0 sm:shrink-0">
            <ButtonLink href="/security/" variant="secondary" className="w-full sm:w-auto">
              Read Security Whitepaper
            </ButtonLink>
          </div>
        </div>
      </Container>

      <FaqSection items={PRICING_FAQ} title="Frequently Asked Licensing Questions" />
    </>
  );
}
