// Only tiers confirmed in the product repo (docs/ENTERPRISE_LICENSING.md). Cloud tiers are NOT listed
// until the owner confirms they exist. See openspec design.md "Open Questions".
export const PLANS = [
  {
    id: 'community', name: 'Community', price: 'Free', cadence: 'self-hosted',
    blurb: 'Evaluate or run BugFence for a single team on your own infrastructure.',
    cta: { label: 'Get started', href: '/contact' },
    features: ['1 project', '3 seats', '1,000 reports / month', '14-day retention', 'Full capture, diagnostics and grouping', 'MCP server and CLI'],
  },
  {
    id: 'enterprise', name: 'Enterprise', price: 'Custom', cadence: 'licensed, self-hosted',
    blurb: 'Multi-project scale with a signed licence key verified offline. No phone-home.',
    cta: { label: 'Talk to us', href: '/contact' },
    features: ['Custom projects, seats and report volume', 'Longer retention', 'Priority AI triage option', 'SAML SSO (confirm availability before launch)', 'Offline-verified licence token, 7-day grace after expiry'],
  },
] as const;

export const PRICING_FAQ = [
  { q: 'Is there a hosted cloud plan?', a: 'Not announced on this page. Check back, or contact us.' },
  { q: 'What counts as a report?', a: 'One submission from the widget, including its attachments.' },
  { q: 'What happens when a licence expires?', a: 'A 7-day grace period applies, and verification is fully offline.' },
] as const;
