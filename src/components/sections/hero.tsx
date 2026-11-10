import { Container } from '@/components/ui/container';
import { ButtonLink } from '@/components/ui/button';
import { WidgetMock } from '@/features/widget-mock/widget-mock';

export function Hero() {
  return (
    <section className="pb-12 pt-16 sm:pt-24">
      <Container className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <p className="mb-4 text-sm font-medium text-accent">Privacy-first bug reporting</p>
          <h1 className="text-4xl font-semibold leading-[1.08] tracking-tight sm:text-6xl">
            Bug reports with the evidence. Without the leaks.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-muted">
            A drop-in widget captures annotated screenshots, recordings and replay with console and network context.
            Sensitive data is redacted in the browser before anything is sent, and you can host it yourself.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="#install">Install the widget</ButtonLink>
            <ButtonLink href="#demo" variant="secondary">See the redaction demo</ButtonLink>
          </div>
          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted">
            <li>No extension for reporters</li>
            <li>Self-hostable</li>
            <li>MCP + CLI for coding agents</li>
          </ul>
        </div>
        <WidgetMock />
      </Container>
    </section>
  );
}
