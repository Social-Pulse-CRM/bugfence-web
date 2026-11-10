'use client';
import { useId, useMemo, useState } from 'react';
import { redact } from './redact';

const SAMPLE = `Checkout failed for ana@acme.com
Card: 4242 4242 4242 4242
Authorization: Bearer abcdefghijklmnop123456
Phone: 415-555-0134`;

export function RedactionDemo() {
  const id = useId();
  const [text, setText] = useState(SAMPLE);
  const [on, setOn] = useState(true);
  const result = useMemo(() => redact(text), [text]);
  const shown = on ? result.output : text;

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="rounded-card border border-border bg-surface p-5">
        <label htmlFor={id} className="mb-2 block text-sm font-medium">What the reporter sees (edit me)</label>
        <textarea id={id} value={text} onChange={(e) => setText(e.target.value)} rows={7}
          className="w-full rounded-lg border border-border bg-bg p-3 font-mono text-sm" spellCheck={false} />
        <div className="mt-3 flex items-center gap-3">
          <button type="button" aria-pressed={on} onClick={() => setOn((v) => !v)}
            className="min-h-11 rounded-lg border border-border bg-elevated px-4 text-sm">
            Redaction: <strong>{on ? 'on' : 'off'}</strong>
          </button>
          <p className="text-xs text-muted">Runs entirely in your browser. Nothing you type here is sent anywhere.</p>
        </div>
      </div>
      <div className="rounded-card border border-border bg-surface p-5">
        <p className="mb-2 text-sm font-medium">What would be sent</p>
        <pre aria-live="polite" className="min-h-[11rem] whitespace-pre-wrap break-words rounded-lg border border-border bg-bg p-3 font-mono text-sm">{shown}</pre>
        <p className="mt-3 text-sm text-muted">
          {on
            ? result.findings.length
              ? `Replaced: ${result.findings.map((f) => `${f.count} ${f.kind}`).join(', ')}.`
              : 'No known patterns found.'
            : 'Redaction is off: this is the raw text.'}
        </p>
        <p className="mt-2 text-xs text-muted">
          Demo uses simple patterns. Real detection is also best-effort: it can miss names or free-form text, and screen video is not masked.
        </p>
      </div>
    </div>
  );
}
