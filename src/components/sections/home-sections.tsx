import { Section } from '@/components/ui/section';
import { Card } from '@/components/ui/card';
import { PAIN_POINTS, FEATURES } from '@/content/home';

export function PainPoints() {
  return (
    <Section eyebrow="The problems" title="What makes bug reports hard" intro="The recurring friction teams describe when collecting feedback from real users.">
      <div className="grid gap-4 sm:grid-cols-2">
        {PAIN_POINTS.map((p) => (
          <Card key={p.title}><h3 className="font-semibold">{p.title}</h3><p className="mt-2 text-sm text-muted">{p.body}</p></Card>
        ))}
      </div>
    </Section>
  );
}

export function HowItWorks() {
  const steps = [
    ['Capture', 'The reporter opens the widget and captures a screenshot, recording or replay.'],
    ['Redact', 'Fenced fields and known patterns are masked in the browser. The reporter reviews a Privacy check.'],
    ['Triage', 'Your server groups the report into an issue and flags regressions, with release and trace context.'],
    ['Hand off', 'Create a GitHub, Jira or Linear ticket, or let your coding agent read it over MCP.'],
  ];
  return (
    <Section id="how-it-works" eyebrow="How it works" title="From report to fix">
      <ol className="grid gap-4 md:grid-cols-4">
        {steps.map(([t, b], i) => (
          <li key={t} className="rounded-card border border-border bg-surface p-5">
            <span className="text-sm font-semibold text-accent">0{i + 1}</span>
            <h3 className="mt-1 font-semibold">{t}</h3>
            <p className="mt-2 text-sm text-muted">{b}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

export function FeatureGrid() {
  return (
    <Section eyebrow="Features" title="Built for triage, not just capture">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map((f) => (
          <Card key={f.title}><h3 className="font-semibold">{f.title}</h3><p className="mt-2 text-sm text-muted">{f.body}</p></Card>
        ))}
      </div>
    </Section>
  );
}
