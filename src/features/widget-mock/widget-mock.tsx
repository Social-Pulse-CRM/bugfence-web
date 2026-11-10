'use client';

import { useState } from 'react';
import {
  Camera,
  Video,
  RotateCcw,
  Shield,
  CheckCircle2,
  AlertCircle,
  EyeOff,
  Crosshair,
  Square,
  ArrowUpRight,
  ListOrdered,
  Volume2,
  Terminal,
  Cpu,
  GitBranch,
} from 'lucide-react';

export function WidgetMock() {
  const [activeTab, setActiveTab] = useState<'screenshot' | 'record' | 'replay'>('screenshot');
  const [replayTime, setReplayTime] = useState(14);
  const [includeReplay, setIncludeReplay] = useState(true);
  const [includeDiagnostics, setIncludeDiagnostics] = useState(true);

  return (
    <figure
      aria-label="Interactive simulation of the BugFence Reporting Studio"
      className="relative overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl transition-all"
    >
      {/* Studio Header Bar */}
      <div className="flex flex-wrap items-center justify-between border-b border-border bg-elevated/60 px-4 py-3 text-xs text-muted">
        <div className="flex items-center gap-2">
          <span className="size-2.5 rounded-full bg-accent animate-pulse" aria-hidden="true" />
          <span className="font-semibold text-fg">BugFence Reporting Studio</span>
          <span className="hidden sm:inline-block rounded bg-accent/15 px-1.5 py-0.5 text-[10px] font-medium text-accent">
            Shadow DOM Isolated
          </span>
        </div>

        {/* Capture Type Switcher Tabs */}
        <div role="tablist" aria-label="Capture Type" className="flex items-center gap-1">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'screenshot'}
            onClick={() => setActiveTab('screenshot')}
            className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
              activeTab === 'screenshot'
                ? 'bg-accent text-accent-fg shadow-sm'
                : 'text-muted hover:bg-elevated hover:text-fg'
            }`}
          >
            <Camera className="size-3.5" />
            <span>Screenshot</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'record'}
            onClick={() => setActiveTab('record')}
            className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
              activeTab === 'record'
                ? 'bg-accent text-accent-fg shadow-sm'
                : 'text-muted hover:bg-elevated hover:text-fg'
            }`}
          >
            <Video className="size-3.5" />
            <span>Record</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'replay'}
            onClick={() => setActiveTab('replay')}
            className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
              activeTab === 'replay'
                ? 'bg-accent text-accent-fg shadow-sm'
                : 'text-muted hover:bg-elevated hover:text-fg'
            }`}
          >
            <RotateCcw className="size-3.5" />
            <span>DOM Replay</span>
          </button>
        </div>
      </div>

      {/* Main Studio Body: Stage (Left) & Sidebar (Right) */}
      <div className="grid gap-0 lg:grid-cols-[1.5fr_1fr]">
        {/* Left Stage */}
        <div className="flex flex-col justify-between border-b border-border p-4 lg:border-b-0 lg:border-r">
          {/* Active Canvas / Stage Preview */}
          <div className="relative min-h-[300px] overflow-hidden rounded-xl border border-border bg-bg/95 p-4 shadow-inner">
            {activeTab === 'screenshot' && (
              <div className="space-y-4">
                {/* Secondary Annotation Toolbar */}
                <div className="flex items-center gap-1 border-b border-border/80 pb-2 text-muted">
                  <span className="mr-1 text-[10px] font-semibold uppercase tracking-wider text-muted">Tools:</span>
                  <button type="button" aria-label="Select element" className="rounded p-1 text-accent bg-accent/10">
                    <Crosshair className="size-3.5" />
                  </button>
                  <button type="button" aria-label="Redact tool" className="rounded p-1 text-fg hover:bg-elevated">
                    <EyeOff className="size-3.5" />
                  </button>
                  <button type="button" aria-label="Box annotation" className="rounded p-1 text-fg hover:bg-elevated">
                    <Square className="size-3.5" />
                  </button>
                  <button type="button" aria-label="Arrow tool" className="rounded p-1 text-fg hover:bg-elevated">
                    <ArrowUpRight className="size-3.5" />
                  </button>
                  <button type="button" aria-label="Numbered step" className="rounded p-1 text-fg hover:bg-elevated">
                    <ListOrdered className="size-3.5" />
                  </button>
                </div>

                {/* Host App Viewport Replica */}
                <div className="rounded-lg border border-border bg-surface/80 p-4 text-xs space-y-3">
                  <div className="flex items-center justify-between border-b border-border pb-2">
                    <span className="font-semibold text-fg">Acme Cloud Checkout</span>
                    <span className="text-[10px] text-muted">Step 3 of 3</span>
                  </div>

                  {/* Redacted Credit Card Input */}
                  <div>
                    <label className="mb-1 block text-[11px] font-medium text-muted">Payment Method</label>
                    <div className="relative flex items-center justify-between rounded border border-border bg-bg p-2 font-mono">
                      <span className="text-muted">Card Number</span>
                      {/* Blackout Mask */}
                      <span
                        className="inline-flex items-center gap-1 rounded bg-black px-2 py-0.5 text-[10px] font-semibold text-white dark:bg-neutral-200 dark:text-neutral-900"
                        title="Masked before screenshot capture via data-bugfence-mask"
                      >
                        <EyeOff className="size-3" /> MASKED BY DOMFENCE
                      </span>
                    </div>
                  </div>

                  {/* Redacted API Key Input */}
                  <div>
                    <label className="mb-1 block text-[11px] font-medium text-muted">Webhook Token</label>
                    <div className="relative flex items-center justify-between rounded border border-border bg-bg p-2 font-mono">
                      <span className="text-muted">Authorization Bearer</span>
                      <span className="rounded bg-black px-2 py-0.5 text-[10px] font-semibold text-white dark:bg-neutral-200 dark:text-neutral-900">
                        [TOKEN_REDACTED]
                      </span>
                    </div>
                  </div>

                  {/* Bug Target with Red Annotation Box */}
                  <div className="relative rounded-lg border-2 border-dashed border-danger/80 bg-danger/5 p-3">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-danger">Complete Purchase (Throws 500)</span>
                      <span className="flex size-5 items-center justify-center rounded-full bg-danger text-[10px] font-bold text-white shadow">
                        1
                      </span>
                    </div>
                    <p className="mt-1 text-[10px] text-danger/90">
                      Uncaught Error: Internal API Gateway Timeout
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'record' && (
              <div className="flex flex-col items-center justify-center py-8 text-center space-y-4">
                <div className="relative flex size-16 items-center justify-center rounded-full bg-danger/10 text-danger">
                  <Video className="size-8 animate-pulse" />
                  <span className="absolute -right-1 -top-1 flex size-3">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-danger opacity-75" />
                    <span className="relative inline-flex size-3 rounded-full bg-danger" />
                  </span>
                </div>

                <div>
                  <p className="text-sm font-semibold text-fg">Recording Active Viewport</p>
                  <p className="font-mono text-xs text-muted">00:18 / 00:30 Max Buffer</p>
                </div>

                <div className="flex items-center gap-2 rounded-full border border-border bg-elevated px-3 py-1 text-[11px] text-muted">
                  <Volume2 className="size-3.5 text-accent" />
                  <span>Microphone narration attached</span>
                </div>

                <div className="max-w-xs rounded border border-border/80 bg-surface/50 p-2 text-[10px] text-muted leading-tight">
                  <span className="font-semibold text-fg">Privacy Notice:</span> Screen video captures live pixel data.
                  Reporters preview and approve the clip before uploading.
                </div>
              </div>
            )}

            {activeTab === 'replay' && (
              <div className="space-y-4 py-2">
                <div className="rounded-lg border border-border bg-surface/90 p-3 text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-fg">DOM Session Replay Scrubbing</span>
                    <span className="font-mono text-[11px] text-accent">00:{replayTime.toString().padStart(2, '0')} / 00:30</span>
                  </div>
                  <p className="text-[11px] text-muted">
                    Captures rolling DOM mutations with password and card text stripped before export.
                  </p>

                  {/* Scrubber Timeline */}
                  <div className="relative pt-4">
                    <input
                      type="range"
                      min={0}
                      max={30}
                      value={replayTime}
                      onChange={(e) => setReplayTime(Number(e.target.value))}
                      aria-label="DOM Replay Scrubber"
                      className="w-full accent-accent cursor-pointer"
                    />

                    {/* Timeline Event Markers */}
                    <div className="relative mt-1 flex justify-between text-[10px] text-muted font-mono">
                      <span>00:00 (Page Loaded)</span>
                      <span className="text-danger font-semibold">00:14 (Error 500)</span>
                      <span>00:30 (Triggered)</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5 font-mono text-[11px]">
                  <div className="flex items-center gap-2 rounded bg-elevated p-1.5 text-muted">
                    <CheckCircle2 className="size-3.5 text-accent" />
                    <span>00:02 User clicked input#card-number</span>
                  </div>
                  <div className="flex items-center gap-2 rounded bg-danger/10 p-1.5 text-danger font-semibold">
                    <AlertCircle className="size-3.5" />
                    <span>00:14 POST /api/checkout returned 500</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Under-Stage Trust Indicator */}
          <div className="mt-3 flex items-center justify-between text-[11px] text-muted">
            <span className="inline-flex items-center gap-1">
              <Shield className="size-3.5 text-accent" /> Sensitive data redacted in browser
            </span>
            <span className="font-mono text-[10px]">Zero-Dependency SDK</span>
          </div>
        </div>

        {/* Right Sidebar: Studio Details & Privacy Check */}
        <div className="flex flex-col justify-between bg-surface/50 p-4 text-xs space-y-4">
          <div className="space-y-3">
            <div>
              <label className="mb-1 block font-semibold text-fg">What went wrong? *</label>
              <div className="rounded-lg border border-border bg-bg p-2 text-fg/90">
                Checkout fails with 500 after applying annual coupon code
              </div>
            </div>

            {/* Privacy Check Pill */}
            <div className="rounded-lg border border-accent/30 bg-accent/10 p-3">
              <div className="flex items-center gap-1.5 font-semibold text-accent">
                <CheckCircle2 className="size-4" />
                <span>Privacy Check Passed</span>
              </div>
              <ul className="mt-1.5 space-y-1 text-[11px] text-muted">
                <li>• 1 Card number masked before rasterization</li>
                <li>• 1 Bearer authorization token scrubbed</li>
                <li>• Customer email masked per policy</li>
              </ul>
            </div>

            {/* Collected Developer Diagnostics */}
            <div>
              <p className="mb-1.5 font-semibold text-fg">Developer Diagnostics Attached</p>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between rounded border border-border bg-bg px-2 py-1 text-[11px]">
                  <span className="flex items-center gap-1 text-danger">
                    <Terminal className="size-3" /> Console (1 uncaught)
                  </span>
                  <span className="font-mono text-[10px] text-muted">TypeError: token</span>
                </div>
                <div className="flex items-center justify-between rounded border border-border bg-bg px-2 py-1 text-[11px]">
                  <span className="flex items-center gap-1 text-danger">
                    <AlertCircle className="size-3" /> Failed Network (1)
                  </span>
                  <span className="font-mono text-[10px] text-muted">POST /checkout 500</span>
                </div>
                <div className="flex items-center justify-between rounded border border-border bg-bg px-2 py-1 text-[11px]">
                  <span className="flex items-center gap-1 text-fg">
                    <GitBranch className="size-3 text-accent" /> Release Tracking
                  </span>
                  <span className="font-mono text-[10px] text-muted">v2.4.1 (commit 8a2f)</span>
                </div>
                <div className="flex items-center justify-between rounded border border-border bg-bg px-2 py-1 text-[11px]">
                  <span className="flex items-center gap-1 text-fg">
                    <Cpu className="size-3 text-secondary" /> Correlation
                  </span>
                  <span className="font-mono text-[10px] text-muted">Sentry trace linked</span>
                </div>
              </div>
            </div>

            {/* Reporter Consent Switches */}
            <div className="space-y-1 pt-1 border-t border-border">
              <label className="flex items-center justify-between cursor-pointer py-1">
                <span className="text-[11px] text-muted">Attach technical diagnostics</span>
                <input
                  type="checkbox"
                  checked={includeDiagnostics}
                  onChange={(e) => setIncludeDiagnostics(e.target.checked)}
                  className="accent-accent cursor-pointer"
                />
              </label>
              <label className="flex items-center justify-between cursor-pointer py-1">
                <span className="text-[11px] text-muted">Include 30s DOM replay</span>
                <input
                  type="checkbox"
                  checked={includeReplay}
                  onChange={(e) => setIncludeReplay(e.target.checked)}
                  className="accent-accent cursor-pointer"
                />
              </label>
            </div>
          </div>

          {/* Action CTA Button */}
          <button
            type="button"
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-4 py-2.5 font-semibold text-accent-fg transition-opacity hover:opacity-90 active:scale-[0.99]"
          >
            <span>Send Bug Report</span>
            <kbd className="rounded bg-black/20 px-1.5 py-0.5 text-[10px] font-mono">⌘↵</kbd>
          </button>
        </div>
      </div>
    </figure>
  );
}
