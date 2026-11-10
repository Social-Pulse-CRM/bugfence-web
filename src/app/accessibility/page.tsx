import type { Metadata } from 'next';
import { LegalLayout } from '@/components/layout/legal-layout';
import { LEGAL } from '@/content/legal';

const doc = LEGAL.accessibility!;
export const metadata: Metadata = { title: doc.title, alternates: { canonical: '/accessibility' } };

export default function Page() {
  return <LegalLayout doc={doc} />;
}

