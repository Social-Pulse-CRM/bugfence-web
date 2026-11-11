// Every item maps to a documented capability in the BugFence product repo (README / docs).
export const PAIN_POINTS = [
  { title: 'The extension wall', body: 'Customers and enterprise users often cannot install browser extensions. BugFence is a drop-in widget: nothing for the reporter to install.' },
  { title: 'Privacy worries', body: 'Screenshots and recordings can capture tokens, emails and card numbers. BugFence masks known patterns and fenced fields in the browser, before upload.' },
  { title: 'Duplicate floods', body: 'Many users hit the same bug. Reports are grouped into issues by stack trace, endpoint, trace id or text similarity, with an explanation for each match.' },
  { title: 'Missing context', body: 'A screenshot alone is rarely enough. Reports carry console, failed requests, breadcrumbs, release and correlation ids (Sentry, Datadog, PostHog and more).' },
] as const;

export const FEATURES = [
  { title: 'Reporting Studio', body: 'Screenshot, tab recording and DOM replay in one dialog, with annotation tools, pixelate/redact and an element picker.' },
  { title: 'Redaction before upload', body: 'Password and card inputs are masked by default. You add selectors; tokens, emails, cards and more are scrubbed from text, URLs and headers. A live Privacy check shows what will change.' },
  { title: 'Reporter consent', body: 'Reporters can include or exclude screenshot, video, replay, console and network data before sending.' },
  { title: 'Issue grouping & regressions', body: 'Explainable grouping, priority ranking, regression detection, merge and detach.' },
  { title: 'Releases & source maps', body: 'Tag reports with release and environment, upload source maps per release, and symbolicate stacks on your server.' },
  { title: 'Agent-ready', body: 'An MCP server and CLI let coding agents (Claude Code, Cursor, VS Code/Copilot) read reports with read-only, scoped keys by default.' },
  { title: 'Integrations', body: 'GitHub, Jira, Linear, Slack, Teams, Discord, Datadog, Splunk, PagerDuty and signed webhooks.' },
  { title: 'Self-hosted', body: 'Run it on your own infrastructure with JSON files or PostgreSQL. Reports stay where you deploy them.' },
] as const;

export const FAQ = [
  { q: 'How does redaction work for screenshots, DOM replays, and video recordings?', a: 'BugFence provides defense-in-depth privacy across all capture types: DOM screenshots and 30s session replays automatically mask passwords, credit cards, and tagged selectors (data-bugfence-mask). For screen video recordings, the studio includes built-in video redaction tools (drag-to-redact region boxes across custom timeframes), start/end timeline trimming, and device-side re-encoding, allowing reporters to review and redact any sensitive pixels before attachment.' },
  { q: 'Do reporters need an extension?', a: 'No. BugFence is a script or React component embedded in your app.' },
  { q: 'Where is data stored?', a: 'On infrastructure you run. The documented deployment model is self-hosted (Docker, Node, JSON files or PostgreSQL).' },
  { q: 'Does AI see my screenshots?', a: 'On-device heuristics make no network calls. Optional server-side AI triage sends only a minimal, re-sanitised text subset to the provider you configure; screenshots, video and replay are never sent.' },
  { q: 'Does it work on mobile?', a: 'The widget runs in mobile browsers, but screen recording is generally unavailable there because browsers do not expose getDisplayMedia.' },
] as const;
