import { Hero } from '@/components/sections/hero';
import { PainPoints, HowItWorks, FeatureGrid } from '@/components/sections/home-sections';
import { InstallSection } from '@/components/sections/install-section';
import { FaqSection } from '@/components/sections/faq-section';
import { Section } from '@/components/ui/section';
import { ButtonLink } from '@/components/ui/button';
import { RedactionDemo } from '@/features/redaction-demo/redaction-demo';
import { FAQ } from '@/content/home';

export default function HomePage() {
  return (
    <>
      <Hero />
      <PainPoints />
      <HowItWorks />
      <Section id="demo" eyebrow="Try it" title="See redaction work" intro="Edit the text on the left. This runs locally in your page.">
        <RedactionDemo />
      </Section>
      <FeatureGrid />
      <InstallSection />
      <FaqSection items={FAQ} />
      <Section title="Ready to try it?">
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/contact">Get started</ButtonLink>
          <ButtonLink href="/security" variant="secondary">Read how we handle data</ButtonLink>
        </div>
      </Section>
    </>
  );
}
