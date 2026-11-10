## 0. Gate
- [ ] 0.1 Owner answers open questions in design.md and says "proceed"
- [ ] 0.2 Add GitHub remote (SSH alias `github-bugfence-web`), push `main`

## 1. Foundation
- [ ] 1.1 Scaffold Next.js (App Router, TS strict, Tailwind v4, pnpm), ESLint (next, jsx-a11y), Prettier, Husky
- [ ] 1.2 `lib/env.ts` (zod) and `.env.example` wiring for npm URL, package, login, docs, contact
- [ ] 1.3 Design tokens (`styles/tokens.css`), fonts, dark/light theme, no FOUC
- [ ] 1.4 UI atoms (Button, Badge, Card, Tabs, Accordion, Tooltip, Kbd, Container) with unit tests
- [ ] 1.5 Layout: SkipLink, Header, MobileNav, Footer, ThemeToggle

## 2. Content and data
- [ ] 2.1 Typed content: nav, features, plans, FAQ, competitors (with `sourceUrl`/`checkedOn`)
- [ ] 2.2 Verify every claim against product repo / sources; add claim-source map in `docs/claims.md`

## 3. Landing page
- [ ] 3.1 Hero + CSS WidgetMock (static first paint, hydrate on intersection)
- [ ] 3.2 How it works, pain-point themes, feature grid, integrations
- [ ] 3.3 CodeBlock (shiki) + CopyButton + InstallTabs (a11y announce)
- [ ] 3.4 Redaction demo: pure `redact()` + fixtures (emails, Luhn cards, JWT, keys, false positives); client-only, aria-live
- [ ] 3.5 FAQ, final CTA, pricing/security teasers

## 4. Pricing, Security, Compare
- [ ] 4.1 Pricing page with confirmed tiers, toggle (if applicable), matrix, FAQ
- [ ] 4.2 Security page: data-flow SVG, collected/redacted/not-redacted, limitations, disclosure
- [ ] 4.3 Compare page (sourced, dated, respectful)

## 5. Legal and contact
- [ ] 5.1 Privacy, Terms, Cookies, DPA, Accessibility (MDX templates, last-updated date, counsel review flag)
- [ ] 5.2 Contact form: zod, honeypot + min-time, rate limit, tests
- [ ] 5.3 `/.well-known/security.txt`, About page

## 6. Quality and security
- [ ] 6.1 Nonce CSP (Report-Only then enforce) + security headers + header tests
- [ ] 6.2 SEO: metadata, sitemap, robots, OG images, JSON-LD (no fake ratings)
- [ ] 6.3 Playwright e2e + axe (both themes), keyboard test
- [ ] 6.4 Lighthouse CI budgets (Perf ≥95, A11y 100, SEO 100)
- [ ] 6.5 CI: typecheck, lint, unit, build, e2e, gitleaks, audit, secret grep of build output
- [ ] 6.6 Final review: no fake content, all claims sourced, legal reviewed
