export type LegalSection = { heading?: string; paragraphs?: string[]; bullets?: string[] };
export type LegalDoc = { slug: string; title: string; updated: string; sections: LegalSection[] };

const updated = '2026-11-10';

export const LEGAL: Record<string, LegalDoc> = {
  privacy: {
    slug: 'privacy', title: 'Privacy Policy', updated,
    sections: [
      { paragraphs: ['This policy describes how this website handles personal data. Entity name, address and contact details: to be completed.'] },
      { heading: 'What this website collects', bullets: [
        'No tracking cookies and no third-party analytics are used on this site at launch.',
        'Server logs may record IP address and user agent for security and reliability.',
        'If you email us, we keep your message in order to respond to you.',
      ] },
      { heading: 'The BugFence product', paragraphs: ['Data processed by self-hosted BugFence deployments is controlled by the organisation that runs them, not by this website. The Security page describes what reports can contain.'] },
      { heading: 'Your rights', paragraphs: ['Contact us to access, correct or delete personal data we hold about you.'] },
    ],
  },
  terms: {
    slug: 'terms', title: 'Terms of Service', updated,
    sections: [
      { paragraphs: ['These terms govern use of this website. Product licence terms are provided separately. Entity, governing law and jurisdiction: to be completed.'] },
      { heading: 'Use of the site', paragraphs: ['The site is provided as is, for information. Do not misuse it or attempt to disrupt it.'] },
      { heading: 'Changes', paragraphs: ['We may update these terms. The date above shows the latest revision.'] },
    ],
  },
  cookies: {
    slug: 'cookies', title: 'Cookie Policy', updated,
    sections: [
      { paragraphs: ['This site does not set tracking or advertising cookies. A theme preference may be stored in your browser local storage so your light or dark choice persists. If this changes, this page and any consent controls will be updated first.'] },
    ],
  },
  dpa: {
    slug: 'dpa', title: 'Data Processing Addendum', updated,
    sections: [
      { paragraphs: [
        'BugFence is documented as self-hosted, so the customer operates the system and is the data controller. In that model we do not process report data on your behalf.',
        'If a hosted service is introduced, a DPA and subprocessor list will be published here. To request a signed agreement, contact us.',
      ] },
    ],
  },
  accessibility: {
    slug: 'accessibility', title: 'Accessibility Statement', updated,
    sections: [
      { paragraphs: ['We aim to meet WCAG 2.2 level AA. The site supports keyboard navigation, visible focus, light and dark themes, and reduced motion. If you find a barrier, please contact us and we will work to fix it.'] },
    ],
  },
};
