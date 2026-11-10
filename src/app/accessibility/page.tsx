import type { Metadata } from 'next';
import { LegalLayout } from '@/components/layout/legal-layout';
import { LEGAL } from '@/content/legal';

const doc = LEGAL.accessibility!;
export const metadata: Metadata = {
  title: 'Accessibility Statement',
  description: 'BugFence commitment to WCAG 2.2 AA standards across developer widgets and marketing interfaces.',
  alternates: { canonical: '/accessibility/' },
};

export default function Page() {
  return <LegalLayout doc={doc} />;
}
