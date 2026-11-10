import { SITE } from '@/content/site';
import { FAQ as HOME_FAQ } from '@/content/home';
import { PRICING_FAQ } from '@/content/pricing';
import { env } from '@/lib/env';

export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${env.siteUrl}/#organization`,
    name: SITE.name,
    url: env.siteUrl,
    logo: `${env.siteUrl}/icon.svg`,
    description: SITE.description,
    slogan: SITE.tagline,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales and technical support',
      email: env.contactEmail ?? 'sales@bugfence.io',
      url: `${env.siteUrl}/contact/`,
      availableLanguage: ['English'],
    },
    sameAs: [
      env.githubUrl ?? 'https://github.com/socialpulsecrm/Crawler',
      env.npmUrl ?? 'https://www.npmjs.com/package/@socialpulsecrm/bugfence-react',
      env.docsUrl ?? 'https://docs.bugfence.io',
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
        name: 'Community Edition',
        price: '0',
        priceCurrency: 'USD',
        description: 'Complete visual bug reporting and triage for a single team. 100% self-hosted on your own infrastructure.',
        availability: 'https://schema.org/InStock',
        url: `${env.siteUrl}/pricing/`,
      },
      {
        '@type': 'Offer',
        name: 'Enterprise Edition',
        price: 'Custom',
        priceCurrency: 'USD',
        priceSpecification: {
          '@type': 'PriceSpecification',
          description: 'Offline cryptographically signed licence token, private VPC scale, SAML 2.0 SSO, and priority SLA.',
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
