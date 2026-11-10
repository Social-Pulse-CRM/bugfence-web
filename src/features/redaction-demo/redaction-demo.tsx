'use client';

import { useId, useMemo, useState } from 'react';
import { redact } from './redact';
import { ShieldCheck, EyeOff, Sparkles, Copy, Check, RotateCcw } from 'lucide-react';

const PRESETS = [
  {
    name: 'Checkout & Card',
    text: `Failed payment transaction for customer ana@acme.com
Order ID: ord_89234
Card Number: 4242 4242 4242 4242 (Luhn valid)
Authorization: Bearer sec_live_9f83ac019b882da1
Phone contact: +1 415-555-0134`,
  },
  {
    name: 'API Key & JWT Leak',
    text: `Uncaught exception in webhook handler:
Stripe Key: sk_live_51Mz849f2bAa91K80029
AWS Access Key: AKIAIOSFODNN7EXAMPLE
Session Token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvZSJ9.abcdefghijk123456`,
  },
  {
    name: 'Customer PII & Identity',
    text: `User identity verification failed:
Applicant: john.doe@enterprise.io
SSN: 123-45-6789
Direct phone: 212-555-0199
Notes: Submitted tax documents via portal`,
  },
];

export function RedactionDemo() {
  const id = useId();
  const [text, setText] = useState(PRESETS[0]!.text);
  const [on, setOn] = useState(true);
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => redact(text), [text]);
  const shown = on ? result.output : text;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shown);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Preset Selector Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-card border border-border bg-surface p-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted mr-1">
            Try a Scenario:
          </span>
          {PRESETS.map((preset) => (
            <button
              key={preset.name}
              type="button"
              onClick={() => setText(preset.text)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                text === preset.text
                  ? 'bg-accent text-accent-fg shadow-sm'
                  : 'border border-border bg-elevated text-muted hover:text-fg'
              }`}
            >
              {preset.name}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setText(PRESETS[0]!.text)}
          className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-elevated px-2.5 py-1 text-xs text-muted hover:text-fg"
          title="Reset to default"
        >
          <RotateCcw className="size-3" /> Reset
        </button>
      </div>

      {/* Interactive Two-Column Playground */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Input Column */}
        <div className="flex flex-col justify-between rounded-card border border-border bg-surface p-6 shadow-sm">
          <div>
            <div className="mb-3 flex items-center justify-between">
              <label htmlFor={id} className="text-sm font-semibold text-fg">
                Raw Input (What reporter triggers)
              </label>
              <span className="text-xs text-muted font-mono">Editable</span>
            </div>

            <textarea
              id={id}
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={8}
              className="w-full resize-none rounded-lg border border-border bg-bg p-4 font-mono text-sm leading-relaxed text-fg shadow-inner focus:border-accent focus:outline-none"
              spellCheck={false}
              aria-label="Raw text input for redaction testing"
            />
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-border">
            <button
              type="button"
              aria-pressed={on}
              onClick={() => setOn((v) => !v)}
              className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
                on
                  ? 'bg-accent text-accent-fg shadow-sm'
                  : 'border border-border bg-elevated text-muted hover:text-fg'
              }`}
            >
              <EyeOff className="size-4" />
              <span>Browser Redaction: <strong>{on ? 'ACTIVE' : 'OFF'}</strong></span>
            </button>
            <p className="text-xs text-muted">
              Executed entirely on your device. Zero network requests.
            </p>
          </div>
        </div>

        {/* Output Column */}
        <div className="flex flex-col justify-between rounded-card border border-border bg-surface p-6 shadow-sm">
          <div>
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-fg">Sanitized Diagnostic Payload</span>
                {on && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-accent/15 px-2.5 py-0.5 text-xs font-semibold text-accent">
                    <ShieldCheck className="size-3.5" /> Fenced
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={handleCopy}
                aria-label="Copy sanitized diagnostic payload"
                className="inline-flex items-center gap-1.5 rounded-md border border-border bg-elevated px-2.5 py-1 text-xs text-muted hover:text-fg"
              >
                {copied ? <Check className="size-3.5 text-accent" /> : <Copy className="size-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            <pre
              aria-live="polite"
              className="min-h-[12rem] whitespace-pre-wrap break-words rounded-lg border border-border bg-bg p-4 font-mono text-sm leading-relaxed text-fg shadow-inner"
            >
              {shown}
            </pre>
          </div>

          <div className="mt-4 pt-3 border-t border-border">
            {on ? (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-muted">Findings Detected:</span>
                {result.findings.length > 0 ? (
                  result.findings.map((f) => (
                    <span
                      key={f.kind}
                      className="inline-flex items-center gap-1 rounded bg-elevated px-2 py-0.5 text-xs font-medium text-fg border border-border"
                    >
                      <Sparkles className="size-3 text-accent" />
                      {f.count} {f.kind}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-muted">Clean payload (no sensitive patterns)</span>
                )}
              </div>
            ) : (
              <p className="text-xs font-medium text-danger">
                Warning: Redaction is disabled. Unmasked credentials would be sent.
              </p>
            )}

            <p className="mt-2 text-[11px] text-muted leading-tight">
              Honest Notice: Pattern detection is best-effort. Screen video recordings are not masked. Form inputs and DOM trees can be explicitly protected via <code className="text-fg font-mono">data-bugfence-mask</code>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
