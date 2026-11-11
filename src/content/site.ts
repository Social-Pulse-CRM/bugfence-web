export const SITE = {
  name: 'BugFence',
  tagline: 'Privacy-first visual bug reporting',
  description:
    'Capture annotated screenshots, recordings and session replay with diagnostics. Sensitive data is redacted in the browser before anything is sent. Self-hostable.',
} as const;

export const NAV = [
  { href: '/#sandbox', label: 'Sandbox' },
  { href: '/#how-it-works', label: 'How it works' },
  { href: '/#demo', label: 'Redaction demo' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/security', label: 'Security' },
  { href: '/compare', label: 'Compare' },
] as const;

export const FOOTER = {
  Product: [
    { href: '/pricing', label: 'Pricing' },
    { href: '/security', label: 'Security' },
    { href: '/compare', label: 'Compare' },
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
