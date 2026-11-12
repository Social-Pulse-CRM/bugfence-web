## Why

BugFence has no public front door. Prospects cannot learn what it does, how it differs from Sentry, Jam, Marker.io and similar tools, what it costs, or how their data is handled. A fast, honest, accessible marketing site is the first step to adoption. It must contain only real, verifiable claims (no invented testimonials, logos, stats or certifications).

## What Changes

- New standalone repo `bugfence-web`: Next.js (App Router) + TypeScript + Tailwind marketing site.
- Pages: Home, Pricing, Security, How it works / Compare, Changelog (later), About, Contact, Privacy, Terms, Cookies, DPA, Accessibility statement, 404.
- Unique positioning: **privacy-first redaction in the browser, self-hostable, no extension for reporters, agent-ready (MCP + CLI), triage not just capture**.
- Interactive, truthful demos: live redaction demo (client-only), CSS widget mock, install tabs with copy.
- Public SDK install/login links driven by env vars (`NEXT_PUBLIC_NPM_URL`, `NEXT_PUBLIC_NPM_PACKAGE`, `NEXT_PUBLIC_APP_LOGIN_URL`), so nothing is hard-coded.
- Security hardening: nonce CSP, security headers, zod-validated env, rate-limited contact form, `security.txt`, secret scanning in CI.
- Respectful, sourced competitor comparison (links to competitors' own pricing pages, dated).

## Capabilities

### New Capabilities
- `site-foundation`: stack, folder structure, tokens, theming, layout, env config.
- `landing-page`: home page narrative, hero, USP, demos, install snippet.
- `pricing-page`: transparent tiers, toggle, matrix, FAQ.
- `trust-and-legal`: security page, privacy, terms, cookies, DPA, security.txt, honest limitations.
- `competitor-comparison`: sourced, respectful comparison content.
- `site-quality`: accessibility, performance, SEO, security headers, testing/CI.

### Modified Capabilities
None (new repo).

## Impact

- New repo only; no changes to the BugFence product repo (`social-pulse-crm/Crawler`).
- Blocked on owner decisions (see design.md "Open Questions"): final pricing, legal entity, contact emails, npm URL, whether Cloud SaaS exists, certification status.
- Legal pages are templates and must be reviewed by counsel before launch.
