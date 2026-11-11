export type LegalSection = {
  id?: string;
  heading?: string;
  paragraphs?: string[];
  bullets?: string[];
};

export type LegalDoc = {
  slug: string;
  title: string;
  updated: string;
  summary?: string;
  sections: LegalSection[];
};

const updated = 'November 11, 2026';

export const LEGAL: Record<string, LegalDoc> = {
  privacy: {
    slug: 'privacy',
    title: 'Privacy Policy',
    updated,
    summary:
      'BugFence is engineered with privacy-by-construction: customer diagnostics and session evidence are scrubbed client-side prior to network transmission, and self-hosted instances retain zero data on central servers.',
    sections: [
      {
        id: 'overview',
        heading: '1. Overview and Architecture Principles',
        paragraphs: [
          'BugFence ("BugFence", "we", "us", or "our", operated by SocialPulse CRM) builds privacy-first visual bug reporting, session replay, and automated diagnostics infrastructure for engineering teams.',
          'Unlike traditional monitoring or session recording tools that ingest raw, unredacted web pages, BugFence enforces privacy-by-construction: sensitive data is scrubbed in the browser before network transmission, and our self-hosted architecture ensures customer bug reports, video recordings, and diagnostic logs remain exclusively on your own infrastructure.',
          'This Privacy Policy explains how information is handled across our marketing website (bugfence.dev), our software distribution, our customer support desk, our hosted SaaS services, and our ephemeral demo sandbox.',
        ],
      },
      {
        id: 'roles',
        heading: '2. Data Controllership & Architectural Roles',
        paragraphs: [
          'Because BugFence supports multiple deployment topologies, our legal role depends on how your organization utilizes the software:',
        ],
        bullets: [
          'Self-Hosted Community & Enterprise VPC: Your organization operates the BugFence server (via Docker, Kubernetes, or Node.js) on your own private cloud or bare-metal infrastructure. In this model, your organization is the sole Data Controller and sole Data Processor. BugFence central servers receive zero customer bug reports, zero diagnostic media, and zero telemetry.',
          'BugFence Cloud / Hosted SaaS: If you utilize our multi-tenant cloud offering, your organization acts as the Data Controller, and BugFence acts as the Data Processor pursuant to our Data Processing Addendum (DPA).',
          'Marketing Site & Commercial Accounts: BugFence acts as a Data Controller for visitors to bugfence.dev, purchaser billing contacts, customer support inquiries, and registered administrative accounts.',
        ],
      },
      {
        id: 'sdk-data-collection',
        heading: '3. Data Collected via the BugFence SDK & Ingestion Service',
        paragraphs: [
          'When an end-user or QA engineer submits a bug report through an application running the BugFence SDK, the report may compile the following categories of technical context (subject to the reporter\'s explicit consent toggles):',
        ],
        bullets: [
          'Issue Description: Title, problem description, and optional voice transcript.',
          'Visual Evidence: Optional viewport screenshot (canvas-rasterized with DOM fencing), native screenshot review, screen video recording (unfenced getDisplayMedia stream), and 30-second DOM event replay (rrweb-compatible format).',
          'Technical Diagnostics: Failed network requests (status code, duration, method, URL, and sanitized payload), browser console errors, unhandled exceptions, and user breadcrumb trails (clicks, navigation, and input changes).',
          'Device Telemetry: Browser family and version, operating system, viewport dimensions, screen pixel ratio, connection quality, and release/commit identifiers.',
          'Reporter Identity: Configurable by the server administrator (BUGFENCE_REPORTER_EMAIL=keep|hash|drop). When set to "keep", user email is stored and masked for read-only roles (j***@domain). When set to "hash", email is converted into a keyed HMAC-SHA256 pseudonym. When set to "drop", no email is persisted.',
        ],
      },
      {
        id: 'pii-masking',
        heading: '4. Client-Side Fencing and PII Sanitization Guarantees',
        paragraphs: [
          'The BugFence SDK neutralizes sensitive information locally on the reporter\'s device using dual-layer fencing:',
        ],
        bullets: [
          'In-Browser DOM Fencing (DOMFence): All input fields of type="password", credit card autofill inputs ([autocomplete^="cc-"]), elements marked with data-bugfence-mask (obscured with solid blocks), and elements marked with data-bugfence-block (completely excised from the DOM tree) are masked prior to canvas rendering and session replay capture.',
          'Regular Expression Sanitizer (PIISanitizer): Text fields, console logs, error messages, and network URLs pass through a deep sanitization engine before transmission. The engine redacts JSON Web Tokens (JWTs), Bearer tokens, HTTP Authorization headers, cookie values, phone numbers, SSNs, and 13–19 digit payment card numbers validated via the Luhn checksum algorithm.',
          'Server-Side Secondary Scrubbing: The ingestion server re-sanitizes every payload and session replay stream upon receipt, ensuring that tampered or modified clients cannot bypass client-side scrubbing.',
          'Script-Less Sandboxed Replay: Session replays are re-rendered inside an iframe with sandbox="allow-same-origin" and a Content-Security-Policy that strictly forbids script execution, forms, and network requests.',
        ],
      },
      {
        id: 'documented-limitations',
        heading: '5. Transparent Limitations & Boundaries',
        paragraphs: [
          'We believe in absolute engineering honesty regarding where automatic protection ends:',
        ],
        bullets: [
          'Pattern-Based Scrubbing: Detection relies on heuristic regex and checksum matching. Unstructured customer names, street addresses, free-form medical notes, or bespoke internal IDs may pass through. BugFence must not serve as your sole compliance fence for unencrypted regulated records.',
          'Screen Video Recordings: Video streams captured via getDisplayMedia cannot be reliably masked in real-time across arbitrary desktop surfaces. The reporter is prompted to review, trim, redact, or discard video recordings prior to submission.',
          'Storage Encryption at Rest: Reports and diagnostic media are stored as structured JSON or PostgreSQL jsonb records. BugFence does not implement application-level encryption for report payloads. Operators must enable host volume or disk encryption (e.g., AWS EBS encryption, dm-crypt/LUKS).',
          'Certifications: BugFence is architected to align with SOC 2 Type II, HIPAA, and ISO 27001 requirements; we do not currently hold independent third-party audit certifications.',
        ],
      },
      {
        id: 'ephemeral-sandbox',
        heading: '6. Ephemeral Demo Sandbox Environment',
        paragraphs: [
          'To enable evaluation without infrastructure setup, BugFence operates a public demo sandbox (tenant key: novacloud-demo-prod-2026).',
          'All reports and media submitted to the demo sandbox are routed to an isolated in-memory store (EphemeralDemoMediaStore) with a hard 50MB quota ceiling. The sandbox enforces a strict 30-report FIFO buffer (the oldest report is immediately purged upon the 31st submission).',
          'An automated 15-minute background Janitor service purges demo reports older than 45 minutes. Demo data is never written to persistent PostgreSQL, never stored in AWS S3 or Cloudflare R2 buckets, and never submitted to external AI LLMs.',
        ],
      },
      {
        id: 'ai-triage',
        heading: '7. AI Triage & LLM Data Minimization',
        paragraphs: [
          'BugFence features optional AI triage capabilities to summarize crashes and suggest code fixes:',
        ],
        bullets: [
          'Browser Triage: Runs entirely on-device without outbound network calls.',
          'Server Triage: Dispatches a minimal, re-scrubbed text excerpt containing only the title, description, and sanitized stack trace. Screenshots, video recordings, DOM replays, request headers, and customContext are never sent to AI providers.',
          'Provider Secrets: Third-party LLM API keys (OpenAI, Anthropic, Google Gemini) stay securely on your server and are never exposed to clients.',
          'No AI Training: Customer bug reports are never used to train public or foundational artificial intelligence models.',
        ],
      },
      {
        id: 'website-data',
        heading: '8. Website Visitors, Cookies, and Analytics',
        paragraphs: [
          'On bugfence.dev, we do not utilize behavioral advertising cookies, cross-site tracking beacons, or third-party marketing pixels.',
          'Standard HTTP server logs (IP address, user-agent, requested URL, timestamp) are retained temporarily by our edge infrastructure solely for DDoS mitigation, load balancing, and operational defense.',
          'If you submit a contact, demo, or licensing inquiry, we collect your name, business email, organization name, and message strictly to respond to your request.',
        ],
      },
      {
        id: 'subprocessors',
        heading: '9. Subprocessors and Payment Processors',
        paragraphs: [
          'For cloud subscriptions, customer billing, and website delivery, BugFence engages vetted subprocessors:',
        ],
        bullets: [
          'Stripe, Inc. (United States): International credit card processing and subscription billing in USD.',
          'Razorpay Software Private Limited (India): Indian Rupee (INR) payment processing, UPI, NetBanking, and automated 18% GST B2B tax invoice generation.',
          'Cloudflare, Inc. (United States): Edge CDN delivery, DNS, and DDoS mitigation.',
          'Amazon Web Services, Inc. (United States / Europe): Cloud compute and encrypted backup infrastructure (applicable to BugFence Hosted SaaS only).',
        ],
      },
      {
        id: 'gdpr-ccpa-rights',
        heading: '10. Data Subject Rights (GDPR, UK GDPR, CCPA/CPRA, DPDP)',
        paragraphs: [
          'Depending on your jurisdiction, you have statutory rights regarding personal data held by BugFence as a Data Controller:',
        ],
        bullets: [
          'Access and Portability: The right to request copies of your personal information and commercial records.',
          'Rectification and Correction: The right to correct inaccurate or incomplete contact information.',
          'Erasure ("Right to be Forgotten"): The right to request permanent deletion of your account and personal correspondence.',
          'Non-Discrimination: We will never discriminate against you, alter service tiers, or degrade quality for exercising your privacy rights.',
          'Notice of Non-Sale: BugFence does not sell, rent, or share personal data with third-party data brokers or advertising exchanges.',
        ],
      },
      {
        id: 'retention-erasure',
        heading: '11. Data Retention and Durable Erasure',
        paragraphs: [
          'Self-Hosted Retention: Configured by the server operator via BUGFENCE_RETENTION_DAYS (default 90 days; 0 disables). Expired reports are automatically purged by daily background cron sweeps.',
          'Account & Workspace Erasure: BugFence provides built-in cryptographic deletion APIs (DELETE /api/v1/auth/account and DELETE /api/v1/auth/workspace) that remove user records, session credentials, tokens, and storage snapshots, issuing an authoritative 24-hour verification receipt.',
        ],
      },
      {
        id: 'contact',
        heading: '12. Privacy Desk & Inquiries',
        paragraphs: [
          'For questions regarding this policy, to exercise your data subject rights, or to request a signed Data Processing Addendum (DPA), please reach our dedicated privacy team at privacy@socialpulsecrm.com.',
        ],
      },
    ],
  },
  terms: {
    slug: 'terms',
    title: 'Terms of Service',
    updated,
    summary:
      'Commercial terms governing use of the BugFence website, Community Edition open licensing, Hosted SaaS subscriptions, and air-gapped Enterprise Edition VPC licenses.',
    sections: [
      {
        id: 'agreement',
        heading: '1. Agreement to Terms',
        paragraphs: [
          'These Terms of Service ("Terms") constitute a legally binding agreement between your organization ("Customer", "you", or "your") and BugFence ("BugFence", "we", "us", or "our", operated by SocialPulse CRM).',
          'By accessing our website (bugfence.dev), downloading our software, integrating our SDK, or purchasing a subscription, you agree to be bound by these Terms and our Privacy Policy. If you are entering into these Terms on behalf of a company, you represent that you possess the legal authority to bind that entity.',
        ],
      },
      {
        id: 'service-offerings',
        heading: '2. Service Offerings and Licensing Editions',
        paragraphs: [
          'BugFence delivers diagnostic software and ingestion infrastructure across four standardized editions:',
        ],
        bullets: [
          'Community Edition (Self-Hosted): Provided under source-available licensing for self-hosted evaluation and internal teams. Subject to Community usage limits (1 project, 3 seats, 1,000 reports/month, 14 days report retention). Provided "AS IS" without commercial SLAs.',
          'Pro Tier (Hosted or Self-Hosted): Billed monthly or annually ($14/month or ₹999/month). Supports up to 5 projects, 15 team seats, 25,000 reports/month, 90 days retention, 2-way issue sync with Linear/Jira/GitHub, and automated server triage.',
          'Business Tier: Billed monthly or annually ($39/month or ₹2,799/month). Supports up to 25 projects, 100 team seats, 250,000 reports/month, 365 days retention, SAML 2.0 / OIDC single sign-on, full white-labeling, and APM connectors (Sentry, Datadog, PagerDuty).',
          'Enterprise Edition (Air-Gapped Private VPC): Provided under a commercial enterprise contract. Unlocks custom report quotas (500,000+ reports/month), 500+ team seats, 730 days retention, and 1-hour critical response SLAs. Validated completely offline via cryptographically signed tokens (BFLIC) with zero outbound network pings.',
          'Ephemeral Demo Sandbox: Provided free of charge for product evaluation. Subject to an automated 45-minute rolling TTL and 30-report FIFO buffer with zero uptime warranty.',
        ],
      },
      {
        id: 'offline-licensing',
        heading: '3. Offline Enterprise Token Verification (BFLIC)',
        paragraphs: [
          'For private VPC and air-gapped deployments, BugFence issues cryptographically signed offline license keys formatted as BFLIC.<base64url_payload>.<base64url_hmac_sha256>.',
          'The customer server verifies token authenticity locally using cryptographic signatures without making phone-home calls or transmitting license pings to external servers. Tampering with payload properties invalidates the signature and causes the server to revert to Community limits.',
          'In the event of commercial license expiration, BugFence provides an automated 7-day operational grace period with administrative notification banners to prevent unexpected production outages during corporate procurement cycles.',
        ],
      },
      {
        id: 'acceptable-use',
        heading: '4. Acceptable Use Policy',
        paragraphs: [
          'You agree to use BugFence exclusively for lawful diagnostic, quality assurance, and software engineering purposes. You specifically agree not to:',
        ],
        bullets: [
          'Reverse engineer, decompile, or forge offline cryptographic enterprise license tokens (BFLIC) or bypass seat/project caps.',
          'Probe, scan, or exploit security vulnerabilities in BugFence infrastructure or hosted environments without prior written authorization.',
          'Transmit malicious software, viruses, worms, or trojans through the BugFence SDK or ingestion API.',
          'Scrape or extract website content, documentation, or pricing models using automated bots in violation of our robots.txt standards.',
          'Interfere with or launch denial-of-service (DoS/DDoS) attacks against BugFence API gateways or customer reporting instances.',
        ],
      },
      {
        id: 'data-ownership',
        heading: '5. Customer Data Ownership and Intellectual Property',
        paragraphs: [
          'Customer Data: You retain 100% sole and exclusive ownership of all bug reports, screenshots, session recordings, DOM dumps, code traces, and customer intellectual property submitted through BugFence. BugFence acquires zero proprietary rights in Customer Data.',
          'Zero Model Training: BugFence does not use, inspect, or disclose customer diagnostic data to train public artificial intelligence models.',
          'BugFence IP: BugFence retains all ownership, copyright, patent, trademark, and trade secret rights in the BugFence SDK, ingestion server, dashboard, documentation, and underlying algorithms.',
        ],
      },
      {
        id: 'billing-taxes',
        heading: '6. Billing, Currency, and Tax Compliance',
        paragraphs: [
          'Subscription Terms: Paid subscriptions are billed in advance on a recurring monthly or annual basis via Stripe (USD) or Razorpay (INR).',
          'Renewal & Cancellation: Subscriptions automatically renew at the end of each billing cycle unless cancelled prior to renewal via the self-service dashboard or by contacting billing@socialpulsecrm.com. Cancellation takes effect at the conclusion of the current prepaid billing period.',
          'Indian GST Compliance: For customers paying in Indian Rupees (₹) via Razorpay, valid 15-digit GSTIN details provided during checkout or billing setup will generate compliant B2B tax invoices reflecting 18% GST (CGST/SGST or IGST) for full input tax credit.',
          'Refund Policy: We provide a 30-day money-back guarantee for first-time annual subscriptions. Monthly subscriptions are non-refundable once the billing period has commenced.',
        ],
      },
      {
        id: 'disclaimer-warranties',
        heading: '7. Warranties and Disclaimers',
        paragraphs: [
          'Except as expressly specified in a written Enterprise Master Services Agreement (MSA), BugFence is provided on an "AS IS" and "AS AVAILABLE" basis without warranties of any kind, whether express, implied, or statutory.',
          'BugFence disclaims all implied warranties of merchantability, fitness for a particular purpose, and non-infringement.',
          'You acknowledge that client-side PII sanitization and DOM fencing are pattern-based and heuristic controls designed as defense-in-depth. BugFence does not guarantee that every sensitive string or unmasked screen video recording will be intercepted. Customer is responsible for properly labeling sensitive UI with data-bugfence-mask and configuring server-side retention.',
        ],
      },
      {
        id: 'limitation-liability',
        heading: '8. Limitation of Liability',
        paragraphs: [
          'To the maximum extent permitted by applicable law, neither BugFence nor its directors, officers, employees, or contractors shall be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, revenue, goodwill, or business interruption.',
          'In no event shall BugFence\'s total aggregate liability arising out of or related to these Terms or the use of BugFence exceed the total fees actually paid by Customer to BugFence in the twelve (12) months preceding the incident giving rise to liability (or $100 USD in the case of Community Edition or free evaluation tiers).',
        ],
      },
      {
        id: 'termination',
        heading: '9. Term, Suspension, and Termination',
        paragraphs: [
          'These Terms remain in effect until terminated by either party. You may terminate your account at any time via the self-service workspace erasure controls.',
          'BugFence may immediately suspend or terminate access to hosted services if Customer breaches the Acceptable Use Policy, fails to pay outstanding subscription invoices after notice, or engages in actions that jeopardize platform stability.',
        ],
      },
      {
        id: 'governing-law',
        heading: '10. Governing Law and Dispute Resolution',
        paragraphs: [
          'These Terms shall be governed by and construed in accordance with the laws of the jurisdiction specified in your commercial order form, without regard to conflict of law principles. In the absence of a specific agreement, these Terms are governed by the laws of India.',
          'Any disputes arising under these Terms shall be resolved through good-faith negotiation, and failing that, through binding commercial arbitration in accordance with standard arbitration rules.',
          'For formal legal notices, please contact legal@socialpulsecrm.com.',
        ],
      },
    ],
  },
  cookies: {
    slug: 'cookies',
    title: 'Cookie Policy',
    updated,
    summary:
      'BugFence does not use behavioral advertising cookies or third-party tracking pixels. We use only strictly necessary local storage keys for UI preferences and secure session authentication.',
    sections: [
      {
        id: 'zero-trackers',
        heading: '1. Zero Advertising Trackers Pledge',
        paragraphs: [
          'BugFence is committed to transparent, privacy-respecting engineering. We do not use third-party advertising cookies, behavioral tracking pixels (e.g., Meta Pixel, TikTok Pixel, Google Remarketing), or cross-site data broker scripts anywhere on bugfence.dev or within our software.',
          'We believe developers and engineering teams deserve an experience that respects their digital sovereignty.',
        ],
      },
      {
        id: 'local-storage',
        heading: '2. First-Party Local Storage Keys',
        paragraphs: [
          'The BugFence SDK and marketing website use local browser storage (localStorage) exclusively to preserve your personal interface preferences locally on your machine. This data is never sent to third parties:',
        ],
        bullets: [
          'bf_theme: Stores your preferred color appearance mode ("light" or "dark").',
          'bf_launcher_pos: Remembers where you placed the floating BugFence reporter widget on your screen.',
          'bf_reporter_email: Conveniently saves the reporter\'s typed email address in the reporting dialog so you do not need to retype it on subsequent submissions.',
        ],
      },
      {
        id: 'authentication-cookies',
        heading: '3. Essential Authentication Cookies',
        paragraphs: [
          'When signing into the BugFence engineering dashboard, the server sets a single, strictly necessary session cookie to authenticate your requests:',
        ],
        bullets: [
          '__Host-bf_session (Production): Encrypted session identifier with HttpOnly, Secure, SameSite=Strict, and Path=/ flags. The __Host- prefix guarantees the cookie is only accepted over HTTPS for the exact origin, protecting against cookie hijacking and CSRF attacks.',
          'bf_session (Local Development): Used exclusively on plain HTTP loopback addresses during local development.',
          'Lifetime: Matches your configured session duration (default: 7 days via BUGFENCE_SESSION_TTL_HOURS). Cleared immediately upon sign-out.',
        ],
      },
      {
        id: 'managing-storage',
        heading: '4. Managing and Disabling Storage',
        paragraphs: [
          'You can clear cookies and local storage at any time through your browser\'s security settings.',
          'The BugFence SDK is engineered defensively: if storage access is blocked (for example, in Safari Private Browsing mode or strict container environments), the widget operates smoothly in memory without throwing runtime errors.',
        ],
      },
    ],
  },
  dpa: {
    slug: 'dpa',
    title: 'Data Processing Addendum (DPA)',
    updated,
    summary:
      'Standardized Data Processing Addendum governing the processing of Customer Personal Data under GDPR, UK GDPR, CCPA/CPRA, and Indian DPDP laws.',
    sections: [
      {
        id: 'scope-applicability',
        heading: '1. Scope and Applicability',
        paragraphs: [
          'This Data Processing Addendum ("DPA") supplements the BugFence Terms of Service between Customer and BugFence (SocialPulse CRM) whenever BugFence processes Customer Personal Data subject to European Data Protection Law (GDPR, UK GDPR), the California Consumer Privacy Act (CCPA/CPRA), or the Indian Digital Personal Data Protection Act (DPDP).',
        ],
      },
      {
        id: 'controllership-model',
        heading: '2. Operational Model & Data Roles',
        paragraphs: [
          'The applicability of this DPA is determined by your deployment topology:',
        ],
        bullets: [
          'Self-Hosted Infrastructure: When your organization deploys BugFence on self-hosted servers or private VPCs, BugFence does not receive, host, or process your bug reports or diagnostic data. Customer is both Data Controller and Data Processor, and this DPA does not apply to report telemetry.',
          'BugFence Hosted SaaS: When utilizing BugFence Cloud infrastructure, Customer is the Data Controller, and BugFence acts as the Data Processor. BugFence will process Customer Personal Data exclusively in accordance with Customer\'s documented instructions.',
        ],
      },
      {
        id: 'toms',
        heading: '3. Technical and Organizational Measures (TOMs)',
        paragraphs: [
          'BugFence maintains rigorous technical and organizational security controls to safeguard Personal Data against accidental destruction, alteration, unauthorized disclosure, or access:',
        ],
        bullets: [
          'In-Browser DOM Fencing & Masking: Client-side DOMFence automatically obscures password fields, card numbers, and tagged elements prior to canvas rendering and DOM replay recording.',
          'Dual-Layer Regex Sanitization: Real-time redaction of JWTs, Bearer tokens, Authorization headers, emails, SSNs, and phone numbers in the browser, with secondary regex re-scrubbing at the server ingestion boundary.',
          'Script-Less Sandboxed Replay: Session replays are executed in an isolated iframe with sandbox="allow-same-origin" and a strict Content-Security-Policy forbidding script execution and network requests.',
          'Cryptographic Secret Storage: Third-party integration tokens (GitHub, Jira, Linear) are encrypted at rest with AES-256-GCM. Passwords are hashed with scrypt and unique 16-byte salts. Project secret keys are stored exclusively as SHA-256 hashes.',
          'Keyed Identity Pseudonyms: Reporter identities linked to grouped issues are stored as keyed HMAC-SHA256 pseudonyms, preventing exposure during database exports.',
          'Zero-AWS Ephemeral Sandbox: Public demo reports are restricted to in-memory buffers with a 50MB ceiling, 30-report FIFO cap, and automated 45-minute TTL pruning.',
        ],
      },
      {
        id: 'subprocessors',
        heading: '4. Subprocessor Governance',
        paragraphs: [
          'Customer grants general authorization for BugFence to engage vetted subprocessors (Stripe for USD payments, Razorpay for INR payments, Cloudflare for CDN/DDoS mitigation, AWS for hosted compute).',
          'BugFence conducts due diligence on all subprocessors, imposes contractual data protection obligations equivalent to this DPA, and will notify Customer at least 30 days prior to onboarding new subprocessors, granting Customer the right to object.',
        ],
      },
      {
        id: 'cross-border-transfers',
        heading: '5. International Data Transfers',
        paragraphs: [
          'For transfers of Personal Data from the European Economic Area, United Kingdom, or Switzerland to countries lacking an adequate level of data protection, the parties incorporate by reference the European Commission\'s Standard Contractual Clauses (EU SCCs 2021/914, Module Two: Controller-to-Processor).',
        ],
      },
      {
        id: 'security-incidents',
        heading: '6. Security Incident Notification',
        paragraphs: [
          'In the event of a confirmed Security Incident resulting in unauthorized access to or compromise of Customer Personal Data, BugFence will notify Customer without undue delay (and in any case within 48 hours) and provide reasonable assistance in mitigating consequences and fulfilling regulatory disclosure duties.',
        ],
      },
      {
        id: 'deletion-assistance',
        heading: '7. Assistance and Data Erasure',
        paragraphs: [
          'BugFence shall assist Customer in responding to verified data subject requests under GDPR and CCPA. Upon termination of services, Customer may trigger complete workspace erasure via our authenticated APIs, with confirmation of deletion issued via a cryptographic 24-hour receipt.',
          'To request a countersigned DPA with custom company schedules, please email dpa@socialpulsecrm.com.',
        ],
      },
    ],
  },
  accessibility: {
    slug: 'accessibility',
    title: 'Accessibility Statement',
    updated,
    summary:
      'BugFence is committed to digital accessibility for software engineers and reporters of all abilities, adhering to WCAG 2.2 Level AA standards.',
    sections: [
      {
        id: 'commitment',
        heading: '1. Our Accessibility Commitment',
        paragraphs: [
          'BugFence believes that software quality and visual bug reporting should be accessible to all developers, QA engineers, and end-users, regardless of physical or cognitive ability.',
          'We actively engineer our marketing website, documentation, embedded reporting widget, and engineering triage dashboard to conform to the Web Content Accessibility Guidelines (WCAG) 2.2 Level AA criteria.',
        ],
      },
      {
        id: 'sdk-accessibility',
        heading: '2. Accessible Widget Architecture',
        paragraphs: [
          'The BugFence client SDK is engineered to ensure seamless accessibility within host web applications:',
        ],
        bullets: [
          'Complete Keyboard Operability: All reporting controls, screenshot annotation tools, consent toggles, and modal dialogs can be fully operated using standard keyboard navigation (Tab, Shift+Tab, Enter, Escape, Arrow keys).',
          'High-Contrast Visible Focus: Interactive elements feature crisp, high-contrast focus rings that meet WCAG 2.2 non-text contrast ratios in both light and dark themes.',
          'Screen Reader Compatibility: Modals, buttons, and alert states incorporate semantic HTML5 elements, ARIA dialog roles (role="dialog", aria-modal="true"), and aria-live status announcements for form submissions.',
          'Reduced Motion Support: Respects the user\'s prefers-reduced-motion system setting, disabling launcher animations, sliding transitions, and modal zooms.',
          'Shadow DOM Encapsulation: The widget renders inside an isolated Shadow Root, preventing host application CSS rules from accidentally degrading accessibility styles.',
        ],
      },
      {
        id: 'website-accessibility',
        heading: '3. Website & Documentation Accessibility',
        paragraphs: [
          'Our marketing website (bugfence.dev) is built with semantic HTML landmarks (main, nav, header, footer), structured heading hierarchies (h1-h4), minimum 4.5:1 text color contrast ratios, and copy-button status announcements for code snippets.',
        ],
      },
      {
        id: 'feedback',
        heading: '4. Feedback and Assistance',
        paragraphs: [
          'We continually test our components using automated accessibility linters and manual screen reader testing (NVDA, VoiceOver).',
          'If you encounter an accessibility barrier or require assistance, please contact our accessibility lead at accessibility@socialpulsecrm.com. We investigate and remediate reported accessibility barriers promptly.',
        ],
      },
    ],
  },
};
