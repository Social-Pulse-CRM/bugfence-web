import type { NextConfig } from 'next';

const isGitHubActions = process.env.GITHUB_ACTIONS === 'true';
const repoName = process.env.GITHUB_REPOSITORY ? `/${process.env.GITHUB_REPOSITORY.split('/')[1]}` : '';
// If custom domain is set or running locally, basePath is empty. If on GitHub Actions without custom domain, use repoName.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? (isGitHubActions && !process.env.CUSTOM_DOMAIN ? repoName : '');

const config: NextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: basePath || undefined,
  images: {
    unoptimized: true,
  },
  poweredByHeader: false,
  reactStrictMode: true,
};

export default config;
