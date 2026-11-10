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
  ChevronRight,
  Mic,
  Sparkles,
  Lock,
  Plus,
  Sliders,
  Check,
} from 'lucide-react';
import { cn } from '@/lib/cn';

export function WidgetMock() {
  const [activeTab, setActiveTab] = useState<'screenshot' | 'record' | 'replay'>('screenshot');
  const [activeTool, setActiveTool] = useState<'inspect' | 'box' | 'arrow' | 'redact' | 'step'>('inspect');
  const [activeColor, setActiveColor] = useState<string>('#EF4444');
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [diagnosticsOpen, setDiagnosticsOpen] = useState(false);
  const [selectedType, setSelectedType] = useState('Bug');
  const [isPlayingReplay, setIsPlayingReplay] = useState(false);
  const [replayTime, setReplayTime] = useState(14);
  const [copiedToast, setCopiedToast] = useState(false);

  // 5 Consent switches according to WIDGET.md
  const [consent, setConsent] = useState({
    screenshot: true,
    recording: true,
    replay: true,
    console: true,
    network: true,
  });

  const handleCopyMd = () => {
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 2000);
  };

  return (
    <figure
      aria-label="Interactive simulation of the BugFence Reporting Studio"
      className={cn(
        'relative overflow-hidden rounded-2xl border border-border shadow-2xl transition-all',
        isDarkTheme ? 'bg-[#0f131a] text-neutral-100' : 'bg-surface text-fg'
      )}
    >
      {/* Studio Header Bar */}
      <div className="flex flex-wrap items-center justify-between border-b border-border bg-elevated/70 px-4 py-2.5 text-xs">
        {/* Branding & Shadow DOM Badge */}
        <div className="flex items-center gap-2">
          <span className="flex size-6 items-center justify-center rounded-md bg-accent/20 text-accent">
            <Shield className="size-3.5" />
          </span>
          <span className="font-semibold text-fg">BugFence Reporting Studio</span>
          <span className="hidden sm:inline-block rounded bg-accent/15 px-1.5 py-0.5 text-[10px] font-medium text-accent">
            Shadow DOM Isolated
          </span>
        </div>

        {/* Capture Type Switcher Tabs */}
        <div
          role="tablist"
          aria-label="Capture mode tabs"
          className="flex items-center gap-1 rounded-lg border border-border bg-surface p-0.5 shadow-2xs"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'screenshot'}
            onClick={() => setActiveTab('screenshot')}
            className={cn(
              'relative flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-all',
              activeTab === 'screenshot'
                ? 'bg-elevated text-fg shadow-2xs font-semibold'
                : 'text-muted hover:text-fg'
            )}
          >
            <Camera className="size-3.5" />
            <span>Screenshot</span>
            <span className="size-1.5 rounded-full bg-accent" title="Screenshot attached" />
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'record'}
            onClick={() => setActiveTab('record')}
            className={cn(
              'relative flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-all',
              activeTab === 'record'
                ? 'bg-elevated text-fg shadow-2xs font-semibold'
                : 'text-muted hover:text-fg'
            )}
          >
            <Video className="size-3.5" />
            <span>Screen Recording</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'replay'}
            onClick={() => setActiveTab('replay')}
            className={cn(
              'relative flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-all',
              activeTab === 'replay'
                ? 'bg-elevated text-fg shadow-2xs font-semibold'
                : 'text-muted hover:text-fg'
            )}
          >
            <RotateCcw className="size-3.5" />
            <span>Session Replay</span>
            <span className="size-1.5 rounded-full bg-accent" title="Replay buffer active" />
          </button>
        </div>

        {/* Header Actions: Theme, Copy Markdown, Close */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setIsDarkTheme(!isDarkTheme)}
            className="flex size-7 items-center justify-center rounded-md border border-border text-muted hover:bg-elevated hover:text-fg transition-colors"
            title="Toggle studio theme preview"
            aria-label="Toggle theme"
          >
            {isDarkTheme ? <Sun className="size-3.5" /> : <Moon className="size-3.5" />}
          </button>
          <button
            type="button"
            onClick={handleCopyMd}
            className="relative flex size-7 items-center justify-center rounded-md border border-border text-muted hover:bg-elevated hover:text-fg transition-colors"
            title="Copy report as Markdown"
            aria-label="Copy Markdown"
          >
            {copiedToast ? <Check className="size-3.5 text-accent" /> : <Copy className="size-3.5" />}
          </button>
          <button
            type="button"
            className="flex size-7 items-center justify-center rounded-md border border-border text-muted hover:bg-elevated hover:text-fg transition-colors"
            title="Close dialog (Esc)"
            aria-label="Close"
          >
            <X className="size-3.5" />
          </button>
        </div>
      </div>

      {/* Main Studio Body: Left Stage + Right Details Sidebar */}
      <div className="grid lg:grid-cols-[1.55fr_1.1fr]">
        {/* Left Stage Viewport */}
        <div className="flex flex-col border-b lg:border-b-0 lg:border-r border-border bg-canvas/30">
          {/* TAB 1: SCREENSHOT ANNOTATION STAGE */}
          {activeTab === 'screenshot' && (
            <>
              {/* Studio Annotation Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border bg-surface px-3 py-1.5 text-xs">
                {/* Primary Tools */}
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setActiveTool('inspect')}
                    className={cn(
                      'flex items-center gap-1 rounded px-2 py-1 font-medium transition-colors',
                      activeTool === 'inspect'
                        ? 'bg-accent/15 text-accent font-semibold ring-1 ring-accent/30'
                        : 'text-muted hover:text-fg hover:bg-elevated'
                    )}
                    title="Inspect & Select element (A)"
                  >
                    <Crosshair className="size-3.5" />
                    <span className="hidden sm:inline">Element</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTool('box')}
                    className={cn(
                      'flex items-center gap-1 rounded px-2 py-1 font-medium transition-colors',
                      activeTool === 'box'
                        ? 'bg-accent/15 text-accent font-semibold ring-1 ring-accent/30'
                        : 'text-muted hover:text-fg hover:bg-elevated'
                    )}
                    title="Draw bounding box (R)"
                  >
                    <Square className="size-3.5" />
                    <span className="hidden sm:inline">Box</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTool('arrow')}
                    className={cn(
                      'flex items-center gap-1 rounded px-2 py-1 font-medium transition-colors',
                      activeTool === 'arrow'
                        ? 'bg-accent/15 text-accent font-semibold ring-1 ring-accent/30'
                        : 'text-muted hover:text-fg hover:bg-elevated'
                    )}
                    title="Callout arrow (O)"
                  >
                    <ArrowUpRight className="size-3.5" />
                    <span className="hidden sm:inline">Arrow</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTool('redact')}
                    className={cn(
                      'flex items-center gap-1 rounded px-2 py-1 font-medium transition-colors',
                      activeTool === 'redact'
                        ? 'bg-accent/15 text-accent font-semibold ring-1 ring-accent/30'
                        : 'text-muted hover:text-fg hover:bg-elevated'
                    )}
                    title="Redact sensitive data (F)"
                  >
                    <EyeOff className="size-3.5" />
                    <span className="hidden sm:inline">Redact</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTool('step')}
                    className={cn(
                      'flex items-center gap-1 rounded px-2 py-1 font-medium transition-colors',
                      activeTool === 'step'
                        ? 'bg-accent/15 text-accent font-semibold ring-1 ring-accent/30'
                        : 'text-muted hover:text-fg hover:bg-elevated'
                    )}
                    title="Numbered step badge (1)"
                  >
                    <ListOrdered className="size-3.5" />
                    <span className="hidden sm:inline">Step</span>
                  </button>
                </div>

                {/* Color Palette Swatches */}
                <div className="flex items-center gap-1.5">
                  {['#EF4444', '#3B82F6', '#10B981', '#F59E0B', '#8B5CF6'].map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setActiveColor(color)}
                      style={{ backgroundColor: color }}
                      className={cn(
                        'size-4 rounded-full transition-transform',
                        activeColor === color ? 'scale-125 ring-2 ring-fg' : 'opacity-70 hover:opacity-100'
                      )}
                      aria-label={`Select annotation color ${color}`}
                    />
                  ))}
                </div>

                {/* History & Crop Controls */}
                <div className="flex items-center gap-1 text-muted">
                  <button
                    type="button"
                    className="p-1 hover:text-fg rounded hover:bg-elevated"
                    title="Undo annotation (⌘Z)"
                    aria-label="Undo"
                  >
                    <Undo2 className="size-3.5" />
                  </button>
                  <button
                    type="button"
                    className="p-1 hover:text-fg rounded hover:bg-elevated"
                    title="Redo annotation (⌘⇧Z)"
                    aria-label="Redo"
                  >
                    <Redo2 className="size-3.5" />
                  </button>
                  <button
                    type="button"
                    className="p-1 hover:text-fg rounded hover:bg-elevated"
                    title="Crop capture area (C)"
                    aria-label="Crop"
                  >
                    <Crop className="size-3.5" />
                  </button>
                  <div className="ml-1 inline-flex items-center gap-1 rounded border border-border bg-elevated px-1.5 py-0.5 text-[11px] font-medium text-fg">
                    <span>Visible area</span>
                    <ChevronDown className="size-3 text-muted" />
                  </div>
                </div>
              </div>

              {/* Viewport Simulation: Realistic SaaS Billing Checkout */}
              <div className="relative flex-1 p-4">
                <div className="rounded-xl border border-border bg-elevated/40 p-4 shadow-inner">
                  {/* Simulated Browser Address Bar */}
                  <div className="mb-3 flex items-center gap-2 rounded-md border border-border/70 bg-surface px-2.5 py-1 text-[11px] text-muted">
                    <Lock className="size-3 text-accent shrink-0" />
                    <span className="font-mono text-fg">https://app.acmecorp.com/billing/checkout</span>
                    <span className="ml-auto text-[10px] text-muted/80">TLS 1.3 · Encrypted</span>
                  </div>

                  {/* App Screen Content: Realistic Checkout */}
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between border-b border-border/60 pb-2">
                      <div>
                        <p className="text-xs font-bold text-fg">Acme Cloud Enterprise Upgrade</p>
                        <p className="text-[11px] text-muted">Subscription for Workspace &quot;NovaCloud Prod&quot;</p>
                      </div>
                      <span className="rounded bg-accent/15 px-2 py-0.5 text-xs font-semibold text-accent">
                        $140.00 / yr
                      </span>
                    </div>

                    {/* Masked Payment Input Fields */}
                    <div className="grid gap-2.5 sm:grid-cols-2 text-xs">
                      <div className="space-y-1">
                        <label className="text-[11px] text-muted font-medium">Customer Email</label>
                        <div className="rounded-md border border-border bg-surface px-2.5 py-1.5 text-xs font-mono text-fg">
                          ana@novacloud.io
                        </div>
                      </div>

                      {/* CLIENT-SIDE DOMFENCE REDACTED CARD NUMBER */}
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <label className="text-[11px] text-muted font-medium">Card Number</label>
                          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-accent">
                            <Shield className="size-3" /> Redacted by DOMFence
                          </span>
                        </div>
                        <div className="relative flex items-center rounded-md border border-border bg-[#0b0e14] px-2.5 py-1.5 font-mono text-xs text-neutral-300">
                          <span className="tracking-widest font-extrabold text-neutral-400">████ ████ ████</span>
                          <span className="ml-2 font-semibold text-neutral-200">4242</span>
                          <span className="ml-auto flex items-center gap-1 rounded bg-accent/20 px-1 py-0.2 text-[9px] font-bold text-accent">
                            <Lock className="size-2.5" /> PII FENCE
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Realistic Callout and Broken Action Button */}
                    <div className="pt-2">
                      <div className="relative inline-block w-full">
                        {/* DOM Element Picker Inspector Pill */}
                        <div className="mb-1.5 flex items-center justify-between text-[11px]">
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-2 py-0.5 font-mono text-[10px] font-semibold text-accent">
                            <Crosshair className="size-3" /> &lt;button#checkout-pay-btn.btn-primary&gt; 240 × 44px
                          </span>
                          <span className="text-[10px] text-muted">Click inspects DOM element</span>
                        </div>

                        {/* Annotation Box and Error Callout */}
                        <div className="relative rounded-lg border-2 border-dashed border-red-500 bg-red-500/5 p-2">
                          {/* Numbered Step Badge */}
                          <span className="absolute -top-3 -left-2 flex size-6 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white shadow-md">
                            1
                          </span>

                          <button
                            type="button"
                            className="flex w-full items-center justify-center gap-2 rounded-md bg-accent px-4 py-2.5 text-xs font-semibold text-accent-fg shadow-sm"
                          >
                            <span>Pay $140.00 &amp; Complete Upgrade</span>
                          </button>

                          {/* Annotation Arrow Indicator */}
                          <div className="mt-2 flex items-center gap-1.5 text-[11px] font-semibold text-red-600 dark:text-red-400">
                            <ArrowUpRight className="size-4 rotate-90" />
                            <span>Uncaught 500 error when submitting card form</span>
                          </div>
                        </div>

                        {/* Ingested Network Error Banner */}
                        <div className="mt-2 rounded border border-red-500/30 bg-red-500/10 px-2.5 py-1 text-[11px] font-mono text-red-600 dark:text-red-300">
                          POST /api/v1/checkout → 500 Internal Server Error (Gateway Timeout 142ms)
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Multi-Screenshot Filmstrip Bar & Keyboard Shortcuts */}
              <div className="flex flex-wrap items-center justify-between border-t border-border bg-surface px-4 py-2 text-[11px] text-muted">
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
                <div className="hidden sm:flex items-center gap-2 font-mono text-[10px]">
                  <span>Shortcuts: A inspect · R box · F redact · Esc cancels</span>
                </div>
              </div>
            </>
          )}

          {/* TAB 2: SCREEN RECORDING STAGE */}
          {activeTab === 'record' && (
            <div className="flex flex-col flex-1 p-5 space-y-4">
              {/* Active REC Status Bar */}
              <div className="flex flex-wrap items-center justify-between rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="size-2.5 rounded-full bg-red-600 animate-pulse" />
                  <span className="font-bold text-red-600 dark:text-red-400 font-mono">REC 00:18 / 00:30</span>
                  <span className="rounded bg-accent/20 px-1.5 py-0.5 text-[10px] font-bold text-accent">
                    DOMFence Live: 3 inputs masked
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-muted">
                    <Mic className="size-3 text-accent" /> Audio narration active
                  </span>
                  <button
                    type="button"
                    className="rounded bg-elevated border border-border px-2 py-0.5 text-xs font-semibold text-fg"
                  >
                    Pause
                  </button>
                  <button
                    type="button"
                    className="rounded bg-red-600 px-2.5 py-0.5 text-xs font-bold text-white shadow-xs"
                  >
                    Stop &amp; Review
                  </button>
                </div>
              </div>

              {/* Video Timeline & Preview Canvas */}
              <div className="flex-1 flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-elevated/40 p-8 text-center">
                <Video className="size-10 text-accent opacity-80" />
                <p className="mt-2 text-sm font-semibold text-fg">Screen Recording Preview</p>
                <p className="text-xs text-muted max-w-sm mt-1">
                  Captures tab interactions with optional voice narration. Sensitive DOM fields remain masked during live stream.
                </p>
                <div className="mt-4 flex items-center gap-2 text-xs font-mono text-muted">
                  <span>Duration: 00:18</span>
                  <span>·</span>
                  <span>Codec: VP9 / MP4</span>
                  <span>·</span>
                  <span>Size: 2.1 MB</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SESSION REPLAY STAGE */}
          {activeTab === 'replay' && (
            <div className="flex flex-col flex-1 p-5 space-y-4">
              {/* Session Replay Mini Player */}
              <div className="flex flex-col rounded-xl border border-border bg-elevated/40 p-4 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setIsPlayingReplay(!isPlayingReplay)}
                      className="flex size-7 items-center justify-center rounded-full bg-accent text-accent-fg"
                      aria-label={isPlayingReplay ? 'Pause replay' : 'Play replay'}
                    >
                      {isPlayingReplay ? <Pause className="size-3.5" /> : <Play className="size-3.5 ml-0.5" />}
                    </button>
                    <span className="font-mono text-fg font-semibold">00:{replayTime < 10 ? `0${replayTime}` : replayTime} / 00:30</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-elevated px-2 py-0.5 text-[11px] font-mono text-muted border border-border">
                      1× Speed
                    </span>
                    <button
                      type="button"
                      className="rounded bg-elevated px-2 py-0.5 text-[11px] font-semibold text-fg border border-border hover:bg-elevated/80"
                    >
                      Trim 5s
                    </button>
                  </div>
                </div>

                {/* Scrubber Timeline with Error Diamond Marker */}
                <div className="relative pt-2">
                  <input
                    type="range"
                    min="0"
                    max="30"
                    value={replayTime}
                    onChange={(e) => setReplayTime(Number(e.target.value))}
                    className="w-full accent-accent cursor-pointer"
                  />
                  {/* Red Error Marker at 00:14 */}
                  <div
                    className="absolute top-1 flex flex-col items-center pointer-events-none"
                    style={{ left: `${(14 / 30) * 100}%` }}
                  >
                    <span className="size-2 rounded-full bg-red-500 shadow-sm animate-ping" />
                    <span className="text-[9px] font-mono font-bold text-red-500">Error 500</span>
                  </div>
                </div>
              </div>

              {/* Event Stream Log */}
              <div className="rounded-xl border border-border bg-surface p-3 text-xs space-y-2">
                <p className="font-bold text-fg text-[11px] uppercase tracking-wider">DOM Event Stream (Trailing 30s)</p>
                <ul className="space-y-1.5 font-mono text-[11px]">
                  <li className="flex items-center justify-between text-muted">
                    <span>00:02 · Clicked &lt;input#customer-email&gt;</span>
                    <span className="text-[10px] text-accent">Safe</span>
                  </li>
                  <li className="flex items-center justify-between text-muted">
                    <span>00:07 · Focused &lt;input#card-number&gt;</span>
                    <span className="text-[10px] text-accent">DOMFence Masked</span>
                  </li>
                  <li className="flex items-center justify-between text-red-500 font-semibold bg-red-500/10 px-1.5 py-0.5 rounded">
                    <span>00:14 · POST /api/checkout → 500 Internal Error</span>
                    <span>142ms</span>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Right Details & AI Triage Sidebar (matches WIDGET.md) */}
        <div className="flex flex-col justify-between border-t lg:border-t-0 bg-surface p-4 text-xs space-y-4 max-h-[620px] overflow-y-auto">
          <div className="space-y-3.5">
            {/* Title / Summary */}
            <div className="space-y-1">
              <label htmlFor="mock-title" className="font-bold text-fg">
                What went wrong? <span className="text-red-500">*</span>
              </label>
              <input
                id="mock-title"
                type="text"
                defaultValue="Payment button throws 500 error on submit"
                className="w-full rounded-md border border-border bg-canvas px-3 py-1.5 text-xs text-fg focus:border-accent focus:outline-hidden"
              />
              <p className="text-[10px] text-muted">Suggested from detected errors — edit freely</p>
            </div>

            {/* Description with Voice Dictate Button */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label htmlFor="mock-desc" className="font-bold text-fg">
                  Description
                </label>
                <button
                  type="button"
                  className="inline-flex items-center gap-1 rounded bg-elevated px-1.5 py-0.5 text-[10px] font-medium text-accent border border-border hover:bg-elevated/80"
                >
                  <Mic className="size-3" /> Dictate
                </button>
              </div>
              <textarea
                id="mock-desc"
                rows={2}
                defaultValue="Clicked 'Pay $140.00 & Upgrade'. Spinner spun briefly, then failed with a 500 Gateway Timeout error in the console."
                className="w-full rounded-md border border-border bg-canvas p-2 text-xs text-fg focus:border-accent focus:outline-hidden"
              />
            </div>

            {/* Collapsible Disclosure: More Details (Type & Impact) */}
            <div className="rounded-lg border border-border bg-elevated/40 p-2.5">
              <button
                type="button"
                onClick={() => setDetailsOpen(!detailsOpen)}
                className="flex w-full items-center justify-between text-xs font-semibold text-fg"
              >
                <span className="flex items-center gap-1">
                  <Sliders className="size-3.5 text-accent" /> More details (Type &amp; Impact)
                </span>
                {detailsOpen ? <ChevronDown className="size-3.5" /> : <ChevronRight className="size-3.5" />}
              </button>

              {detailsOpen && (
                <div className="mt-3 space-y-2.5 pt-2 border-t border-border text-xs">
                  <div>
                    <label className="text-[11px] text-muted block mb-1">Issue Type</label>
                    <div className="flex flex-wrap gap-1">
                      {['Bug', 'Visual', 'Slow', 'Security', 'Idea'].map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setSelectedType(t)}
                          className={cn(
                            'rounded px-2 py-0.5 text-[11px] font-medium transition-colors',
                            selectedType === t
                              ? 'bg-accent text-accent-fg font-semibold'
                              : 'bg-surface border border-border text-muted hover:text-fg'
                          )}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-[11px] text-muted block mb-1">Customer Impact</label>
                    <select className="w-full rounded border border-border bg-surface px-2 py-1 text-xs text-fg">
                      <option>High — Major checkout flow broken</option>
                      <option>Medium — Non-critical feature</option>
                      <option>Low — Minor styling issue</option>
                    </select>
                  </div>
                </div>
              )}
            </div>

            {/* Selected DOM Element Card */}
            <div className="rounded-lg border border-border bg-elevated/40 p-2.5 text-xs space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-fg flex items-center gap-1">
                  <Crosshair className="size-3.5 text-accent" /> Selected Element
                </span>
                <button type="button" className="text-[10px] text-accent hover:underline">
                  Re-pick
                </button>
              </div>
              <div className="rounded border border-border bg-surface p-1.5 font-mono text-[11px] text-fg">
                &lt;button#checkout-pay-btn.btn-primary&gt;
              </div>
              <div className="flex items-center justify-between text-[10px] text-muted">
                <span>Dimensions: 240 × 44px</span>
                <span>Role: button</span>
              </div>
            </div>

            {/* AI Triage Card (On-Device Engine) */}
            <div className="rounded-lg border border-accent/30 bg-accent/5 p-3 text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-fg flex items-center gap-1.5">
                  <Sparkles className="size-3.5 text-accent" /> AI Triage (On-Device)
                </span>
                <span className="rounded bg-accent/20 px-1.5 py-0.2 text-[10px] font-bold text-accent">
                  94% Confidence
                </span>
              </div>
              <p className="text-[11px] text-muted leading-relaxed">
                <strong className="text-fg">Hypothesis:</strong> Network timeout triggered on <code>POST /api/checkout</code>. Endpoint returned 500 within 142ms.
              </p>
              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  className="rounded bg-accent px-2 py-0.5 text-[10px] font-bold text-accent-fg hover:opacity-90"
                >
                  Use Suggestion
                </button>
                <button
                  type="button"
                  className="rounded border border-border bg-elevated px-2 py-0.5 text-[10px] font-medium text-muted hover:text-fg"
                >
                  Re-analyze
                </button>
              </div>
            </div>

            {/* Standing Safeguards & Privacy Check Card */}
            <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-2.5 text-xs space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="size-3.5" /> Privacy Check: 2 Masks Applied
              </div>
              <p className="text-[11px] text-muted">
                Card numbers and authorization tokens have been redacted in the browser before sending.
              </p>
            </div>

            {/* Telemetry & Reporter Consent Switches (WIDGET.md 5 Switches) */}
            <div className="space-y-1 border-t border-border pt-2 text-xs">
              <p className="font-bold text-fg text-[11px] uppercase tracking-wider mb-1">Attached Diagnostics</p>
              <label className="flex items-center justify-between py-0.5 cursor-pointer">
                <span className="text-[11px] text-muted">Console logs &amp; unhandled errors</span>
                <input
                  type="checkbox"
                  checked={consent.console}
                  onChange={(e) => setConsent({ ...consent, console: e.target.checked })}
                  className="accent-accent cursor-pointer"
                />
              </label>
              <label className="flex items-center justify-between py-0.5 cursor-pointer">
                <span className="text-[11px] text-muted">Failed network requests (ring buffer)</span>
                <input
                  type="checkbox"
                  checked={consent.network}
                  onChange={(e) => setConsent({ ...consent, network: e.target.checked })}
                  className="accent-accent cursor-pointer"
                />
              </label>
              <label className="flex items-center justify-between py-0.5 cursor-pointer">
                <span className="text-[11px] text-muted">30-second DOM session replay</span>
                <input
                  type="checkbox"
                  checked={consent.replay}
                  onChange={(e) => setConsent({ ...consent, replay: e.target.checked })}
                  className="accent-accent cursor-pointer"
                />
              </label>
            </div>
          </div>

          {/* Action CTA & Device Note Footer */}
          <div className="pt-2 border-t border-border space-y-2">
            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-4 py-2.5 font-semibold text-accent-fg shadow-md transition-opacity hover:opacity-90 active:scale-[0.99]"
            >
              <span>Send Bug Report</span>
              <kbd className="rounded bg-black/20 px-1.5 py-0.5 text-[10px] font-mono">⌘↵</kbd>
            </button>
            <p className="text-[10px] text-center text-muted">
              Detected personal data is redacted on your device · Zero third-party tracking
            </p>
          </div>
        </div>
      </div>
    </figure>
  );
}
