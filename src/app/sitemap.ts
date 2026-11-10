import type { MetadataRoute } from 'next';
import { env } from '@/lib/env';

export const dynamic = 'force-static';

const paths = [
  '',
  '/pricing/',
  '/security/',
  '/compare/',
  '/about/',
  '/contact/',
  '/privacy/',
  '/terms/',
  '/cookies/',
  '/dpa/',
  '/accessibility/',
];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((p) => ({
    url: `${env.siteUrl}${p}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: p === '' ? 1.0 : p === '/pricing/' || p === '/security/' ? 0.9 : 0.7,
  }));
}
