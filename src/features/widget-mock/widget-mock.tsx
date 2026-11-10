/** Static, CSS-built illustration of the reporting widget. Decorative: not a real screenshot. */
export function WidgetMock() {
  return (
    <figure aria-label="Illustration of the BugFence reporting studio" className="rounded-card border border-border bg-surface p-4 shadow-[0_0_60px_-20px_var(--accent)]">
      <div className="flex items-center gap-2 border-b border-border pb-3 text-xs text-muted">
        <span className="size-2.5 rounded-full bg-danger" aria-hidden="true" />
        <span>Report a problem</span>
        <span className="ml-auto flex gap-1" aria-hidden="true">
          {['Screenshot', 'Record', 'Replay'].map((t, i) => (
            <span key={t} className={`rounded-md px-2 py-0.5 ${i === 0 ? 'bg-elevated text-fg' : ''}`}>{t}</span>
          ))}
        </span>
      </div>
      <div className="mt-3 grid gap-3 sm:grid-cols-[1.4fr_1fr]">
        <div className="relative rounded-lg border border-border bg-bg p-3" aria-hidden="true">
          <div className="h-3 w-1/3 rounded bg-elevated" />
          <div className="mt-3 space-y-2">
            <div className="h-8 rounded bg-elevated" />
            <div className="flex gap-2"><div className="h-8 flex-1 rounded bg-elevated" /><div className="h-8 w-24 rounded" style={{ background: 'var(--redact)' }} /></div>
            <div className="h-8 w-2/3 rounded border-2 border-danger" />
          </div>
          <span className="absolute right-3 top-3 rounded bg-danger px-1.5 text-[10px] font-semibold text-white">1</span>
        </div>
        <ul className="space-y-2 text-xs" aria-hidden="true">
          <li className="rounded-lg border border-border bg-bg p-2">Privacy check: 2 values will be replaced</li>
          <li className="rounded-lg border border-border bg-bg p-2">Console: 1 error · Network: 1 failed request</li>
          <li className="rounded-lg border border-border bg-bg p-2">Include replay <span className="text-accent">on</span></li>
        </ul>
      </div>
      <figcaption className="mt-3 text-xs text-muted">Illustration. Layout simplified.</figcaption>
    </figure>
  );
}
