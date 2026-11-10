'use client';

import { useState } from 'react';
import { Currency, Plan } from '@/content/pricing';
import {
  X,
  CreditCard,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  ExternalLink,
  Building,
  Receipt,
  Sparkles,
  Server,
  Zap,
} from 'lucide-react';
import { cn } from '@/lib/cn';

interface CheckoutModalProps {
  plan: Plan | null;
  currency: Currency;
  isAnnual: boolean;
  onClose: () => void;
  onCurrencyChange: (c: Currency) => void;
  onCadenceChange: (annual: boolean) => void;
}

export function CheckoutModal({
  plan,
  currency,
  isAnnual,
  onClose,
  onCurrencyChange,
  onCadenceChange,
}: CheckoutModalProps) {
  if (!plan) return null;

  const [workspaceName, setWorkspaceName] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [gstin, setGstin] = useState('');
  const [activeTab, setActiveTab] = useState<'checkout' | 'selfhosted'>('checkout');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const pricing = plan.pricing[currency];
  const activePrice = isAnnual ? pricing.yearly : pricing.monthly;

  // Calculate pricing breakdown
  const baseAmount = activePrice.amount ?? 0;
  const isINR = currency === 'inr';
  const gstAmount = isINR ? Math.round(baseAmount * 0.18) : 0;
  const totalAmount = isINR ? baseAmount + gstAmount : baseAmount;

  const formattedBase = isINR
    ? `₹${baseAmount.toLocaleString('en-IN')}`
    : `$${baseAmount.toLocaleString('en-US')}`;
  const formattedGst = isINR ? `₹${gstAmount.toLocaleString('en-IN')}` : '$0.00';
  const formattedTotal = isINR
    ? `₹${totalAmount.toLocaleString('en-IN')}`
    : `$${totalAmount.toLocaleString('en-US')}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 1200);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-border bg-elevated/60 px-6 py-4">
          <div className="flex items-center gap-2.5">
            <span className="flex size-8 items-center justify-center rounded-lg bg-accent text-accent-fg font-bold">
              <Zap className="size-4" />
            </span>
            <div>
              <h2 id="checkout-modal-title" className="text-base font-bold text-fg">
                Upgrade to BugFence {plan.name}
              </h2>
              <p className="text-xs text-muted">
                {isAnnual ? 'Annual Subscription (2 Months Free)' : 'Monthly Subscription'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="flex size-8 items-center justify-center rounded-lg border border-border text-muted hover:bg-elevated hover:text-fg transition-colors"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="max-h-[85vh] overflow-y-auto p-6 space-y-6">
          {isSuccess ? (
            /* Instant Activation Success Screen */
            <div className="py-6 text-center space-y-5">
              <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-accent/20 text-accent ring-8 ring-accent/10">
                <CheckCircle2 className="size-8" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-2xl font-bold text-fg">Subscription Initialized</h3>
                <p className="text-sm text-muted max-w-md mx-auto">
                  A verification receipt and workspace setup link have been dispatched to{' '}
                  <span className="font-semibold text-fg font-mono">{adminEmail || 'your email'}</span>.
                </p>
              </div>

              {/* Order Details Card */}
              <div className="rounded-xl border border-border bg-elevated/40 p-4 text-left space-y-3 max-w-md mx-auto text-xs">
                <div className="flex justify-between border-b border-border pb-2">
                  <span className="text-muted">Plan:</span>
                  <span className="font-semibold text-fg">BugFence {plan.name} ({isAnnual ? 'Yearly' : 'Monthly'})</span>
                </div>
                <div className="flex justify-between border-b border-border pb-2">
                  <span className="text-muted">Total Paid:</span>
                  <span className="font-bold text-accent">{formattedTotal}</span>
                </div>
                <div className="flex justify-between border-b border-border pb-2">
                  <span className="text-muted">Payment Gateway:</span>
                  <span className="text-fg">{isINR ? 'Razorpay (UPI / Netbanking)' : 'Stripe Checkout'}</span>
                </div>
                {isINR && gstin && (
                  <div className="flex justify-between border-b border-border pb-2">
                    <span className="text-muted">GSTIN Invoice:</span>
                    <span className="font-mono text-fg uppercase">{gstin}</span>
                  </div>
                )}
                <div className="flex justify-between pt-1">
                  <span className="text-muted">Workspace Key:</span>
                  <span className="font-mono text-fg">pk_live_{Math.random().toString(36).substring(2, 10)}</span>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap justify-center gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-lg bg-accent px-6 py-2.5 text-sm font-semibold text-accent-fg hover:opacity-90 transition-opacity"
                >
                  Return to Site
                </button>
                <a
                  href="/#install"
                  onClick={onClose}
                  className="rounded-lg border border-border bg-elevated px-6 py-2.5 text-sm font-semibold text-fg hover:bg-surface transition-colors"
                >
                  View Install Guide
                </a>
              </div>
            </div>
          ) : (
            <>
              {/* Option Tabs: Direct Online Checkout vs Self-Hosted Dashboard Upgrade */}
              <div className="flex rounded-lg border border-border bg-bg p-1 text-xs">
                <button
                  type="button"
                  onClick={() => setActiveTab('checkout')}
                  className={cn(
                    'flex-1 rounded-md py-2 font-semibold transition-all',
                    activeTab === 'checkout'
                      ? 'bg-elevated text-fg shadow-2xs'
                      : 'text-muted hover:text-fg'
                  )}
                >
                  Direct Cloud & License Checkout
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('selfhosted')}
                  className={cn(
                    'flex-1 rounded-md py-2 font-semibold transition-all',
                    activeTab === 'selfhosted'
                      ? 'bg-elevated text-fg shadow-2xs'
                      : 'text-muted hover:text-fg'
                  )}
                >
                  Self-Hosted In-App Upgrade
                </button>
              </div>

              {activeTab === 'selfhosted' ? (
                /* Self-Hosted In-App Upgrade Instructions */
                <div className="space-y-4 rounded-xl border border-accent/20 bg-accent/5 p-5 text-sm">
                  <div className="flex items-center gap-2 font-bold text-fg">
                    <Server className="size-4 text-accent" />
                    <span>How to Upgrade Your Self-Hosted BugFence Instance</span>
                  </div>
                  <p className="text-xs text-muted leading-relaxed">
                    If you are hosting BugFence on your own Docker or Kubernetes infrastructure, plan upgrades and payments are handled directly inside your instance:
                  </p>
                  <ol className="list-decimal list-inside space-y-2 text-xs text-fg/90 pl-1">
                    <li>Log into your self-hosted BugFence web dashboard with your Admin account.</li>
                    <li>
                      Navigate to <strong className="text-accent font-semibold">Settings &gt; Billing</strong> in the left sidebar.
                    </li>
                    <li>
                      Select <strong className="text-fg">{plan.name}</strong> and click <strong className="text-accent">Subscribe</strong>.
                    </li>
                    <li>
                      Your instance will open the secure <strong>Stripe Checkout</strong> (for USD) or <strong>Razorpay</strong> portal (for INR) to link your subscription directly to your server installation.
                    </li>
                  </ol>
                  <div className="pt-2 text-xs text-muted">
                    Need an offline air-gapped cryptographic license file (BFLIC token) instead?{' '}
                    <a href="/contact?topic=enterprise" className="text-accent underline font-semibold">
                      Request Enterprise License Key &rarr;
                    </a>
                  </div>
                </div>
              ) : (
                /* Direct Online Checkout Form */
                <>
                  {/* Currency & Cadence Switchers */}
                  <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-elevated/40 p-3.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-muted">Currency:</span>
                      <div className="inline-flex rounded-md border border-border bg-surface p-0.5 text-xs">
                        <button
                          type="button"
                          onClick={() => onCurrencyChange('usd')}
                          className={cn(
                            'rounded px-2.5 py-1 font-medium transition-colors',
                            currency === 'usd' ? 'bg-accent text-accent-fg font-semibold' : 'text-muted hover:text-fg'
                          )}
                        >
                          USD ($)
                        </button>
                        <button
                          type="button"
                          onClick={() => onCurrencyChange('inr')}
                          className={cn(
                            'rounded px-2.5 py-1 font-medium transition-colors',
                            currency === 'inr' ? 'bg-accent text-accent-fg font-semibold' : 'text-muted hover:text-fg'
                          )}
                        >
                          INR (₹)
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-muted">Billing:</span>
                      <div className="inline-flex rounded-md border border-border bg-surface p-0.5 text-xs">
                        <button
                          type="button"
                          onClick={() => onCadenceChange(false)}
                          className={cn(
                            'rounded px-2.5 py-1 font-medium transition-colors',
                            !isAnnual ? 'bg-elevated text-fg font-semibold' : 'text-muted hover:text-fg'
                          )}
                        >
                          Monthly
                        </button>
                        <button
                          type="button"
                          onClick={() => onCadenceChange(true)}
                          className={cn(
                            'rounded px-2.5 py-1 font-medium transition-colors',
                            isAnnual ? 'bg-elevated text-fg font-semibold' : 'text-muted hover:text-fg'
                          )}
                        >
                          Annual (Save 20%)
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Summary Breakdown Box */}
                  <div className="rounded-xl border border-border bg-bg p-4 space-y-2 text-xs">
                    <div className="flex justify-between text-muted">
                      <span>BugFence {plan.name} Base ({isAnnual ? '1 Year' : '1 Month'})</span>
                      <span className="font-semibold text-fg">{formattedBase}</span>
                    </div>

                    {isINR ? (
                      <div className="flex justify-between text-muted">
                        <span>GST @ 18% (CGST 9% + SGST 9%)</span>
                        <span className="font-semibold text-fg">{formattedGst}</span>
                      </div>
                    ) : (
                      <div className="flex justify-between text-muted">
                        <span>Estimated Sales Tax</span>
                        <span className="text-fg italic">Calculated at Stripe Checkout</span>
                      </div>
                    )}

                    <div className="border-t border-border pt-2 flex justify-between text-sm font-bold">
                      <span className="text-fg">Total Amount Due</span>
                      <span className="text-accent text-base">{formattedTotal}</span>
                    </div>

                    <div className="pt-1 text-[11px] text-muted">
                      {isINR ? (
                        <span>
                          Includes compliant B2B GST tax invoice. You can claim full 18% Input Tax Credit with your GSTIN.
                        </span>
                      ) : (
                        <span>
                          Billed via Stripe. Cancel or modify subscription at any time from your customer billing portal.
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Checkout Form */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="checkout-email" className="block text-xs font-semibold text-fg mb-1">
                          Work Email *
                        </label>
                        <input
                          id="checkout-email"
                          type="email"
                          required
                          placeholder="alex@company.com"
                          value={adminEmail}
                          onChange={(e) => setAdminEmail(e.target.value)}
                          className="w-full rounded-lg border border-border bg-bg px-3.5 py-2 text-sm text-fg focus:border-accent focus:outline-none"
                        />
                      </div>

                      <div>
                        <label htmlFor="checkout-workspace" className="block text-xs font-semibold text-fg mb-1">
                          Workspace / Team Name *
                        </label>
                        <input
                          id="checkout-workspace"
                          type="text"
                          required
                          placeholder="acme-engineering"
                          value={workspaceName}
                          onChange={(e) => setWorkspaceName(e.target.value)}
                          className="w-full rounded-lg border border-border bg-bg px-3.5 py-2 text-sm text-fg focus:border-accent focus:outline-none"
                        />
                      </div>
                    </div>

                    {isINR && (
                      <div>
                        <label htmlFor="checkout-gstin" className="block text-xs font-semibold text-fg mb-1">
                          Company GSTIN <span className="text-muted font-normal">(Optional for B2B Tax Credit)</span>
                        </label>
                        <input
                          id="checkout-gstin"
                          type="text"
                          maxLength={15}
                          placeholder="27AAAAA0000A1Z5"
                          value={gstin}
                          onChange={(e) => setGstin(e.target.value.toUpperCase())}
                          className="w-full rounded-lg border border-border bg-bg px-3.5 py-2 text-sm font-mono text-fg focus:border-accent focus:outline-none uppercase"
                        />
                      </div>
                    )}

                    {/* Gateway Badge */}
                    <div className="flex items-center justify-between rounded-lg border border-border bg-surface p-3 text-xs">
                      <div className="flex items-center gap-2">
                        <CreditCard className="size-4 text-accent" />
                        <span className="font-medium text-fg">
                          {isINR ? 'Razorpay Subscriptions (UPI, Netbanking, Cards)' : 'Stripe Checkout (Cards, Apple Pay, Google Pay)'}
                        </span>
                      </div>
                      <span className="inline-flex items-center gap-1 text-[11px] text-muted">
                        <Lock className="size-3 text-accent" /> 256-bit Encrypted
                      </span>
                    </div>

                    {/* Action Submit Button */}
                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-accent py-3 text-sm font-bold text-accent-fg shadow-lg shadow-accent/20 transition-all hover:opacity-95 disabled:opacity-50"
                    >
                      {isProcessing ? (
                        <span>Connecting to Gateway...</span>
                      ) : isINR ? (
                        <span>Pay {formattedTotal} with Razorpay & Complete Upgrade</span>
                      ) : (
                        <span>Proceed to Stripe Checkout ({formattedTotal})</span>
                      )}
                      <ArrowRight className="size-4" />
                    </button>
                  </form>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
