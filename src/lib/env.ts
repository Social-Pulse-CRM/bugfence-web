import { z } from 'zod';

/** Public, non-secret site config. Only NEXT_PUBLIC_* values belong here. */
const schema = z.object({
  siteUrl: z.string().url().default('http://localhost:3000'),
  appUrl: z.string().url().default('http://localhost:5000'),
  registerUrl: z.string().url().optional(),
  loginUrl: z.string().url().optional(),
  demoAppUrl: z.string().url().default('http://localhost:3000'),
  demoDashboardUrl: z.string().url().default('http://localhost:5000'),
  npmUrl: z.string().url().optional(),
  npmPackage: z.string().min(1).optional(),
  docsUrl: z.string().url().optional(),
  githubUrl: z.string().url().optional(),
  contactEmail: z.string().email().optional(),
});

const empty = (v: string | undefined) => (v && v.trim() !== '' ? v.trim() : undefined);

// Must reference process.env.NEXT_PUBLIC_* literally so Next can inline them.
export const env = schema.parse({
  siteUrl: empty(process.env.NEXT_PUBLIC_SITE_URL),
  appUrl: empty(process.env.NEXT_PUBLIC_APP_URL),
  registerUrl: empty(process.env.NEXT_PUBLIC_APP_REGISTER_URL),
  loginUrl: empty(process.env.NEXT_PUBLIC_APP_LOGIN_URL),
  demoAppUrl: empty(process.env.NEXT_PUBLIC_DEMO_APP_URL),
  demoDashboardUrl: empty(process.env.NEXT_PUBLIC_DEMO_DASHBOARD_URL),
  npmUrl: empty(process.env.NEXT_PUBLIC_NPM_URL),
  npmPackage: empty(process.env.NEXT_PUBLIC_NPM_PACKAGE),
  docsUrl: empty(process.env.NEXT_PUBLIC_DOCS_URL),
  githubUrl: empty(process.env.NEXT_PUBLIC_GITHUB_URL),
  contactEmail: empty(process.env.NEXT_PUBLIC_CONTACT_EMAIL),
});

/**
 * Builds the direct registration URL with plan, billing cadence, and currency
 * parameters to route users into the dashboard registration & onboarding workflow.
 */
export function getRegisterUrl(params?: {
  plan?: string;
  billing?: 'annual' | 'monthly';
  currency?: 'usd' | 'inr';
}): string {
  const base = env.registerUrl || env.appUrl || env.demoDashboardUrl || 'http://localhost:5000';
  
  try {
    const url = new URL(base.startsWith('http') ? base : `${env.siteUrl}${base}`);
    if (params?.plan) url.searchParams.set('plan', params.plan);
    if (params?.billing) url.searchParams.set('billing', params.billing);
    if (params?.currency) url.searchParams.set('currency', params.currency);
    return url.toString();
  } catch {
    const query = new URLSearchParams();
    if (params?.plan) query.set('plan', params.plan);
    if (params?.billing) query.set('billing', params.billing);
    if (params?.currency) query.set('currency', params.currency);
    const qs = query.toString();
    return `${base}${qs ? `?${qs}` : ''}`;
  }
}
