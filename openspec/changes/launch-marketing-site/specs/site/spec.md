## ADDED Requirements

### Requirement: Truthful content
The site SHALL contain only claims traceable to the BugFence product repo or a dated public source, and SHALL NOT display fabricated testimonials, customer logos, statistics, ratings or certifications.

#### Scenario: Unverified claim
- **WHEN** a claim has no entry in the claim-source map
- **THEN** it is not published

#### Scenario: Competitor data
- **WHEN** a competitor price or feature is shown
- **THEN** it includes a source link and a "checked on" date

### Requirement: Landing page communicates the unique value
The home page SHALL present hero, how-it-works, a live client-side redaction demo, features, install snippet, security and pricing teasers, FAQ and a final CTA.

#### Scenario: Redaction demo
- **WHEN** a visitor types sample text containing an email, card number or token
- **THEN** it is masked in the "what is sent" output, nothing is transmitted, and the output is announced via `aria-live`

### Requirement: Transparent pricing
The pricing page SHALL show only owner-confirmed tiers and limits, with a free tier visible without login, a feature matrix, and an FAQ.

#### Scenario: Unconfirmed tier
- **WHEN** a tier is not confirmed by the owner
- **THEN** it is omitted or labelled "planned"

### Requirement: Honest trust and legal pages
The site SHALL provide Security, Privacy, Terms, Cookies, DPA and Accessibility pages, state product limitations plainly (best-effort redaction, unmasked screen video), and claim no certification unless held.

#### Scenario: Vulnerability reporting
- **WHEN** a researcher requests security contact
- **THEN** `/.well-known/security.txt` provides it

### Requirement: SDK links from configuration
Install and login links SHALL be read from environment variables and SHALL NOT be hard-coded.

#### Scenario: Missing npm URL
- **WHEN** `NEXT_PUBLIC_NPM_URL` is unset
- **THEN** the build shows the docs link instead and logs a warning

### Requirement: Secure by default
The site SHALL send a nonce-based CSP and standard security headers, validate env with zod, expose no secrets via `NEXT_PUBLIC_*`, and rate-limit the contact endpoint.

#### Scenario: Header check
- **WHEN** any page is requested
- **THEN** CSP, HSTS, nosniff, Referrer-Policy and frame-ancestors none are present

### Requirement: Accessible and fast
Every page SHALL meet WCAG 2.2 AA in light and dark themes, respect reduced motion, and meet LCP < 2.5s, CLS < 0.1, INP < 200ms.

#### Scenario: Automated audit
- **WHEN** CI runs axe and Lighthouse
- **THEN** zero axe violations, A11y 100, Perf ≥ 95
