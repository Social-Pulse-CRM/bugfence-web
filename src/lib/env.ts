import { z } from 'zod';

/** Public, non-secret site config. Only NEXT_PUBLIC_* values belong here. */
const schema = z.object({
  siteUrl: z.string().url().default('http://localhost:3000'),
  demoAppUrl: z.string().url().default('http://localhost:3000'),
  demoDashboardUrl: z.string().url().default('http://localhost:5000'),
  npmUrl: z.string().url().optional(),
  npmPackage: z.string().min(1).optional(),
  loginUrl: z.string().url().optional(),
  docsUrl: z.string().url().optional(),
  githubUrl: z.string().url().optional(),
  contactEmail: z.string().email().optional(),
});

const empty = (v: string | undefined) => (v && v.trim() !== '' ? v.trim() : undefined);

// Must reference process.env.NEXT_PUBLIC_* literally so Next can inline them.
export const env = schema.parse({
  siteUrl: empty(process.env.NEXT_PUBLIC_SITE_URL),
  demoAppUrl: empty(process.env.NEXT_PUBLIC_DEMO_APP_URL),
  demoDashboardUrl: empty(process.env.NEXT_PUBLIC_DEMO_DASHBOARD_URL),
  npmUrl: empty(process.env.NEXT_PUBLIC_NPM_URL),
  npmPackage: empty(process.env.NEXT_PUBLIC_NPM_PACKAGE),
  loginUrl: empty(process.env.NEXT_PUBLIC_APP_LOGIN_URL),
  docsUrl: empty(process.env.NEXT_PUBLIC_DOCS_URL),
  githubUrl: empty(process.env.NEXT_PUBLIC_GITHUB_URL),
  contactEmail: empty(process.env.NEXT_PUBLIC_CONTACT_EMAIL),
});
