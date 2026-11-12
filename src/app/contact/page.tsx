import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/page-header';
import { Container } from '@/components/ui/container';
import { ContactForm } from '@/components/contact/contact-form';
import { env } from '@/lib/env';
import { Mail, Shield, CheckCircle2, Server, CreditCard, Clock, Globe, Building2, HelpCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Engineering & Sales - BugFence',
  description: 'Inquire about BugFence Enterprise private VPC licensing, architectural evaluation, custom pilots, Razorpay GST invoices, or security audits.',
  alternates: { canonical: '/contact/' },
  openGraph: {
    title: 'Contact BugFence - Enterprise Licensing & Architecture Support',
    description: 'Direct inquiries for offline VPC licensing, SLA agreements, and security architecture reviews.',
    url: '/contact/',
  },
};

const CONTACT_CHANNELS = [
  {
    icon: Building2,
    title: 'Enterprise & Sales Licensing',
    email: env.emails.sales,
    desc: 'Air-gapped VPC deployments, BFLIC offline tokens, custom MSA & procurement.',
    accent: 'text-accent bg-accent/10',
  },
  {
    icon: Server,
    title: 'Technical Support & Architecture',
    email: env.emails.support,
    desc: 'Docker setups, PostgreSQL storage, MCP server for Claude/Cursor, and source maps.',
    accent: 'text-secondary bg-secondary/10',
  },
  {
    icon: CreditCard,
    title: 'Billing, Stripe & Razorpay GST',
    email: env.emails.billing,
    desc: 'Subscription management, UPI / card payments, and 18% GST B2B tax invoices.',
    accent: 'text-accent bg-accent/10',
  },
  {
    icon: Shield,
    title: 'Security & Responsible Disclosure',
    email: env.emails.security,
    desc: 'Vulnerability disclosures and security audit documentation. See security.txt.',
    accent: 'text-red-500 bg-red-500/10',
  },
];

const CONTACT_FAQS = [
  {
    q: 'Who is the legal contracting and billing entity for BugFence?',
    a: 'BugFence is a software product developed, owned, and operated by SocialPulse CRM. All commercial agreements, Enterprise Master Services Agreements (MSAs), bank payments, and GST tax invoices are formally executed under SocialPulse CRM (Proprietorship / Registered Entity).',
  },
  {
    q: 'Do you offer an enterprise proof-of-concept (POC)?',
    a: 'Yes. We provide 30-day guided evaluation licenses with full access to the Enterprise edition, including offline cryptographic tokens (BFLIC), SAML 2.0 SSO, and dedicated architecture support.',
  },
  {
    q: 'How do Indian businesses receive GST tax invoices?',
    a: `When paying via Razorpay in INR (₹), simply provide your 15-digit GSTIN during checkout or email ${env.emails.billing}. We generate an official, compliant B2B tax invoice issued by SocialPulse CRM featuring our registered 15-digit GSTIN so your organization can claim 100% of the 18% input tax credit (ITC).`,
  },
  {
    q: 'How does the offline cryptographic license work in private VPCs?',
    a: 'The Enterprise edition uses cryptographically signed tokens (BFLIC.<payload>.<hmac_sha256>). Your server validates the license completely offline without making outbound network pings, ideal for air-gapped defense, finance, and healthcare environments.',
  },
  {
    q: 'What is your response time SLA?',
    a: 'We respond to all technical and sales inquiries in under 4 hours during business days across IST (GMT+5:30), UTC, and EST timezones. Critical enterprise incidents have a 1-hour response SLA.',
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Direct Engineering & Sales Access"
        title="Connect With Our Core Team"
        intro="Have questions regarding private VPC architecture, offline enterprise licence keys, Razorpay GST invoices, or custom integrations? We read and respond to every message."
      />

      <Container className="py-14 space-y-16">
        {/* Main 2-Column Section */}
        <div className="grid gap-12 lg:grid-cols-[1fr_1.35fr]">
          {/* Left Column: Direct Inquiries & Corporate Channels */}
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-3 py-0.5 text-xs font-semibold text-accent">
                <Clock className="size-3.5" />
                <span>Response Time SLA: Under 4 Hours</span>
              </div>
              <h2 className="text-2xl font-bold text-fg">Direct Team Channels</h2>
              <p className="text-sm leading-relaxed text-muted">
                BugFence is engineered by developers for software organizations. Reach out to the dedicated desk for your query:
              </p>
            </div>

            {/* Channel Cards */}
            <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-1">
              {CONTACT_CHANNELS.map((ch) => {
                const IconComponent = ch.icon;
                return (
                  <div
                    key={ch.title}
                    className="flex items-start gap-4 rounded-xl border border-border bg-surface p-4 transition-all hover:border-border/80"
                  >
                    <div className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${ch.accent}`}>
                      <IconComponent className="size-5" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-fg text-sm">{ch.title}</h3>
                      <p className="mt-0.5 text-xs text-muted leading-tight">{ch.desc}</p>
                      <a
                        href={`mailto:${ch.email}`}
                        className="mt-1.5 inline-block text-xs font-mono font-semibold text-accent underline decoration-accent/40 hover:decoration-accent"
                      >
                        {ch.email}
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Corporate & Privacy Assurance Card */}
            <div className="rounded-xl border border-border bg-elevated/40 p-4 space-y-2 text-xs">
              <div className="flex items-center gap-2 font-bold text-fg">
                <Globe className="size-4 text-accent" />
                <span>Social Pulse CRM · Global &amp; Indian Operations</span>
              </div>
              <p className="text-muted leading-relaxed">
                Operating in IST (GMT+5:30), UTC, and EST. No third-party behavioral cookies, data scrapers, or CRM marketing trackers are loaded on this website.
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Category-Aware Contact Form */}
          <ContactForm />
        </div>

        {/* Contact FAQ Section */}
        <div className="border-t border-border pt-12">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-2xl font-bold tracking-tight text-fg">Common Licensing &amp; Deployment Questions</h2>
            <p className="mt-1 text-sm text-muted">Quick answers to common enterprise and payment inquiries.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {CONTACT_FAQS.map((faq) => (
              <div key={faq.q} className="rounded-xl border border-border bg-surface p-6 space-y-2">
                <h3 className="font-bold text-sm text-fg flex items-start gap-2">
                  <HelpCircle className="size-4 text-accent shrink-0 mt-0.5" />
                  <span>{faq.q}</span>
                </h3>
                <p className="text-xs leading-relaxed text-muted pl-6">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </>
  );
}
