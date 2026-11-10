import { Hero } from '@/components/sections/hero';
import {
  PainPoints,
  HowItWorks,
  AgentSection,
  FeatureGrid,
  IntegrationsSection,
} from '@/components/sections/home-sections';
import { InstallSection } from '@/components/sections/install-section';
import { FaqSection } from '@/components/sections/faq-section';
import { Section } from '@/components/ui/section';
import { ButtonLink } from '@/components/ui/button';
import { RedactionDemo } from '@/features/redaction-demo/redaction-demo';
import { FAQ } from '@/content/home';
import { JsonLd } from '@/components/seo/json-ld';
import { getOrganizationSchema, getSoftwareApplicationSchema, getHomeFaqSchema } from '@/lib/schema';
import { ArrowRight, ShieldCheck } from 'lucide-react';

export default function HomePage() {
  return (
    <>
      <JsonLd schema={getOrganizationSchema()} />
      <JsonLd schema={getSoftwareApplicationSchema()} />
      <JsonLd schema={getHomeFaqSchema()} />

      <Hero />
      <PainPoints />
      <HowItWorks />

      {/* Redaction Interactive Demo Section */}
      <Section
        id="demo"
        eyebrow="Interactive Privacy Playground"
        title="Experience Client-Side Redaction in Real Time"
        intro="Edit the raw data on the left or test sample checkout payloads. Watch how BugFence scrubs credentials directly in the browser before any network dispatch."
      >
        <RedactionDemo />
      </Section>

      <AgentSection />
      <FeatureGrid />
      <IntegrationsSection />
      <InstallSection />
      <FaqSection items={FAQ} />

      {/* Final Action Callout */}
      <section className="py-20 border-t border-border bg-gradient-to-b from-surface to-bg">
        <div className="mx-auto max-w-4xl px-5 text-center sm:px-8 space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3.5 py-1 text-xs font-semibold text-accent">
            <ShieldCheck className="size-4" /> Ready for Production SaaS
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-5xl text-fg">
            Stop Guessing Bugs. Start Debugging Real Evidence.
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted">
            Integrate the zero-dependency widget in 5 minutes. No user extensions, no data leakage, and full self-hosting freedom.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <ButtonLink href="#install" className="text-base font-semibold px-6 py-3">
              Install the Widget
            </ButtonLink>
            <ButtonLink href="/pricing/" variant="secondary" className="text-base font-semibold px-6 py-3">
              View Licensing & Pricing <ArrowRight className="size-4" />
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
