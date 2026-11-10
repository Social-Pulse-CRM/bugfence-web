import type { MetadataRoute } from 'next';
import { env } from '@/lib/env';

const paths = ['', '/pricing', '/security', '/compare', '/about', '/contact', '/privacy', '/terms', '/cookies', '/dpa', '/accessibility'];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((p) => ({ url: `${env.siteUrl}${p}` }));
}
