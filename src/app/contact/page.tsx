import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/page-header';
import { Container } from '@/components/ui/container';
import { env } from '@/lib/env';

export const metadata: Metadata = { title: 'Contact', alternates: { canonical: '/contact' } };

export default function ContactPage() {
  return (
    <>
      <PageHeader eyebrow="Contact" title="Talk to us" intro="Questions, licensing or security? We read everything." />
      <Container narrow className="py-12">
        {env.contactEmail ? (
          <p>Email us at <a className="text-accent underline" href={`mailto:${env.contactEmail}`}>{env.contactEmail}</a>.</p>
        ) : (
          <p className="text-muted">Contact details are being finalised.</p>
        )}
      </Container>
    </>
  );
}
