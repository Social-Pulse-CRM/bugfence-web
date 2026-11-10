'use client';
import { useState } from 'react';

export function CopyButton({ text, label = 'Copy' }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }
  return (
    <>
      <button type="button" onClick={copy} aria-label={`${label}: ${text.split('\n')[0]}`}
        className="min-h-8 rounded-md border border-border bg-elevated px-3 text-xs text-muted hover:text-fg">
        {copied ? 'Copied' : label}
      </button>
      <span role="status" aria-live="polite" className="sr-only">{copied ? 'Copied to clipboard' : ''}</span>
    </>
  );
}
