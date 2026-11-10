'use client';
import { useState } from 'react';
import { CopyButton } from './copy-button';
import { cn } from '@/lib/cn';

export type InstallTab = { id: string; label: string; code: string };

export function InstallTabs({ tabs }: { tabs: InstallTab[] }) {
  const [active, setActive] = useState(tabs[0]?.id);
  const current = tabs.find((t) => t.id === active) ?? tabs[0];
  if (!current) return null;
  return (
    <div className="overflow-hidden rounded-card border border-border bg-surface">
      <div className="flex items-center justify-between border-b border-border px-2">
        <div role="tablist" aria-label="Install method" className="flex">
          {tabs.map((t) => (
            <button key={t.id} role="tab" id={`tab-${t.id}`} aria-selected={t.id === current.id} aria-controls={`panel-${t.id}`}
              tabIndex={t.id === current.id ? 0 : -1} onClick={() => setActive(t.id)}
              className={cn('min-h-11 px-3 text-sm', t.id === current.id ? 'border-b-2 border-accent text-fg' : 'text-muted hover:text-fg')}>
              {t.label}
            </button>
          ))}
        </div>
        <CopyButton text={current.code} label="Copy" />
      </div>
      <div role="tabpanel" id={`panel-${current.id}`} aria-labelledby={`tab-${current.id}`}>
        <pre className="overflow-x-auto p-4 font-mono text-sm leading-relaxed" tabIndex={0}><code>{current.code}</code></pre>
      </div>
    </div>
  );
}
