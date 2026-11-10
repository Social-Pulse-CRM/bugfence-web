'use client';

import { useState } from 'react';
import { Container } from '@/components/ui/container';
import { ButtonLink } from '@/components/ui/button';
import { PLANS, FEATURE_MATRIX, Plan } from '@/content/pricing';
import { Check, ShieldCheck, Sparkles, Server, Zap, Building2, Minus } from 'lucide-react';
import { cn } from '@/lib/cn';

export function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <Container className="py-12">
      {/* Interactive Billing Cadence Toggle */}
      <div className="mb-14 flex flex-col items-center justify-center gap-3">
        <div
          role="radiogroup"
          aria-label="Billing cycle selection"
          className="inline-flex items-center rounded-full border border-border bg-surface p-1 shadow-xs"
        >
          <button
            type="button"
            role="radio"
            aria-checked={!isAnnual}
            onClick={() => setIsAnnual(false)}
            className={cn(
              'cursor-pointer rounded-full px-5 py-2 text-sm font-semibold transition-all',
              !isAnnual
                ? 'bg-elevated text-fg shadow-sm'
                : 'text-muted hover:text-fg'
            )}
          >
            Monthly billing
          </button>
          <button
            type="button"
            role="radio"
            aria-checked={isAnnual}
            onClick={() => setIsAnnual(true)}
            className={cn(
              'inline-flex cursor-pointer items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition-all',
              isAnnual
                ? 'bg-elevated text-fg shadow-sm'
                : 'text-muted hover:text-fg'
            )}
          >
            <span>Annual billing</span>
            <span className="inline-flex items-center rounded-full bg-accent/15 px-2 py-0.5 text-xs font-bold text-accent">
              Save ~20%
            </span>
          </button>
        </div>
        <p className="text-xs text-muted">
          {isAnnual
            ? 'Annual billing active: roughly 2 months free with upfront yearly discount.'
            : 'Monthly billing active. Switch to annual billing to save ~20%.'}
        </p>
      </div>

      {/* 4-Card Responsive Pricing Grid */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {PLANS.map((plan: Plan) => {
          const displayPrice =
            plan.monthlyPrice === null
              ? 'Custom'
              : plan.monthlyPrice === 0
              ? '$0'
              : isAnnual
              ? `$${plan.yearlyPrice}`
              : `$${plan.monthlyPrice}`;

          const displayPeriod =
            plan.monthlyPrice === null
              ? ''
              : plan.monthlyPrice === 0
              ? '/ month'
              : isAnnual
              ? '/ year'
              : '/ month';

          const subtext =
            plan.id === 'free'
              ? 'Forever free'
              : plan.id === 'pro'
              ? isAnnual
                ? 'Equivalent to ~$11.60/mo'
                : 'Billed monthly'
              : plan.id === 'business'
              ? isAnnual
                ? 'Equivalent to ~$32.50/mo'
                : 'Billed monthly'
              : 'Annual or custom contract';

          return (
            <section
              key={plan.id}
              aria-labelledby={`plan-${plan.id}`}
              className={cn(
                'relative flex flex-col rounded-card border bg-surface p-7 transition-all',
                plan.highlight
                  ? 'border-accent shadow-[0_0_50px_-15px_var(--accent)] ring-2 ring-accent/40 bg-surface'
                  : 'border-border hover:border-border/80'
              )}
            >
              {/* Badge */}
              <div className="absolute -top-3.5 right-5">
                {plan.highlight ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-0.5 text-xs font-bold text-accent-fg shadow-xs">
                    <Sparkles className="size-3" /> {plan.badge}
                  </span>
                ) : plan.id === 'business' ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-elevated px-3 py-0.5 text-xs font-semibold text-fg">
                    <Zap className="size-3 text-secondary" /> {plan.badge}
                  </span>
                ) : plan.id === 'enterprise' ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-elevated px-3 py-0.5 text-xs font-semibold text-fg">
                    <Building2 className="size-3 text-accent" /> {plan.badge}
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-elevated px-3 py-0.5 text-xs font-medium text-muted">
                    <Server className="size-3 text-accent" /> {plan.badge}
                  </span>
                )}
              </div>

              {/* Header */}
              <div>
                <h2 id={`plan-${plan.id}`} className="text-xl font-bold tracking-tight text-fg">
                  {plan.name}
                </h2>
                <p className="mt-0.5 text-xs font-medium text-accent">{plan.cadence}</p>

                {/* Price Display */}
                <div className="mt-5">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-4xl font-extrabold tracking-tight text-fg">
                      {displayPrice}
                    </span>
                    <span className="text-xs font-medium text-muted">{displayPeriod}</span>
                  </div>

                  <div className="mt-1 flex items-center gap-2">
                    <span className="text-xs text-muted">{subtext}</span>
                    {isAnnual && (plan.id === 'pro' || plan.id === 'business') && (
                      <span className="inline-flex rounded-sm bg-accent/15 px-1.5 py-0.2 text-[11px] font-semibold text-accent">
                        Save ~20%
                      </span>
                    )}
                  </div>
                </div>

                <p className="mt-4 text-xs leading-relaxed text-muted min-h-[3.5rem]">
                  {plan.blurb}
                </p>
              </div>

              <div className="my-6 h-px bg-border" />

              {/* Features List */}
              <div className="flex-1">
                <p className="text-[11px] font-bold uppercase tracking-wider text-muted">
                  What&apos;s Included
                </p>
                <ul className="mt-3 space-y-2.5 text-xs">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <Check className="mt-0.5 size-3.5 shrink-0 text-accent" />
                      <span className="text-fg/90 leading-tight">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Call to Action */}
              <div className="mt-7 pt-2">
                <ButtonLink
                  href={plan.cta.href}
                  variant={plan.highlight ? 'primary' : 'secondary'}
                  className="w-full text-sm font-semibold"
                >
                  {plan.cta.label}
                </ButtonLink>
              </div>
            </section>
          );
        })}
      </div>

      {/* Side-by-Side Comprehensive Feature Matrix */}
      <div className="mt-24">
        <div className="mb-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-accent">Feature Matrix</p>
          <h2 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
            Compare BugFence Editions Side-by-Side
          </h2>
          <p className="mt-2 text-sm text-muted max-w-2xl mx-auto">
            Zero paywalled diagnostics. Full console, network stack, and client-side PII redactions are included in every tier.
          </p>
        </div>

        <div className="overflow-x-auto rounded-card border border-border bg-surface">
          <table className="w-full min-w-[840px] border-collapse text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-border bg-elevated/70">
                <th scope="col" className="p-4 font-semibold text-fg w-1/3">
                  Capability / Limit
                </th>
                <th scope="col" className="p-4 font-semibold text-fg w-1/6">
                  Free
                </th>
                <th scope="col" className="p-4 font-semibold text-accent w-1/6 bg-accent/5 border-x border-accent/20">
                  Pro
                </th>
                <th scope="col" className="p-4 font-semibold text-fg w-1/6">
                  Business
                </th>
                <th scope="col" className="p-4 font-semibold text-fg w-1/6">
                  Enterprise
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {FEATURE_MATRIX.map((group) => (
                <tr key={group.category} className="contents">
                  <td
                    colSpan={5}
                    className="border-b border-t border-border bg-elevated/50 px-4 py-2.5 font-bold text-fg uppercase tracking-wider text-xs"
                  >
                    {group.category}
                  </td>
                  {group.items.map((item) => (
                    <tr key={item.name} className="hover:bg-elevated/20 transition-colors">
                      <td className="p-4 font-medium text-fg">{item.name}</td>
                      <td className="p-4 text-muted">
                        {item.free === '—' ? (
                          <Minus className="size-4 text-muted/50" />
                        ) : (
                          item.free
                        )}
                      </td>
                      <td className="p-4 font-semibold text-accent bg-accent/5 border-x border-accent/20">
                        {item.pro === '—' ? (
                          <Minus className="size-4 text-muted/50" />
                        ) : (
                          item.pro
                        )}
                      </td>
                      <td className="p-4 text-muted">
                        {item.business === '—' ? (
                          <Minus className="size-4 text-muted/50" />
                        ) : (
                          item.business
                        )}
                      </td>
                      <td className="p-4 font-medium text-fg">
                        {item.enterprise === '—' ? (
                          <Minus className="size-4 text-muted/50" />
                        ) : (
                          item.enterprise
                        )}
                      </td>
                    </tr>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Security Guarantee Box */}
      <div className="mt-14 rounded-card border border-border bg-elevated/40 p-6 sm:flex sm:items-center sm:justify-between sm:gap-6">
        <div className="flex items-center gap-4">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent">
            <ShieldCheck className="size-6" />
          </div>
          <div>
            <p className="font-semibold text-fg">Zero Third-Party Data Transmission Guarantee</p>
            <p className="text-xs sm:text-sm text-muted">
              BugFence runs within your security perimeter. We never harvest or sell sessions, diagnostic dumps, or customer credentials.
            </p>
          </div>
        </div>
        <div className="mt-4 sm:mt-0 sm:shrink-0">
          <ButtonLink href="/security/" variant="secondary" className="w-full sm:w-auto text-xs sm:text-sm">
            Read Security Whitepaper
          </ButtonLink>
        </div>
      </div>
    </Container>
  );
}
