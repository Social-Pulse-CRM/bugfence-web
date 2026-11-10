'use client';

import { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    topic: 'enterprise',
    message: '',
    websiteHoneypot: '', // honeypot for spam bots
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Thwart bots triggering honeypot
    if (formData.websiteHoneypot) return;

    setLoading(true);
    // Simulate swift client submission state
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="rounded-card border border-border bg-surface p-8 shadow-sm">
      {submitted ? (
        <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
          <div className="flex size-14 items-center justify-center rounded-full bg-accent/15 text-accent">
            <CheckCircle2 className="size-8" />
          </div>
          <h3 className="text-2xl font-bold text-fg">Inquiry Received</h3>
          <p className="max-w-md text-sm leading-relaxed text-muted">
            Thank you for reaching out, <span className="font-semibold text-fg">{formData.name}</span>. An engineering specialist will review your request and get back to you at <span className="font-mono text-fg">{formData.email}</span> shortly.
          </p>
          <button
            type="button"
            onClick={() => {
              setSubmitted(false);
              setFormData({ name: '', email: '', company: '', topic: 'enterprise', message: '', websiteHoneypot: '' });
            }}
            className="mt-4 rounded-lg border border-border bg-elevated px-4 py-2 text-sm font-medium text-fg hover:bg-surface"
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h2 className="text-xl font-bold text-fg">Send a Message</h2>
            <p className="mt-1 text-xs text-muted">Fill out the details below and we will follow up with technical answers.</p>
          </div>

          {/* Honeypot field (hidden from view) */}
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

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="block text-xs font-semibold text-fg mb-1.5">
                Your Name *
              </label>
              <input
                type="text"
                id="name"
                required
                placeholder="Ana Sharma"
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
                placeholder="ana@company.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full rounded-lg border border-border bg-bg px-3.5 py-2.5 text-sm text-fg focus:border-accent focus:outline-none"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="company" className="block text-xs font-semibold text-fg mb-1.5">
                Company / Organization
              </label>
              <input
                type="text"
                id="company"
                placeholder="Acme Corp"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full rounded-lg border border-border bg-bg px-3.5 py-2.5 text-sm text-fg focus:border-accent focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="topic" className="block text-xs font-semibold text-fg mb-1.5">
                Inquiry Topic
              </label>
              <select
                id="topic"
                value={formData.topic}
                onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                className="w-full rounded-lg border border-border bg-bg px-3.5 py-2.5 text-sm text-fg focus:border-accent focus:outline-none"
              >
                <option value="enterprise">Enterprise Licence & Offline Token</option>
                <option value="community">Community Edition Question</option>
                <option value="security">Security & Privacy Audit</option>
                <option value="mcp">MCP Coding Agent Integration</option>
                <option value="other">General Inquiry</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="message" className="block text-xs font-semibold text-fg mb-1.5">
              How can we help? *
            </label>
            <textarea
              id="message"
              required
              rows={4}
              placeholder="Tell us about your team size, expected report volume, or specific deployment requirements..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full rounded-lg border border-border bg-bg p-3.5 text-sm text-fg focus:border-accent focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3 font-semibold text-accent-fg transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            <Send className="size-4" />
            <span>{loading ? 'Submitting...' : 'Send Message'}</span>
          </button>
        </form>
      )}
    </div>
  );
}
