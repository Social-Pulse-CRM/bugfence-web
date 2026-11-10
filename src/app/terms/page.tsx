import type { Metadata } from 'next';
import { LegalLayout } from '@/components/layout/legal-layout';
import { LEGAL } from '@/content/legal';

const doc = LEGAL.terms!;
export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms governing use of BugFence website, software documentation, Community Edition licensing, and Enterprise terms.',
  alternates: { canonical: '/terms/' },
};

export default function Page() {
  return <LegalLayout doc={doc} />;
}
