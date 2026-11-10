export type LegalSection = { heading?: string; paragraphs?: string[]; bullets?: string[] };
export type LegalDoc = { slug: string; title: string; updated: string; sections: LegalSection[] };

const updated = 'November 10, 2026';

export const LEGAL: Record<string, LegalDoc> = {
  privacy: {
    slug: 'privacy',
    title: 'Privacy Policy',
    updated,
    sections: [
      {
        paragraphs: [
          'BugFence ("we", "us", or "our") is dedicated to protecting privacy and sensitive engineering context. This Privacy Policy outlines how we handle information across our marketing website, documentation, and licensing infrastructure.',
        ],
      },
      {
        heading: 'Information Collected on this Website',
        bullets: [
          'No advertising trackers or cross-site behavioral cookies are used on this site.',
          'Standard access logs (IP address, browser user-agent, timestamp) may be retained temporarily by hosting infrastructure strictly for DDoS mitigation, security auditing, and operational stability.',
          'Direct inquiries: If you submit a contact or enterprise request form, we retain your email, name, and message details solely to evaluate and respond to your request.',
        ],
      },
      {
        heading: 'Privacy Architecture of the BugFence Product',
        paragraphs: [
          'BugFence software is architected to run on self-hosted infrastructure. When you integrate the BugFence SDK into your applications:',
          '1. All report processing occurs on servers operated directly by your organization.',
          '2. The BugFence SDK includes in-browser DOM fencing and regex masking to redact sensitive authentication tokens, credit card digits, and personal identity before transmission.',
          '3. BugFence does not collect, receive, or store your customer bug reports or diagnostic logs on central servers.',
        ],
      },
      {
        heading: 'Data Subject Rights (GDPR / CCPA)',
        paragraphs: [
          'You have the right to request access to, correction of, or deletion of any personal communications sent to us through our contact channels. To exercise these rights, please contact our privacy desk.',
        ],
      },
    ],
  },
  terms: {
    slug: 'terms',
    title: 'Terms of Service',
    updated,
    sections: [
      {
        paragraphs: [
          'These Terms of Service ("Terms") govern your use of the BugFence website, documentation, and related online services.',
        ],
      },
      {
        heading: 'Acceptable Use',
        paragraphs: [
          'You agree to use this website in compliance with all applicable laws and regulations. You may not attempt to probe, scan, or compromise the availability or security of our infrastructure, reverse engineer proprietary licence token mechanisms, or use automated scrapers in violation of our robots exclusion standards.',
        ],
      },
      {
        heading: 'Software Licensing',
        paragraphs: [
          'The BugFence Community Edition is distributed under open licensing as specified in the source repository. The BugFence Enterprise Edition is subject to a commercial licence agreement and cryptographic offline token verification.',
        ],
      },
      {
        heading: 'Disclaimer & Limitation of Liability',
        paragraphs: [
          'The website and documentation are provided "as is" without warranty of any kind. BugFence shall not be liable for any indirect, incidental, or consequential damages resulting from the use of this website.',
        ],
      },
    ],
  },
  cookies: {
    slug: 'cookies',
    title: 'Cookie Policy',
    updated,
    sections: [
      {
        heading: 'Zero Tracking Cookies',
        paragraphs: [
          'BugFence does not use tracking cookies, cross-site beacons, third-party analytics pixels, or behavioral advertising cookies on this website.',
          'The only client-side storage used is local preference persistence (such as your preference for light or dark color mode), which operates locally on your machine without transmitting state across third parties.',
        ],
      },
    ],
  },
  dpa: {
    slug: 'dpa',
    title: 'Data Processing Addendum (DPA)',
    updated,
    sections: [
      {
        heading: 'Self-Hosted Data Controllership',
        paragraphs: [
          'Because BugFence is deployed on customer-controlled private servers (via Docker, Kubernetes, or Node.js), your organization acts as the sole Data Controller and Data Processor for all bug reports, user sessions, technical diagnostic dumps, and reporter telemetry.',
          'Under this standard operational model, BugFence does not act as a subprocessor because customer data never leaves your environment.',
        ],
      },
      {
        heading: 'Enterprise Execution',
        paragraphs: [
          'For enterprise organizations requiring signed vendor assurance, mutual Data Processing Agreements with Standard Contractual Clauses (SCCs) are executed alongside commercial VPC licences upon request.',
        ],
      },
    ],
  },
  accessibility: {
    slug: 'accessibility',
    title: 'Accessibility Statement',
    updated,
    sections: [
      {
        heading: 'Our Commitment to Accessibility',
        paragraphs: [
          'BugFence is committed to ensuring digital accessibility for software engineers, QA specialists, and end reporters of all abilities. We strive to adhere to the Web Content Accessibility Guidelines (WCAG) 2.2 level AA standards across our marketing site and SDK components.',
        ],
      },
      {
        heading: 'Key Accessibility Features',
        bullets: [
          'Accessible keyboard navigation with visible, high-contrast focus rings.',
          'ARIA landmarks, semantic table layouts, and role labels throughout all sections.',
          'First-class support for prefers-reduced-motion media queries.',
          'Accessible color contrast ratios in both light and dark display modes.',
          'Screen-reader compatible code blocks with live status announcements for copy actions.',
        ],
      },
    ],
  },
};
