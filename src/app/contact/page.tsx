import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/page-header';
import { Container } from '@/components/ui/container';
import { ContactForm } from '@/components/contact/contact-form';
import { env } from '@/lib/env';
import { Mail, Shield, CheckCircle2, Server } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Engineering & Sales',
  description: 'Inquire about BugFence Enterprise private VPC licensing, architectural evaluation, custom pilots, or security audits.',
  alternates: { canonical: '/contact/' },
  openGraph: {
    title: 'Contact BugFence - Enterprise Licensing & Architecture Support',
    description: 'Direct inquiries for offline VPC licensing, SLA agreements, and security architecture reviews.',
    url: '/contact/',
  },
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact & Inquiries"
        title="Connect With Our Engineering Team"
        intro="Have questions regarding private VPC architecture, offline enterprise licence keys, or custom integrations? We read and respond to every message."
      />

      <Container className="py-14">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr]">
          {/* Left Column: Direct Channels & Architecture Notes */}
          <div className="space-y-8">
            <div className="space-y-3">
              <h2 className="text-xl font-bold text-fg">Direct Inquiry Channels</h2>
              <p className="text-sm leading-relaxed text-muted">
                BugFence is engineered by systems developers for software organizations. Select the channel that fits your need:
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4 rounded-card border border-border bg-surface p-5">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <Mail className="size-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-fg">General & Enterprise Desk</h3>
                  <p className="mt-1 text-xs text-muted">Licensing, custom procurement, and questions:</p>
                  {env.contactEmail ? (
                    <a href={`mailto:${env.contactEmail}`} className="mt-1.5 inline-block text-sm font-semibold text-accent underline">
                      {env.contactEmail}
                    </a>
                  ) : (
                    <p className="mt-1.5 text-sm font-mono text-fg">sales@bugfence.io</p>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-card border border-border bg-surface p-5">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
                  <Shield className="size-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-fg">Security & Disclosure</h3>
                  <p className="mt-1 text-xs text-muted">Vulnerability reporting & security audits:</p>
                  <p className="mt-1.5 text-sm font-mono text-fg">security@bugfence.io</p>
                  <p className="mt-1 text-[11px] text-muted">
                    See <a href="/.well-known/security.txt" className="text-accent underline">security.txt</a> for PGP / disclosure policy.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-card border border-border bg-surface p-5">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-elevated text-fg">
                  <Server className="size-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-fg">Community Self-Hosting</h3>
                  <p className="mt-1 text-xs text-muted">Docker setups, bug reports & CLI feedback:</p>
                  <p className="mt-1.5 text-sm text-fg">Open an issue or discussion on our GitHub repo.</p>
                </div>
              </div>
            </div>

            <div className="rounded-card border border-accent/20 bg-accent/5 p-5 text-xs text-muted space-y-2">
              <div className="flex items-center gap-2 font-semibold text-fg">
                <CheckCircle2 className="size-4 text-accent" /> Privacy Notice
              </div>
              <p>
                We never sell or share contact details with advertisers. No behavioral tracking cookies or third-party CRM pixels are active on this site.
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Client Form */}
          <ContactForm />
        </div>
      </Container>
    </>
  );
}
