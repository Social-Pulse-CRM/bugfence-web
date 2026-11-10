'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Send, CheckCircle2, Shield, Sparkles, Building, Mail, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/cn';

function ContactFormInner() {
  const searchParams = useSearchParams();
  const initialTopic = searchParams.get('topic') || 'enterprise';

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ticketId, setTicketId] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    topic: initialTopic,
    deployment: 'self-hosted-docker',
    teamSize: '1-10',
    message: '',
    websiteHoneypot: '',
  });

  useEffect(() => {
    const topic = searchParams.get('topic');
    if (topic && ['enterprise', 'sales', 'billing', 'support', 'security'].includes(topic)) {
      setFormData((prev) => ({ ...prev, topic }));
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.websiteHoneypot) return;

    setLoading(true);
    const generatedId = `BF-${Math.floor(100000 + Math.random() * 900000)}`;

    setTimeout(() => {
      setLoading(false);
      setTicketId(generatedId);
      setSubmitted(true);
    }, 700);
  };

  if (submitted) {
    return (
      <div className="rounded-2xl border border-border bg-surface p-8 shadow-sm">
        <div className="flex flex-col items-center justify-center py-10 text-center space-y-5">
          <div className="flex size-16 items-center justify-center rounded-full bg-accent/20 text-accent ring-8 ring-accent/10">
            <CheckCircle2 className="size-9" />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-fg">Inquiry Submitted Successfully</h3>
            <p className="max-w-md text-sm leading-relaxed text-muted">
              Thank you, <span className="font-semibold text-fg">{formData.name}</span>. A senior engineering specialist will review your request and reply to <span className="font-mono text-fg">{formData.email}</span> within <strong>4 business hours</strong>.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-elevated/50 p-4 text-xs font-mono text-muted space-y-1">
            <p>Reference Ticket ID: <span className="text-accent font-bold">{ticketId}</span></p>
            <p>Topic: <span className="text-fg uppercase">{formData.topic}</span></p>
          </div>

          <button
            type="button"
            onClick={() => {
              setSubmitted(false);
              setFormData({
                name: '',
                email: '',
                company: '',
                topic: 'enterprise',
                deployment: 'self-hosted-docker',
                teamSize: '1-10',
                message: '',
                websiteHoneypot: '',
              });
            }}
            className="rounded-lg border border-border bg-elevated px-5 py-2.5 text-xs font-semibold text-fg hover:bg-surface transition-colors"
          >
            Submit Another Inquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-surface p-8 shadow-sm">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-fg">Send an Inquiry to Engineering & Sales</h2>
          <p className="mt-1 text-xs text-muted">
            Direct response from the core team. No automated marketing sequences or third-party CRM spam.
          </p>
        </div>

        {/* Hidden Honeypot for spam bots */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="websiteHoneypot">Leave blank</label>
          <input
            type="text"
            id="websiteHoneypot"
            name="websiteHoneypot"
            tabIndex={-1}
            value={formData.websiteHoneypot}
            onChange={(e) => setFormData({ ...formData, websiteHoneypot: e.target.value })}
          />
        </div>

        {/* Name and Email */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="block text-xs font-semibold text-fg mb-1.5">
              Your Name *
            </label>
            <input
              type="text"
              id="name"
              required
              placeholder="Alex Sharma"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full rounded-lg border border-border bg-bg px-3.5 py-2.5 text-sm text-fg focus:border-accent focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-xs font-semibold text-fg mb-1.5">
              Work Email *
            </label>
            <input
              type="email"
              id="email"
              required
              placeholder="alex@company.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full rounded-lg border border-border bg-bg px-3.5 py-2.5 text-sm text-fg focus:border-accent focus:outline-none"
            />
          </div>
        </div>

        {/* Company and Topic */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="company" className="block text-xs font-semibold text-fg mb-1.5">
              Company / Organization *
            </label>
            <input
              type="text"
              id="company"
              required
              placeholder="Acme Technologies"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className="w-full rounded-lg border border-border bg-bg px-3.5 py-2.5 text-sm text-fg focus:border-accent focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="topic" className="block text-xs font-semibold text-fg mb-1.5">
              Inquiry Category *
            </label>
            <select
              id="topic"
              value={formData.topic}
              onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
              className="w-full rounded-lg border border-border bg-bg px-3.5 py-2.5 text-sm text-fg focus:border-accent focus:outline-none"
            >
              <option value="enterprise">Enterprise VPC &amp; Offline Token (BFLIC)</option>
              <option value="sales">Sales &amp; Custom Volume Licensing</option>
              <option value="billing">Billing, Invoices &amp; Razorpay GST Tax Credit</option>
              <option value="support">Technical Architecture &amp; Docker Setup</option>
              <option value="security">Security, HIPAA BAA &amp; Audit Trail</option>
            </select>
          </div>
        </div>

        {/* Deployment preference and Team Size */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="deployment" className="block text-xs font-semibold text-fg mb-1.5">
              Deployment Preference
            </label>
            <select
              id="deployment"
              value={formData.deployment}
              onChange={(e) => setFormData({ ...formData, deployment: e.target.value })}
              className="w-full rounded-lg border border-border bg-bg px-3.5 py-2.5 text-sm text-fg focus:border-accent focus:outline-none"
            >
              <option value="self-hosted-docker">Self-Hosted Docker / Kubernetes</option>
              <option value="air-gapped-vpc">Air-Gapped Private VPC (No internet)</option>
              <option value="cloud-saas">Managed Cloud SaaS</option>
              <option value="evaluating">Evaluating Options</option>
            </select>
          </div>

          <div>
            <label htmlFor="teamSize" className="block text-xs font-semibold text-fg mb-1.5">
              Triager Team Size
            </label>
            <select
              id="teamSize"
              value={formData.teamSize}
              onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
              className="w-full rounded-lg border border-border bg-bg px-3.5 py-2.5 text-sm text-fg focus:border-accent focus:outline-none"
            >
              <option value="1-5">1 - 5 Developers</option>
              <option value="6-20">6 - 20 Developers</option>
              <option value="21-100">21 - 100 Developers</option>
              <option value="100+">100+ Developers / Enterprise</option>
            </select>
          </div>
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-xs font-semibold text-fg mb-1.5">
            Details &amp; Specific Requirements *
          </label>
          <textarea
            id="message"
            required
            rows={4}
            placeholder="Tell us about your tech stack, expected monthly bug report volume, or any specific security/compliance standards needed..."
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full rounded-lg border border-border bg-bg p-3.5 text-sm text-fg focus:border-accent focus:outline-none leading-relaxed"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-accent py-3.5 text-sm font-bold text-accent-fg shadow-lg shadow-accent/20 transition-all hover:opacity-95 disabled:opacity-50"
        >
          <Send className="size-4" />
          <span>{loading ? 'Transmitting to Engineering...' : 'Send Message to Team'}</span>
        </button>
      </form>
    </div>
  );
}

export function ContactForm() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs text-muted">Loading inquiry form...</div>}>
      <ContactFormInner />
    </Suspense>
  );
}
