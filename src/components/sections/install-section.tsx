import { Section } from '@/components/ui/section';
import { InstallTabs, type InstallTab } from '@/components/code/install-tabs';
import { env } from '@/lib/env';
import { Code2, ExternalLink, Terminal, ShieldCheck } from 'lucide-react';

const DEFAULT_PKG = '@socialpulsecrm/bugfence-react';

export function InstallSection() {
  const pkg = env.npmPackage ?? DEFAULT_PKG;

  // If a custom npm registry / package URL is provided in env, display direct install;
  // otherwise provide the standard package mapping note
  const npmrc = env.npmUrl ? '' : '# If installing from GitHub Packages scope:\n@socialpulsecrm:registry=https://npm.pkg.github.com\n\n';

  const tabs: InstallTab[] = [
    {
      id: 'react',
      label: 'React SDK',
      code: `// 1. Install\n${npmrc}npm install ${pkg}\n\n// 2. Wrap your application with BugFenceProvider\nimport { BugFenceProvider } from '${pkg}';\n\nexport function RootLayout({ children }: { children: React.ReactNode }) {\n  return (\n    <BugFenceProvider\n      config={{\n        projectKey: 'pk_live_your_public_key',\n        endpoint: 'https://bugs.yourcompany.com/api/v1/reports',\n        lazyWidget: true,\n        accentColor: '#0b7a5f',\n        features: {\n          screenRecording: true,\n          voice: true,\n        },\n      }}\n    >\n      {children}\n    </BugFenceProvider>\n  );\n}`,
    },
    {
      id: 'script',
      label: 'HTML Script Tag',
      code: `<!-- Drop-in Script Tag (zero build step) -->\n<script src="https://cdn.jsdelivr.net/npm/${pkg}/dist/bugfence.min.js"></script>\n<script>\n  BugFence.init({\n    projectKey: 'pk_live_your_public_key',\n    endpoint: 'https://bugs.yourcompany.com/api/v1/reports',\n    launcherText: 'Report a problem',\n    shortcut: 'mod+shift+k',\n    privacy: {\n      maskSelectors: ['.payment-input', '.secret-token'],\n      maskInputs: true\n    }\n  });\n</script>`,
    },
    {
      id: 'npm',
      label: 'CLI & Package Manager',
      code: `# Install via npm\n${npmrc}npm install ${pkg}\n\n# Or via pnpm\npnpm add ${pkg}\n\n# Or install BugFence CLI globally\nnpm install -g @bugfence/cli\nbugfence doctor`,
    },
    {
      id: 'docker',
      label: 'Self-Hosted Docker',
      code: `# 1. Pull and run the BugFence ingestion server locally\ndocker run -d \\\n  --name bugfence-server \\\n  -p 4000:4000 \\\n  -v bugfence_data:/app/data \\\n  -e NODE_ENV=production \\\n  -e BUGFENCE_DATA_DIR=/app/data \\\n  ghcr.io/socialpulsecrm/bugfence-server:latest\n\n# 2. Verify server health\ncurl http://localhost:4000/api/v1/health`,
    },
    {
      id: 'mcp',
      label: 'Coding Agent (MCP)',
      code: `# Connect BugFence to Claude Code, Cursor, or VS Code Copilot\n# In your claude_desktop_config.json or cursor settings:\n{\n  "mcpServers": {\n    "bugfence": {\n      "command": "npx",\n      "args": ["-y", "@bugfence/mcp-server"],\n      "env": {\n        "BUGFENCE_API_URL": "https://bugs.yourcompany.com",\n        "BUGFENCE_API_KEY": "bf_mcp_your_read_only_key"\n      }\n    }\n  }\n}`,
    },
  ];

  return (
    <Section
      id="install"
      eyebrow="Developer Quickstart"
      title="Add BugFence to Your App in 5 Minutes"
      intro="Use your public project key in the browser. Technical context and privacy redaction are active immediately."
    >
      <InstallTabs tabs={tabs} />

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 text-xs text-muted">
        <div className="flex items-center gap-2">
          <ShieldCheck className="size-4 text-accent" />
          <span>Only public keys are exposed to client code. Secrets and LLM API keys stay safely on your server.</span>
        </div>

        {env.npmUrl && (
          <a
            href={env.npmUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-semibold text-accent underline"
          >
            <Code2 className="size-3.5" />
            <span>View {env.npmPackage ?? 'BugFence'} on NPM</span>
            <ExternalLink className="size-3" />
          </a>
        )}
      </div>
    </Section>
  );
}
