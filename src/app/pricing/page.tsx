import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/page-header';
import { FaqSection } from '@/components/sections/faq-section';
import { PricingSection } from '@/components/pricing/pricing-section';
import { PRICING_FAQ } from '@/content/pricing';
import { JsonLd } from '@/components/seo/json-ld';
import { getPricingFaqSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Pricing & Licensing - BugFence',
  description:
    'Transparent pricing for BugFence: Free Community, Pro for developers, Business for scale-ups and agencies, and Enterprise offline VPC licensing.',
  alternates: { canonical: '/pricing/' },
};

export default function PricingPage() {
  return (
    <>
      <JsonLd schema={getPricingFaqSchema()} />

      <PageHeader
        eyebrow="Licensing & Tiers"
        title="Privacy-First Triage. Transparent Pricing."
        intro="Start 100% free with the open-core edition on your own infrastructure, or scale with Pro, Business, and offline cryptographically-verified Enterprise VPC licenses."
      />

      {/* Main Interactive Pricing Section */}
      <PricingSection />

      {/* FAQ Accordion */}
      <FaqSection items={PRICING_FAQ} title="Frequently Asked Licensing & Pricing Questions" />
    </>
  );
}
