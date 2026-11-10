import type { Metadata } from 'next';
import { LegalLayout } from '@/components/layout/legal-layout';
import { LEGAL } from '@/content/legal';

const doc = LEGAL.privacy!;
export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'BugFence privacy principles: zero third-party tracking, client-side DOM redaction before transmission, and self-hosted data ownership.',
  alternates: { canonical: '/privacy/' },
};

export default function Page() {
  return <LegalLayout doc={doc} />;
}
