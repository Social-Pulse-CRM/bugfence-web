import { Section } from '@/components/ui/section';
import { InstallTabs, type InstallTab } from '@/components/code/install-tabs';
import { env } from '@/lib/env';

const PKG = '@socialpulsecrm/bugfence-react';

export function InstallSection() {
  const pkg = env.npmPackage ?? PKG;
  // Until a public npm URL is configured, the documented registry is GitHub Packages and needs a scope mapping.
  const npmrc = env.npmUrl ? '' : '# .npmrc\n@socialpulsecrm:registry=https://npm.pkg.github.com\n\n';
  const tabs: InstallTab[] = [
    { id: 'npm', label: 'npm', code: `${npmrc}npm install ${pkg}` },
    { id: 'pnpm', label: 'pnpm', code: `${npmrc}pnpm add ${pkg}` },
    {
      id: 'react', label: 'React',
      code: `<BugFenceProvider config={{\n  projectKey: 'pk_live_your_public_key',\n  endpoint: 'https://bugs.example.com/api/v1/reports',\n  lazyWidget: true,\n}}>\n  <App />\n</BugFenceProvider>`,
    },
    {
      id: 'script', label: 'Script tag',
      code: `<script src="https://YOUR-CDN/bugfence.min.js"></script>\n<script>\n  BugFence.init({\n    projectKey: 'pk_live_your_public_key',\n    endpoint: 'https://bugs.example.com/api/v1/reports',\n  });\n</script>`,
    },
  ];
  return (
    <Section id="install" eyebrow="Quick start" title="Add it in a few lines" intro="Use your public project key only. Secret keys never belong in browser code.">
      <InstallTabs tabs={tabs} />
      {env.npmUrl && <p className="mt-3 text-sm"><a className="text-accent underline" href={env.npmUrl} target="_blank" rel="noopener noreferrer">View the package</a></p>}
    </Section>
  );
}
