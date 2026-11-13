export const SITE = {
  name: 'BugFence',
  tagline: 'Privacy-first visual bug reporting',
  description:
    'Capture annotated screenshots, recordings and session replay with diagnostics. Browser-side masking controls help reduce sensitive data in reports before upload. Self-hostable.',
} as const;

export const ENTITY = {
  legalName: 'SocialPulse CRM',
  brandName: 'BugFence',
  operatorStatement: 'BugFence is a software product owned and operated by SocialPulse CRM.',
  taxStatement: 'All commercial licensing, contracts, and GST-compliant B2B invoicing are executed under SocialPulse CRM.',
} as const;

export const NAV = [
  { href: '/#how-it-works', label: 'How it works' },
  { href: '/#sandbox', label: 'Sandbox' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/security', label: 'Security' },
  { href: '/compare/', label: 'Compare' },
] as const;

export const FOOTER = {
  Product: [
    { href: '/pricing', label: 'Pricing' },
    { href: '/security', label: 'Security' },
    { href: '/compare/', label: 'Compare' },
    { href: '/compare/#recommendations', label: 'Recommendations' },
    { href: 'https://docs.bug-fence.com', label: 'Documentation' },
  ],
  Company: [
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ],
  Legal: [
    { href: '/privacy', label: 'Privacy' },
    { href: '/terms', label: 'Terms' },
    { href: '/cookies', label: 'Cookies' },
    { href: '/dpa', label: 'DPA' },
    { href: '/accessibility', label: 'Accessibility' },
  ],
} as const;
