import { SITE } from '@/content/site';
import { FAQ as HOME_FAQ } from '@/content/home';
import { PRICING_FAQ } from '@/content/pricing';
import { env } from '@/lib/env';

export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${env.siteUrl}/#organization`,
    name: 'SocialPulse CRM',
    alternateName: SITE.name,
    legalName: 'SocialPulse CRM',
    url: env.siteUrl,
    logo: `${env.siteUrl}/icon.svg`,
    description: `${SITE.name} is a privacy-first visual bug reporting and developer triage platform developed and operated by SocialPulse CRM.`,
    slogan: SITE.tagline,
    parentOrganization: {
      '@type': 'Organization',
      name: 'SocialPulse CRM',
      url: 'https://socialpulsecrm.com',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales, billing, and technical support',
      email: env.contactEmail ?? 'billing@socialpulsecrm.com',
      url: `${env.siteUrl}/contact/`,
      availableLanguage: ['English'],
    },
    sameAs: [
      env.npmUrl ?? 'https://www.npmjs.com/package/@socialpulsecrm/bugfence-react',
      env.docsUrl ?? 'https://docs.bug-fence.com',
    ].filter(Boolean),
  };
}

export function getSoftwareApplicationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': `${env.siteUrl}/#software`,
    name: 'BugFence',
    applicationCategory: 'DeveloperApplication, BugTracking, Privacy',
    operatingSystem: 'Web, Linux, macOS, Windows, Self-Hosted (Docker, Node.js)',
    description: SITE.description,
    url: env.siteUrl,
    softwareVersion: '1.0.4',
    screenshot: `${env.siteUrl}/opengraph-image.png`,
    featureList: [
      'Client-side DOM redaction before network transmission',
      'Annotated screenshot capture & interactive element picker',
      'Tab recording & 30-second DOM session replay',
      'Zero-dependency TypeScript widget running in Shadow DOM',
      'Automated issue grouping by stack trace and endpoint',
      'Model Context Protocol (MCP) server for AI coding agents',
      '100% self-hosted on private infrastructure (JSON storage or PostgreSQL)',
      'Offline cryptographically-verified enterprise licensing',
    ],
    offers: [
      {
        '@type': 'Offer',
        name: 'Free Community Edition',
        price: '0',
        priceCurrency: 'USD',
        description: 'Complete visual bug reporting and triage for a single team. 100% self-hosted on your own infrastructure.',
        availability: 'https://schema.org/InStock',
        url: `${env.siteUrl}/pricing/`,
      },
      {
        '@type': 'Offer',
        name: 'Pro Edition',
        price: '14',
        priceCurrency: 'USD',
        description: 'Developer edition with 5 projects, 5 seats, 1,200 reports/mo, 15 GB storage, 90-day retention, and 2-way sync with Linear and Jira.',
        availability: 'https://schema.org/InStock',
        url: `${env.siteUrl}/pricing/`,
      },
      {
        '@type': 'Offer',
        name: 'Business Edition',
        price: '39',
        priceCurrency: 'USD',
        description: 'Scale and teams edition with 25 projects, 15 seats, 6,000 reports/mo, 60 GB storage, SSO, and 100% white-label custom domain.',
        availability: 'https://schema.org/InStock',
        url: `${env.siteUrl}/pricing/`,
      },
      {
        '@type': 'Offer',
        name: 'Enterprise Custom Edition',
        price: 'Custom',
        priceCurrency: 'USD',
        priceSpecification: {
          '@type': 'PriceSpecification',
          description: 'Offline cryptographically signed BFLIC token, air-gapped private VPC scale, SAML 2.0 SSO, and priority 1h SLA.',
        },
        availability: 'https://schema.org/InStock',
        url: `${env.siteUrl}/contact/`,
      },
    ],
  };
}

export function getHomeFaqSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: HOME_FAQ.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };
}

export function getPricingFaqSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: PRICING_FAQ.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };
}
