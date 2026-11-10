import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/page-header';
import { Section } from '@/components/ui/section';
import { Card } from '@/components/ui/card';
import { SECURITY } from '@/content/security';

export const metadata: Metadata = { title: 'Security', alternates: { canonical: '/security' } };

function List({ items }: { items: readonly string[] }) {
  return (
    <ul className="space-y-2 text-sm text-muted">
      {items.map((i) => (
        <li key={i} className="flex gap-2"><span aria-hidden="true" className="text-accent">•</span><span>{i}</span></li>
      ))}
    </ul>
  );
}

export default function SecurityPage() {
  return (
    <>
      <PageHeader eyebrow="Security & privacy" title="Honest about what we protect, and what we don't" intro="BugFence handles sensitive data before it leaves the browser. Here is how, including the limits." />
      <Section title="What a report can contain"><Card><List items={SECURITY.collected} /></Card></Section>
      <Section title="How it is protected"><Card><List items={SECURITY.protections} /></Card></Section>
      <Section title="Known limitations" intro="We would rather you hear these from us."><Card><List items={SECURITY.limits} /></Card></Section>
      <Section title="Where your data lives">
        <p className="max-w-2xl text-muted">The documented deployment model is self-hosted: reports stay on infrastructure you operate. The only third parties involved are ones you configure, such as an AI provider or ticketing integration.</p>
      </Section>
      <Section title="Report a vulnerability">
        <p className="max-w-2xl text-muted">See our <a className="text-accent underline" href="/.well-known/security.txt">security.txt</a> for how to reach us.</p>
      </Section>
    </>
  );
}
