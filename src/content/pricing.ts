// Only tiers confirmed in the product repo (docs/ENTERPRISE_LICENSING.md).
export const PLANS = [
  {
    id: 'community',
    name: 'Community Edition',
    price: 'Free',
    cadence: 'Self-hosted open core',
    blurb: 'Complete visual bug reporting and developer triage for a single team. 100% self-hosted on your own infrastructure.',
    cta: { label: 'Get Started Free', href: '/#install' },
    highlight: false,
    badge: 'Open Core',
    features: [
      '1 project & up to 3 seats',
      '1,000 reports / month',
      '14-day report & media retention',
      'Zero-dependency TypeScript widget in Shadow DOM (~15 KB lazy core)',
      'Reporting Studio: Screenshot, Screen Recording & 30s DOM Replay',
      'Browser-side privacy redaction before upload (passwords, cards, PII)',
      'Full technical diagnostics (console logs, failed network requests, breadcrumbs)',
      'Automatic issue grouping by stack trace & regression detection',
      'MCP server and CLI for AI coding agents (Claude Code, Cursor, Copilot)',
      'Storage on local JSON files or self-hosted PostgreSQL',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise Edition',
    price: 'Custom',
    cadence: 'Licensed, self-hosted private VPC',
    blurb: 'Multi-project scale, extended retention, enterprise security, and priority AI triage for regulated B2B SaaS.',
    cta: { label: 'Contact Sales', href: '/contact?topic=enterprise' },
    highlight: true,
    badge: 'Private VPC',
    features: [
      'Unlimited projects & custom seats',
      'Custom monthly report volume & extended retention (up to 730+ days)',
      '100% offline cryptographically signed licence token (zero phone-home)',
      'SAML 2.0 SSO & directory synchronization',
      'Priority AI issue triage with your own private LLM endpoint (OpenAI / Anthropic / Azure)',
      'Enterprise integrations (GitHub Enterprise, Jira Data Center, Splunk HEC, Datadog)',
      'Custom domain & white-label widget branding',
      'SSRF-guarded webhooks & AES-256-GCM encrypted integration credentials',
      'Dedicated deployment architecture support & enterprise SLA',
    ],
  },
] as const;

export const FEATURE_MATRIX = [
  {
    category: 'Reporting & Capture Modes',
    items: [
      { name: 'Annotated Viewport Screenshot', community: 'Included', enterprise: 'Included' },
      { name: 'Pixel-Perfect Tab Capture (with permission)', community: 'Included', enterprise: 'Included' },
      { name: 'Screen Recording with Audio Narration', community: 'Included', enterprise: 'Included' },
      { name: '30s DOM Session Replay Scrubbing', community: 'Included', enterprise: 'Included' },
      { name: 'Interactive Element Picker', community: 'Included', enterprise: 'Included' },
      { name: 'Voice Dictation for Bug Descriptions', community: 'Included', enterprise: 'Included' },
    ],
  },
  {
    category: 'Privacy & Data Protection',
    items: [
      { name: 'Browser-Side Masking (DOMFence before rasterization)', community: 'Included', enterprise: 'Included' },
      { name: 'Automatic Sensitive Pattern Scrubbing (JWT, Cards, SSN, Emails)', community: 'Included', enterprise: 'Included' },
      { name: 'Server-Side Replay Re-Scrubbing', community: 'Included', enterprise: 'Included' },
      { name: 'Custom Mask/Block Selectors (data-bugfence-mask)', community: 'Included', enterprise: 'Included' },
      { name: 'Reporter Explicit Consent Switches', community: 'Included', enterprise: 'Included' },
      { name: 'Zero Third-Party Cloud Data Leaks', community: '100% On-Prem / VPC', enterprise: '100% On-Prem / VPC' },
    ],
  },
  {
    category: 'Diagnostics & Triage',
    items: [
      { name: 'Console Logs & Uncaught Errors', community: 'Included', enterprise: 'Included' },
      { name: 'Failed Fetch / XHR Network Logs', community: 'Included', enterprise: 'Included' },
      { name: 'Sentry / LogRocket / PostHog Session Linking', community: 'Included', enterprise: 'Included' },
      { name: 'Issue Grouping by Stack Trace & Endpoint', community: 'Included', enterprise: 'Included' },
      { name: 'Regression Detection across Releases', community: 'Included', enterprise: 'Included' },
      { name: 'Source Map Symbolication', community: 'Included', enterprise: 'Included' },
      { name: 'AI Triage Heuristics', community: 'On-device heuristics', enterprise: 'Server-side LLM (private keys)' },
    ],
  },
  {
    category: 'Developer & Agent Ecosystem',
    items: [
      { name: 'Model Context Protocol (MCP) Server for AI Agents', community: 'Included', enterprise: 'Included' },
      { name: 'BugFence CLI Tool (`bugfence`)', community: 'Included', enterprise: 'Included' },
      { name: 'GitHub, Linear & Jira 1-Click Sync', community: 'Standard', enterprise: 'Enterprise & Self-Hosted' },
      { name: 'Slack, Teams & Discord Webhook Alerts', community: 'Included', enterprise: 'Included' },
      { name: 'HMAC-Signed Webhooks', community: 'Included', enterprise: 'Included' },
    ],
  },
  {
    category: 'Security & Compliance',
    items: [
      { name: 'Licence Verification', community: 'Open source', enterprise: 'Offline HMAC token (No phone-home)' },
      { name: 'SAML 2.0 SSO & Okta / Azure AD', community: '—', enterprise: 'Included' },
      { name: 'Encrypted Integration Tokens (AES-256-GCM)', community: 'Included', enterprise: 'Included' },
      { name: 'SSRF & CORS Protection', community: 'Included', enterprise: 'Included' },
      { name: 'Dedicated Support & Architecture Review', community: 'Community Forum / GitHub', enterprise: 'Direct Engineering SLA' },
    ],
  },
] as const;

export const PRICING_FAQ = [
  {
    q: 'How does self-hosting work?',
    a: 'BugFence is designed to run in your private environment. You can deploy it using Docker, Docker Compose, or as a standard Node.js service with PostgreSQL or local file storage. No bug report data ever leaves your servers unless you explicitly configure an external webhook or AI provider.',
  },
  {
    q: 'What counts towards the monthly report limit?',
    a: 'A report is counted when an end user or QA engineer submits a bug report through the widget to your API. Duplicate reports that are automatically grouped into an existing issue still count as incoming reports.',
  },
  {
    q: 'How does the offline enterprise licence work?',
    a: 'BugFence Enterprise uses cryptographically signed JSON Web Tokens (`BFLIC...`). Your instance verifies the licence signature completely offline using a public key. It never makes outbound "phone-home" network calls, which means you can run BugFence in strictly air-gapped or HIPAA/banking compliant VPCs.',
  },
  {
    q: 'Can I upgrade from Community to Enterprise without losing data?',
    a: 'Yes. Upgrading requires zero database migrations or downtime. Simply pass your enterprise licence token via the `BUGFENCE_ENTERPRISE_KEY` environment variable or enter it into the Evidence Console settings. All projects, issues, and diagnostics remain intact.',
  },
  {
    q: 'Is there a managed Cloud SaaS plan?',
    a: 'Our primary focus is privacy-first self-hosted deployments for engineering teams who cannot send diagnostic dumps or session recordings to multi-tenant third-party clouds. If you need a fully managed private instance, please contact our team.',
  },
] as const;
