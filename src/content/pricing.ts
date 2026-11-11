export type Currency = 'usd' | 'inr';

export interface PlanPrice {
  amount: number | null;
  formatted: string;
  period: string;
  subtext: string;
}

export interface PlanCurrencyPricing {
  monthly: PlanPrice;
  yearly: PlanPrice;
  taxNote: string;
  gateway: string;
}

export interface Plan {
  id: 'free' | 'pro' | 'business' | 'enterprise';
  name: string;
  cadence: string;
  blurb: string;
  cta: { label: string; href?: string; action?: 'link' | 'checkout' };
  highlight: boolean;
  badge?: string;
  pricing: Record<Currency, PlanCurrencyPricing>;
  features: string[];
}

export const PLANS: Plan[] = [
  {
    id: 'free',
    name: 'Free',
    cadence: 'Forever free · Open Core',
    blurb: 'For trying BugFence on a side project or single-team self-hosting. 100% private on your own infrastructure.',
    cta: { label: 'Get Started Free', href: '/#install', action: 'link' },
    highlight: false,
    badge: 'Self-Hosted Core',
    pricing: {
      usd: {
        monthly: { amount: 0, formatted: '$0', period: '/ month', subtext: 'Forever free' },
        yearly: { amount: 0, formatted: '$0', period: '/ month', subtext: 'Forever free' },
        taxNote: 'No credit card required',
        gateway: 'Community Open Source',
      },
      inr: {
        monthly: { amount: 0, formatted: '₹0', period: '/ month', subtext: 'Forever free' },
        yearly: { amount: 0, formatted: '₹0', period: '/ month', subtext: 'Forever free' },
        taxNote: 'No credit card required',
        gateway: 'Community Open Source',
      },
    },
    features: [
      '1 project included',
      '3 team seats (unlimited guest reporters)',
      '100 reports / month (with 10% buffer)',
      '1 GB secure media storage',
      '14-day report & 7-day media retention',
      'Reporting Studio in Shadow DOM (~15 KB lazy core)',
      'Client-side DOM redaction before wire upload',
      'Technical diagnostics (console, network, breadcrumbs)',
      'Automatic issue grouping by stack trace & regression detection',
      'Local stdio MCP server for Claude Code & Cursor',
      'Local JSON file store or PostgreSQL backend',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    cadence: 'For fast-moving engineering teams',
    blurb: 'For engineering teams shipping every week with multi-project tracking, automated AI triage, and tracker sync.',
    cta: { label: 'Upgrade to Pro', action: 'checkout' },
    highlight: true,
    badge: 'Most Popular',
    pricing: {
      usd: {
        monthly: { amount: 14, formatted: '$14', period: '/ month', subtext: 'Billed monthly' },
        yearly: { amount: 140, formatted: '$140', period: '/ year', subtext: 'Equivalent to ~$11.60/mo' },
        taxNote: 'Excludes applicable local sales tax',
        gateway: 'Stripe (Cards, Apple Pay, Google Pay)',
      },
      inr: {
        monthly: { amount: 999, formatted: '₹999', period: '/ month', subtext: 'Billed monthly' },
        yearly: { amount: 9990, formatted: '₹9,990', period: '/ year', subtext: 'Equivalent to ~₹832/mo' },
        taxNote: '+ 18% GST (Includes B2B GSTIN tax invoice)',
        gateway: 'Razorpay (UPI, Netbanking, Cards)',
      },
    },
    features: [
      '5 projects included',
      '5 team seats (unlimited guest reporters)',
      '1,200 reports / month (with 10% buffer)',
      '15 GB secure media storage',
      '90-day report & 30-day media retention',
      'Server LLM summaries & reproduction steps',
      'Linear, Jira Cloud & GitHub 2-way sync',
      'Remote HTTPS MCP server with project API keys',
      'Release deploy tracking & suspect commit correlation',
      'Source maps symbolication pipeline',
      '48h email & community support',
    ],
  },
  {
    id: 'business',
    name: 'Business',
    cadence: 'For scaling companies & agencies',
    blurb: 'For scaling companies with many applications, high volume, Single Sign-On, and enterprise compliance needs.',
    cta: { label: 'Upgrade to Business', action: 'checkout' },
    highlight: false,
    badge: 'Scale & Teams',
    pricing: {
      usd: {
        monthly: { amount: 39, formatted: '$39', period: '/ month', subtext: 'Billed monthly' },
        yearly: { amount: 390, formatted: '$390', period: '/ year', subtext: 'Equivalent to ~$32.50/mo' },
        taxNote: 'Excludes applicable local sales tax',
        gateway: 'Stripe (Cards, Apple Pay, Google Pay)',
      },
      inr: {
        monthly: { amount: 2799, formatted: '₹2,799', period: '/ month', subtext: 'Billed monthly' },
        yearly: { amount: 27990, formatted: '₹27,990', period: '/ year', subtext: 'Equivalent to ~₹2,332/mo' },
        taxNote: '+ 18% GST (Includes B2B GSTIN tax invoice)',
        gateway: 'Razorpay (UPI, Netbanking, Cards)',
      },
    },
    features: [
      '25 projects included',
      '15 team seats (unlimited guest reporters)',
      '6,000 reports / month (with 10% buffer)',
      '60 GB secure media storage',
      '365-day report & 90-day media retention',
      'Single Sign-On (SAML 2.0 / OIDC / Okta / Azure AD)',
      'Cross-issue semantic clustering & duplicate deduplication',
      '100% White-Label: custom logo, custom domain & email styling',
      'Sentry, Datadog, PagerDuty & HMAC-signed webhooks',
      'Automated PII scrubbing verification audits',
      '12h priority email & Slack triage channel',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise Custom',
    cadence: 'For air-gapped VPCs & regulated orgs',
    blurb: 'Complete sovereignty for organizations with strict compliance, SOC 2/HIPAA BAAs, and offline air-gapped networks.',
    cta: { label: 'Contact Enterprise Sales', href: '/contact?topic=enterprise', action: 'link' },
    highlight: false,
    badge: 'Air-Gapped & VPC',
    pricing: {
      usd: {
        monthly: { amount: null, formatted: 'Custom', period: 'contract', subtext: 'Billed annually' },
        yearly: { amount: null, formatted: 'Custom', period: 'contract', subtext: 'Billed annually' },
        taxNote: 'Custom MSA & Vendor Procurement',
        gateway: 'Direct Wire / ACH Transfer',
      },
      inr: {
        monthly: { amount: null, formatted: 'Custom', period: 'contract', subtext: 'Billed annually' },
        yearly: { amount: null, formatted: 'Custom', period: 'contract', subtext: 'Billed annually' },
        taxNote: 'Includes full GST B2B tax invoice',
        gateway: 'Bank Transfer (NEFT / RTGS / Corporate Wire)',
      },
    },
    features: [
      'Unlimited projects & teams',
      'Custom seat volume (50+ triagers)',
      'Custom / Unlimited monthly report ingestion',
      'Dedicated or BYOS cloud media storage',
      'Custom data & video retention policies',
      'Air-gapped private VPC deployment',
      '100% Offline Cryptographic Licence (BFLIC token)',
      'Zero outbound network telemetry guaranteed',
      'HIPAA BAA & SOC 2 Type II compliance pack',
      'Custom SAML 2.0 identity federation',
      '1-hour critical response SLA & dedicated solutions engineer',
    ],
  },
];

export interface FeatureMatrixCategory {
  category: string;
  items: {
    name: string;
    free: string;
    pro: string;
    business: string;
    enterprise: string;
  }[];
}

export function getFeatureMatrix(currency: Currency): FeatureMatrixCategory[] {
  const isINR = currency === 'inr';
  const proPrice = isINR ? '₹999 / mo (₹9,990 / yr)' : '$14 / mo ($140 / yr)';
  const bizPrice = isINR ? '₹2,799 / mo (₹27,990 / yr)' : '$39 / mo ($390 / yr)';

  return [
    {
      category: 'Workspace & Capacity',
      items: [
        { name: 'Plan Price', free: 'Free ($0 / ₹0)', pro: proPrice, business: bizPrice, enterprise: 'Custom Contract' },
        { name: 'Projects Included', free: '1', pro: '5', business: '25', enterprise: 'Unlimited' },
        { name: 'Team Seats (Full triagers)', free: '3', pro: '5', business: '15', enterprise: 'Custom (50+)' },
        { name: 'Guest Reporters (End-users / QA)', free: 'Unlimited (Free)', pro: 'Unlimited (Free)', business: 'Unlimited (Free)', enterprise: 'Unlimited (Free)' },
        { name: 'Monthly Report Quota', free: '100 / mo', pro: '1,200 / mo', business: '6,000 / mo', enterprise: 'Custom / Unlimited' },
        { name: 'Media Storage Capacity', free: '1 GB', pro: '15 GB', business: '60 GB', enterprise: 'Dedicated / BYOS' },
        { name: 'Report Data Retention', free: '14 days', pro: '90 days', business: '365 days', enterprise: '730 days / Custom' },
        { name: 'Media Storage Retention', free: '7 days', pro: '30 days', business: '90 days', enterprise: '365 days / Custom' },
      ],
    },
    {
      category: 'Capture & Reporting Studio',
      items: [
        { name: 'Zero-Dependency Widget in Shadow DOM', free: 'Included', pro: 'Included', business: 'Included', enterprise: 'Included' },
        { name: 'Modular Lazy Loading (~15 KB Core)', free: 'Included', pro: 'Included', business: 'Included', enterprise: 'Included' },
        { name: 'Annotated Viewport Screenshot', free: 'Included', pro: 'Included', business: 'Included', enterprise: 'Included' },
        { name: 'Pixel-Perfect Tab Capture', free: 'Included', pro: 'Included', business: 'Included', enterprise: 'Included' },
        { name: 'Screen Recording with Narration', free: 'Included', pro: 'Included', business: 'Included', enterprise: 'Included' },
        { name: '30s DOM Session Replay Scrubbing', free: 'Included', pro: 'Included', business: 'Included', enterprise: 'Included' },
        { name: 'Interactive Element Picker', free: 'Included', pro: 'Included', business: 'Included', enterprise: 'Included' },
        { name: 'Voice Dictation for Bug Descriptions', free: 'Included', pro: 'Included', business: 'Included', enterprise: 'Included' },
      ],
    },
    {
      category: 'Privacy, Security & Fencing',
      items: [
        { name: 'Browser-Side DOM Redaction (Before Upload)', free: 'Included', pro: 'Included', business: 'Included', enterprise: 'Included' },
        { name: 'Automated Password & Credit Card Masking', free: 'Included', pro: 'Included', business: 'Included', enterprise: 'Included' },
        { name: 'SSN, Phone & Email Regex Scrubbing', free: 'Included', pro: 'Included', business: 'Included', enterprise: 'Included' },
        { name: 'Custom Mask & Block CSS Selectors', free: 'Included', pro: 'Included', business: 'Included', enterprise: 'Included' },
        { name: 'Air-Gapped VPC / 100% Offline Cryptographic Licence', free: '—', pro: '—', business: '—', enterprise: 'Included (BFLIC...)' },
        { name: 'Zero Phone-Home Network Pings', free: 'Included', pro: 'Included', business: 'Included', enterprise: 'Guaranteed' },
        { name: 'SSO (SAML 2.0 / Okta / Azure AD / OIDC)', free: '—', pro: '—', business: 'Included', enterprise: 'Included' },
        { name: 'Enterprise Audit Trail & BAA Support', free: '—', pro: '—', business: '—', enterprise: 'Included' },
      ],
    },
    {
      category: 'AI Diagnostics & Coding Agents (MCP)',
      items: [
        { name: 'On-Device AI Heuristics', free: 'Included', pro: 'Included', business: 'Included', enterprise: 'Included' },
        { name: 'Server LLM Triage & Reproduction Steps', free: '—', pro: 'Included', business: 'Included', enterprise: 'Dedicated Endpoint' },
        { name: 'Semantic Issue Grouping & Deduplication', free: 'Basic Hash', pro: 'Stack + Endpoint', business: 'Vector Embeddings', enterprise: 'Custom Taxonomy' },
        { name: 'Local stdio MCP Server (Claude Code, Cursor)', free: 'Included', pro: 'Included', business: 'Included', enterprise: 'Included' },
        { name: 'Remote HTTPS MCP Server + Team Tokens', free: '—', pro: 'Included', business: 'Included', enterprise: 'Included' },
        { name: 'Enterprise MCP Gateway with IP Allowlist', free: '—', pro: '—', business: '—', enterprise: 'Included' },
      ],
    },
    {
      category: 'Integrations & Ecosystem',
      items: [
        { name: 'GitHub Issues & Releases Sync', free: '1-way', pro: '2-way Bi-directional', business: '2-way Bi-directional', enterprise: 'GitHub Enterprise' },
        { name: 'Linear & Jira Cloud Sync', free: '—', pro: '2-way Bi-directional', business: '2-way Bi-directional', enterprise: 'Jira Data Center' },
        { name: 'Sentry Correlation & Trace Linking', free: 'Trace tags', pro: '2-way Linking', business: 'Full APM Correlation', enterprise: 'Full APM Correlation' },
        { name: 'Datadog, Splunk HEC & PagerDuty Alerts', free: '—', pro: '—', business: 'Included', enterprise: 'Included' },
        { name: 'HMAC-Signed Webhooks (Slack/Discord/Teams)', free: '—', pro: 'Included', business: 'Included', enterprise: 'Included' },
        { name: '100% White-Label (Custom Domain & Branding)', free: '—', pro: '—', business: 'Included', enterprise: 'Custom Tenant' },
      ],
    },
    {
      category: 'Deployment, Storage & Support',
      items: [
        { name: 'Self-Hosted Docker & Docker Compose', free: 'Included', pro: 'Included', business: 'Included', enterprise: 'Air-gapped / K8s' },
        { name: 'Database Backend', free: 'JSON / Postgres', pro: 'PostgreSQL / R2', business: 'PostgreSQL / R2', enterprise: 'Any SQL / S3 / R2' },
        { name: 'Support SLA', free: 'Community Forum', pro: '48h Email Support', business: '12h Priority Email & Chat', enterprise: '1h Critical SLA + CSM' },
      ],
    },
  ];
}

export const PRICING_FAQ = [
  {
    q: 'How does Indian Rupee (INR) vs International (USD) pricing work?',
    a: 'BugFence supports dual-currency billing: USD ($) for international teams via Stripe, and INR (₹) for Indian developers and companies via Razorpay. When paying in INR, you can pay using UPI (Google Pay, PhonePe, Paytm), Netbanking, and Indian credit/debit cards, and receive compliant GST tax invoices for input tax credits.',
  },
  {
    q: 'How do the four BugFence pricing tiers compare?',
    a: 'BugFence is structured to support every stage of engineering: Free is an open-core tier for local testing and indie hackers (100 reports/mo, 1 GB storage, 1 project, 3 seats). Pro ($14/mo or ₹999/mo) is built for fast-shipping engineering teams (1,200 reports/mo, 15 GB storage, 5 projects, 5 seats, 2-way sync). Business ($39/mo or ₹2,799/mo) powers software agencies and scaling SaaS teams (6,000 reports/mo, 60 GB storage, 25 projects, 15 seats, SSO, white-labeling). Enterprise Custom is dedicated to regulated organizations requiring air-gapped private VPCs, SAML 2.0, HIPAA BAAs, custom quotas, and offline cryptographic license tokens.',
  },
  {
    q: 'How does annual billing work, and how much do I save?',
    a: 'When choosing annual billing, you receive roughly 2 months free each year (~20% off). Pro is $140/year (or ₹9,990/year), and Business is $390/year (or ₹27,990/year). You can switch between monthly and annual billing at any time.',
  },
  {
    q: 'What is the difference between Guest Reporters and Team Seats?',
    a: 'A guest reporter is any QA tester, client, stakeholder, or end-user who submits a bug report through the widget or views the status of bugs they reported. All plans include unlimited guest reporters at zero cost ($0 / ₹0). Only internal team members who manage projects, triage issues, trigger coding agent workflows, or configure integrations require paid team seats (3 on Free, 5 on Pro, 15 on Business, custom on Enterprise).',
  },
  {
    q: 'What happens if our team exceeds our monthly report cap?',
    a: 'BugFence includes a 10% soft buffer quota before enforcing rate limits so critical bug reports are never lost during an unexpected surge or product launch. If you consistently exceed your quota, you can upgrade your plan or configure custom retention tiers.',
  },
  {
    q: 'How does the offline enterprise licence work (BFLIC token)?',
    a: 'BugFence Enterprise uses cryptographically signed JWT tokens (formatted as BFLIC.<payload>.<hmac_sha256>). Your on-premise or VPC server verifies the token signature completely offline using a local verification key. It makes zero outbound phone-home network requests, guaranteeing strict compliance in defense, healthcare, and air-gapped banking networks.',
  },
];
