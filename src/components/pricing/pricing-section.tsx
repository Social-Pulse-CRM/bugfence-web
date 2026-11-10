'use client';

import { useState } from 'react';
import { Container } from '@/components/ui/container';
import { ButtonLink } from '@/components/ui/button';
import { CheckoutModal } from './checkout-modal';
import { PLANS, getFeatureMatrix, Plan, Currency } from '@/content/pricing';
import { useCurrency } from '@/lib/currency';
import { Check, ShieldCheck, Sparkles, Server, Zap, Building2, Minus, CreditCard, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/cn';

export function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(true);
  const { currency, setCurrency } = useCurrency();
  const [checkoutPlan, setCheckoutPlan] = useState<Plan | null>(null);

  const featureMatrix = getFeatureMatrix(currency);

  const handlePlanCta = (plan: Plan) => {
    if (plan.cta.action === 'checkout') {
      setCheckoutPlan(plan);
    }
  };

  return (
    <Container className="py-12">
      {/* Checkout Modal when triggered */}
      {checkoutPlan && (
        <CheckoutModal
          plan={checkoutPlan}
          currency={currency}
          isAnnual={isAnnual}
          onClose={() => setCheckoutPlan(null)}
          onCurrencyChange={setCurrency}
          onCadenceChange={setIsAnnual}
        />
      )}

      {/* Controls Bar: Currency Switcher + Billing Cadence Toggle */}
      <div className="mb-14 flex flex-col items-center justify-center gap-5">
        <div className="flex flex-wrap items-center justify-center gap-4">
          {/* Currency Toggle (USD $ vs INR ₹) */}
          <div
            role="radiogroup"
            aria-label="Currency selection"
            className="inline-flex items-center rounded-full border border-border bg-surface p-1 shadow-2xs"
          >
            <button
              type="button"
              role="radio"
              aria-checked={currency === 'usd'}
              onClick={() => setCurrency('usd')}
              className={cn(
                'inline-flex cursor-pointer items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold transition-all',
                currency === 'usd'
                  ? 'bg-elevated text-fg shadow-2xs'
                  : 'text-muted hover:text-fg'
              )}
            >
              <span>🇺🇸</span>
              <span>USD ($)</span>
            </button>
            <button
              type="button"
              role="radio"
              aria-checked={currency === 'inr'}
              onClick={() => setCurrency('inr')}
              className={cn(
                'inline-flex cursor-pointer items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold transition-all',
                currency === 'inr'
                  ? 'bg-elevated text-fg shadow-2xs'
                  : 'text-muted hover:text-fg'
              )}
            >
              <span>🇮🇳</span>
              <span>INR (₹)</span>
            </button>
          </div>

          {/* Billing Cadence Toggle (Monthly vs Annual) */}
          <div
            role="radiogroup"
            aria-label="Billing cycle selection"
            className="inline-flex items-center rounded-full border border-border bg-surface p-1 shadow-2xs"
          >
            <button
              type="button"
              role="radio"
              aria-checked={!isAnnual}
              onClick={() => setIsAnnual(false)}
              className={cn(
                'cursor-pointer rounded-full px-4 py-1.5 text-xs font-semibold transition-all',
                !isAnnual
                  ? 'bg-elevated text-fg shadow-2xs'
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
                'inline-flex cursor-pointer items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold transition-all',
                isAnnual
                  ? 'bg-elevated text-fg shadow-2xs'
                  : 'text-muted hover:text-fg'
              )}
            >
              <span>Annual billing</span>
              <span className="inline-flex items-center rounded-full bg-accent/15 px-2 py-0.2 text-[10px] font-bold text-accent">
                Save ~20%
              </span>
            </button>
          </div>
        </div>

        {/* Currency & Tax Notice */}
        <p className="text-xs text-muted text-center max-w-lg">
          {currency === 'inr' ? (
            <span className="inline-flex items-center gap-1.5">
              <span>🇮🇳 Indian billing via <strong>Razorpay</strong> (UPI, Netbanking, Cards) · <strong>18% GST invoice</strong> with GSTIN provided.</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5">
              <span>🇺🇸 Global billing via <strong>Stripe</strong> (All major international credit cards, Apple Pay, Google Pay).</span>
            </span>
          )}
        </p>
      </div>

      {/* 4-Card Responsive Pricing Grid */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {PLANS.map((plan: Plan) => {
          const pricingInfo = plan.pricing[currency];
          const activePricing = isAnnual ? pricingInfo.yearly : pricingInfo.monthly;

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
                      {activePricing.formatted}
                    </span>
                    <span className="text-xs font-medium text-muted">{activePricing.period}</span>
                  </div>

                  <div className="mt-1 flex flex-wrap items-center gap-2">
                    <span className="text-xs text-muted">{activePricing.subtext}</span>
                    {isAnnual && (plan.id === 'pro' || plan.id === 'business') && (
                      <span className="inline-flex rounded-sm bg-accent/15 px-1.5 py-0.2 text-[11px] font-semibold text-accent">
                        Save ~20%
                      </span>
                    )}
                  </div>

                  <p className="mt-1 text-[11px] text-muted/80">{pricingInfo.taxNote}</p>
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

              {/* Payment Gateway Pill */}
              <div className="mt-5 rounded-md border border-border/70 bg-elevated/40 p-2 text-[10px] text-muted flex items-center gap-1.5">
                <CreditCard className="size-3 text-accent shrink-0" />
                <span>{pricingInfo.gateway}</span>
              </div>

              {/* Call to Action */}
              <div className="mt-4 pt-2">
                {plan.cta.action === 'checkout' ? (
                  <button
                    type="button"
                    onClick={() => handlePlanCta(plan)}
                    className={cn(
                      'inline-flex w-full items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold transition-all shadow-sm',
                      plan.highlight
                        ? 'bg-accent text-accent-fg hover:opacity-90 shadow-accent/20'
                        : 'border border-border bg-elevated text-fg hover:bg-surface'
                    )}
                  >
                    <span>{plan.cta.label}</span>
                    <ArrowRight className="size-4" />
                  </button>
                ) : (
                  <ButtonLink
                    href={plan.cta.href || '/#install'}
                    variant={plan.highlight ? 'primary' : 'secondary'}
                    className="w-full text-sm font-semibold"
                  >
                    {plan.cta.label}
                  </ButtonLink>
                )}
              </div>
            </section>
          );
        })}
      </div>

      {/* Side-by-Side Comprehensive Feature Matrix */}
      <div className="mt-24">
        <div className="mb-8 text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl text-fg">
            Detailed Feature Comparison Matrix
          </h2>
          <p className="mt-2 text-sm text-muted">
            Inspect all technical features, retention limits, and integrations side by side across tiers.
          </p>
        </div>

        <div className="overflow-x-auto rounded-card border border-border bg-surface">
          <table className="w-full min-w-[700px] border-collapse text-left text-xs">
            <thead>
              <tr className="border-b border-border bg-elevated/70">
                <th scope="col" className="p-3.5 font-semibold text-fg">Capability</th>
                <th scope="col" className="p-3.5 font-semibold text-fg">Free</th>
                <th scope="col" className="p-3.5 font-bold text-accent">Pro (Most Popular)</th>
                <th scope="col" className="p-3.5 font-semibold text-fg">Business</th>
                <th scope="col" className="p-3.5 font-semibold text-fg">Enterprise</th>
              </tr>
            </thead>
            <tbody>
              {featureMatrix.map((cat) => (
                <tr key={cat.category} className="contents">
                  <tr className="bg-elevated/30 border-y border-border">
                    <td colSpan={5} className="p-2.5 font-bold uppercase tracking-wider text-[11px] text-accent">
                      {cat.category}
                    </td>
                  </tr>
                  {cat.items.map((item) => (
                    <tr key={item.name} className="border-b border-border/60 hover:bg-elevated/15 transition-colors">
                      <td className="p-3 font-medium text-fg">{item.name}</td>
                      <td className="p-3 text-muted">{item.free}</td>
                      <td className="p-3 font-semibold text-accent">{item.pro}</td>
                      <td className="p-3 text-fg">{item.business}</td>
                      <td className="p-3 text-fg">{item.enterprise}</td>
                    </tr>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Container>
  );
}
