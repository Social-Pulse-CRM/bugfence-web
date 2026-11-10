// Sourced from the BugFence product repo docs/SECURITY_AND_PRIVACY.md. Keep in sync with the product.
export const SECURITY = {
  collected: [
    'Title, description and optional voice transcript',
    'Optional screenshot, video and DOM replay',
    'Console and error entries, failed network requests, breadcrumbs',
    'Browser, OS and viewport',
    'Reporter id, name and email (email handling is configurable: keep, hash or drop)',
    'Release metadata and correlation ids',
  ],
  protections: [
    'Password and card inputs are masked by default; data-bugfence-mask and data-bugfence-block fence anything else',
    'Tokens, emails, card numbers, SSNs and phone numbers are scrubbed from text, URLs and headers in the browser, then re-scrubbed on the server',
    'Replay is re-scrubbed server-side and rendered in a script-less sandboxed iframe',
    'Integration tokens are encrypted with AES-256-GCM; secret keys are stored as hashes; passwords use scrypt',
    'Org-scoped auth, CORS allowlist, rate limiting and SSRF guards; the server refuses to start in production with weak secrets',
    'AI triage is optional; prompts are a minimal sanitised text subset and provider keys stay on the server',
  ],
  limits: [
    'Detection is pattern-based and best-effort. Names, addresses and free-form text can slip through.',
    'Screen video is not masked.',
    'Reports, including media, are stored without application-level encryption. Use disk or volume encryption.',
    'Tenant isolation is enforced in application logic, not separate storage.',
    'There is no full audit log yet, and SSO availability should be confirmed for your plan.',
    'We do not claim SOC 2, ISO 27001 or similar certifications.',
  ],
} as const;
