// The apex domain redirects to this production origin in Vercel.
export const SITE_URL = 'https://www.festivalofideas.org';
export const SITE_NAME = 'Festival of Ideas Delhi';
export const HOME_TITLE = 'Festival of Ideas Delhi 2026 | Official Website';
export const SOCIAL_LINKS = {
  instagram: 'https://www.instagram.com/festivalofideasdelhi/',
  linkedin: 'https://in.linkedin.com/in/festival-of-ideas-delhi-edition-1512a643b',
};
export const INDEXING_ENABLED = !['preview', 'development'].includes(process.env.VERCEL_ENV);

export const staticPages = [
  { path: '/', title: HOME_TITLE, description: 'Official website of Festival of Ideas Delhi 2026, the 4th edition at Shri Ram College of Commerce, University of Delhi, from 29 October to 1 November.' },
  { path: '/speakers', title: 'Speakers', description: 'Explore speakers from past editions of the Festival of Ideas Delhi, spanning public policy, business, literature, science and culture.' },
  { path: '/programmes', title: 'Festival Layout', description: 'Explore talks, festival spaces, competitions, performances and books at Festival of Ideas Delhi 2026, from 29 October to 1 November at SRCC.' },
  { path: '/partners', title: 'Past Partners', description: 'Meet the institutions, organisations and brands that have supported past editions of the Festival of Ideas Delhi.' },
  { path: '/gallery', title: 'Gallery', description: 'Browse photographs, memorable conversations and highlights from past editions of the Festival of Ideas Delhi.' },
  { path: '/about', title: 'About Us', description: 'Learn about Shri Ram College of Commerce, its centenary and its role in hosting the fourth edition of the Festival of Ideas Delhi.' },
  { path: '/leadership', title: 'Leadership', description: 'Meet the Advisory Board and Fortress India leadership behind Festival of Ideas Delhi 2026.' },
  { path: '/attendees', title: 'Register as an Attendee', description: 'Find attendee registration updates for Festival of Ideas Delhi 2026, taking place from 29 October to 1 November at SRCC, University of Delhi.' },
  { path: '/delegates', title: 'Register as a Delegate', description: 'Register your interest as a delegate at Festival of Ideas Delhi 2026 and connect with speakers, students and fellow delegates at SRCC.' },
  // Volunteers hidden (route folder renamed to app/_volunteers). Restore both together.
  // { path: '/volunteers', title: 'Volunteers', description: 'Apply to join the Festival of Ideas Delhi 2026 organising team — 29 October to 1 November at SRCC, University of Delhi.' },
];

export function absoluteUrl(path) {
  return new URL(path, SITE_URL).href;
}

export function pageMetadata({ path, title, description, image = '/assets/logo-butterfly.png', index = true }) {
  const fullTitle = path === '/' ? title : `${title} | ${SITE_NAME}`;
  return {
    title: path === '/' ? { absolute: title } : title,
    description,
    alternates: { canonical: absoluteUrl(path) },
    robots: { index: INDEXING_ENABLED && index, follow: true },
    openGraph: {
      type: 'website',
      locale: 'en_IN',
      siteName: SITE_NAME,
      title: fullTitle,
      description,
      url: absoluteUrl(path),
      images: [{ url: absoluteUrl(image), alt: title }],
    },
    twitter: { card: 'summary', title: fullTitle, description, images: [absoluteUrl(image)] },
  };
}

export function staticPageMetadata(path) {
  return pageMetadata(staticPages.find((page) => page.path === path));
}
