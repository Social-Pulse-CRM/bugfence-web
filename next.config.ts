import type { NextConfig } from 'next';

// When deployed to bug-fence.com (custom domain), basePath is root ('').
// NEXT_PUBLIC_BASE_PATH is only needed if serving under a subfolder.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

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
