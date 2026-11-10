## Context

BugFence (repo `socialpulsecrm/Crawler`) is a self-hosted, privacy-first visual bug-reporting platform: zero-dependency Shadow DOM widget, Evidence Console dashboard, CLI, MCP server. Research inputs are in `docs/research/`. Core rule: **no fabricated content**; every claim traces to the product repo or a dated public source.

## Goals / Non-Goals

**Goals:** best-in-class clarity and UX for developers/QA/PMs; unique positioning; fast (LCP < 2.5s), accessible (WCAG 2.2 AA), secure by default; clean, maintainable structure.
**Non-Goals:** the product dashboard/login itself (link out), blog at launch, i18n, a hosted checkout, fake social proof.

## Decisions

1. **Next.js App Router + TS strict + Tailwind v4 + Radix/shadcn primitives.** RSC by default keeps client JS minimal. MDX for legal/changelog. `shiki` at build time for code. `next-themes` for dark/light. `motion` only in hero/demo, honoring reduced motion.
2. **Folder structure** (feature-oriented, one-way dependencies `app → sections → features → ui → lib`):
   ```
   src/app/(marketing)/{page,pricing,security,compare,about,contact}
   src/app/(legal)/{privacy,terms,cookies,dpa,accessibility}   # MDX
   src/app/api/contact/route.ts
   src/components/{ui,layout,sections,code}
   src/features/{redaction-demo,widget-mock,pricing,contact}
   src/content/{legal,changelog,competitors.ts}                # typed data, not JSX
   src/lib/{env,seo,jsonld,csp,cn}.ts
   src/middleware.ts                                           # nonce CSP
   tests/{unit,e2e,a11y}
   ```
3. **Content as typed data** (`plans.ts`, `features.ts`, `competitors.ts`, `nav.ts`) validated by zod; each competitor fact carries `sourceUrl` and `checkedOn`.
4. **Analytics:** none at launch, or cookieless (Plausible) later; cookie policy says "no tracking cookies". Avoids a consent banner and matches the brand.
5. **Contact form:** route handler, zod validation, honeypot + min-time check, in-memory/Upstash rate limit; no CAPTCHA by default.
6. **Env:** `lib/env.ts` (zod, `server-only` for secrets). Only non-secret values use `NEXT_PUBLIC_`. `.env.example` committed; CI greps the build output for secrets and runs gitleaks.
7. **Security headers:** nonce CSP in middleware (Report-Only first, then enforce), HSTS, nosniff, Referrer-Policy, Permissions-Policy, COOP/CORP, frame-ancestors none, `poweredByHeader: false`. Nonce APIs must be verified against current Next.js docs at build time (the design research was done from general knowledge, not live docs).
8. **Design language:** dark-first with light theme; one shield-teal accent (`#2DD4A7` dark / `#0B7A5F` light) plus indigo secondary; Geist/Inter + Geist Mono; 4px spacing base; 14px card radius; hairline borders; motion 120/200/400ms, transform/opacity only. Contrast checked at token level (AA).

### Unique selling points (all verifiable in the product repo)
| USP | Evidence | Respectful framing |
|---|---|---|
| Redaction in the browser before upload, plus server re-scrub | SEC §1–2 | "Great hosted tools exist; if reports must stay inside your boundary, BugFence redacts before data leaves the browser." |
| Self-host (Docker, Postgres/JSON); offline-verified enterprise licence, no phone-home | README, LIC | "Run it in your own VPC." |
| No extension needed for reporters | Widget | "Extensions suit internal teams; a drop-in widget lets customers report." |
| Agent-ready: MCP server + CLI, scoped read-only keys | README | "Complements dashboards by giving your coding agent the same evidence." |
| Triage, not just capture: grouping, regressions, releases, source maps | README | "Works alongside Sentry/LogRocket/FullStory; links to their sessions." |

Honest limitations are shown on the Security page: pattern-based redaction is best-effort, screen video is not masked, reports are stored unencrypted by the app (use disk encryption), no SSO/audit log shipped yet (confirm status), no certifications claimed.

### Page narratives
- **Home:** Hero (eyebrow "Privacy-first bug reporting", H1 candidate "Bug reports with the evidence, without the leaks", two CTAs: Install the widget / See the redaction demo) with CSS widget mock; "how it works" (capture → redact → triage → hand to your agent); live redaction demo; pain points (extension wall, privacy panic, duplicate floods, missing context) phrased as themes, not stats; feature grid; install tabs (npm/pnpm/script/React); integrations; security teaser; pricing teaser; FAQ; final CTA.
- **Pricing:** shows the tiers the owner confirms; until then, only Community (free, self-hosted: 1 project, 3 seats, 1,000 reports/mo per LIC) and Enterprise (contact). Cloud tiers appear only if Cloud exists.
- **Security:** data-flow SVG, what is collected, what is redacted and what is not, encryption facts, hosting model, vuln disclosure, `security.txt`.
- **Compare:** short, factual, dated, links to competitors' pricing pages; no churn quotes; no unsourced numbers.

## Risks / Trade-offs

- Research agents used search summaries, so competitor prices and hero copy **must be re-verified** (manual pass) before publishing the compare page.
- Internal docs conflict (free tier 1,000 vs 50 reports; SSO advertised vs "not yet"; Cloud vs self-host-only). Site content waits on owner answers; unconfirmed items are omitted or marked "planned".
- VOC stats (78%, 4.2x, etc.) are uncited, so they are excluded.
- Nonce CSP forces dynamic rendering; accept, or switch to hash-based CSP for static output.
- The React SDK is on GitHub Packages, not public npm. Install docs need the `.npmrc` scope line until public npm exists.

## Open Questions (owner must answer before development)

1. Legal entity name, address, jurisdiction; contact / support / security / privacy emails.
2. Final domain(s); is `app.bugfence.io` live? Does Cloud SaaS exist or launch later? Payment provider?
3. Final pricing and limits (resolve free tier: 1,000 reports/14 days vs 50 reports/7 days); is the draft Pro/Team/Enterprise table real?
4. Public npm URL and package name (env `NEXT_PUBLIC_NPM_URL` / `NEXT_PUBLIC_NPM_PACKAGE`); real CDN URL for the script tag; login URL.
5. SSO status; certifications (none claimed by default); subprocessor list; data residency if Cloud.
6. Any real customers, logos or quotes you have permission to show (none will be shown otherwise).
7. Are competitor comparisons approved? Brand assets (logo, name casing, colors)?
8. Analytics: none, or Plausible?
9. Hosting target for the site (Vercel, Cloudflare, self-host)?
