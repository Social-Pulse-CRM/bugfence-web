import { describe, expect, it } from 'vitest';
import { STATIC_META_CSP, buildServerCsp } from '@/lib/csp';

describe('CSP directives', () => {
  it('meta CSP provides self restrictions for static HTML', () => {
    expect(STATIC_META_CSP).toContain("default-src 'self'");
    expect(STATIC_META_CSP).toContain("object-src 'none'");
    expect(STATIC_META_CSP).toContain("base-uri 'self'");
    // frame-ancestors is disallowed in meta tags by W3C specification
    expect(STATIC_META_CSP).not.toContain('frame-ancestors');
  });

  it('server CSP blocks framing and objects', () => {
    const csp = buildServerCsp(false);
    expect(csp).toContain("frame-ancestors 'none'");
    expect(csp).toContain("object-src 'none'");
    expect(csp).toContain('upgrade-insecure-requests');
    expect(csp).not.toContain('unsafe-eval');
  });

  it('allows eval only in dev for server CSP', () => {
    expect(buildServerCsp(true)).toContain("'unsafe-eval'");
  });
});
