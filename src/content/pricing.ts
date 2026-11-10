export interface Plan {
  id: 'free' | 'pro' | 'business' | 'enterprise';
  name: string;
  monthlyPrice: number | null;
  yearlyPrice: number | null;
  cadence: string;
  blurb: string;
  cta: { label: string; href: string };
  highlight: boolean;
  badge?: string;
  features: string[];
}

export const PLANS: Plan[] = [
  {
    id: 'free',
    name: 'Free',
    monthlyPrice: 0,
    yearlyPrice: 0,
    cadence: 'Forever free · Open Core',
    blurb: 'For trying BugFence on a side project or single-team self-hosting. 100% private on your own infrastructure.',
    cta: { label: 'Get Started Free', href: '/#install' },
    highlight: false,
    badge: 'Self-Hosted Core',
    features: [
      '1 project included',
      '3 team seats (unlimited guest reporters)',
      '1,000 reports / month',
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
    monthlyPrice: 14,
    yearlyPrice: 140,
    cadence: 'Billed monthly or $140 annually',
    blurb: 'For fast-moving engineering teams shipping every week with multi-project tracking and AI triage.',
    cta: { label: 'Upgrade to Pro', href: '/contact?topic=pro' },
    highlight: true,
    badge: 'Most Popular',
    features: [
      '5 projects included',
      '15 team seats (unlimited guest reporters)',
      '25,000 reports / month',
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
    monthlyPrice: 39,
    yearlyPrice: 390,
    cadence: 'Billed monthly or $390 annually',
    blurb: 'For scaling companies with many applications, high volume, Single Sign-On, and compliance needs.',
    cta: { label: 'Get Business', href: '/contact?topic=business' },
    highlight: false,
    badge: 'Scale & Teams',
    features: [
      '25 projects included',
      '100 team seats (unlimited guest reporters)',
      '250,000 reports / month',
      '365-day report & 90-day media retention',
      'Single Sign-On (SAML 2.0 / OIDC / Okta / Azure AD)',
      'Cross-issue semantic clustering & duplicate deduplication',
      '100% White-Label: custom logo, custom domain & email styling',
      'Sentry, Datadog, PagerDuty & HMAC-signed webhooks',
      'Priority 12h email & Slack triage support',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise Custom',
    monthlyPrice: null,
    yearlyPrice: null,
    cadence: 'Licensed · Air-gapped VPC or Dedicated Cloud',
    blurb: 'Custom volume, private VPC isolation, offline cryptographic licensing, and 1-hour critical response SLAs.',
    cta: { label: 'Contact Sales', href: '/contact?topic=enterprise' },
    highlight: false,
    badge: 'Private VPC & Air-Gap',
    features: [
      'Unlimited projects & custom seats (500+ included)',
      'Unlimited monthly reports & custom retention (up to 730+ days)',
      '100% offline cryptographically signed license (BFLIC..., zero phone-home)',
      'Air-gapped VPC deployment (AWS, GCP, Azure, on-premise)',
      'Dedicated private LLM endpoint (Azure OpenAI / private Ollama)',
      'Enterprise MCP Gateway with audit logging & IP allowlisting',
      'HIPAA BAA, SOC 2 compliance support & enterprise audit trail',
      '1-hour critical response SLA & named Customer Success Manager',
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

export const FEATURE_MATRIX: FeatureMatrixCategory[] = [
  {
    category: 'Workspace & Capacity',
    items: [
      { name: 'Projects Included', free: '1', pro: '5', business: '25', enterprise: 'Unlimited' },
      { name: 'Team Seats (Full triagers)', free: '3', pro: '15', business: '100', enterprise: 'Custom (500+)' },
      { name: 'Guest Reporters (End-users / QA)', free: 'Unlimited ($0)', pro: 'Unlimited ($0)', business: 'Unlimited ($0)', enterprise: 'Unlimited ($0)' },
      { name: 'Monthly Report Quota', free: '1,000 / mo', pro: '25,000 / mo', business: '250,000 / mo', enterprise: 'Unlimited' },
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

export const PRICING_FAQ = [
  {
    q: 'How does self-hosting work?',
    a: 'BugFence is designed to run in your private environment. You can deploy it using Docker, Docker Compose, or as a standard Node.js service with PostgreSQL or local file storage. When self-hosted without billing keys, your instance operates on your own servers without external dependencies.',
  },
  {
    q: 'Do guest reporters count toward my team seats?',
    a: 'No! End-users, QA testers, and clients who submit bugs or view their own reported tickets are 100% free across all plans. You only consume team seats for internal developers, triage leads, and administrators who manage projects and modify issues in the Evidence Console.',
  },
  {
    q: 'What happens if we exceed our monthly report quota?',
    a: 'BugFence includes a built-in 10% soft quota grace period so unexpected spike traffic or viral product launches never drop critical customer bug reports. If you consistently exceed your quota, you can upgrade your plan or configure custom retention tiers.',
  },
  {
    q: 'How does the offline enterprise licence key work?',
    a: 'BugFence Enterprise uses cryptographically signed tokens formatted as BFLIC.<payload>.<signature>. Your server verifies the HMAC-SHA256 signature completely offline using a local secret key. It never makes outbound "phone-home" network calls, which means you can run BugFence in strictly air-gapped, defense, healthcare, or banking VPCs.',
  },
  {
    q: 'Can I upgrade from Free to Pro or Business without losing data?',
    a: 'Yes. Upgrading requires zero database migrations or downtime. Simply configure your subscription keys or enter your enterprise licence token via the BUGFENCE_ENTERPRISE_KEY environment variable. All existing projects, reports, and diagnostic logs remain intact.',
  },
  {
    q: 'What are the savings with annual billing?',
    a: 'Annual plans (Pro at $140/yr and Business at $390/yr) give you roughly 2 months free each year—saving you ~17% compared to monthly billing.',
  },
] as const;
