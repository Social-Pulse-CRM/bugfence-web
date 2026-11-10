import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { ButtonLink } from '@/components/ui/button';
import { ShieldAlert, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <div className="inline-flex items-center gap-2 rounded-full border border-danger/30 bg-danger/10 px-3.5 py-1 font-mono text-xs font-semibold text-danger">
        <ShieldAlert className="size-3.5" />
        <span>404 — PAGE NOT FOUND</span>
      </div>
      <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-fg sm:text-5xl">
        Lost in the Fenced Perimeter
      </h1>
      <p className="mt-4 max-w-md text-base leading-relaxed text-muted">
        The page you requested doesn&apos;t exist, was moved, or is temporarily inaccessible.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <ButtonLink href="/">
          <ArrowLeft className="size-4" /> Return to Home
        </ButtonLink>
        <ButtonLink href="/contact/" variant="secondary">
          Contact Engineering Support
        </ButtonLink>
      </div>
    </Container>
  );
}
