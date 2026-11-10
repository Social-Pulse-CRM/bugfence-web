import { Section } from '@/components/ui/section';
import { Card } from '@/components/ui/card';
import { PAIN_POINTS, FEATURES } from '@/content/home';
import {
  ShieldAlert,
  DownloadCloud,
  Layers,
  FileQuestion,
  Camera,
  ShieldCheck,
  UserCheck,
  GitMerge,
  FileCode,
  Bot,
  Webhook,
  Server,
  Terminal,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';

const PAIN_ICONS = [DownloadCloud, ShieldAlert, Layers, FileQuestion];
const FEATURE_ICONS = [Camera, ShieldCheck, UserCheck, GitMerge, FileCode, Bot, Webhook, Server];

export function PainPoints() {
  return (
    <Section
      eyebrow="Developer & QA Pain Points"
      title="Why Traditional Bug Reporting Fails"
      intro="Common friction points engineering teams experience when collecting bug reports from real users and clients."
    >
      <div className="grid gap-6 sm:grid-cols-2">
        {PAIN_POINTS.map((p, idx) => {
          const Icon = PAIN_ICONS[idx % PAIN_ICONS.length]!;
          return (
            <Card key={p.title} className="flex flex-col justify-between p-6 hover:border-accent/40 transition-colors">
              <div>
                <div className="flex size-10 items-center justify-center rounded-lg bg-danger/10 text-danger mb-4">
                  <Icon className="size-5" />
                </div>
                <h3 className="text-lg font-bold text-fg">{p.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">{p.body}</p>
              </div>
            </Card>
          );
        })}
      </div>
    </Section>
  );
}

export function HowItWorks() {
  const steps = [
    {
      num: '01',
      title: 'Reporter Captures',
      body: 'User opens the in-app studio to capture an annotated screenshot, screen recording, or 30s DOM replay with zero extension needed.',
    },
    {
      num: '02',
      title: 'Browser Redacts',
      body: 'DOMFence masks password inputs, cards, and custom selectors before rasterization. Tokens and emails are scrubbed before upload.',
    },
    {
      num: '03',
      title: 'Server Groups & Symbolicates',
      body: 'Your self-hosted server groups duplicate reports into single issues using stack traces and release source maps, detecting regressions.',
    },
    {
      num: '04',
      title: 'Agent or Team Fixes',
      body: 'Dispatch the issue to GitHub, Jira, or Linear, or let your AI coding agent (Claude Code, Cursor) resolve it over MCP with scoped read keys.',
    },
  ];

  return (
    <Section id="how-it-works" eyebrow="End-to-End Workflow" title="From Bug Capture to Verified Fix">
      <div className="grid gap-6 md:grid-cols-4">
        {steps.map((s) => (
          <div
            key={s.title}
            className="relative flex flex-col justify-between rounded-card border border-border bg-surface p-6 shadow-sm hover:border-accent/30 transition-colors"
          >
            <div>
              <span className="font-mono text-2xl font-black text-accent/80">{s.num}</span>
              <h3 className="mt-3 text-base font-bold text-fg">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.body}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

export function AgentSection() {
  return (
    <Section
      eyebrow="Built for AI Coding Agents"
      title="Model Context Protocol (MCP) & CLI Native"
      intro="Bug reports shouldn't just sit in a web dashboard. Give Claude Code, Cursor, and Copilot direct, privacy-sanitized diagnostic access."
    >
      <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] items-center">
        <div className="space-y-4">
          <div className="rounded-card border border-border bg-surface p-6 space-y-4">
            <h3 className="text-xl font-bold text-fg">AI Triage Without Leaking Secrets</h3>
            <p className="text-sm leading-relaxed text-muted">
              Most bug reporting tools require pasting customer screenshots or raw database dumps into LLMs. BugFence provides a dedicated Model Context Protocol (MCP) server that runs locally via stdio or authenticated HTTP with read-only scoped keys.
            </p>
            <ul className="space-y-2.5 text-sm text-muted">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="size-4 text-accent mt-0.5 shrink-0" />
                <span>Coding agents inspect symbolicated stack traces and failed API calls</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="size-4 text-accent mt-0.5 shrink-0" />
                <span>Sensitive tokens and credentials stripped before prompt construction</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="size-4 text-accent mt-0.5 shrink-0" />
                <span>On-device heuristics for free; bring-your-own LLM key for server triage</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Mock Terminal / MCP Agent Dialogue */}
        <div className="overflow-hidden rounded-card border border-border bg-bg shadow-xl">
          <div className="flex items-center justify-between border-b border-border bg-elevated/80 px-4 py-2.5 text-xs text-muted font-mono">
            <div className="flex items-center gap-1.5">
              <Terminal className="size-3.5 text-accent" />
              <span>Claude Code / Cursor terminal</span>
            </div>
            <span className="text-[11px] text-accent">mcp:read</span>
          </div>
          <pre className="overflow-x-auto p-4 font-mono text-xs leading-relaxed text-fg/90 space-y-2">
            <span className="text-muted">{'>'} claude --use-mcp bugfence</span>
            {'\n'}
            <span className="text-accent">User:</span> Investigate checkout error reported on release v2.4.1
            {'\n'}
            <span className="text-secondary">Agent:</span> Querying BugFence MCP tool `get_issue_diagnostics`...
            {'\n'}
            <span className="text-muted">
              {'{'}
              {'\n'}  &quot;issueId&quot;: &quot;iss_9a2f&quot;,
              {'\n'}  &quot;failingEndpoint&quot;: &quot;POST /api/checkout (500)&quot;,
              {'\n'}  &quot;symbolicatedStack&quot;: &quot;src/checkout.ts:84 in processPayment&quot;,
              {'\n'}  &quot;redactedState&quot;: &quot;authToken: [TOKEN], card: [CARD]&quot;
              {'\n'}{'}'}
            </span>
            {'\n'}
            <span className="text-accent">Agent:</span> Identified null check bug in src/checkout.ts line 84. Generating patch...
          </pre>
        </div>
      </div>
    </Section>
  );
}

export function FeatureGrid() {
  return (
    <Section eyebrow="Comprehensive Feature Set" title="Built for Deep Technical Triage, Not Just Capture">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map((f, idx) => {
          const Icon = FEATURE_ICONS[idx % FEATURE_ICONS.length]!;
          return (
            <Card key={f.title} className="p-6 hover:border-accent/40 transition-colors">
              <div className="flex size-10 items-center justify-center rounded-lg bg-accent/10 text-accent mb-4">
                <Icon className="size-5" />
              </div>
              <h3 className="font-bold text-fg">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{f.body}</p>
            </Card>
          );
        })}
      </div>
    </Section>
  );
}

export function IntegrationsSection() {
  const integrations = [
    { category: 'Issue Tracking', items: ['GitHub & GitHub Enterprise', 'Linear', 'Jira Cloud & Data Center'] },
    { category: 'Session Correlation', items: ['Sentry Event & Replay IDs', 'PostHog Session URLs', 'LogRocket & FullStory'] },
    { category: 'Monitoring & Logs', items: ['Datadog RUM / APM IDs', 'Splunk HEC', 'W3C Traceparent Context'] },
    { category: 'Alerts & Webhooks', items: ['Slack Notifications', 'Microsoft Teams', 'Discord & HMAC Webhooks'] },
  ];

  return (
    <Section
      eyebrow="Ecosystem & Workflow"
      title="Integrates Seamlessly With Your Stack"
      intro="BugFence connects with your current ticketing, observability, and alerting tools without vendor lock-in."
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {integrations.map((group) => (
          <div key={group.category} className="rounded-card border border-border bg-surface p-6 space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-accent">{group.category}</h3>
            <ul className="space-y-2 text-sm text-fg/90">
              {group.items.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="size-3.5 text-accent shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
