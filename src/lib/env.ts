import { z } from 'zod';

const isProd = process.env.NODE_ENV === 'production';
const DEFAULT_EMAIL = 'support@bugfence.com';

/** Public, non-secret site config. Only NEXT_PUBLIC_* values belong here. */
const schema = z.object({
  siteUrl: z.string().url().default(isProd ? 'https://bug-fence.com' : 'http://localhost:3000'),
  appUrl: z.string().url().default(isProd ? 'https://app.bug-fence.com' : 'http://localhost:5000'),
  registerUrl: z.string().url().optional(),
  loginUrl: z.string().url().optional(),
  demoAppUrl: z.string().url().default(isProd ? 'https://demo.bug-fence.com' : 'http://localhost:3000'),
  demoDashboardUrl: z.string().url().default(isProd ? 'https://app.bug-fence.com' : 'http://localhost:5000'),
  npmUrl: z.string().url().optional(),
  npmPackage: z.string().min(1).optional(),
  docsUrl: z.string().url().default(isProd ? 'https://docs.bug-fence.com' : 'https://docs.bug-fence.com'),
  contactEmail: z.string().email().default(DEFAULT_EMAIL),
  supportEmail: z.string().email().optional(),
  billingEmail: z.string().email().optional(),
  salesEmail: z.string().email().optional(),
  securityEmail: z.string().email().optional(),
  legalEmail: z.string().email().optional(),
  privacyEmail: z.string().email().optional(),
  dpaEmail: z.string().email().optional(),
  enterpriseEmail: z.string().email().optional(),
  enableSelfHosted: z.boolean().default(true),
});

const empty = (v: string | undefined) => (v && v.trim() !== '' ? v.trim() : undefined);

// Must reference process.env.NEXT_PUBLIC_* literally so Next can inline them.
const parsed = schema.parse({
  siteUrl: empty(process.env.NEXT_PUBLIC_SITE_URL),
  appUrl: empty(process.env.NEXT_PUBLIC_APP_URL),
  registerUrl: empty(process.env.NEXT_PUBLIC_APP_REGISTER_URL),
  loginUrl: empty(process.env.NEXT_PUBLIC_APP_LOGIN_URL),
  demoAppUrl: empty(process.env.NEXT_PUBLIC_DEMO_APP_URL),
  demoDashboardUrl: empty(process.env.NEXT_PUBLIC_DEMO_DASHBOARD_URL),
  npmUrl: empty(process.env.NEXT_PUBLIC_NPM_URL),
  npmPackage: empty(process.env.NEXT_PUBLIC_NPM_PACKAGE),
  docsUrl: empty(process.env.NEXT_PUBLIC_DOCS_URL),
  contactEmail: empty(process.env.NEXT_PUBLIC_CONTACT_EMAIL),
  supportEmail: empty(process.env.NEXT_PUBLIC_SUPPORT_EMAIL),
  billingEmail: empty(process.env.NEXT_PUBLIC_BILLING_EMAIL),
  salesEmail: empty(process.env.NEXT_PUBLIC_SALES_EMAIL),
  securityEmail: empty(process.env.NEXT_PUBLIC_SECURITY_EMAIL),
  legalEmail: empty(process.env.NEXT_PUBLIC_LEGAL_EMAIL),
  privacyEmail: empty(process.env.NEXT_PUBLIC_PRIVACY_EMAIL),
  dpaEmail: empty(process.env.NEXT_PUBLIC_DPA_EMAIL),
  enterpriseEmail: empty(process.env.NEXT_PUBLIC_ENTERPRISE_EMAIL),
  enableSelfHosted: process.env.NEXT_PUBLIC_ENABLE_SELF_HOSTED !== 'false',
});

const baseContactEmail = parsed.contactEmail || DEFAULT_EMAIL;

export const env = {
  ...parsed,
  contactEmail: baseContactEmail,
  emails: {
    contact: baseContactEmail,
    support: parsed.supportEmail || baseContactEmail,
    billing: parsed.billingEmail || baseContactEmail,
    sales: parsed.salesEmail || baseContactEmail,
    security: parsed.securityEmail || baseContactEmail,
    legal: parsed.legalEmail || baseContactEmail,
    privacy: parsed.privacyEmail || baseContactEmail,
    dpa: parsed.dpaEmail || baseContactEmail,
    enterprise: parsed.enterpriseEmail || baseContactEmail,
  },
};

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
