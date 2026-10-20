import AboutView from '../../components/AboutView';
import { aboutSections } from '../../data/about';
import { staticPageMetadata } from '../../lib/seo';

export const metadata = staticPageMetadata('/about');

export default function AboutPage() {
  return <AboutView slug={aboutSections.find((s) => s.default).slug} />;
}
