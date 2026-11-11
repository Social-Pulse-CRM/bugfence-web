import Link from 'next/link';
import { cn } from '@/lib/cn';

type Variant = 'primary' | 'secondary' | 'ghost';
const base = 'inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-5 text-sm font-medium transition-colors';
const variants: Record<Variant, string> = {
  primary: 'bg-accent text-accent-fg hover:opacity-90',
  secondary: 'border border-border bg-surface text-fg hover:bg-elevated',
  ghost: 'text-muted hover:text-fg',
};

export function ButtonLink({
  href,
  variant = 'primary',
  className,
  target,
  rel,
  children,
}: {
  href: string;
  variant?: Variant;
  className?: string;
  target?: string;
  rel?: string;
  children: React.ReactNode;
}) {
  const external = /^https?:/.test(href) || target === '_blank';
  const cls = cn(base, variants[variant], className);
  return external ? (
    <a
      href={href}
      className={cls}
      target={target || '_blank'}
      rel={rel || 'noopener noreferrer'}
    >
      {children}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
