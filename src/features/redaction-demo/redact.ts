/**
 * Best-effort, client-side redaction used by the marketing demo.
 * Mirrors the categories BugFence documents (tokens, emails, cards, SSN, phone).
 * Pattern-based: it is intentionally NOT presented as exhaustive.
 */
export type Finding = { kind: string; count: number };
export type RedactResult = { output: string; findings: Finding[] };

const luhn = (digits: string): boolean => {
  let sum = 0;
  let alt = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let n = Number(digits[i]);
    if (alt) { n *= 2; if (n > 9) n -= 9; }
    sum += n;
    alt = !alt;
  }
  return sum % 10 === 0;
};

const rules: { kind: string; re: RegExp; label: string; test?: (m: string) => boolean }[] = [
  { kind: 'JWT', label: '[JWT]', re: /\beyJ[\w-]{5,}\.[\w-]{5,}\.[\w-]{5,}\b/g },
  { kind: 'Bearer token', label: 'Bearer [TOKEN]', re: /\bBearer\s+[A-Za-z0-9._~+/-]{12,}=*/gi },
  { kind: 'Secret key', label: '[SECRET]', re: /\b(?:sk|pk|rk)_(?:live|test)_[A-Za-z0-9]{8,}\b|\bAKIA[0-9A-Z]{16}\b/g },
  { kind: 'Email', label: '[EMAIL]', re: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g },
  {
    kind: 'Card number', label: '[CARD]', re: /\b(?:\d[ -]?){13,19}\b/g,
    test: (m) => luhn(m.replace(/[ -]/g, '')),
  },
  { kind: 'SSN', label: '[SSN]', re: /\b\d{3}-\d{2}-\d{4}\b/g },
  { kind: 'Phone', label: '[PHONE]', re: /(?<![\w-])\+?\d{1,2}[ .-]?\(?\d{3}\)?[ .-]\d{3}[ .-]\d{4}\b/g },
];

export function redact(input: string): RedactResult {
  let output = input;
  const counts = new Map<string, number>();
  for (const rule of rules) {
    output = output.replace(rule.re, (m) => {
      if (rule.test && !rule.test(m)) return m;
      counts.set(rule.kind, (counts.get(rule.kind) ?? 0) + 1);
      return rule.label;
    });
  }
  return { output, findings: [...counts].map(([kind, count]) => ({ kind, count })) };
}
