import { describe, expect, it } from 'vitest';
import { env } from '@/lib/env';

describe('Environment Email Configuration', () => {
  it('defaults all departmental emails to a valid support address', () => {
    expect(env.emails).toBeDefined();
    expect(env.emails.contact).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    expect(env.emails.support).toBe(env.emails.contact);
    expect(env.emails.billing).toBe(env.emails.contact);
    expect(env.emails.sales).toBe(env.emails.contact);
    expect(env.emails.security).toBe(env.emails.contact);
    expect(env.emails.legal).toBe(env.emails.contact);
    expect(env.emails.privacy).toBe(env.emails.contact);
    expect(env.emails.dpa).toBe(env.emails.contact);
    expect(env.emails.enterprise).toBe(env.emails.contact);
  });

  it('does not contain any reference to social-pulse or socialpulse in configured emails', () => {
    Object.values(env.emails).forEach((email) => {
      expect(email.toLowerCase()).not.toContain('socialpulse');
      expect(email.toLowerCase()).not.toContain('social-pulse');
      expect(email.toLowerCase()).toContain('bugfence');
    });
  });
});
