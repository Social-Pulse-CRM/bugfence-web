'use client';

import { useState, useEffect } from 'react';
import {
  X,
  ShieldCheck,
  KeyRound,
  Terminal,
  CheckCircle2,
  Copy,
  Send,
  Lock,
  ArrowRight,
  Server,
  Cpu,
  Building2,
  HelpCircle
} from 'lucide-react';
import { cn } from '@/lib/cn';
import { env } from '@/lib/env';

interface EnterpriseLicenseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EnterpriseLicenseModal({ isOpen, onClose }: EnterpriseLicenseModalProps) {
  const [activeTab, setActiveTab] = useState<'walkthrough' | 'request'>(env.enableSelfHosted ? 'walkthrough' : 'request');
  const [copied, setCopied] = useState(false);
  const [requestSent, setRequestSent] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    seats: '50-250',
    deployment: 'air-gapped-vpc',
    notes: '',
  });

  // ESC key listener to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sampleKey =
    'BFLIC.eyJpZCI6ImxpY19kZW1vXzIwMjYiLCJ0aWVyIjoiZW50ZXJwcmlzZSIsImN1c3RvbWVyIjoiQWNtZSBDb3JwIiwic2VhdHMiOjI1MCwicmVwb3J0c1Blck1vbnRoIjo1MDAwMDAsInJldGVudGlvbkRheXMiOjczMCwic3NvIjp0cnVlfQ.k9_72xYF_demo_signature_offline_verified';

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRequestSent(true);
  };

  const steps = [
    {
      step: '01',
      title: '1. Request License & Define Architecture',
      desc: 'Submit your organization size, seat volume (50 to 5,000+), custom retention policies (e.g. 730 days), and deployment requirements (AWS VPC, GCP, Azure, or air-gapped bare-metal).',
      detail: 'Our enterprise solutions team reviews specifications and issues a custom Commercial MSA or evaluation token.',
    },
    {
      step: '02',
      title: '2. Receive Cryptographic BFLIC Token',
      desc: 'You receive a signed token formatted as: BFLIC.<base64url_payload>.<base64url_hmac_sha256>.',
      detail: 'All quotas, features, seats, and retention days are cryptographically signed. No central licensing server is ever queried.',
    },
    {
      step: '03',
      title: '3. Apply via Env Variable or Live Dashboard UI',
      desc: 'Option A: Set BUGFENCE_ENTERPRISE_KEY="BFLIC..." in your Docker / Kubernetes environment.\nOption B: Paste the key directly in Dashboard > Settings > Plan & Billing (hot reload without reboot).',
      detail: 'Instantly applies to the organization without service interruption or database migration.',
    },
    {
      step: '04',
      title: '4. Instant 100% Offline Cryptographic Unlock',
      desc: 'The server verifies the signature locally in memory using constant-time HMAC comparison.',
      detail: 'Guarantees zero outbound network calls, zero telemetry pings, and complete data fencing sovereignty.',
    },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="enterprise-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200"
    >
      {/* Backdrop click handler */}
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />

      <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl z-10">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-border bg-elevated/70 px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-xl bg-accent text-accent-fg font-bold shadow-xs">
              <KeyRound className="size-4.5" />
            </span>
            <div>
              <h2 id="enterprise-modal-title" className="text-base font-bold text-fg">
                {env.enableSelfHosted ? 'BugFence Enterprise & Sovereign License' : 'BugFence Enterprise Custom'}
              </h2>
              <p className="text-xs text-muted">
                {env.enableSelfHosted
                  ? 'High-Volume Managed Cloud & Air-Gapped Private VPC Licensing'
                  : 'High-Volume Cloud SaaS, Dedicated Retention & Custom SLAs'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="flex size-8 items-center justify-center rounded-lg border border-border text-muted hover:bg-elevated hover:text-fg transition-colors"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Tab Switcher */}
        {env.enableSelfHosted && (
          <div className="flex border-b border-border bg-bg/50 px-6 pt-3 gap-6">
            <button
              type="button"
              onClick={() => setActiveTab('walkthrough')}
              className={cn(
                'pb-3 text-xs font-bold transition-all border-b-2 flex items-center gap-1.5',
                activeTab === 'walkthrough'
                  ? 'border-accent text-accent'
                  : 'border-transparent text-muted hover:text-fg'
              )}
            >
              <Server className="size-3.5" />
              <span>4-Step Offline Walkthrough</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('request')}
              className={cn(
                'pb-3 text-xs font-bold transition-all border-b-2 flex items-center gap-1.5',
                activeTab === 'request'
                  ? 'border-accent text-accent'
                  : 'border-transparent text-muted hover:text-fg'
              )}
            >
              <Send className="size-3.5" />
              <span>Request License Key</span>
            </button>
          </div>
        )}

        {/* Content Body */}
        <div className="max-h-[75vh] overflow-y-auto p-6 space-y-6">
          {activeTab === 'walkthrough' ? (
            <div className="space-y-6">
              {/* Air-gap guarantee badge */}
              <div className="flex items-start gap-3 rounded-xl border border-accent/30 bg-accent/5 p-4 text-xs">
                <ShieldCheck className="size-4 text-accent shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-bold text-fg">
                    100% Air-Gapped &amp; Zero Phone-Home Guarantee
                  </p>
                  <p className="text-muted leading-relaxed">
                    BugFence Enterprise licenses verify completely offline via local HMAC-SHA256 signatures. The server makes zero phone-home network calls, zero heartbeat pings, and never transmits telemetry to central servers.
                  </p>
                </div>
              </div>

              {/* 4-Step Visual Stepper */}
              <div className="space-y-3.5">
                {steps.map((st) => (
                  <div
                    key={st.step}
                    className="flex gap-4 rounded-xl border border-border bg-elevated/40 p-4 transition-colors hover:border-accent/30"
                  >
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-accent/15 text-accent font-mono text-xs font-bold">
                      {st.step}
                    </span>
                    <div className="space-y-1">
                      <h3 className="text-xs font-bold text-fg">{st.title}</h3>
                      <p className="text-xs text-muted leading-relaxed whitespace-pre-line">
                        {st.desc}
                      </p>
                      <p className="text-[11px] text-accent font-medium pt-0.5">
                        {st.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Code Snippet Example */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-fg">
                  <span className="flex items-center gap-1.5">
                    <Terminal className="size-3.5 text-accent" />
                    <span>Configuration Example (.env or docker-compose.yml)</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => copyToClipboard('BUGFENCE_ENTERPRISE_KEY="BFLIC.eyJpZCI..."')}
                    className="inline-flex items-center gap-1 text-[11px] text-muted hover:text-fg font-mono cursor-pointer"
                  >
                    <Copy className="size-3" />
                    <span>{copied ? 'Copied!' : 'Copy Key'}</span>
                  </button>
                </div>
                <pre className="overflow-x-auto rounded-lg border border-border bg-bg p-3.5 font-mono text-xs text-fg/90">
                  <code>BUGFENCE_ENTERPRISE_KEY=&quot;BFLIC.eyJpZCI6ImxpY18...&quot;</code>
                </pre>
              </div>

              {/* Modal Footer Controls */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-border/70">
                <a
                  href="/contact?topic=enterprise"
                  className="text-xs font-semibold text-muted hover:text-fg underline inline-flex items-center gap-1"
                >
                  <span>Need custom MSA or vendor onboarding? Contact Sales</span>
                  <ArrowRight className="size-3" />
                </a>
                <button
                  type="button"
                  onClick={() => setActiveTab('request')}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-xs font-bold text-accent-fg hover:opacity-90 transition-opacity shadow-xs"
                >
                  <span>Request Your License Key</span>
                  <ArrowRight className="size-3.5" />
                </button>
              </div>
            </div>
          ) : requestSent ? (
            <div className="py-10 text-center space-y-4">
              <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-accent/20 text-accent ring-8 ring-accent/10">
                <CheckCircle2 className="size-8" />
              </div>
              <h3 className="text-xl font-bold text-fg">License Request Received</h3>
              <p className="text-xs text-muted max-w-sm mx-auto leading-relaxed">
                Our enterprise solutions desk will review your deployment scope and generate your evaluation token for{' '}
                <span className="font-semibold text-fg font-mono">{formData.email}</span> within 4 business hours.
              </p>
              <div className="pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-lg bg-accent px-6 py-2.5 text-xs font-bold text-accent-fg hover:opacity-90"
                >
                  Return to Pricing
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleRequestSubmit} className="space-y-4">
              <div className="rounded-xl border border-border bg-elevated/30 p-3.5 text-xs text-muted">
                Fill out the form below or email{' '}
                <a href="mailto:enterprise@bug-fence.com" className="text-accent underline font-semibold">
                  enterprise@bug-fence.com
                </a>{' '}
                directly. We issue 30-day full-feature offline trial tokens for VPC evaluations.
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold text-fg mb-1">Work Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="alex@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-lg border border-border bg-bg px-3 py-2 text-xs text-fg focus:border-accent focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-fg mb-1">Company / Organization *</label>
                  <input
                    type="text"
                    required
                    placeholder="Acme Aerospace Ltd"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full rounded-lg border border-border bg-bg px-3 py-2 text-xs text-fg focus:border-accent focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold text-fg mb-1">Target Seats Needed</label>
                  <select
                    value={formData.seats}
                    onChange={(e) => setFormData({ ...formData, seats: e.target.value })}
                    className="w-full rounded-lg border border-border bg-bg px-3 py-2 text-xs text-fg focus:border-accent focus:outline-none"
                  >
                    <option value="25-50">25 - 50 Seats</option>
                    <option value="50-250">50 - 250 Seats</option>
                    <option value="250-1000">250 - 1,000 Seats</option>
                    <option value="1000+">1,000+ Seats (Enterprise Unlimited)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-fg mb-1">Deployment Target</label>
                  <select
                    value={formData.deployment}
                    onChange={(e) => setFormData({ ...formData, deployment: e.target.value })}
                    className="w-full rounded-lg border border-border bg-bg px-3 py-2 text-xs text-fg focus:border-accent focus:outline-none"
                  >
                    <option value="air-gapped-vpc">Air-Gapped Private VPC (No internet)</option>
                    <option value="kubernetes-cluster">Kubernetes Cluster (Private)</option>
                    <option value="docker-compose">Docker Compose On-Premise</option>
                    <option value="hybrid">Hybrid Cloud &amp; On-Premise</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-fg mb-1">
                  Architecture &amp; Compliance Notes (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Mention any custom report volume requirements, compliance standards (HIPAA, SOC 2), or SAML SSO identity provider..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full rounded-lg border border-border bg-bg p-3 text-xs text-fg focus:border-accent focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-accent py-2.5 text-xs font-bold text-accent-fg shadow-md shadow-accent/20 hover:opacity-95 transition-all cursor-pointer"
              >
                <Send className="size-3.5" />
                <span>Submit Enterprise Token Request</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
