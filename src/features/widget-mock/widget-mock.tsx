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
  Sun,
  Moon,
  Copy,
  X,
  Play,
  Pause,
  Undo2,
  Redo2,
  Crop,
  ChevronDown,
  Mic,
  Sparkles,
  Lock,
  Plus,
  Check,
  Send,
  CreditCard,
} from 'lucide-react';
import { cn } from '@/lib/cn';
import { useCurrency } from '@/lib/currency';

export function WidgetMock() {
  const { currency, setCurrency } = useCurrency();
  const isINR = currency === 'inr';

  const [activeTab, setActiveTab] = useState<'screenshot' | 'record' | 'replay'>('screenshot');
  const [activeTool, setActiveTool] = useState<'inspect' | 'box' | 'arrow' | 'redact' | 'step'>('inspect');
  const [activeColor, setActiveColor] = useState<string>('#EF4444');
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [selectedType, setSelectedType] = useState('Bug');
  const [selectedPriority, setSelectedPriority] = useState<'critical' | 'high' | 'normal'>('critical');
  const [isPlayingReplay, setIsPlayingReplay] = useState(false);
  const [replayTime, setReplayTime] = useState(14);
  const [copiedToast, setCopiedToast] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // 5 Consent switches according to WIDGET.md
  const [consent, setConsent] = useState({
    screenshot: true,
    recording: true,
    replay: true,
    console: true,
    network: true,
  });

  const priceText = isINR ? '₹9,990.00 / yr' : '$140.00 / yr';
  const payButtonText = isINR ? 'Pay ₹9,990 & Complete Upgrade' : 'Pay $140.00 & Complete Upgrade';

  const handleCopyMd = () => {
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <figure
      aria-label="Interactive simulation of the BugFence Reporting Studio"
      className={cn(
        'relative w-full overflow-hidden rounded-2xl border border-border shadow-2xl transition-all duration-300',
        isDarkTheme ? 'bg-[#0c1017] text-neutral-100' : 'bg-surface text-fg'
      )}
    >
      {/* Studio Top Control Bar: Branding + Tabs + Currency + Theme */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-elevated/70 px-4 py-3 text-xs">
        {/* Branding & Shadow DOM Badge */}
        <div className="flex items-center gap-2">
          <span className="flex size-7 items-center justify-center rounded-lg bg-accent text-accent-fg shadow-xs">
            <Shield className="size-4" />
          </span>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-fg">BugFence Reporting Studio</span>
              <span className="hidden sm:inline-block rounded-full bg-accent/15 px-2 py-0.5 text-[10px] font-semibold text-accent">
                Shadow DOM Isolated
              </span>
            </div>
            <p className="text-[10px] text-muted hidden md:block">~15 KB Lazy SDK · Zero reporter extensions required</p>
          </div>
        </div>

        {/* Capture Mode Tabs: Screenshot, Screen Recording, Session Replay */}
        <div
          role="tablist"
          aria-label="Capture mode tabs"
          className="flex items-center gap-1 rounded-lg border border-border bg-surface p-1 shadow-2xs"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'screenshot'}
            onClick={() => setActiveTab('screenshot')}
            className={cn(
              'relative flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-all',
              activeTab === 'screenshot'
                ? 'bg-elevated text-fg shadow-2xs'
                : 'text-muted hover:text-fg'
            )}
          >
            <Camera className="size-3.5 text-accent" />
            <span>Screenshot</span>
            <span className="size-1.5 rounded-full bg-accent" title="Screenshot captured" />
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'record'}
            onClick={() => setActiveTab('record')}
            className={cn(
              'relative flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-all',
              activeTab === 'record'
                ? 'bg-elevated text-fg shadow-2xs'
                : 'text-muted hover:text-fg'
            )}
          >
            <Video className="size-3.5 text-secondary" />
            <span>Screen Video</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'replay'}
            onClick={() => setActiveTab('replay')}
            className={cn(
              'relative flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-all',
              activeTab === 'replay'
                ? 'bg-elevated text-fg shadow-2xs'
                : 'text-muted hover:text-fg'
            )}
          >
            <RotateCcw className="size-3.5 text-accent" />
            <span>Session Replay (30s)</span>
            <span className="size-1.5 rounded-full bg-accent animate-pulse" title="30s DOM buffer ready" />
          </button>
        </div>

        {/* Header Right Actions: Currency Switcher + Theme Toggle + Copy Markdown */}
        <div className="flex items-center gap-2">
          {/* Quick Currency Toggle in Demo */}
          <div className="inline-flex rounded-md border border-border bg-surface p-0.5 text-[11px] font-semibold">
            <button
              type="button"
              onClick={() => setCurrency('usd')}
              className={cn(
                'rounded px-2 py-0.5 transition-colors',
                !isINR ? 'bg-accent text-accent-fg font-bold' : 'text-muted hover:text-fg'
              )}
              title="Preview in USD ($)"
            >
              $ USD
            </button>
            <button
              type="button"
              onClick={() => setCurrency('inr')}
              className={cn(
                'rounded px-2 py-0.5 transition-colors',
                isINR ? 'bg-accent text-accent-fg font-bold' : 'text-muted hover:text-fg'
              )}
              title="Preview in INR (₹)"
            >
              ₹ INR
            </button>
          </div>

          <button
            type="button"
            onClick={() => setIsDarkTheme(!isDarkTheme)}
            className="flex size-7 items-center justify-center rounded-md border border-border text-muted hover:bg-elevated hover:text-fg transition-colors"
            title="Toggle studio light/dark theme"
            aria-label="Toggle theme"
          >
            {isDarkTheme ? <Sun className="size-3.5" /> : <Moon className="size-3.5" />}
          </button>
          <button
            type="button"
            onClick={handleCopyMd}
            className="flex size-7 items-center justify-center rounded-md border border-border text-muted hover:bg-elevated hover:text-fg transition-colors"
            title="Copy triage report as Markdown"
            aria-label="Copy Markdown"
          >
            {copiedToast ? <Check className="size-3.5 text-accent" /> : <Copy className="size-3.5" />}
          </button>
        </div>
      </div>

      {/* Main Studio Grid: Left Stage (65% width) + Right Triage Drawer (35% width) */}
      <div className="grid lg:grid-cols-[1.6fr_1fr]">
        {/* LEFT VIEWPORT STAGE */}
        <div className="flex flex-col border-b lg:border-b-0 lg:border-r border-border bg-canvas/30 min-h-[520px]">
          {/* TAB 1: SCREENSHOT ANNOTATION STAGE */}
          {activeTab === 'screenshot' && (
            <>
              {/* Studio Annotation Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border bg-surface px-4 py-2 text-xs">
                {/* Primary Tools */}
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setActiveTool('inspect')}
                    className={cn(
                      'flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-semibold transition-all',
                      activeTool === 'inspect'
                        ? 'bg-accent/15 text-accent ring-1 ring-accent/40 shadow-xs'
                        : 'text-muted hover:text-fg hover:bg-elevated'
                    )}
                    title="Select DOM element (A)"
                  >
                    <Crosshair className="size-3.5" />
                    <span>Element</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTool('box')}
                    className={cn(
                      'flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-semibold transition-all',
                      activeTool === 'box'
                        ? 'bg-accent/15 text-accent ring-1 ring-accent/40 shadow-xs'
                        : 'text-muted hover:text-fg hover:bg-elevated'
                    )}
                    title="Bounding box (R)"
                  >
                    <Square className="size-3.5" />
                    <span>Box</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTool('arrow')}
                    className={cn(
                      'flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-semibold transition-all',
                      activeTool === 'arrow'
                        ? 'bg-accent/15 text-accent ring-1 ring-accent/40 shadow-xs'
                        : 'text-muted hover:text-fg hover:bg-elevated'
                    )}
                    title="Callout arrow (O)"
                  >
                    <ArrowUpRight className="size-3.5" />
                    <span>Arrow</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTool('redact')}
                    className={cn(
                      'flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-semibold transition-all',
                      activeTool === 'redact'
                        ? 'bg-accent/15 text-accent ring-1 ring-accent/40 shadow-xs'
                        : 'text-muted hover:text-fg hover:bg-elevated'
                    )}
                    title="PII Redaction mask (F)"
                  >
                    <EyeOff className="size-3.5" />
                    <span>Redact</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTool('step')}
                    className={cn(
                      'flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-semibold transition-all',
                      activeTool === 'step'
                        ? 'bg-accent/15 text-accent ring-1 ring-accent/40 shadow-xs'
                        : 'text-muted hover:text-fg hover:bg-elevated'
                    )}
                    title="Numbered step pin (1)"
                  >
                    <ListOrdered className="size-3.5" />
                    <span>Step</span>
                  </button>
                </div>

                {/* Color Palette Dots */}
                <div className="flex items-center gap-1.5">
                  {['#EF4444', '#3B82F6', '#10B981', '#F59E0B', '#8B5CF6'].map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setActiveColor(color)}
                      style={{ backgroundColor: color }}
                      className={cn(
                        'size-4 rounded-full transition-transform',
                        activeColor === color ? 'scale-125 ring-2 ring-fg ring-offset-1' : 'opacity-70 hover:opacity-100'
                      )}
                      aria-label={`Select annotation color ${color}`}
                    />
                  ))}
                </div>

                {/* Undo / Redo / Crop */}
                <div className="flex items-center gap-1 text-muted">
                  <button
                    type="button"
                    className="p-1.5 hover:text-fg rounded hover:bg-elevated"
                    title="Undo annotation"
                    aria-label="Undo"
                  >
                    <Undo2 className="size-3.5" />
                  </button>
                  <button
                    type="button"
                    className="p-1.5 hover:text-fg rounded hover:bg-elevated"
                    title="Redo annotation"
                    aria-label="Redo"
                  >
                    <Redo2 className="size-3.5" />
                  </button>
                  <div className="ml-1 inline-flex items-center gap-1 rounded border border-border bg-elevated px-2 py-0.5 text-[11px] font-medium text-fg">
                    <span>Visible area</span>
                    <ChevronDown className="size-3 text-muted" />
                  </div>
                </div>
              </div>

              {/* Viewport Canvas: Realistic SaaS Billing Checkout */}
              <div className="relative flex-1 p-5 flex flex-col justify-center">
                <div className="rounded-xl border border-border bg-elevated/40 p-5 shadow-inner">
                  {/* Simulated App Address Bar */}
                  <div className="mb-4 flex items-center gap-2 rounded-lg border border-border/80 bg-surface px-3 py-1.5 text-xs text-muted">
                    <Lock className="size-3 text-accent shrink-0" />
                    <span className="font-mono text-fg">https://app.novacloud.io/billing/checkout</span>
                    <span className="ml-auto text-[10px] text-muted">TLS 1.3 · Encrypted Session</span>
                  </div>

                  {/* App Checkout Card */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-border/70 pb-3">
                      <div>
                        <p className="text-sm font-bold text-fg">NovaCloud Enterprise Upgrade</p>
                        <p className="text-xs text-muted">Billed annually for Workspace &quot;Production Cluster&quot;</p>
                      </div>
                      <span className="rounded-md bg-accent/15 px-2.5 py-1 text-xs font-bold text-accent">
                        {priceText}
                      </span>
                    </div>

                    {/* Customer Inputs with Redacted PII Field */}
                    <div className="grid gap-3 sm:grid-cols-2 text-xs">
                      <div className="space-y-1">
                        <label className="text-[11px] text-muted font-medium">Customer Email</label>
                        <div className="rounded-md border border-border bg-surface px-3 py-2 text-xs font-mono text-fg">
                          alex@novacloud.io
                        </div>
                      </div>

                      {/* CLIENT-SIDE DOMFENCE REDACTED CARD */}
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <label className="text-[11px] text-muted font-medium">Payment Details</label>
                          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-accent">
                            <Shield className="size-3" /> Fenced by BugFence
                          </span>
                        </div>
                        <div className="relative flex items-center rounded-md border border-border bg-[#0b0e14] px-3 py-2 font-mono text-xs text-neutral-300">
                          <span className="tracking-widest font-extrabold text-neutral-400">•••• •••• ••••</span>
                          <span className="ml-2 font-semibold text-neutral-200">4242</span>
                          <span className="ml-auto flex items-center gap-1 rounded bg-accent/25 px-1.5 py-0.5 text-[9px] font-bold text-accent">
                            <Lock className="size-2.5" /> PII REDACTED
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Highlighted Buggy Button with Step Callout */}
                    <div className="pt-2">
                      <div className="relative inline-block w-full">
                        {/* DOM Inspector Badge */}
                        <div className="mb-1.5 flex items-center justify-between text-xs">
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-accent">
                            <Crosshair className="size-3" /> &lt;button#checkout-pay-btn.btn-primary&gt; 280 × 44px
                          </span>
                          <span className="text-[10px] text-muted">Annotated element</span>
                        </div>

                        {/* Annotation Box and Error Callout */}
                        <div className="relative rounded-xl border-2 border-dashed border-red-500 bg-red-500/5 p-3">
                          {/* Step Pin 1 */}
                          <span className="absolute -top-3 -left-2 flex size-6 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white shadow-lg">
                            1
                          </span>

                          <button
                            type="button"
                            className="flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-xs font-bold text-accent-fg shadow-sm"
                          >
                            <CreditCard className="size-3.5" />
                            <span>{payButtonText}</span>
                          </button>

                          {/* Arrow Callout */}
                          <div className="mt-2.5 flex items-center gap-2 text-xs font-semibold text-red-600 dark:text-red-400">
                            <ArrowUpRight className="size-4 rotate-90" />
                            <span>Clicking button triggers uncaught 500 Gateway Timeout</span>
                          </div>
                        </div>

                        {/* Ingested Network Log */}
                        <div className="mt-2.5 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-xs font-mono text-red-600 dark:text-red-300 flex items-center justify-between">
                          <span>POST /api/v1/checkout → 500 Internal Server Error</span>
                          <span className="text-[10px] text-muted font-normal">142ms latency</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Multi-Screenshot Filmstrip Footer */}
              <div className="flex flex-wrap items-center justify-between border-t border-border bg-surface px-4 py-2.5 text-xs text-muted">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-fg">Shot 1 of 1</span>
                  <span>·</span>
                  <span>Visible area</span>
                  <span>·</span>
                  <span className="font-mono">1440 × 900</span>
                  <button
                    type="button"
                    className="ml-2 inline-flex items-center gap-1 rounded border border-border bg-elevated px-2 py-0.5 font-medium text-fg hover:bg-elevated/80"
                  >
                    <Plus className="size-3 text-accent" /> Add Shot
                  </button>
                </div>
                <div className="hidden sm:flex items-center gap-3 font-mono text-[10px]">
                  <span>Shortcuts: A inspect · R box · F redact · Esc cancels</span>
                </div>
              </div>
            </>
          )}

          {/* TAB 2: SCREEN RECORDING STAGE */}
          {activeTab === 'record' && (
            <div className="flex flex-col flex-1 p-6 space-y-4">
              <div className="flex flex-wrap items-center justify-between rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-xs">
                <div className="flex items-center gap-2.5">
                  <span className="size-3 rounded-full bg-red-600 animate-pulse" />
                  <span className="font-bold text-red-600 dark:text-red-400 font-mono text-sm">REC 00:18 / 00:30</span>
                  <span className="rounded-full bg-accent/20 px-2 py-0.5 text-[10px] font-bold text-accent">
                    DOMFence Active: 3 inputs masked
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-muted">
                    <Mic className="size-3.5 text-accent" /> Mic narration active
                  </span>
                  <button
                    type="button"
                    className="rounded bg-elevated border border-border px-2.5 py-1 text-xs font-semibold text-fg"
                  >
                    Pause
                  </button>
                  <button
                    type="button"
                    className="rounded bg-red-600 px-3 py-1 text-xs font-bold text-white shadow-xs"
                  >
                    Stop & Review
                  </button>
                </div>
              </div>

              {/* Video Waveform Preview */}
              <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-bg/80 p-12 text-center space-y-4 min-h-[300px]">
                <div className="flex size-16 items-center justify-center rounded-full bg-accent/20 text-accent ring-8 ring-accent/10">
                  <Video className="size-8" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-base font-bold text-fg">Capturing Live Screen & Voice Narration</h4>
                  <p className="text-xs text-muted max-w-sm">
                    High-frame-rate tab capture without software installation. Audio stream is synchronized with user clicks.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SESSION REPLAY STAGE */}
          {activeTab === 'replay' && (
            <div className="flex flex-col flex-1 p-6 space-y-4">
              <div className="flex items-center justify-between rounded-xl border border-border bg-elevated/40 p-4">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsPlayingReplay(!isPlayingReplay)}
                    className="flex size-9 items-center justify-center rounded-lg bg-accent text-accent-fg shadow-sm hover:opacity-90 transition-opacity"
                  >
                    {isPlayingReplay ? <Pause className="size-4" /> : <Play className="size-4 ml-0.5" />}
                  </button>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-bold text-fg">00:{replayTime < 10 ? `0${replayTime}` : replayTime} / 00:30</span>
                      <span className="rounded bg-accent/15 px-2 py-0.5 text-[10px] font-bold text-accent">
                        DOM Mutation Stream
                      </span>
                    </div>
                    <p className="text-[10px] text-muted">Rolling 30-second buffer assembled on-device</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <span className="text-muted">Speed:</span>
                  <span className="rounded bg-elevated border border-border px-2 py-0.5 font-mono font-semibold text-fg">1.0x</span>
                </div>
              </div>

              {/* Replay Scrubbing Bar */}
              <div className="space-y-1.5">
                <div className="relative h-3 w-full rounded-full bg-border overflow-hidden cursor-pointer">
                  <div
                    className="h-full bg-accent transition-all duration-150"
                    style={{ width: `${(replayTime / 30) * 100}%` }}
                  />
                  {/* Event markers */}
                  <span className="absolute top-0 bottom-0 w-1 bg-red-500" style={{ left: '46%' }} title="500 Gateway Timeout Error" />
                  <span className="absolute top-0 bottom-0 w-1 bg-amber-500" style={{ left: '20%' }} title="User Click Input" />
                </div>
                <div className="flex justify-between text-[10px] font-mono text-muted">
                  <span>-30s (Buffer start)</span>
                  <span className="text-red-500 font-bold">● -14s (Error Click)</span>
                  <span>0s (Report trigger)</span>
                </div>
              </div>

              {/* Event Waterfall */}
              <div className="rounded-xl border border-border bg-surface p-4 space-y-2 text-xs">
                <p className="font-bold text-fg text-xs">Event Timeline Waterfall</p>
                <div className="space-y-1.5 font-mono text-[11px]">
                  <div className="flex items-center justify-between rounded bg-elevated/40 p-2">
                    <span className="text-accent">00:08 - user_input &quot;alex@novacloud.io&quot;</span>
                    <span className="text-muted text-[10px]">DOM Input</span>
                  </div>
                  <div className="flex items-center justify-between rounded bg-elevated/40 p-2">
                    <span className="text-accent">00:12 - mouse_click &lt;button#checkout-pay-btn&gt;</span>
                    <span className="text-muted text-[10px]">DOM Event</span>
                  </div>
                  <div className="flex items-center justify-between rounded bg-red-500/10 border border-red-500/30 p-2 text-red-600 dark:text-red-400 font-semibold">
                    <span>00:14 - fetch POST /api/v1/checkout HTTP 500</span>
                    <span className="text-[10px]">Network Failure</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT METADATA & TRIAGE DRAWER (35% width) */}
        <div className="flex flex-col justify-between border-t lg:border-t-0 bg-surface p-5">
          {isSubmitted ? (
            /* Submission State */
            <div className="flex flex-col items-center justify-center flex-1 py-12 text-center space-y-4">
              <div className="flex size-14 items-center justify-center rounded-full bg-accent/20 text-accent">
                <CheckCircle2 className="size-8" />
              </div>
              <h4 className="text-xl font-bold text-fg">Report Dispatched</h4>
              <p className="text-xs text-muted max-w-xs leading-relaxed">
                Triage issue created in BugFence dashboard. Diagnostics, redacted DOM replay, and symbolicated trace linked.
              </p>
              <div className="rounded-lg border border-border bg-elevated px-3 py-1.5 font-mono text-xs text-fg">
                Issue ID: BF-2026-0891
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {/* Type & Priority Pickers */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-muted mb-1">Type</label>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full rounded-lg border border-border bg-bg px-2.5 py-1.5 text-xs text-fg focus:border-accent focus:outline-none"
                  >
                    <option value="Bug">Defect / Bug</option>
                    <option value="Feedback">Feedback</option>
                    <option value="Question">Question</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-muted mb-1">Priority</label>
                  <div className="flex rounded-lg border border-border bg-bg p-0.5">
                    <button
                      type="button"
                      onClick={() => setSelectedPriority('critical')}
                      className={cn(
                        'flex-1 rounded py-1 text-[11px] font-bold transition-colors',
                        selectedPriority === 'critical' ? 'bg-red-600 text-white shadow-xs' : 'text-muted hover:text-fg'
                      )}
                    >
                      P0
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedPriority('high')}
                      className={cn(
                        'flex-1 rounded py-1 text-[11px] font-bold transition-colors',
                        selectedPriority === 'high' ? 'bg-amber-600 text-white shadow-xs' : 'text-muted hover:text-fg'
                      )}
                    >
                      P1
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedPriority('normal')}
                      className={cn(
                        'flex-1 rounded py-1 text-[11px] font-bold transition-colors',
                        selectedPriority === 'normal' ? 'bg-accent text-accent-fg shadow-xs' : 'text-muted hover:text-fg'
                      )}
                    >
                      P2
                    </button>
                  </div>
                </div>
              </div>

              {/* Title Input */}
              <div>
                <label className="block text-[11px] font-semibold text-muted mb-1">Issue Title *</label>
                <input
                  type="text"
                  required
                  defaultValue="[Billing] 500 Gateway Timeout on checkout pay button"
                  className="w-full rounded-lg border border-border bg-bg px-3 py-2 text-xs font-medium text-fg focus:border-accent focus:outline-none"
                />
              </div>

              {/* Description Textarea */}
              <div>
                <label className="block text-[11px] font-semibold text-muted mb-1">Reproduction Details</label>
                <textarea
                  rows={3}
                  defaultValue={
                    isINR
                      ? "Clicked 'Pay ₹9,990 & Complete Upgrade'. Spinner spun briefly, then failed with a 500 Gateway Timeout in console."
                      : "Clicked 'Pay $140.00 & Complete Upgrade'. Spinner spun briefly, then failed with a 500 Gateway Timeout in console."
                  }
                  className="w-full resize-none rounded-lg border border-border bg-bg p-2.5 text-xs text-fg focus:border-accent focus:outline-none leading-relaxed"
                />
              </div>

              {/* Attached Diagnostics Chips */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-semibold text-muted">Auto-Captured Telemetry</span>
                <div className="space-y-1 text-[11px]">
                  <div className="flex items-center justify-between rounded bg-elevated/50 px-2.5 py-1 border border-border/70">
                    <span className="text-red-500 font-semibold flex items-center gap-1.5">
                      <AlertCircle className="size-3" /> Console: 1 Uncaught Exception
                    </span>
                    <span className="font-mono text-muted text-[10px]">Error: Timeout 142ms</span>
                  </div>
                  <div className="flex items-center justify-between rounded bg-elevated/50 px-2.5 py-1 border border-border/70">
                    <span className="text-amber-500 font-semibold flex items-center gap-1.5">
                      <RotateCcw className="size-3" /> Replay: 30s DOM Events
                    </span>
                    <span className="font-mono text-muted text-[10px]">42 Mutations</span>
                  </div>
                </div>
              </div>

              {/* Privacy Consent 5 Switches */}
              <div className="rounded-xl border border-border/80 bg-elevated/20 p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[11px] text-fg flex items-center gap-1">
                    <Shield className="size-3 text-accent" /> Reporter Consent Checklist
                  </span>
                  <span className="text-[10px] text-muted">All client-masked</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={consent.screenshot}
                      onChange={(e) => setConsent({ ...consent, screenshot: e.target.checked })}
                      className="accent-accent size-3"
                    />
                    <span>Screenshot</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={consent.console}
                      onChange={(e) => setConsent({ ...consent, console: e.target.checked })}
                      className="accent-accent size-3"
                    />
                    <span>Console logs</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={consent.network}
                      onChange={(e) => setConsent({ ...consent, network: e.target.checked })}
                      className="accent-accent size-3"
                    />
                    <span>Network requests</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={consent.replay}
                      onChange={(e) => setConsent({ ...consent, replay: e.target.checked })}
                      className="accent-accent size-3"
                    />
                    <span>DOM session replay</span>
                  </label>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-accent py-2.5 text-xs font-bold text-accent-fg shadow-md shadow-accent/20 hover:opacity-95 transition-opacity"
                >
                  <Send className="size-3.5" />
                  <span>Submit Bug Report</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </figure>
  );
}
