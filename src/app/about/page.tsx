import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/page-header';
import { Container } from '@/components/ui/container';

export const metadata: Metadata = { title: 'About', alternates: { canonical: '/about' } };

export default function AboutPage() {
  return (
    <>
      <PageHeader eyebrow="About" title="Why BugFence exists" />
      <Container narrow className="space-y-4 py-12 text-muted">
        <p>Teams need real evidence to fix bugs, but screenshots and recordings can leak the very data users trust them with. BugFence is built around that tension: capture rich context, and handle sensitive data before it leaves the browser.</p>
        <p>It is self-hostable, so reports stay with the team that needs them.</p>
      </Container>
    </>
  );
}
