import { aboutSections } from '../data/about';
import { programmes } from '../data/programmes';
import { publishedSpeakers } from '../data/speakers';
import { absoluteUrl, INDEXING_ENABLED, staticPages } from '../lib/seo';

export default function sitemap() {
  if (!INDEXING_ENABLED) return [];

  // /about renders the default section, so list its canonical URL only.
  const paths = [
    ...staticPages.map((page) => page.path),
    ...publishedSpeakers.map((speaker) => `/speakers/${speaker.id}`),
    ...programmes.map((programme) => `/programmes/${programme.id}`),
    ...aboutSections.filter((section) => !section.default).map((section) => `/about/${section.slug}`),
  ];

  // Omit lastmod until content has reliable modification timestamps.
  return [...new Set(paths)].map((path) => ({ url: absoluteUrl(path) }));
}
