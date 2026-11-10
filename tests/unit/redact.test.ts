import { describe, expect, it } from 'vitest';
import { redact } from '@/features/redaction-demo/redact';

describe('redact', () => {
  it('masks emails', () => {
    expect(redact('mail ana@acme.com now').output).toBe('mail [EMAIL] now');
  });
  it('masks Luhn-valid cards but not random digit runs', () => {
    expect(redact('card 4242 4242 4242 4242').output).toBe('card [CARD]');
    expect(redact('order 1234567890123').output).toBe('order 1234567890123');
  });
  it('masks JWTs and bearer tokens', () => {
    const jwt = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0In0.abcdefghijk';
    expect(redact(jwt).output).toBe('[JWT]');
    expect(redact('Authorization: Bearer abcdefghijklmnop123').output).toBe('Authorization: Bearer [TOKEN]');
  });
  it('masks SSN', () => {
    expect(redact('ssn 123-45-6789').output).toBe('ssn [SSN]');
  });
  it('leaves clean text alone and reports findings', () => {
    expect(redact('Checkout button does nothing').findings).toEqual([]);
    expect(redact('a@b.co c@d.io').findings).toEqual([{ kind: 'Email', count: 2 }]);
  });
});
