import { absoluteUrl, INDEXING_ENABLED } from '../lib/seo';

export default function robots() {
  if (!INDEXING_ENABLED) return { rules: { userAgent: '*', disallow: '/' } };

  return {
    rules: { userAgent: '*', allow: '/', disallow: '/api/' },
    sitemap: absoluteUrl('/sitemap.xml'),
  };
}
