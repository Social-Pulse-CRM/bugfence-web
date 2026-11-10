import type { Metadata } from 'next';
import { LegalLayout } from '@/components/layout/legal-layout';
import { LEGAL } from '@/content/legal';

const doc = LEGAL.dpa!;
export const metadata: Metadata = {
  title: 'Data Processing Addendum (DPA)',
  description: 'GDPR and CCPA controllership details: BugFence runs on customer infrastructure, ensuring zero customer session data reaches third parties.',
  alternates: { canonical: '/dpa/' },
};

export default function Page() {
  return <LegalLayout doc={doc} />;
}
