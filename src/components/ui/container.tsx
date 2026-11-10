import { cn } from '@/lib/cn';
export function Container({ className, children, narrow }: { className?: string; children: React.ReactNode; narrow?: boolean }) {
  return <div className={cn('mx-auto w-full px-5 sm:px-8', narrow ? 'max-w-3xl' : 'max-w-[1200px]', className)}>{children}</div>;
}
