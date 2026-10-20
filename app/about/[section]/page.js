import { notFound } from 'next/navigation';
import AboutView from '../../../components/AboutView';
import { aboutSections } from '../../../data/about';
import { pageMetadata } from '../../../lib/seo';

export const dynamicParams = false;
export const generateStaticParams = () => aboutSections.map((s) => ({ section: s.slug }));

export async function generateMetadata({ params }) {
  const { section } = await params;
  const about = aboutSections.find((s) => s.slug === section);
  if (!about) notFound();
  return pageMetadata({
    path: about.default ? '/about' : `/about/${about.slug}`,
    title: about.tab,
    description: about.description,
  });
}

export default async function AboutSectionPage({ params }) {
  const { section } = await params;
  if (!aboutSections.some((about) => about.slug === section)) notFound();
  return <AboutView slug={section} />;
}
