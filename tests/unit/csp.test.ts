import { describe, expect, it } from 'vitest';
import { buildCsp } from '@/lib/csp';

describe('buildCsp', () => {
  it('includes nonce, blocks framing and objects', () => {
    const csp = buildCsp('abc', false);
    expect(csp).toContain("'nonce-abc'");
    expect(csp).toContain("frame-ancestors 'none'");
    expect(csp).toContain("object-src 'none'");
    expect(csp).toContain('upgrade-insecure-requests');
    expect(csp).not.toContain('unsafe-eval');
  });
  it('allows eval only in dev', () => {
    expect(buildCsp('abc', true)).toContain("'unsafe-eval'");
  });
});
