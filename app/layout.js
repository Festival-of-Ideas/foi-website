import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Reveal from '../components/Reveal';
import { HOME_TITLE, INDEXING_ENABLED, SITE_NAME, SITE_URL, staticPages } from '../lib/seo';
import '../styles/base.css';
import '../styles/nav.css';
import '../styles/home.css';
import '../styles/mosaic.css';
import '../styles/speakers.css';
import '../styles/pages.css';
import '../styles/gallery.css';
import '../styles/forms.css';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: HOME_TITLE, template: `%s | ${SITE_NAME}` },
  description: staticPages[0].description,
  robots: { index: INDEXING_ENABLED, follow: true },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || undefined,
    other: process.env.BING_SITE_VERIFICATION ? { 'msvalidate.01': process.env.BING_SITE_VERIFICATION } : undefined,
  },
};

const bfly = <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 11c-1.5-4-6-7-9-6-1 3 1 7 5 8-3 1-5 4-4 7 3 1 7-1 8-4 1 3 5 5 8 4 1-3-1-6-4-7 4-1 6-5 5-8-3-1-7.5 2-9 6Z" opacity=".9" /></svg>;

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Marcellus&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,700&family=Lora:ital,wght@0,500;0,600;1,500&family=Inter:wght@600&display=swap" rel="stylesheet" />
        {/* hide .reveal elements only when JS runs, so content stays visible without it */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <div className="bfly-layer" aria-hidden="true">
          {['b1', 'b2', 'b3', 'b4'].map((b) => <div key={b} className={`bfly ${b}`}>{bfly}</div>)}
        </div>
        <div id="flyOverlay" />
        <Nav />
        <main>{children}</main>
        <Footer />
        <Reveal />
      </body>
    </html>
  );
}
